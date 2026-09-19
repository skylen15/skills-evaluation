import { GlideRecord, gs } from "@servicenow/glide";

import { SKILL_EVALUATION_COE_GROUP_NAME } from "./group-names.ts";
import {
  COE_GATE_ACTION,
  decideCoeGate,
  parseMemberId,
  parseSubmissionId,
  parseSubmissionState,
  type CoeGateAction,
  type MemberId,
  type SubmissionId,
  type ValidSubmissionSnapshot,
} from "./submission-policy.ts";

const SUBMISSION_TABLE = "x_711398_se_submission";

const QUERY_BATCH_SIZE = 200;

/**
 * Approve a Reviewed Submission at the CoE Head gate.
 *
 * Type: UI Action
 * Target table: x_711398_se_submission
 * ES mode: ES2022 (sys_module)
 * Script context: current
 *
 * @param current - The Submission being completed.
 */
export function approveAtCoeGate(current: GlideRecord): void {
  takeCoeGate(current, COE_GATE_ACTION.APPROVE);
}

/**
 * Reject a Reviewed Submission at the CoE Head gate.
 *
 * Type: UI Action
 * Target table: x_711398_se_submission
 * ES mode: ES2022 (sys_module)
 * Script context: current
 *
 * @param current - The Submission being returned to Draft.
 */
export function rejectAtCoeGate(current: GlideRecord): void {
  takeCoeGate(current, COE_GATE_ACTION.REJECT);
}

/**
 * Revalidate and apply one CoE Head gate action on the server.
 *
 * @param current - The Submission at the CoE Head gate.
 * @param gateAction - Approve to Completed, or reject back to Draft.
 */
function takeCoeGate(current: GlideRecord, gateAction: CoeGateAction): void {
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

  const currentId = parseSubmissionId(current.getUniqueValue());

  if (currentId._tag === "err") {
    gs.addErrorMessage(currentId.error.message);

    return;
  }

  const decision = decideCoeGate(
    state.value,
    assignedTo.value,
    actor.value,
    gs.getUser().isMemberOf(SKILL_EVALUATION_COE_GROUP_NAME),
    gateAction,
    currentId.value,
    loadValidSubmissions(assignedTo.value),
  );

  if (decision._tag === "err") {
    gs.addErrorMessage(decision.error.message);

    return;
  }

  current.setValue("state", decision.value.state);
  current.setValue("valid", decision.value.valid ? "true" : "false");
  current.update();

  clearSiblingValid(decision.value.invalidate);
}

/**
 * Load currently Valid Submissions for one member so complete can clear siblings.
 *
 * GlideRecord is required because Completing must see other rows for that Assigned to.
 * Each query is bounded; paging continues until every Valid row for that member is read.
 *
 * @param assignedTo - Member whose official result may be replaced.
 * @returns Snapshots of that member's currently Valid Submissions.
 */
function loadValidSubmissions(assignedTo: MemberId): ReadonlyArray<ValidSubmissionSnapshot> {
  const existing: ValidSubmissionSnapshot[] = [];
  let lastId = "";
  let hasMore = true;

  while (hasMore) {
    const grSubmission = new GlideRecord(SUBMISSION_TABLE);
    grSubmission.addQuery("assigned_to", assignedTo);
    grSubmission.addQuery("valid", true);

    if (lastId !== "") {
      grSubmission.addQuery("sys_id", ">", lastId);
    }

    grSubmission.orderBy("sys_id");
    grSubmission.setLimit(QUERY_BATCH_SIZE);
    grSubmission.query();

    let rowsRead = 0;

    while (grSubmission.next()) {
      rowsRead += 1;
      lastId = grSubmission.getUniqueValue();
      const id = parseSubmissionId(lastId);

      if (id._tag === "err") {
        continue;
      }

      existing.push({
        id: id.value,
        assignedTo,
        valid: true,
      });
    }

    hasMore = rowsRead === QUERY_BATCH_SIZE;
  }

  return existing;
}

/**
 * Clear Valid on sibling Submissions named by policy.
 *
 * @param invalidate - Sys ids of other Valid Submissions for the same member.
 */
function clearSiblingValid(invalidate: ReadonlyArray<SubmissionId>): void {
  let offset = 0;

  while (offset < invalidate.length) {
    const end = Math.min(offset + QUERY_BATCH_SIZE, invalidate.length);
    const batch: SubmissionId[] = [];

    for (let index = offset; index < end; index += 1) {
      const submissionId = invalidate[index];

      if (submissionId === undefined) {
        continue;
      }

      batch.push(submissionId);
    }

    const grSibling = new GlideRecord(SUBMISSION_TABLE);
    grSibling.addQuery("sys_id", "IN", batch.join(","));
    grSibling.setLimit(batch.length);
    grSibling.query();

    while (grSibling.next()) {
      grSibling.setValue("valid", "false");
      // Skip the Completed-immutability rule; clearing Valid is a complete-gate side effect.
      grSibling.setWorkflow(false);
      grSibling.update();
    }

    offset = end;
  }
}
