import type { FullConfig } from "@playwright/test";

import { DataCleanupTracker } from "./fixtures/cleanup.ts";

export default async function globalTeardown(_config: FullConfig): Promise<void> {
  console.log("[ServiceNow E2E] Executing global teardown sweep...");
  const tracker = new DataCleanupTracker("global-teardown");
  const stats = await tracker.rollback();
  console.log(
    `[ServiceNow E2E] Global teardown complete. Total swept records: ${stats.totalDeleted}`,
  );
}
