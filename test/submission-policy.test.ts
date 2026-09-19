import assert from "node:assert/strict";
import { test } from "node:test";

import {
  canMutateCertAcquisitions,
  decideCertAcquisitionInsert,
  decideInsert,
  levelForScore,
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
