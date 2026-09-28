import fs from "node:fs";

import type { FullConfig } from "@playwright/test";

import { INSTANCE_URL } from "../playwright.config.ts";
import {
  CLEANUP_MANIFEST_PATH,
  formatAsciiStats,
  readCleanupManifest,
  REVERSE_DELETE_ORDER,
  type TableApiResponse,
  type TrackedTable,
  TRACKED_TABLES,
} from "./fixtures/cleanup.ts";

interface SysIdItem {
  sys_id: string;
}

export default async function globalTeardown(_config: FullConfig): Promise<void> {
  console.log("[ServiceNow E2E] Executing global teardown sweep...");

  const manifest = readCleanupManifest();
  const adminUser = process.env.SN_ADMIN_USER || "admin";
  const adminPassword = process.env.SN_ADMIN_PASSWORD;

  const stats: Record<TrackedTable, number> = {
    x_711398_se_submission: 0,
    x_711398_se_skill_assessment: 0,
    x_711398_se_cert_acquisition: 0,
    sys_journal_field: 0,
    sys_email: 0,
  };

  if (!adminPassword || manifest.runs.length === 0) {
    if (fs.existsSync(CLEANUP_MANIFEST_PATH)) {
      try {
        fs.unlinkSync(CLEANUP_MANIFEST_PATH);
      } catch {
        // ignore
      }
    }

    console.log(formatAsciiStats(stats));

    console.log("[ServiceNow E2E] Global teardown complete. Total swept records: 0");

    return;
  }

  const authHeader = `Basic ${Buffer.from(`${adminUser}:${adminPassword}`).toString("base64")}`;

  const headers: HeadersInit = {
    Authorization: authHeader,
    Accept: "application/json",
  };

  // Aggregate all correlation tokens and registered sys_ids across all runs
  const allCorrelationTokens = manifest.runs.map((r) => r.correlationToken).filter(Boolean);

  const discovered: Record<TrackedTable, Set<string>> = {
    x_711398_se_submission: new Set<string>(),
    x_711398_se_skill_assessment: new Set<string>(),
    x_711398_se_cert_acquisition: new Set<string>(),
    sys_journal_field: new Set<string>(),
    sys_email: new Set<string>(),
  };

  for (const run of manifest.runs) {
    for (const table of TRACKED_TABLES) {
      const ids = run.registered[table] || [];

      for (const id of ids) {
        discovered[table].add(id);
      }
    }
  }

  // Discover any remaining submissions by correlation tokens
  for (const token of allCorrelationTokens) {
    try {
      const subQuery = `descriptionLIKE${encodeURIComponent(token)}^ORwork_notesLIKE${encodeURIComponent(token)}`;

      const subRes = await fetch(
        `${INSTANCE_URL}/api/now/table/x_711398_se_submission?sysparm_query=${subQuery}&sysparm_fields=sys_id`,
        { headers },
      );

      if (subRes.ok) {
        // SAFETY: ServiceNow Table API returns an object wrapping a result array for queries.
        const subData = (await subRes.json()) as TableApiResponse<SysIdItem[]>;

        if (Array.isArray(subData.result)) {
          for (const item of subData.result) {
            discovered.x_711398_se_submission.add(item.sys_id);
          }
        }
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.warn(`[Global Teardown] Query error for token ${token}: ${message}`);
    }
  }

  const allSubIds = Array.from(discovered.x_711398_se_submission);

  if (allSubIds.length > 0) {
    const subInList = allSubIds.join(",");

    try {
      // Discover child skill assessments
      const saRes = await fetch(
        `${INSTANCE_URL}/api/now/table/x_711398_se_skill_assessment?sysparm_query=submissionIN${subInList}&sysparm_fields=sys_id`,
        { headers },
      );

      if (saRes.ok) {
        // SAFETY: ServiceNow Table API returns an object wrapping a result array for queries.
        const saData = (await saRes.json()) as TableApiResponse<SysIdItem[]>;

        if (Array.isArray(saData.result)) {
          for (const item of saData.result) {
            discovered.x_711398_se_skill_assessment.add(item.sys_id);
          }
        }
      }

      // Discover child cert acquisitions
      const caRes = await fetch(
        `${INSTANCE_URL}/api/now/table/x_711398_se_cert_acquisition?sysparm_query=submissionIN${subInList}&sysparm_fields=sys_id`,
        { headers },
      );

      if (caRes.ok) {
        // SAFETY: ServiceNow Table API returns an object wrapping a result array for queries.
        const caData = (await caRes.json()) as TableApiResponse<SysIdItem[]>;

        if (Array.isArray(caData.result)) {
          for (const item of caData.result) {
            discovered.x_711398_se_cert_acquisition.add(item.sys_id);
          }
        }
      }

      // Discover journal entries
      const jfRes = await fetch(
        `${INSTANCE_URL}/api/now/table/sys_journal_field?sysparm_query=element_idIN${subInList}&sysparm_fields=sys_id`,
        { headers },
      );

      if (jfRes.ok) {
        // SAFETY: ServiceNow Table API returns an object wrapping a result array for queries.
        const jfData = (await jfRes.json()) as TableApiResponse<SysIdItem[]>;

        if (Array.isArray(jfData.result)) {
          for (const item of jfData.result) {
            discovered.sys_journal_field.add(item.sys_id);
          }
        }
      }

      // Discover emails
      const emailRes = await fetch(
        `${INSTANCE_URL}/api/now/table/sys_email?sysparm_query=instanceIN${subInList}&sysparm_fields=sys_id`,
        { headers },
      );

      if (emailRes.ok) {
        // SAFETY: ServiceNow Table API returns an object wrapping a result array for queries.
        const emailData = (await emailRes.json()) as TableApiResponse<SysIdItem[]>;

        if (Array.isArray(emailData.result)) {
          for (const item of emailData.result) {
            discovered.sys_email.add(item.sys_id);
          }
        }
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.warn(`[Global Teardown] Query error during cascade discovery: ${message}`);
    }
  }

  // Also discover emails and journals by correlation token
  for (const token of allCorrelationTokens) {
    try {
      const jfRes = await fetch(
        `${INSTANCE_URL}/api/now/table/sys_journal_field?sysparm_query=valueLIKE${encodeURIComponent(token)}&sysparm_fields=sys_id`,
        { headers },
      );

      if (jfRes.ok) {
        // SAFETY: ServiceNow Table API returns an object wrapping a result array for queries.
        const jfData = (await jfRes.json()) as TableApiResponse<SysIdItem[]>;

        if (Array.isArray(jfData.result)) {
          for (const item of jfData.result) {
            discovered.sys_journal_field.add(item.sys_id);
          }
        }
      }

      const emailRes = await fetch(
        `${INSTANCE_URL}/api/now/table/sys_email?sysparm_query=subjectLIKE${encodeURIComponent(token)}^ORbodyLIKE${encodeURIComponent(token)}&sysparm_fields=sys_id`,
        { headers },
      );

      if (emailRes.ok) {
        // SAFETY: ServiceNow Table API returns an object wrapping a result array for queries.
        const emailData = (await emailRes.json()) as TableApiResponse<SysIdItem[]>;

        if (Array.isArray(emailData.result)) {
          for (const item of emailData.result) {
            discovered.sys_email.add(item.sys_id);
          }
        }
      }
    } catch {
      // Ignored in sweeper best-effort query
    }
  }

  // Perform reverse-dependency sweep deletions
  for (const table of REVERSE_DELETE_ORDER) {
    const sysIds = Array.from(discovered[table]);

    for (const sysId of sysIds) {
      try {
        const delRes = await fetch(`${INSTANCE_URL}/api/now/table/${table}/${sysId}`, {
          method: "DELETE",
          headers,
        });

        if (delRes.status >= 200 && delRes.status < 300) {
          stats[table] += 1;
        }
      } catch (delErr: unknown) {
        const message = delErr instanceof Error ? delErr.message : String(delErr);
        console.warn(`[Global Teardown] Failed to delete ${table} record ${sysId}: ${message}`);
      }
    }
  }

  const totalSwept = Object.values(stats).reduce((acc, curr) => acc + curr, 0);
  const tableOutput = formatAsciiStats(stats);
  console.log(tableOutput);
  console.log(`[ServiceNow E2E] Global teardown complete. Total swept records: ${totalSwept}`);

  // Delete manifest file after sweeping
  if (fs.existsSync(CLEANUP_MANIFEST_PATH)) {
    try {
      fs.unlinkSync(CLEANUP_MANIFEST_PATH);
    } catch {
      // ignore
    }
  }
}
