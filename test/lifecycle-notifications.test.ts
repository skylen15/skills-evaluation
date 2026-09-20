import assert from "node:assert/strict";
import { test } from "node:test";

import { SUBMISSION_EVENTS } from "../src/server/submission-policy.ts";

test("lifecycle events map to valid event names", () => {
  assert.equal(SUBMISSION_EVENTS.CREATED, "x_711398_se.submission.created");
  assert.equal(SUBMISSION_EVENTS.SUBMITTED, "x_711398_se.submission.submitted");
  assert.equal(SUBMISSION_EVENTS.PM_APPROVED, "x_711398_se.submission.pm_approved");
  assert.equal(SUBMISSION_EVENTS.PM_REJECTED, "x_711398_se.submission.pm_rejected");
  assert.equal(SUBMISSION_EVENTS.COE_REJECTED, "x_711398_se.submission.coe_rejected");
});
