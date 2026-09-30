import fs from "node:fs";
import path from "node:path";

import { test as base, expect } from "@playwright/test";

import { AUTH_DIR, INSTANCE_URL } from "../../playwright.config.ts";
import { normalizeInstanceUrl } from "../utils/url-helper.ts";

export { normalizeInstanceUrl };

export const API_BASE_URL = normalizeInstanceUrl(INSTANCE_URL);

export const TRACKED_TABLES = [
  "x_711398_se_submission",
  "x_711398_se_skill_assessment",
  "x_711398_se_cert_acquisition",
  "sys_journal_field",
] as const;

export type TrackedTable = (typeof TRACKED_TABLES)[number];

export const REVERSE_DELETE_ORDER: TrackedTable[] = [
  "sys_journal_field",
  "x_711398_se_cert_acquisition",
  "x_711398_se_skill_assessment",
  "x_711398_se_submission",
];

export function getAdminApiHeaders(customAuthHeader?: string): HeadersInit {
  if (customAuthHeader) {
    return {
      Authorization: customAuthHeader,
      Accept: "application/json",
    };
  }

  const sessionFile = path.resolve(AUTH_DIR, "admin-session.json");
  if (fs.existsSync(sessionFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(sessionFile, "utf-8")) as Record<string, string>;
      if (data && typeof data === "object") {
        return {
          Accept: "application/json",
          ...data,
        };
      }
    } catch {
      // Fall back to Basic Auth
    }
  }

  const adminUser = process.env.SN_ADMIN_USER || "admin";
  const adminPassword = process.env.SN_ADMIN_PASSWORD;

  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (adminPassword) {
    headers.Authorization = `Basic ${Buffer.from(`${adminUser}:${adminPassword}`).toString("base64")}`;
  }

  return headers;
}

interface SysIdItem {
  sys_id: string;
}

export interface TableApiResponse<T> {
  result?: T;
}

export interface CleanupStats {
  byTable: Record<TrackedTable, number>;
  totalDeleted: number;
}

/** Formats an ASCII statistics table summarizing rollback operations */
export function formatAsciiStats(byTable: Record<TrackedTable, number>): string {
  const total = Object.values(byTable).reduce((acc, curr) => acc + curr, 0);

  const rows: string[] = [
    "┌───────────────────────────────────────────────────┬─────────────┐",
    "│ Table                                             │ Deleted Qty │",
    "├───────────────────────────────────────────────────┼─────────────┤",
  ];

  for (const table of TRACKED_TABLES) {
    const qty = byTable[table] ?? 0;
    const tableCol = table.padEnd(49);
    const qtyCol = String(qty).padEnd(11);

    rows.push(`│ ${tableCol} │ ${qtyCol} │`);
  }

  rows.push("└───────────────────────────────────────────────────┴─────────────┘");
  rows.push(`Total records rolled back: ${total}`);

  return rows.join("\n");
}

export const CLEANUP_MANIFEST_PATH = path.resolve(AUTH_DIR, "cleanup-manifest.json");

export interface CleanupManifestEntry {
  runId: string;
  correlationToken: string;
  registered: Record<TrackedTable, string[]>;
}

export interface CleanupManifest {
  runs: CleanupManifestEntry[];
}

export function readCleanupManifest(): CleanupManifest {
  try {
    if (fs.existsSync(CLEANUP_MANIFEST_PATH)) {
      const content = fs.readFileSync(CLEANUP_MANIFEST_PATH, "utf8");

      // SAFETY: Manifest file is serialized as CleanupManifest schema.
      return JSON.parse(content) as CleanupManifest;
    }
  } catch {
    // Corrupted or unreadable file returns empty manifest
  }

  return { runs: [] };
}

export function writeCleanupManifest(manifest: CleanupManifest): void {
  try {
    const dir = path.dirname(CLEANUP_MANIFEST_PATH);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(CLEANUP_MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf8");
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn(`[DataCleanupTracker] Failed to write cleanup manifest: ${message}`);
  }
}

export class DataCleanupTracker {
  readonly runId: string;
  readonly correlationToken: string;
  private readonly registeredRecords: Map<TrackedTable, Set<string>>;

  constructor(customRunId?: string) {
    this.runId = customRunId || `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    this.correlationToken = `[PW-TEST-${this.runId}]`;
    this.registeredRecords = new Map<TrackedTable, Set<string>>();

    for (const table of TRACKED_TABLES) {
      this.registeredRecords.set(table, new Set<string>());
    }

    this.persistManifest();
  }

  generateRunId(): string {
    return this.correlationToken;
  }

  register(table: TrackedTable, sysId: string): void {
    if (this.registeredRecords.has(table)) {
      this.registeredRecords.get(table)?.add(sysId);
      this.persistManifest();
    }
  }

  private persistManifest(): void {
    const manifest = readCleanupManifest();
    const entry = manifest.runs.find((r) => r.runId === this.runId);

    const registeredMap: Record<TrackedTable, string[]> = {
      x_711398_se_submission: this.getRegistered("x_711398_se_submission"),
      x_711398_se_skill_assessment: this.getRegistered("x_711398_se_skill_assessment"),
      x_711398_se_cert_acquisition: this.getRegistered("x_711398_se_cert_acquisition"),
      sys_journal_field: this.getRegistered("sys_journal_field"),
    };

    if (entry) {
      entry.registered = registeredMap;
    } else {
      manifest.runs.push({
        runId: this.runId,
        correlationToken: this.correlationToken,
        registered: registeredMap,
      });
    }

    writeCleanupManifest(manifest);
  }

  getRegistered(table: TrackedTable): string[] {
    return Array.from(this.registeredRecords.get(table) ?? []);
  }

  async rollback(): Promise<CleanupStats> {
    const adminUser = process.env.SN_ADMIN_USER || "admin";
    const adminPassword = process.env.SN_ADMIN_PASSWORD;
    const sessionFile = path.resolve(AUTH_DIR, "admin-session.json");

    const stats: Record<TrackedTable, number> = {
      x_711398_se_submission: 0,
      x_711398_se_skill_assessment: 0,
      x_711398_se_cert_acquisition: 0,
      sys_journal_field: 0,
    };

    if (!adminPassword && !fs.existsSync(sessionFile)) {
      // Offline mode or credentials not configured
      for (const table of TRACKED_TABLES) {
        stats[table] = this.getRegistered(table).length;
      }

      const totalDeleted = Object.values(stats).reduce((acc, curr) => acc + curr, 0);
      const tableOutput = formatAsciiStats(stats);
      console.log(tableOutput);

      return { byTable: stats, totalDeleted };
    }

    const headers: HeadersInit = getAdminApiHeaders();

    // 1. Discover all records linked by correlation token or parent submission
    const discovered: Record<TrackedTable, Set<string>> = {
      x_711398_se_submission: new Set(this.getRegistered("x_711398_se_submission")),
      x_711398_se_skill_assessment: new Set(this.getRegistered("x_711398_se_skill_assessment")),
      x_711398_se_cert_acquisition: new Set(this.getRegistered("x_711398_se_cert_acquisition")),
      sys_journal_field: new Set(this.getRegistered("sys_journal_field")),
    };

    try {
      // Find submissions matching correlation token
      const subQuery = `descriptionLIKE${encodeURIComponent(this.correlationToken)}^ORwork_notesLIKE${encodeURIComponent(this.correlationToken)}`;

      const subRes = await fetch(
        `${API_BASE_URL}/api/now/table/x_711398_se_submission?sysparm_query=${subQuery}&sysparm_fields=sys_id`,
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

      const allSubIds = Array.from(discovered.x_711398_se_submission);

      if (allSubIds.length > 0) {
        const subInList = allSubIds.join(",");

        // Discover child skill assessments
        const saRes = await fetch(
          `${API_BASE_URL}/api/now/table/x_711398_se_skill_assessment?sysparm_query=submissionIN${subInList}&sysparm_fields=sys_id`,
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
          `${API_BASE_URL}/api/now/table/x_711398_se_cert_acquisition?sysparm_query=submissionIN${subInList}&sysparm_fields=sys_id`,
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
          `${API_BASE_URL}/api/now/table/sys_journal_field?sysparm_query=element_idIN${subInList}^ORvalueLIKE${encodeURIComponent(this.correlationToken)}&sysparm_fields=sys_id`,
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
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);

      console.warn(`[DataCleanupTracker] Query error during discovery: ${message}`);
    }

    // 2. Perform reverse-dependency deletions
    for (const table of REVERSE_DELETE_ORDER) {
      const sysIds = Array.from(discovered[table]);

      for (const sysId of sysIds) {
        const delRes = await fetch(`${API_BASE_URL}/api/now/table/${table}/${sysId}`, {
          method: "DELETE",
          headers,
        });

        if (delRes.status >= 200 && delRes.status < 300) {
          stats[table] += 1;
        } else {
          const errBody = await delRes.text().catch(() => "");
          throw new Error(
            `[DataCleanupTracker] DELETE failed for ${table}/${sysId}: HTTP ${delRes.status} ${delRes.statusText} - ${errBody}`,
          );
        }
      }
    }

    // 3. Verify zero residual records remain on instance matching this run
    await this.verifyZeroResidual();

    const totalDeleted = Object.values(stats).reduce((acc, curr) => acc + curr, 0);
    const tableOutput = formatAsciiStats(stats);

    console.log(tableOutput);

    return { byTable: stats, totalDeleted };
  }

  /**
   * Verifies that zero residual records remain on the instance across all 5 tracked tables.
   * Throws an error if any records are found or if any verification query fails.
   */
  async verifyZeroResidual(customAuthHeader?: string): Promise<void> {
    const adminPassword = process.env.SN_ADMIN_PASSWORD;
    const sessionFile = path.resolve(AUTH_DIR, "admin-session.json");

    if (!adminPassword && !fs.existsSync(sessionFile)) {
      return;
    }

    const headers: HeadersInit = getAdminApiHeaders(customAuthHeader);
    const residuals: Array<{ table: TrackedTable; count: number; sysIds: string[] }> = [];

    // Query each tracked table by correlation token and registered sys_ids
    for (const table of TRACKED_TABLES) {
      const regIds = this.getRegistered(table);
      const queryParts: string[] = [];

      // 1. Check registered sys_ids
      if (regIds.length > 0) {
        queryParts.push(`sys_idIN${regIds.join(",")}`);
      }

      // 2. Check correlation token / parent references
      if (table === "x_711398_se_submission") {
        queryParts.push(
          `descriptionLIKE${encodeURIComponent(this.correlationToken)}^ORwork_notesLIKE${encodeURIComponent(this.correlationToken)}`,
        );
      } else if (table === "sys_journal_field") {
        queryParts.push(`valueLIKE${encodeURIComponent(this.correlationToken)}`);
        const subIds = this.getRegistered("x_711398_se_submission");

        if (subIds.length > 0) {
          queryParts.push(`element_idIN${subIds.join(",")}`);
        }
      } else {
        // x_711398_se_skill_assessment and x_711398_se_cert_acquisition
        const subIds = this.getRegistered("x_711398_se_submission");

        if (subIds.length > 0) {
          queryParts.push(`submissionIN${subIds.join(",")}`);
        }
      }

      if (queryParts.length === 0) {
        continue;
      }

      const queryString = queryParts.join("^OR");
      const url = `${API_BASE_URL}/api/now/table/${table}?sysparm_query=${queryString}&sysparm_fields=sys_id`;
      const res = await fetch(url, { headers });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(
          `[DataCleanupTracker] verifyZeroResidual query failed on ${table}: HTTP ${res.status} ${res.statusText} - ${errText}`,
        );
      }

      // SAFETY: ServiceNow Table API returns an object wrapping a result array for queries.
      const data = (await res.json()) as TableApiResponse<SysIdItem[]>;
      const foundRecords = Array.isArray(data.result) ? data.result : [];

      if (foundRecords.length > 0) {
        residuals.push({
          table,
          count: foundRecords.length,
          sysIds: foundRecords.map((r) => r.sys_id),
        });
      }
    }

    if (residuals.length > 0) {
      const summary = residuals
        .map((r) => `${r.table}: ${r.count} residual record(s) [${r.sysIds.join(", ")}]`)
        .join("; ");

      throw new Error(
        `[DataCleanupTracker] Residual test records detected after rollback: ${summary}`,
      );
    }
  }
}

export type Fixtures = {
  cleanupTracker: DataCleanupTracker;
};

export const test = base.extend<Fixtures>({
  cleanupTracker: async ({ page: _page }, use) => {
    const tracker = new DataCleanupTracker();

    await use(tracker);
    await tracker.rollback();
  },
});

export { expect };
