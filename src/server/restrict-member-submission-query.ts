import { GlideRecord, gs } from "@servicenow/glide";

import { PLATFORM_ADMIN_ROLE, SE_ADMIN_ROLE } from "./access-roles.ts";

/**
 * Restrict Member list queries to Submissions assigned to the caller.
 *
 * Type: Business Rule
 * Target table: x_711398_se_submission
 * ES mode: ES2022 (sys_module)
 * Script context: current, previous
 *
 * @param current - The query GlideRecord being refined.
 * @param _previous - Unused for query rules.
 */
export function restrictMemberSubmissionQuery(current: GlideRecord, _previous: GlideRecord): void {
  if (gs.hasRole(PLATFORM_ADMIN_ROLE) || gs.hasRole(SE_ADMIN_ROLE)) {
    return;
  }

  current.addQuery("assigned_to", gs.getUserID());
}
