/**
 * Read-only preflight verification for ServiceNow E2E testing.
 *
 * Implements classified retry/backoff for transient availability errors,
 * strict failure on auth/configuration errors, dependency-aware skipped checks
 * when prerequisites fail, and actionable remediation diagnostics.
 */

import { PERSONA_MANIFEST, REQUIRED_MODULES, type PersonaDefinition } from "./fixtures/personas.ts";
import {
  fetchWithRetry,
  type ClassifiedProbeError,
  type ErrorClassification,
} from "./utils/probe-client.ts";
import { buildNavpageUrl, normalizeInstanceUrl } from "./utils/url-helper.ts";

export { REQUIRED_MODULES, PERSONA_MANIFEST };
export const REQUIRED_PERSONAS = PERSONA_MANIFEST;
export type PersonaExpectation = PersonaDefinition;

export type CheckStatus = "passed" | "failed" | "skipped";

export interface PreflightCheckItem {
  category: "personas" | "effective_access" | "navigator";
  name: string;
  status: CheckStatus;
  passed: boolean;
  classification?: ErrorClassification;
  diagnostic?: string;
  remediation?: string;
  skipReason?: string;
}

export interface PreflightReport {
  passed: boolean;
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
  skippedChecks: number;
  items: PreflightCheckItem[];
}

export interface PreflightOptions {
  authHeader?: string;
  sessionHeaders?: Record<string, string>;
  timeoutMs?: number;
  maxRetries?: number;
  sleepFn?: (ms: number) => Promise<void>;
}

interface TableRecord {
  sys_id?: string;
  user_name?: string;
  active?: string | boolean;
  title?: string;
  user?: { value?: string; display_value?: string } | string;
  group?: { value?: string; display_value?: string } | string;
  role?: { value?: string; display_value?: string } | string;
}

/**
 * Extracts a normalized reference value (sys_id or display_value) from a ServiceNow Table API reference field.
 */
export function extractReferenceValue(
  field: { value?: string; display_value?: string } | string | undefined,
  preference: "value" | "display_value" = "value",
): string | undefined {
  if (!field) {
    return undefined;
  }
  if (typeof field === "string") {
    return field;
  }
  return preference === "display_value"
    ? field.display_value || field.value
    : field.value || field.display_value;
}

/**
 * Executes all read-only preflight checks and returns a structured report.
 */
export async function executePreflightChecks(
  instanceUrl: string,
  options: PreflightOptions = {},
): Promise<PreflightReport> {
  const baseUrl = normalizeInstanceUrl(instanceUrl);
  const items: PreflightCheckItem[] = [];

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...options.sessionHeaders,
  };

  if (options.authHeader && !options.sessionHeaders && !headers.Authorization) {
    headers.Authorization = options.authHeader;
  }

  const probeOptions = {
    headers,
    timeoutMs: options.timeoutMs ?? 30000,
    maxRetries: options.maxRetries ?? 2,
    sleepFn: options.sleepFn,
  };

  // =========================================================================
  // Category 1: Personas Verification
  // =========================================================================
  const userNames = Object.values(PERSONA_MANIFEST).map((p) => p.userName);
  const userQuery = encodeURIComponent(`user_nameIN${userNames.join(",")}`);
  const userUrl = `${baseUrl}/api/now/table/sys_user?sysparm_query=${userQuery}&sysparm_fields=sys_id,user_name,active`;

  const usersProbe = await fetchWithRetry<TableRecord[]>(userUrl, probeOptions, true);

  const foundUsers = new Map<string, { sys_id: string; active: boolean }>();
  let userQueryFailedError: ClassifiedProbeError | undefined;

  if (usersProbe.ok && Array.isArray(usersProbe.data)) {
    for (const u of usersProbe.data) {
      if (u.user_name && u.sys_id) {
        const isActive = u.active === true || u.active === "true" || u.active === "1";
        foundUsers.set(u.user_name, { sys_id: u.sys_id, active: isActive });
      }
    }
  } else if (!usersProbe.ok) {
    userQueryFailedError = usersProbe.error;
  }

  for (const persona of Object.values(PERSONA_MANIFEST)) {
    if (userQueryFailedError) {
      const isTransient = userQueryFailedError.classification === "AVAILABILITY";
      items.push({
        category: "personas",
        name: `Persona Existence: ${persona.label} (${persona.userName})`,
        status: "failed",
        passed: false,
        classification: userQueryFailedError.classification,
        diagnostic: isTransient
          ? `ServiceNow instance is unavailable while querying sys_user (HTTP ${userQueryFailedError.status}): ${userQueryFailedError.message}. This is NOT a missing persona configuration.`
          : `Failed to query sys_user for persona '${persona.userName}' (HTTP ${userQueryFailedError.status}): ${userQueryFailedError.message}`,
        remediation: isTransient
          ? `Verify ServiceNow instance is awake, accessible, and not undergoing a restart or hibernation.`
          : `Check API credentials, permissions, and network connectivity to ${baseUrl}.`,
      });
      continue;
    }

    const user = foundUsers.get(persona.userName);
    if (!user) {
      items.push({
        category: "personas",
        name: `Persona Existence: ${persona.label} (${persona.userName})`,
        status: "failed",
        passed: false,
        classification: "CONFIGURATION",
        diagnostic: `Test persona user '${persona.userName}' (${persona.label}) was not found in table sys_user on ${baseUrl}.`,
        remediation: `Deploy seed users via 'now-sdk install' or ensure seed-users.now.ts records are loaded on the instance.`,
      });
    } else if (!user.active) {
      items.push({
        category: "personas",
        name: `Persona Active: ${persona.label} (${persona.userName})`,
        status: "failed",
        passed: false,
        classification: "CONFIGURATION",
        diagnostic: `Test persona user '${persona.userName}' (${persona.label}) exists (sys_id: ${user.sys_id}) but is marked inactive.`,
        remediation: `Activate user '${persona.userName}' in sys_user by setting active=true.`,
      });
    } else {
      items.push({
        category: "personas",
        name: `Persona: ${persona.label} (${persona.userName})`,
        status: "passed",
        passed: true,
      });
    }
  }

  // =========================================================================
  // Category 2: Effective Access Prerequisites (Groups & Roles)
  // Dependency: requires persona user to exist and be active.
  // =========================================================================
  const groupNames = Array.from(new Set(Object.values(PERSONA_MANIFEST).map((p) => p.groupName)));
  const grmemberQuery = encodeURIComponent(
    `user.user_nameIN${userNames.join(",")}^group.nameIN${groupNames.join(",")}`,
  );
  const grmemberUrl = `${baseUrl}/api/now/table/sys_user_grmember?sysparm_query=${grmemberQuery}&sysparm_display_value=all`;

  const grmemberProbe = await fetchWithRetry<TableRecord[]>(grmemberUrl, probeOptions, true);

  const memberships = new Set<string>();
  let grmemberQueryFailedError: ClassifiedProbeError | undefined;

  if (grmemberProbe.ok && Array.isArray(grmemberProbe.data)) {
    for (const row of grmemberProbe.data) {
      const u = extractReferenceValue(row.user, "value");
      const g = extractReferenceValue(row.group, "display_value");
      if (u && g) {
        memberships.add(`${u}:::${g}`);
      }
    }
  } else if (!grmemberProbe.ok) {
    grmemberQueryFailedError = grmemberProbe.error;
  }

  for (const persona of Object.values(PERSONA_MANIFEST)) {
    const user = foundUsers.get(persona.userName);

    // Dependency check: if user doesn't exist or is inactive, group check is skipped with actionable cause
    if (!user || !user.active) {
      items.push({
        category: "effective_access",
        name: `Group Membership: ${persona.userName} -> ${persona.groupName}`,
        status: "skipped",
        passed: false,
        classification: "CONFIGURATION",
        skipReason: `Prerequisite persona '${persona.userName}' does not exist or is inactive in sys_user.`,
        diagnostic: `Skipped: Cannot verify group assignment because user record '${persona.userName}' is missing or inactive.`,
        remediation: `Resolve persona existence failure first before validating group memberships.`,
      });
      continue;
    }

    if (grmemberQueryFailedError) {
      const isTransient = grmemberQueryFailedError.classification === "AVAILABILITY";
      items.push({
        category: "effective_access",
        name: `Group Membership: ${persona.userName} -> ${persona.groupName}`,
        status: "failed",
        passed: false,
        classification: grmemberQueryFailedError.classification,
        diagnostic: isTransient
          ? `Instance unavailable during sys_user_grmember check (HTTP ${grmemberQueryFailedError.status}): ${grmemberQueryFailedError.message}.`
          : `Failed to query sys_user_grmember for '${persona.userName}': ${grmemberQueryFailedError.message}`,
        remediation: isTransient
          ? `Verify ServiceNow instance is online and responsive.`
          : `Check permissions for reading sys_user_grmember table.`,
      });
      continue;
    }

    const hasMembership = memberships.has(`${user.sys_id}:::${persona.groupName}`);
    if (!hasMembership) {
      items.push({
        category: "effective_access",
        name: `Group Membership: ${persona.userName} -> ${persona.groupName}`,
        status: "failed",
        passed: false,
        classification: "CONFIGURATION",
        diagnostic: `User '${persona.userName}' (${persona.label}) is not assigned to group '${persona.groupName}' in sys_user_grmember.`,
        remediation: `Add '${persona.userName}' to group '${persona.groupName}' via sys_user_grmember or re-run seed user deployment.`,
      });
    } else {
      items.push({
        category: "effective_access",
        name: `Group Membership: ${persona.userName} -> ${persona.groupName}`,
        status: "passed",
        passed: true,
      });
    }
  }

  // Group role bindings
  const roleNames = Array.from(new Set(Object.values(PERSONA_MANIFEST).map((p) => p.requiredRole)));
  const groupRoleQuery = encodeURIComponent(
    `group.nameIN${groupNames.join(",")}^role.nameIN${roleNames.join(",")}`,
  );
  const groupRoleUrl = `${baseUrl}/api/now/table/sys_group_has_role?sysparm_query=${groupRoleQuery}&sysparm_display_value=all`;

  const groupRoleProbe = await fetchWithRetry<TableRecord[]>(groupRoleUrl, probeOptions, true);

  const groupRoles = new Set<string>();
  let groupRoleQueryFailedError: ClassifiedProbeError | undefined;

  if (groupRoleProbe.ok && Array.isArray(groupRoleProbe.data)) {
    for (const row of groupRoleProbe.data) {
      const g = extractReferenceValue(row.group, "display_value");
      const r = extractReferenceValue(row.role, "display_value");
      if (g && r) {
        groupRoles.add(`${g}:::${r}`);
      }
    }
  } else if (!groupRoleProbe.ok) {
    groupRoleQueryFailedError = groupRoleProbe.error;
  }

  for (const persona of Object.values(PERSONA_MANIFEST)) {
    if (groupRoleQueryFailedError) {
      const isTransient = groupRoleQueryFailedError.classification === "AVAILABILITY";
      items.push({
        category: "effective_access",
        name: `Role Binding: ${persona.groupName} -> ${persona.requiredRole}`,
        status: "failed",
        passed: false,
        classification: groupRoleQueryFailedError.classification,
        diagnostic: isTransient
          ? `Instance unavailable during sys_group_has_role check (HTTP ${groupRoleQueryFailedError.status}): ${groupRoleQueryFailedError.message}.`
          : `Failed to query sys_group_has_role for '${persona.groupName}': ${groupRoleQueryFailedError.message}`,
        remediation: isTransient
          ? `Verify ServiceNow instance is online and responsive.`
          : `Check permissions for reading sys_group_has_role table.`,
      });
      continue;
    }

    const hasRole = groupRoles.has(`${persona.groupName}:::${persona.requiredRole}`);
    if (!hasRole) {
      items.push({
        category: "effective_access",
        name: `Role Binding: ${persona.groupName} -> ${persona.requiredRole}`,
        status: "failed",
        passed: false,
        classification: "CONFIGURATION",
        diagnostic: `Group '${persona.groupName}' lacks role '${persona.requiredRole}' in sys_group_has_role.`,
        remediation: `Deploy groups.now.ts bindings or associate role '${persona.requiredRole}' with group '${persona.groupName}'.`,
      });
    } else {
      items.push({
        category: "effective_access",
        name: `Role Binding: ${persona.groupName} -> ${persona.requiredRole}`,
        status: "passed",
        passed: true,
      });
    }
  }

  // =========================================================================
  // Category 3: Navigator Reachability
  // =========================================================================
  // 1. Application menu reachability
  const appQuery = encodeURIComponent("title=Skill Evaluation");
  const appUrl = `${baseUrl}/api/now/table/sys_app_application?sysparm_query=${appQuery}&sysparm_fields=sys_id,title,active`;

  const appProbe = await fetchWithRetry<TableRecord[]>(appUrl, probeOptions, true);

  let appActive = false;
  let appQueryFailedError: ClassifiedProbeError | undefined;

  if (appProbe.ok && Array.isArray(appProbe.data) && appProbe.data.length > 0) {
    const app = appProbe.data[0];
    appActive = app.active === true || app.active === "true" || app.active === "1";
  } else if (!appProbe.ok) {
    appQueryFailedError = appProbe.error;
  }

  if (appQueryFailedError) {
    const isTransient = appQueryFailedError.classification === "AVAILABILITY";
    items.push({
      category: "navigator",
      name: "Application Menu: Skill Evaluation",
      status: "failed",
      passed: false,
      classification: appQueryFailedError.classification,
      diagnostic: isTransient
        ? `Instance unavailable during sys_app_application check (HTTP ${appQueryFailedError.status}): ${appQueryFailedError.message}.`
        : `Failed to query sys_app_application: ${appQueryFailedError.message}`,
      remediation: isTransient
        ? `Verify ServiceNow instance is online and responsive.`
        : `Deploy submission-menu.now.ts to register and activate the 'Skill Evaluation' application menu.`,
    });
  } else if (!appActive) {
    items.push({
      category: "navigator",
      name: "Application Menu: Skill Evaluation",
      status: "failed",
      passed: false,
      classification: "CONFIGURATION",
      diagnostic: `Application menu 'Skill Evaluation' was not found or is marked inactive in sys_app_application.`,
      remediation: `Deploy submission-menu.now.ts to register and activate the 'Skill Evaluation' application menu.`,
    });
  } else {
    items.push({
      category: "navigator",
      name: "Application Menu: Skill Evaluation",
      status: "passed",
      passed: true,
    });
  }

  // 2. Navigator modules existence and status
  // Dependency: if application menu check failed completely or is missing, module check is skipped
  if (!appActive && !appQueryFailedError) {
    items.push({
      category: "navigator",
      name: "Navigator Modules: Required Modules Present",
      status: "skipped",
      passed: false,
      classification: "CONFIGURATION",
      skipReason:
        "Application menu 'Skill Evaluation' is missing or inactive in sys_app_application.",
      diagnostic:
        "Skipped module check because parent application menu 'Skill Evaluation' is not available.",
      remediation: "Deploy and activate application menu 'Skill Evaluation' first.",
    });
  } else {
    const moduleQuery = encodeURIComponent("application.title=Skill Evaluation");
    const moduleUrl = `${baseUrl}/api/now/table/sys_app_module?sysparm_query=${moduleQuery}&sysparm_fields=sys_id,title,active`;

    const moduleProbe = await fetchWithRetry<TableRecord[]>(moduleUrl, probeOptions, true);

    const foundModules = new Map<string, boolean>();
    let moduleQueryFailedError: ClassifiedProbeError | undefined;

    if (moduleProbe.ok && Array.isArray(moduleProbe.data)) {
      for (const m of moduleProbe.data) {
        if (m.title) {
          const active = m.active === true || m.active === "true" || m.active === "1";
          foundModules.set(m.title, active);
        }
      }
    } else if (!moduleProbe.ok) {
      moduleQueryFailedError = moduleProbe.error;
    }

    if (moduleQueryFailedError) {
      const isTransient = moduleQueryFailedError.classification === "AVAILABILITY";
      items.push({
        category: "navigator",
        name: "Navigator Modules: Required Modules Present",
        status: "failed",
        passed: false,
        classification: moduleQueryFailedError.classification,
        diagnostic: isTransient
          ? `Instance unavailable during sys_app_module check (HTTP ${moduleQueryFailedError.status}): ${moduleQueryFailedError.message}.`
          : `Failed to query sys_app_module: ${moduleQueryFailedError.message}`,
        remediation: isTransient
          ? `Verify ServiceNow instance is online and responsive.`
          : `Verify read permissions on sys_app_module.`,
      });
    } else {
      const missingModules: string[] = [];
      for (const requiredTitle of REQUIRED_MODULES) {
        if (!foundModules.has(requiredTitle) || !foundModules.get(requiredTitle)) {
          missingModules.push(requiredTitle);
        }
      }

      if (missingModules.length > 0) {
        items.push({
          category: "navigator",
          name: "Navigator Modules: Required Modules Present",
          status: "failed",
          passed: false,
          classification: "CONFIGURATION",
          diagnostic: `Missing or inactive navigator module(s) under 'Skill Evaluation': ${missingModules.join(", ")}.`,
          remediation: `Deploy submission-menu.now.ts and ensure all modules ('${REQUIRED_MODULES.join("', '")}') are active.`,
        });
      } else {
        items.push({
          category: "navigator",
          name: "Navigator Modules: All Required Modules Present",
          status: "passed",
          passed: true,
        });
      }
    }
  }

  // 3. Web Navigation Surface Endpoint Reachability
  const navUrl = buildNavpageUrl(baseUrl);
  const navProbe = await fetchWithRetry<string>(
    navUrl,
    { ...probeOptions, timeoutMs: 15000 },
    false,
  );

  if (navProbe.status >= 500 || !navProbe.ok) {
    items.push({
      category: "navigator",
      name: "Navigator Web Endpoint Reachability",
      status: "failed",
      passed: false,
      classification: navProbe.error?.classification || "AVAILABILITY",
      diagnostic: `Navigator web endpoint probe (${navUrl}) failed (HTTP ${navProbe.status}): ${navProbe.error?.message || "Server error"}.`,
      remediation: `Verify instance is online, responsive, and not undergoing upgrades, restarts, or hibernation.`,
    });
  } else {
    items.push({
      category: "navigator",
      name: "Navigator Web Endpoint Reachability",
      status: "passed",
      passed: true,
    });
  }

  // Calculate totals
  const totalChecks = items.length;
  const passedChecks = items.filter((i) => i.status === "passed").length;
  const failedChecks = items.filter((i) => i.status === "failed").length;
  const skippedChecks = items.filter((i) => i.status === "skipped").length;

  return {
    passed: failedChecks === 0 && skippedChecks === 0,
    totalChecks,
    passedChecks,
    failedChecks,
    skippedChecks,
    items,
  };
}

/**
 * Formats a PreflightReport into an actionable diagnostic message.
 */
export function formatPreflightReport(report: PreflightReport): string {
  if (report.passed) {
    return `[ServiceNow E2E Preflight] All ${report.totalChecks} preflight checks PASSED.`;
  }

  const failedItems = report.items.filter((i) => i.status === "failed");
  const skippedItems = report.items.filter((i) => i.status === "skipped");

  const lines: string[] = [
    `================================================================================`,
    `[ServiceNow E2E Preflight] Access and Environment Prerequisites FAILED (${failedItems.length} failed, ${skippedItems.length} skipped of ${report.totalChecks} total)`,
    `--------------------------------------------------------------------------------`,
  ];

  if (failedItems.length > 0) {
    lines.push(`FAILED CHECKS:`);
    failedItems.forEach((item, idx) => {
      const cls = item.classification ? ` [${item.classification}]` : "";
      lines.push(`${idx + 1}. [${item.category}]${cls} ${item.name}`);
      if (item.diagnostic) {
        lines.push(`   Diagnostic:  ${item.diagnostic}`);
      }
      if (item.remediation) {
        lines.push(`   Remediation: ${item.remediation}`);
      }
      lines.push("");
    });
  }

  if (skippedItems.length > 0) {
    lines.push(`SKIPPED CHECKS (Blocked by Failed Prerequisites):`);
    skippedItems.forEach((item, idx) => {
      lines.push(`${idx + 1}. [${item.category}] ${item.name}`);
      if (item.skipReason) {
        lines.push(`   Skip Reason: ${item.skipReason}`);
      }
      if (item.diagnostic) {
        lines.push(`   Diagnostic:  ${item.diagnostic}`);
      }
      if (item.remediation) {
        lines.push(`   Remediation: ${item.remediation}`);
      }
      lines.push("");
    });
  }

  lines.push(`--------------------------------------------------------------------------------`);
  lines.push(`Cannot proceed with E2E acceptance tests until prerequisites are met.`);
  lines.push(`================================================================================`);

  return lines.join("\n");
}

/**
 * Invokes the read-only preflight checks. If any check fails or is skipped,
 * throws an Error with full actionable diagnostics.
 */
export async function runPreflightChecks(
  instanceUrl: string,
  options: PreflightOptions = {},
): Promise<PreflightReport> {
  const report = await executePreflightChecks(instanceUrl, options);

  if (!report.passed) {
    throw new Error(formatPreflightReport(report));
  }

  console.log(formatPreflightReport(report));
  return report;
}
