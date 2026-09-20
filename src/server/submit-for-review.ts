import { GlideRecord, gs } from "@servicenow/glide";

import { decideSubmitForReview, parseMemberId, parseSubmissionState } from "./submission-policy.ts";

/**
 * Apply Submit for Review when the Member's Draft Submission is allowed to leave Draft.
 *
 * Type: UI Action
 * Target table: x_711398_se_submission
 * ES mode: ES2022 (sys_module)
 * Script context: current
 *
 * @param current - The Submission the Member is submitting.
 */
export function submitForReview(current: GlideRecord): void {
  const state = parseSubmissionState(current.getValue("state"));

  if (state._tag === "err") {
    gs.addErrorMessage(state.error.message);

    return;
  }

  const assignedTo = parseMemberId(current.getValue("assigned_to"));

  if (assignedTo._tag === "err") {
    gs.addErrorMessage(assignedTo.error.message);

    return;
  }

  const actor = parseMemberId(gs.getUserID());

  if (actor._tag === "err") {
    gs.addErrorMessage(actor.error.message);

    return;
  }

  const description = current.getValue("description") ?? "";
  const decision = decideSubmitForReview(state.value, description, assignedTo.value, actor.value);

  if (decision._tag === "err") {
    gs.addErrorMessage(decision.error.message);

    return;
  }

  current.setValue("state", decision.value);
  current.update();
}
