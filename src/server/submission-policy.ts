import { err, ok, type Result } from "./prelude.ts";

/**
 * Stored Submission state values.
 */
export const SUBMISSION_STATE = {
  DRAFT: "draft",
  SUBMITTED: "submitted",
  REVIEWED: "reviewed",
  COMPLETED: "completed",
} as const;

/**
 * A Submission lifecycle state.
 */
export type SubmissionState = (typeof SUBMISSION_STATE)[keyof typeof SUBMISSION_STATE];

/**
 * Sys id of the member a Submission is assigned to.
 */
export type MemberId = string & { readonly __brand: "MemberId" };

/**
 * Plain snapshot of a stored Submission used by insert policy.
 */
export type SubmissionSnapshot = {
  /** Member the Submission is assigned to. */
  readonly assignedTo: MemberId;
  /** Lifecycle state of the Submission. */
  readonly state: SubmissionState;
};

/**
 * Assigned to was missing or empty.
 */
export class InvalidMemberId extends Error {
  readonly _tag = "InvalidMemberId";

  constructor() {
    super("Assigned to is required");
    this.name = "InvalidMemberId";
  }
}

/**
 * A stored state string is not a known Submission state.
 */
export class InvalidSubmissionState extends Error {
  readonly _tag = "InvalidSubmissionState";

  /** The unrecognised dictionary value. */
  readonly raw: string;

  /**
   * @param raw - The unrecognised state string.
   */
  constructor(raw: string) {
    super("Unknown Submission state");
    this.name = "InvalidSubmissionState";
    this.raw = raw;
  }
}

/**
 * Refused because that member already has a non-Completed Submission.
 */
export class InProgressSubmissionExists extends Error {
  readonly _tag = "InProgressSubmissionExists";

  /** The member who already has an in-progress Submission. */
  readonly assignedTo: MemberId;

  /**
   * @param assignedTo - The member who already has an in-progress Submission.
   */
  constructor(assignedTo: MemberId) {
    super("An in-progress Submission already exists for this member");
    this.name = "InProgressSubmissionExists";
    this.assignedTo = assignedTo;
  }
}

/**
 * Parse a member sys id from an untrusted string.
 *
 * @param raw - The assigned-to value from a form or Glide row.
 * @returns A MemberId, or InvalidMemberId when empty.
 */
export function parseMemberId(raw: string): Result<MemberId, InvalidMemberId> {
  if (raw === "") {
    return err(new InvalidMemberId());
  }

  // SAFETY: empty strings are rejected; remaining values are treated as member sys ids.
  return ok(raw as MemberId);
}

/**
 * Parse a stored Submission state.
 *
 * @param raw - The dictionary value from a Submission row.
 * @returns A SubmissionState, or InvalidSubmissionState when unknown.
 */
export function parseSubmissionState(raw: string): Result<SubmissionState, InvalidSubmissionState> {
  if (raw === SUBMISSION_STATE.DRAFT) {
    return ok(SUBMISSION_STATE.DRAFT);
  }

  if (raw === SUBMISSION_STATE.SUBMITTED) {
    return ok(SUBMISSION_STATE.SUBMITTED);
  }

  if (raw === SUBMISSION_STATE.REVIEWED) {
    return ok(SUBMISSION_STATE.REVIEWED);
  }

  if (raw === SUBMISSION_STATE.COMPLETED) {
    return ok(SUBMISSION_STATE.COMPLETED);
  }

  return err(new InvalidSubmissionState(raw));
}

/**
 * Whether a Submission is still in progress (not Completed).
 *
 * @param state - The Submission state to test.
 * @returns True when another insert for that member must be refused.
 */
export function isInProgress(state: SubmissionState): boolean {
  return state !== SUBMISSION_STATE.COMPLETED;
}

/**
 * Decide whether a new Submission may be inserted for an assigned member.
 *
 * @param assignedTo - The member the new Submission would be assigned to.
 * @param existing - Snapshots of Submissions already stored.
 * @returns Ok when insert is allowed, or InProgressSubmissionExists when refused.
 */
export function decideInsert(
  assignedTo: MemberId,
  existing: ReadonlyArray<SubmissionSnapshot>,
): Result<void, InProgressSubmissionExists> {
  for (const submission of existing) {
    if (submission.assignedTo === assignedTo && isInProgress(submission.state)) {
      return err(new InProgressSubmissionExists(assignedTo));
    }
  }

  return ok(undefined);
}

/**
 * How strongly a member claims a Skill (0 Not Applicable through 4 Guru).
 */
export type ProficiencyLevel = 0 | 1 | 2 | 3 | 4;

/**
 * Plain snapshot of a Skill Assessment used by Score policy.
 */
export type SkillAssessmentSnapshot = {
  /** Claimed Proficiency Level for one Skill. */
  readonly proficiency: ProficiencyLevel;

  /** Policy-only input retained to prove Score ignores Weight; adapters need not load it. */
  readonly skillWeight: number;
};

/**
 * Sum Proficiency Levels on a Submission. Skill Weight is not part of the sum.
 *
 * @param assessments - Snapshots of every Skill Assessment on the Submission.
 * @returns The Score as the unweighted sum of Proficiency Levels.
 */
export function scoreFromAssessments(assessments: ReadonlyArray<SkillAssessmentSnapshot>): number {
  let score = 0;

  for (const assessment of assessments) {
    score += assessment.proficiency;
  }

  return score;
}

/**
 * Sys id of a Level threshold row.
 */
export type LevelId = string & { readonly __brand: "LevelId" };

/**
 * Level sys id was missing or empty.
 */
export class InvalidLevelId extends Error {
  readonly _tag = "InvalidLevelId";

  constructor() {
    super("Level is required");
    this.name = "InvalidLevelId";
  }
}

/**
 * Parse a Level sys id from an untrusted string.
 *
 * @param raw - The sys id from a Level row.
 * @returns A LevelId, or InvalidLevelId when empty.
 */
export function parseLevelId(raw: string): Result<LevelId, InvalidLevelId> {
  if (raw === "") {
    return err(new InvalidLevelId());
  }

  // SAFETY: empty strings are rejected; remaining values are treated as Level sys ids.
  return ok(raw as LevelId);
}

/**
 * Plain snapshot of a Level threshold used to band a Score.
 */
export type LevelThresholdSnapshot = {
  /** Sys id of the Level row. */
  readonly id: LevelId;

  /** Lowest Score that qualifies for this Level. */
  readonly minScore: number;
};

/**
 * Choose the Level whose min score is the highest value still less than or equal to Score.
 *
 * @param score - The Submission Score.
 * @param thresholds - Seeded Level rows.
 * @returns The matching Level id, or undefined when Score is below every min score.
 */
export function levelForScore(
  score: number,
  thresholds: ReadonlyArray<LevelThresholdSnapshot>,
): LevelId | undefined {
  let chosen: LevelThresholdSnapshot | undefined;

  for (const threshold of thresholds) {
    if (threshold.minScore > score) {
      continue;
    }

    if (chosen === undefined || threshold.minScore > chosen.minScore) {
      chosen = threshold;
    }
  }

  return chosen?.id;
}

/**
 * Sys id of a Submission row.
 */
export type SubmissionId = string & { readonly __brand: "SubmissionId" };

/**
 * Submission sys id was missing or empty.
 */
export class InvalidSubmissionId extends Error {
  readonly _tag = "InvalidSubmissionId";

  constructor() {
    super("Submission is required");
    this.name = "InvalidSubmissionId";
  }
}

/**
 * Parse a Submission sys id from an untrusted string.
 *
 * @param raw - The Submission reference value from a child row.
 * @returns A SubmissionId, or InvalidSubmissionId when empty.
 */
export function parseSubmissionId(raw: string): Result<SubmissionId, InvalidSubmissionId> {
  if (raw === "") {
    return err(new InvalidSubmissionId());
  }

  // SAFETY: empty strings are rejected; remaining values are treated as Submission sys ids.
  return ok(raw as SubmissionId);
}

/**
 * Sys id of a Certificate reference row.
 */
export type CertificateId = string & { readonly __brand: "CertificateId" };

/**
 * Certificate sys id was missing or empty.
 */
export class InvalidCertificateId extends Error {
  readonly _tag = "InvalidCertificateId";

  constructor() {
    super("Certificate is required");
    this.name = "InvalidCertificateId";
  }
}

/**
 * Parse a Certificate sys id from an untrusted string.
 *
 * @param raw - The Certificate reference value from a Cert Acquisition.
 * @returns A CertificateId, or InvalidCertificateId when empty.
 */
export function parseCertificateId(raw: string): Result<CertificateId, InvalidCertificateId> {
  if (raw === "") {
    return err(new InvalidCertificateId());
  }

  // SAFETY: empty strings are rejected; remaining values are treated as Certificate sys ids.
  return ok(raw as CertificateId);
}

/**
 * Plain snapshot of a Cert Acquisition used by uniqueness policy.
 */
export type CertAcquisitionSnapshot = {
  /** Submission on which the Certificate is claimed. */
  readonly submission: SubmissionId;

  /** Certificate claimed on the Submission. */
  readonly certificate: CertificateId;
};

/**
 * Refused because the Certificate is already claimed on this Submission.
 */
export class CertificateAlreadyClaimed extends Error {
  readonly _tag = "CertificateAlreadyClaimed";

  /** Certificate that is already claimed. */
  readonly certificate: CertificateId;

  /**
   * @param certificate - Certificate that is already claimed.
   */
  constructor(certificate: CertificateId) {
    super("This Certificate is already claimed on the Submission");
    this.name = "CertificateAlreadyClaimed";
    this.certificate = certificate;
  }
}

/**
 * Decide whether a Certificate may be claimed on a Submission.
 *
 * @param candidate - Submission and Certificate on the new Cert Acquisition.
 * @param existing - Existing Cert Acquisitions.
 * @returns Ok when unique, or CertificateAlreadyClaimed when already present.
 */
export function decideCertAcquisitionInsert(
  candidate: CertAcquisitionSnapshot,
  existing: ReadonlyArray<CertAcquisitionSnapshot>,
): Result<void, CertificateAlreadyClaimed> {
  for (const acquisition of existing) {
    if (
      acquisition.submission === candidate.submission &&
      acquisition.certificate === candidate.certificate
    ) {
      return err(new CertificateAlreadyClaimed(candidate.certificate));
    }
  }

  return ok(undefined);
}

/**
 * Whether Cert Acquisitions may be added or removed for a Submission.
 *
 * @param state - Parent Submission lifecycle state.
 * @returns True only while the Submission is Draft.
 */
export function canMutateCertAcquisitions(state: SubmissionState): boolean {
  return state === SUBMISSION_STATE.DRAFT;
}

/**
 * Proficiency Level was not one of 0–4.
 */
export class InvalidProficiencyLevel extends Error {
  readonly _tag = "InvalidProficiencyLevel";

  /** The unrecognised dictionary value. */
  readonly raw: string;

  /**
   * @param raw - The unrecognised proficiency string.
   */
  constructor(raw: string) {
    super("Unknown Proficiency Level");
    this.name = "InvalidProficiencyLevel";
    this.raw = raw;
  }
}

/**
 * Parse a stored Proficiency Level.
 *
 * @param raw - The choice value from a Skill Assessment row.
 * @returns A ProficiencyLevel, or InvalidProficiencyLevel when unknown.
 */
export function parseProficiencyLevel(
  raw: string,
): Result<ProficiencyLevel, InvalidProficiencyLevel> {
  if (raw === "0") {
    return ok(0);
  }

  if (raw === "1") {
    return ok(1);
  }

  if (raw === "2") {
    return ok(2);
  }

  if (raw === "3") {
    return ok(3);
  }

  if (raw === "4") {
    return ok(4);
  }

  return err(new InvalidProficiencyLevel(raw));
}
