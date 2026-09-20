import { GlideRecord, gs } from "@servicenow/glide";

import { SUBMISSION_EVENTS } from "./submission-policy.ts";

export { SUBMISSION_EVENTS };

/**
 * Queue appropriate event on insert of a Submission.
 */
export function queueSubmissionInsertEvent(current: GlideRecord, _previous: GlideRecord): void {
  gs.eventQueue(SUBMISSION_EVENTS.CREATED, current, current.getValue("assigned_to"), "");
}

/**
 * Queue appropriate lifecycle transition event on update of a Submission.
 */
export function queueSubmissionUpdateEvent(current: GlideRecord, previous: GlideRecord): void {
  const fromState = previous.getValue("state");
  const toState = current.getValue("state");

  if (fromState === toState) {
    return;
  }

  if (fromState === "draft" && toState === "submitted") {
    gs.eventQueue(SUBMISSION_EVENTS.SUBMITTED, current, "", "");
  } else if (fromState === "submitted" && toState === "reviewed") {
    gs.eventQueue(SUBMISSION_EVENTS.PM_APPROVED, current, "", "");
  } else if (fromState === "submitted" && toState === "draft") {
    gs.eventQueue(SUBMISSION_EVENTS.PM_REJECTED, current, current.getValue("assigned_to"), "");
  } else if (fromState === "reviewed" && toState === "draft") {
    gs.eventQueue(SUBMISSION_EVENTS.COE_REJECTED, current, current.getValue("assigned_to"), "");
  }
}
