import { GlideRecord, gs } from "@servicenow/glide";

import {
  decideInsert,
  parseMemberId,
  parseSubmissionState,
  SUBMISSION_STATE,
  type MemberId,
  type SubmissionSnapshot,
} from "./submission-policy.ts";

const SUBMISSION_TABLE = "x_711398_se_submission";

const INITIAL_SCORE = "0";

const INITIAL_VALID = "false";

/**
 * Initialize a Draft Submission for the caller and abort when they already have an in-progress Submission.
 *
 * Type: Business Rule
 * Target table: x_711398_se_submission
 * ES mode: ES2022 (sys_module)
 * Script context: current, previous
 *
 * @param current - The Submission being inserted.
 * @param _previous - Unused; insert has no previous row.
 */
export function refuseInProgressInsert(current: GlideRecord, _previous: GlideRecord): void {
  const callerId = gs.getUserID();

  current.setValue("assigned_to", callerId);
  current.setValue("opened_by", callerId);
  current.setValue("state", SUBMISSION_STATE.DRAFT);
  current.setValue("score", INITIAL_SCORE);
  current.setValue("level", "");
  current.setValue("valid", INITIAL_VALID);

  const assignedTo = parseMemberId(callerId);

  if (assignedTo._tag === "err") {
    gs.addErrorMessage(assignedTo.error.message);
    current.setAbortAction(true);

    return;
  }

  const decision = decideInsert(assignedTo.value, loadExisting(assignedTo.value));

  if (decision._tag === "err") {
    gs.addErrorMessage(decision.error.message);
    current.setAbortAction(true);
  }
}

/**
 * Load in-progress Submissions for one member so insert policy can decide.
 *
 * GlideRecord is required because this Business Rule must read sibling rows
 * on the same table before the insert commits. The query is limited to
 * non-Completed rows for that member (at most one is expected).
 *
 * @param assignedTo - Member sys id on the new Submission.
 * @returns Snapshots of that member's in-progress Submissions.
 */
function loadExisting(assignedTo: MemberId): ReadonlyArray<SubmissionSnapshot> {
  const grSubmission = new GlideRecord(SUBMISSION_TABLE);
  grSubmission.addQuery("assigned_to", assignedTo);
  grSubmission.addQuery("state", "!=", SUBMISSION_STATE.COMPLETED);
  grSubmission.setLimit(1);
  grSubmission.query();

  const existing: SubmissionSnapshot[] = [];

  while (grSubmission.next()) {
    existing.push({
      assignedTo,
      state: snapshotState(grSubmission.getValue("state")),
    });
  }

  return existing;
}

/**
 * Map a stored state string onto a policy snapshot. Unknown values count as in-progress.
 *
 * @param rawState - Dictionary value from the Submission row.
 * @returns A known Submission state.
 */
function snapshotState(rawState: string): SubmissionSnapshot["state"] {
  const parsed = parseSubmissionState(rawState);

  if (parsed._tag === "ok") {
    return parsed.value;
  }

  return SUBMISSION_STATE.DRAFT;
}
