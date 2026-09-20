import assert from "node:assert/strict";
import { test } from "node:test";

import {
  canMutateCertAcquisitions,
  canMutateSubmission,
  COE_GATE_ACTION,
  decideCertAcquisitionInsert,
  decideCoeGate,
  decideInsert,
  decidePmGate,
  decideSubmissionUpdate,
  decideSubmitForReview,
  levelForScore,
  PM_GATE_ACTION,
  parseCertificateId,
  parseLevelId,
  parseMemberId,
  parseSubmissionId,
  scoreFromAssessments,
  SUBMISSION_STATE,
  type CertificateId,
  type LevelId,
  type MemberId,
  type SubmissionId,
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

/**
 * @param raw - A known-good Level id for tests.
 * @returns A parsed LevelId.
 */
function level(raw: string): LevelId {
  const parsed = parseLevelId(raw);

  if (parsed._tag === "err") {
    throw parsed.error;
  }

  return parsed.value;
}

/**
 * @param raw - A known-good Certificate id for tests.
 * @returns A parsed CertificateId.
 */
function certificate(raw: string): CertificateId {
  const parsed = parseCertificateId(raw);

  if (parsed._tag === "err") {
    throw parsed.error;
  }

  return parsed.value;
}

/**
 * @param raw - A known-good Submission id for tests.
 * @returns A parsed SubmissionId.
 */
function submission(raw: string): SubmissionId {
  const parsed = parseSubmissionId(raw);

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

test("Score is the sum of Proficiency Levels", () => {
  const score = scoreFromAssessments([
    { proficiency: 0, skillWeight: 1 },
    { proficiency: 2, skillWeight: 1 },
    { proficiency: 4, skillWeight: 1 },
  ]);

  assert.equal(score, 6);
});

test("Score ignores Skill Weight", () => {
  const score = scoreFromAssessments([
    { proficiency: 2, skillWeight: 10 },
    { proficiency: 3, skillWeight: 100 },
  ]);

  assert.equal(score, 5);
});

test("Level is the seeded row with the greatest min score still at or below Score", () => {
  const elementary = level("level-elementary");
  const preIntermediate = level("level-pre-intermediate");
  const intermediate = level("level-intermediate");
  const upperIntermediate = level("level-upper-intermediate");
  const advanced = level("level-advanced");

  const thresholds = [
    { id: elementary, minScore: 15 },
    { id: preIntermediate, minScore: 25 },
    { id: intermediate, minScore: 30 },
    { id: upperIntermediate, minScore: 45 },
    { id: advanced, minScore: 60 },
  ];

  assert.equal(levelForScore(30, thresholds), intermediate);
  assert.equal(levelForScore(44, thresholds), intermediate);
  assert.equal(levelForScore(45, thresholds), upperIntermediate);
  assert.equal(levelForScore(60, thresholds), advanced);
});

test("Level is empty when Score is below 15", () => {
  const elementary = level("level-elementary");

  assert.equal(levelForScore(0, [{ id: elementary, minScore: 15 }]), undefined);
  assert.equal(levelForScore(14, [{ id: elementary, minScore: 15 }]), undefined);
});

test("the same Certificate cannot be claimed twice on one Submission", () => {
  const claimedCertificate = certificate("certificate-csa");
  const parentSubmission = submission("submission-1");

  const decision = decideCertAcquisitionInsert(
    { submission: parentSubmission, certificate: claimedCertificate },
    [{ submission: parentSubmission, certificate: claimedCertificate }],
  );

  assert.equal(decision._tag, "err");

  if (decision._tag === "err") {
    assert.equal(decision.error._tag, "CertificateAlreadyClaimed");
    assert.equal(decision.error.certificate, claimedCertificate);
  }
});

test("the same Certificate can be claimed on a different Submission", () => {
  const claimedCertificate = certificate("certificate-csa");

  const decision = decideCertAcquisitionInsert(
    {
      submission: submission("submission-2"),
      certificate: claimedCertificate,
    },
    [
      {
        submission: submission("submission-1"),
        certificate: claimedCertificate,
      },
    ],
  );

  assert.equal(decision._tag, "ok");
});

test("a different Certificate can be claimed on the same Submission", () => {
  const parentSubmission = submission("submission-1");

  const decision = decideCertAcquisitionInsert(
    {
      submission: parentSubmission,
      certificate: certificate("certificate-cad"),
    },
    [
      {
        submission: parentSubmission,
        certificate: certificate("certificate-csa"),
      },
    ],
  );

  assert.equal(decision._tag, "ok");
});

test("Cert Acquisitions may be added or removed only while the Submission is Draft", () => {
  assert.equal(canMutateCertAcquisitions(SUBMISSION_STATE.DRAFT), true);
  assert.equal(canMutateCertAcquisitions(SUBMISSION_STATE.SUBMITTED), false);
  assert.equal(canMutateCertAcquisitions(SUBMISSION_STATE.REVIEWED), false);
  assert.equal(canMutateCertAcquisitions(SUBMISSION_STATE.COMPLETED), false);
});

test("Draft with a Description submits to Submitted", () => {
  const assignedTo = member("member-1");

  const decision = decideSubmitForReview(
    SUBMISSION_STATE.DRAFT,
    "Self-assessment Q3",
    assignedTo,
    assignedTo,
  );

  assert.equal(decision._tag, "ok");

  if (decision._tag === "ok") {
    assert.equal(decision.value, SUBMISSION_STATE.SUBMITTED);
  }
});

test("Draft without a Description is refused", () => {
  const assignedTo = member("member-1");
  const decision = decideSubmitForReview(SUBMISSION_STATE.DRAFT, "", assignedTo, assignedTo);

  assert.equal(decision._tag, "err");

  if (decision._tag === "err") {
    assert.equal(decision.error._tag, "DescriptionRequired");
  }
});

test("non-Draft submit is refused", () => {
  const assignedTo = member("member-1");

  const submitted = decideSubmitForReview(
    SUBMISSION_STATE.SUBMITTED,
    "Self-assessment Q3",
    assignedTo,
    assignedTo,
  );

  const reviewed = decideSubmitForReview(
    SUBMISSION_STATE.REVIEWED,
    "Self-assessment Q3",
    assignedTo,
    assignedTo,
  );

  const completed = decideSubmitForReview(
    SUBMISSION_STATE.COMPLETED,
    "Self-assessment Q3",
    assignedTo,
    assignedTo,
  );

  assert.equal(submitted._tag, "err");
  assert.equal(reviewed._tag, "err");
  assert.equal(completed._tag, "err");

  if (submitted._tag === "err") {
    assert.equal(submitted.error._tag, "SubmitNotAllowed");
    assert.equal(submitted.error.state, SUBMISSION_STATE.SUBMITTED);
  }
});

test("submit is allowed when Score is 0", () => {
  const assignedTo = member("member-1");

  const decision = decideSubmitForReview(
    SUBMISSION_STATE.DRAFT,
    "All skills Not Applicable",
    assignedTo,
    assignedTo,
  );

  assert.equal(decision._tag, "ok");
});

test("submit is refused when the actor is not the Assigned to Member", () => {
  const decision = decideSubmitForReview(
    SUBMISSION_STATE.DRAFT,
    "Self-assessment Q3",
    member("member-1"),
    member("member-2"),
  );

  assert.equal(decision._tag, "err");

  if (decision._tag === "err") {
    assert.equal(decision.error._tag, "SubmitNotAssigned");
  }
});

test("a PM approves another Member's Submitted Submission to Reviewed", () => {
  const decision = decidePmGate(
    SUBMISSION_STATE.SUBMITTED,
    member("member-1"),
    member("pm-1"),
    true,
    PM_GATE_ACTION.APPROVE,
  );

  assert.equal(decision._tag, "ok");

  if (decision._tag === "ok") {
    assert.equal(decision.value, SUBMISSION_STATE.REVIEWED);
  }
});

test("a PM rejects another Member's Submitted Submission back to Draft", () => {
  const decision = decidePmGate(
    SUBMISSION_STATE.SUBMITTED,
    member("member-1"),
    member("pm-1"),
    true,
    PM_GATE_ACTION.REJECT,
  );

  assert.equal(decision._tag, "ok");

  if (decision._tag === "ok") {
    assert.equal(decision.value, SUBMISSION_STATE.DRAFT);
  }
});

test("the Assigned to user cannot take the PM gate even when they are a PM", () => {
  const assignedTo = member("pm-1");

  const decision = decidePmGate(
    SUBMISSION_STATE.SUBMITTED,
    assignedTo,
    assignedTo,
    true,
    PM_GATE_ACTION.APPROVE,
  );

  assert.equal(decision._tag, "err");

  if (decision._tag === "err") {
    assert.equal(decision.error._tag, "PmSelfReviewNotAllowed");
  }
});

test("a user outside Skill Evaluation PM cannot take the PM gate", () => {
  const decision = decidePmGate(
    SUBMISSION_STATE.SUBMITTED,
    member("member-1"),
    member("non-pm-1"),
    false,
    PM_GATE_ACTION.APPROVE,
  );

  assert.equal(decision._tag, "err");

  if (decision._tag === "err") {
    assert.equal(decision.error._tag, "PmMembershipRequired");
  }
});

test("the PM gate refuses every state except Submitted", () => {
  const assignedTo = member("member-1");
  const actor = member("pm-1");

  for (const state of [
    SUBMISSION_STATE.DRAFT,
    SUBMISSION_STATE.REVIEWED,
    SUBMISSION_STATE.COMPLETED,
  ]) {
    const decision = decidePmGate(state, assignedTo, actor, true, PM_GATE_ACTION.APPROVE);

    assert.equal(decision._tag, "err");

    if (decision._tag === "err") {
      assert.equal(decision.error._tag, "PmGateNotAvailable");
    }
  }
});

test("a CoE Head completes another Member's Reviewed Submission as Valid", () => {
  const assignedTo = member("member-1");
  const currentId = submission("submission-current");

  const decision = decideCoeGate(
    SUBMISSION_STATE.REVIEWED,
    assignedTo,
    member("coe-1"),
    true,
    COE_GATE_ACTION.APPROVE,
    currentId,
    [{ id: currentId, assignedTo, valid: false }],
  );

  assert.equal(decision._tag, "ok");

  if (decision._tag === "ok") {
    assert.equal(decision.value.state, SUBMISSION_STATE.COMPLETED);
    assert.equal(decision.value.valid, true);
    assert.deepEqual(decision.value.invalidate, []);
  }
});

test("completing clears Valid on every other Valid Submission for that Member", () => {
  const assignedTo = member("member-1");
  const currentId = submission("submission-current");
  const previousValid = submission("submission-previous");
  const otherMemberValid = submission("submission-other-member");

  const decision = decideCoeGate(
    SUBMISSION_STATE.REVIEWED,
    assignedTo,
    member("coe-1"),
    true,
    COE_GATE_ACTION.APPROVE,
    currentId,
    [
      { id: previousValid, assignedTo, valid: true },
      { id: currentId, assignedTo, valid: false },
      { id: otherMemberValid, assignedTo: member("member-2"), valid: true },
      { id: submission("submission-not-valid"), assignedTo, valid: false },
    ],
  );

  assert.equal(decision._tag, "ok");

  if (decision._tag === "ok") {
    assert.deepEqual(decision.value.invalidate, [previousValid]);
  }
});

test("a CoE Head rejects another Member's Reviewed Submission back to Draft", () => {
  const assignedTo = member("member-1");
  const previousValid = submission("submission-previous");

  const decision = decideCoeGate(
    SUBMISSION_STATE.REVIEWED,
    assignedTo,
    member("coe-1"),
    true,
    COE_GATE_ACTION.REJECT,
    submission("submission-current"),
    [{ id: previousValid, assignedTo, valid: true }],
  );

  assert.equal(decision._tag, "ok");

  if (decision._tag === "ok") {
    assert.equal(decision.value.state, SUBMISSION_STATE.DRAFT);
    assert.equal(decision.value.valid, false);
    assert.deepEqual(decision.value.invalidate, []);
  }
});

test("the Assigned to user cannot take the CoE Head gate even when they are a CoE Head", () => {
  const assignedTo = member("coe-1");

  const decision = decideCoeGate(
    SUBMISSION_STATE.REVIEWED,
    assignedTo,
    assignedTo,
    true,
    COE_GATE_ACTION.APPROVE,
    submission("submission-current"),
    [],
  );

  assert.equal(decision._tag, "err");

  if (decision._tag === "err") {
    assert.equal(decision.error._tag, "CoeSelfReviewNotAllowed");
  }
});

test("a user outside Skill Evaluation COE cannot take the CoE Head gate", () => {
  const decision = decideCoeGate(
    SUBMISSION_STATE.REVIEWED,
    member("member-1"),
    member("pm-1"),
    false,
    COE_GATE_ACTION.APPROVE,
    submission("submission-current"),
    [],
  );

  assert.equal(decision._tag, "err");

  if (decision._tag === "err") {
    assert.equal(decision.error._tag, "CoeMembershipRequired");
  }
});

test("the CoE Head gate refuses every state except Reviewed", () => {
  const assignedTo = member("member-1");
  const actor = member("coe-1");
  const currentId = submission("submission-current");

  for (const state of [
    SUBMISSION_STATE.DRAFT,
    SUBMISSION_STATE.SUBMITTED,
    SUBMISSION_STATE.COMPLETED,
  ]) {
    const decision = decideCoeGate(
      state,
      assignedTo,
      actor,
      true,
      COE_GATE_ACTION.APPROVE,
      currentId,
      [],
    );

    assert.equal(decision._tag, "err");

    if (decision._tag === "err") {
      assert.equal(decision.error._tag, "CoeGateNotAvailable");
    }
  }
});

test("a Completed Submission cannot be edited, including Work notes", () => {
  assert.equal(canMutateSubmission(SUBMISSION_STATE.DRAFT), true);
  assert.equal(canMutateSubmission(SUBMISSION_STATE.SUBMITTED), true);
  assert.equal(canMutateSubmission(SUBMISSION_STATE.REVIEWED), true);
  assert.equal(canMutateSubmission(SUBMISSION_STATE.COMPLETED), false);
});

test("decideSubmissionUpdate allows Work notes updates on Submitted and Reviewed", () => {
  const submittedUpdate = decideSubmissionUpdate(
    SUBMISSION_STATE.SUBMITTED,
    false,
    false,
    false,
    false,
  );

  assert.equal(submittedUpdate._tag, "ok");

  const reviewedUpdate = decideSubmissionUpdate(
    SUBMISSION_STATE.REVIEWED,
    false,
    false,
    false,
    false,
  );

  assert.equal(reviewedUpdate._tag, "ok");
});

test("decideSubmissionUpdate refuses Description updates on Submitted and Reviewed", () => {
  const submittedUpdate = decideSubmissionUpdate(
    SUBMISSION_STATE.SUBMITTED,
    true,
    false,
    false,
    false,
  );

  assert.equal(submittedUpdate._tag, "err");

  if (submittedUpdate._tag === "err") {
    assert.equal(submittedUpdate.error._tag, "PostSubmitMutationRefused");
  }

  const reviewedUpdate = decideSubmissionUpdate(
    SUBMISSION_STATE.REVIEWED,
    true,
    false,
    false,
    false,
  );

  assert.equal(reviewedUpdate._tag, "err");

  if (reviewedUpdate._tag === "err") {
    assert.equal(reviewedUpdate.error._tag, "PostSubmitMutationRefused");
  }
});

test("decideSubmissionUpdate refuses all updates on Completed", () => {
  const completedUpdate = decideSubmissionUpdate(
    SUBMISSION_STATE.COMPLETED,
    false,
    false,
    false,
    false,
  );

  assert.equal(completedUpdate._tag, "err");

  if (completedUpdate._tag === "err") {
    assert.equal(completedUpdate.error._tag, "PostSubmitMutationRefused");
  }
});

test("decideSubmissionUpdate refuses direct State and Valid changes", () => {
  const stateChange = decideSubmissionUpdate(SUBMISSION_STATE.DRAFT, false, true, false, false);

  assert.equal(stateChange._tag, "err");

  if (stateChange._tag === "err") {
    assert.equal(stateChange.error._tag, "DirectStateChangeRefused");
  }

  const validChange = decideSubmissionUpdate(SUBMISSION_STATE.DRAFT, false, false, true, false);

  assert.equal(validChange._tag, "err");

  if (validChange._tag === "err") {
    assert.equal(validChange.error._tag, "DirectValidChangeRefused");
  }
});
