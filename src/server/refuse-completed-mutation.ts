import { GlideRecord, gs } from "@servicenow/glide";

import {
  canMutateSubmission,
  decideSubmissionUpdate,
  parseSubmissionState,
} from "./submission-policy.ts";

/**
 * Enforce post-submit integrity and abort invalid updates to a Submission.
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

    return;
  }

  const descriptionChanged = current.getElement("description").changes();
  const stateChanged = current.getElement("state").changes();
  const validChanged = current.getElement("valid").changes();

  // Allow programmatic transitions from our UI Actions / gate modules
  // If state or valid changed, it must be an authorized lifecycle path
  const decision = decideSubmissionUpdate(
    previousState.value,
    descriptionChanged,
    stateChanged,
    validChanged,
    true, // server updates from authorized actions proceed; direct writes without changes or with description updates are checked
  );

  if (decision._tag === "err") {
    gs.addErrorMessage(decision.error.message);
    current.setAbortAction(true);
  }
}
