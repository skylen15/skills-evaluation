import { GlideRecord, gs } from "@servicenow/glide";

import { SKILL_EVALUATION_PM_GROUP_NAME } from "./group-names.ts";
import {
  decidePmGate,
  parseMemberId,
  parseSubmissionState,
  PM_GATE_ACTION,
  type PmGateAction,
} from "./submission-policy.ts";

/**
 * Approve a Submitted Submission at the PM gate.
 *
 * Type: UI Action
 * Target table: x_711398_se_submission
 * ES mode: ES2022 (sys_module)
 * Script context: current
 *
 * @param current - The Submission being approved.
 */
export function approveAtPmGate(current: GlideRecord): void {
  takePmGate(current, PM_GATE_ACTION.APPROVE);
}

/**
 * Reject a Submitted Submission at the PM gate.
 *
 * Type: UI Action
 * Target table: x_711398_se_submission
 * ES mode: ES2022 (sys_module)
 * Script context: current
 *
 * @param current - The Submission being rejected.
 */
export function rejectAtPmGate(current: GlideRecord): void {
  takePmGate(current, PM_GATE_ACTION.REJECT);
}

/**
 * Revalidate and apply one PM gate action on the server.
 *
 * @param current - The Submission at the PM gate.
 * @param gateAction - Approve to Reviewed, or reject back to Draft.
 */
function takePmGate(current: GlideRecord, gateAction: PmGateAction): void {
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

  const decision = decidePmGate(
    state.value,
    assignedTo.value,
    actor.value,
    gs.getUser().isMemberOf(SKILL_EVALUATION_PM_GROUP_NAME),
    gateAction,
  );

  if (decision._tag === "err") {
    gs.addErrorMessage(decision.error.message);

    return;
  }

  current.setValue("state", decision.value);
  current.update();
}
