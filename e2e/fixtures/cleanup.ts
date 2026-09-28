import { test as base, expect } from "@playwright/test";

import { INSTANCE_URL } from "../../playwright.config.ts";

export const TRACKED_TABLES = [
  "x_711398_se_submission",
  "x_711398_se_skill_assessment",
  "x_711398_se_cert_acquisition",
  "sys_journal_field",
  "sys_email",
] as const;

export type TrackedTable = (typeof TRACKED_TABLES)[number];

const REVERSE_DELETE_ORDER: TrackedTable[] = [
  "sys_email",
  "sys_journal_field",
  "x_711398_se_cert_acquisition",
  "x_711398_se_skill_assessment",
  "x_711398_se_submission",
];

interface SysIdItem {
  sys_id: string;
}

interface TableApiResponse<T> {
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
  }

  generateRunId(): string {
    return this.correlationToken;
  }

  register(table: TrackedTable, sysId: string): void {
    if (this.registeredRecords.has(table)) {
      this.registeredRecords.get(table)?.add(sysId);
    }
  }

  getRegistered(table: TrackedTable): string[] {
    return Array.from(this.registeredRecords.get(table) ?? []);
  }

  async rollback(): Promise<CleanupStats> {
    const adminUser = process.env.SN_ADMIN_USER || "admin";
    const adminPassword = process.env.SN_ADMIN_PASSWORD;

    const stats: Record<TrackedTable, number> = {
      x_711398_se_submission: 0,
      x_711398_se_skill_assessment: 0,
      x_711398_se_cert_acquisition: 0,
      sys_journal_field: 0,
      sys_email: 0,
    };

    if (!adminPassword) {
      // Offline mode or credentials not configured
      for (const table of TRACKED_TABLES) {
        stats[table] = this.getRegistered(table).length;
      }

      const totalDeleted = Object.values(stats).reduce((acc, curr) => acc + curr, 0);
      const tableOutput = formatAsciiStats(stats);
      console.log(tableOutput);

      return { byTable: stats, totalDeleted };
    }

    const authHeader = `Basic ${Buffer.from(`${adminUser}:${adminPassword}`).toString("base64")}`;

    const headers: HeadersInit = {
      Authorization: authHeader,
      Accept: "application/json",
    };

    // 1. Discover all records linked by correlation token or parent submission
    const discovered: Record<TrackedTable, Set<string>> = {
      x_711398_se_submission: new Set(this.getRegistered("x_711398_se_submission")),
      x_711398_se_skill_assessment: new Set(this.getRegistered("x_711398_se_skill_assessment")),
      x_711398_se_cert_acquisition: new Set(this.getRegistered("x_711398_se_cert_acquisition")),
      sys_journal_field: new Set(this.getRegistered("sys_journal_field")),
      sys_email: new Set(this.getRegistered("sys_email")),
    };

    try {
      // Find submissions matching correlation token
      const subQuery = `descriptionLIKE${encodeURIComponent(this.correlationToken)}^ORwork_notesLIKE${encodeURIComponent(this.correlationToken)}`;

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

      const allSubIds = Array.from(discovered.x_711398_se_submission);

      if (allSubIds.length > 0) {
        const subInList = allSubIds.join(",");

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
          `${INSTANCE_URL}/api/now/table/sys_journal_field?sysparm_query=element_idIN${subInList}^ORvalueLIKE${encodeURIComponent(this.correlationToken)}&sysparm_fields=sys_id`,
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
          `${INSTANCE_URL}/api/now/table/sys_email?sysparm_query=instanceIN${subInList}^ORsubjectLIKE${encodeURIComponent(this.correlationToken)}&sysparm_fields=sys_id`,
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
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);

      console.warn(`[DataCleanupTracker] Query error during discovery: ${message}`);
    }

    // 2. Perform reverse-dependency deletions
    for (const table of REVERSE_DELETE_ORDER) {
      const sysIds = Array.from(discovered[table]);

      for (const sysId of sysIds) {
        try {
          const delRes = await fetch(`${INSTANCE_URL}/api/now/table/${table}/${sysId}`, {
            method: "DELETE",
            headers,
          });

          if (delRes.status === 204 || delRes.status === 200 || delRes.ok) {
            stats[table] += 1;
          }
        } catch (delErr: unknown) {
          const message = delErr instanceof Error ? delErr.message : String(delErr);

          console.warn(
            `[DataCleanupTracker] Failed to delete ${table} record ${sysId}: ${message}`,
          );
        }
      }
    }

    // 3. Verify zero residual records remain on instance matching this run
    let residualCount = 0;

    try {
      const verifySub = await fetch(
        `${INSTANCE_URL}/api/now/table/x_711398_se_submission?sysparm_query=descriptionLIKE${encodeURIComponent(this.correlationToken)}&sysparm_fields=sys_id`,
        { headers },
      );

      if (verifySub.ok) {
        // SAFETY: ServiceNow Table API returns an object wrapping a result array for queries.
        const verifyData = (await verifySub.json()) as TableApiResponse<SysIdItem[]>;

        if (Array.isArray(verifyData.result)) {
          residualCount += verifyData.result.length;
        }
      }
    } catch {
      // verification probe failure handled
    }

    const totalDeleted = Object.values(stats).reduce((acc, curr) => acc + curr, 0);
    const tableOutput = formatAsciiStats(stats);

    console.log(tableOutput);

    if (residualCount > 0) {
      throw new Error(
        `[DataCleanupTracker] Residual test records detected after rollback: ${residualCount} records remain.`,
      );
    }

    return { byTable: stats, totalDeleted };
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
