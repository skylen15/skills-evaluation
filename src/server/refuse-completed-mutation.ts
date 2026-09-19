import { GlideRecord, gs } from "@servicenow/glide";

import { canMutateSubmission, parseSubmissionState } from "./submission-policy.ts";

/**
 * Abort updates to a Submission that is already Completed.
 *
 * Type: Business Rule
 * Target table: x_711398_se_submission
 * ES mode: ES2022 (sys_module)
 * Script context: current, previous
 *
 * @param current - The Submission being updated.
 * @param previous - The stored row before this update.
 */
export function refuseCompletedMutation(current: GlideRecord, previous: GlideRecord): void {
  const previousState = parseSubmissionState(previous.getValue("state"));

  if (previousState._tag === "err") {
    gs.addErrorMessage(previousState.error.message);
    current.setAbortAction(true);

    return;
  }

  if (!canMutateSubmission(previousState.value)) {
    gs.addErrorMessage("A Completed Submission cannot be edited");
    current.setAbortAction(true);
  }
}
