import { GlideRecord, gs } from "@servicenow/glide";

import { PLATFORM_ADMIN_ROLE, SE_ADMIN_ROLE } from "../common/access-roles.ts";

/**
 * Restrict Member list queries to Cert Acquisitions on their own Submissions.
 *
 * Type: Business Rule
 * Target table: x_711398_se_cert_acquisition
 * ES mode: ES2022 (sys_module)
 * Script context: current, previous
 *
 * @param current - The query GlideRecord being refined.
 * @param _previous - Unused for query rules.
 */
export function restrictMemberCertAcquisitionQuery(
  current: GlideRecord,
  _previous: GlideRecord,
): void {
  if (gs.hasRole(PLATFORM_ADMIN_ROLE) || gs.hasRole(SE_ADMIN_ROLE)) {
    return;
  }

  current.addQuery("submission.assigned_to", gs.getUserID());
}
