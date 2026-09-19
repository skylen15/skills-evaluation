import assert from "node:assert/strict";
import { test } from "node:test";

import {
  decideInsert,
  parseMemberId,
  SUBMISSION_STATE,
  type MemberId,
} from "../src/server/submission-policy.ts";

/**
 * @param raw - A known-good member id for tests.
 * @returns A parsed MemberId.
 */
function member(raw: string): MemberId {
  const parsed = parseMemberId(raw);

  if (parsed._tag === "err") {
    throw parsed.error;
  }

  return parsed.value;
}

test("insert is refused when that member already has a Draft Submission", () => {
  const assignedTo = member("member-1");
  const decision = decideInsert(assignedTo, [{ assignedTo, state: SUBMISSION_STATE.DRAFT }]);

  assert.equal(decision._tag, "err");

  if (decision._tag === "err") {
    assert.equal(decision.error._tag, "InProgressSubmissionExists");
    assert.equal(decision.error.assignedTo, assignedTo);
  }
});

test("insert is refused when that member already has a Submitted Submission", () => {
  const assignedTo = member("member-1");

  const decision = decideInsert(assignedTo, [{ assignedTo, state: SUBMISSION_STATE.SUBMITTED }]);

  assert.equal(decision._tag, "err");
});

test("insert is refused when that member already has a Reviewed Submission", () => {
  const assignedTo = member("member-1");
  const decision = decideInsert(assignedTo, [{ assignedTo, state: SUBMISSION_STATE.REVIEWED }]);

  assert.equal(decision._tag, "err");
});

test("insert is allowed when that member has no Submissions", () => {
  const decision = decideInsert(member("member-1"), []);

  assert.equal(decision._tag, "ok");
});

test("insert is allowed when that member has only Completed Submissions", () => {
  const assignedTo = member("member-1");

  const decision = decideInsert(assignedTo, [{ assignedTo, state: SUBMISSION_STATE.COMPLETED }]);

  assert.equal(decision._tag, "ok");
});

test("insert is allowed when only another member has an in-progress Submission", () => {
  const decision = decideInsert(member("member-1"), [
    { assignedTo: member("member-2"), state: SUBMISSION_STATE.DRAFT },
  ]);

  assert.equal(decision._tag, "ok");
});
