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
 * Refused because Description is missing.
 */
export class DescriptionRequired extends Error {
  readonly _tag = "DescriptionRequired";

  constructor() {
    super("Description is required to submit");
    this.name = "DescriptionRequired";
  }
}

/**
 * Refused because the Submission is not Draft.
 */
export class SubmitNotAllowed extends Error {
  readonly _tag = "SubmitNotAllowed";

  /** Lifecycle state that blocked submit. */
  readonly state: SubmissionState;

  /**
   * @param state - Lifecycle state that blocked submit.
   */
  constructor(state: SubmissionState) {
    super("Submit for Review is only available in Draft");
    this.name = "SubmitNotAllowed";
    this.state = state;
  }
}

/**
 * Refused because the actor is not the Assigned to Member.
 */
export class SubmitNotAssigned extends Error {
  readonly _tag = "SubmitNotAssigned";

  constructor() {
    super("Only the Assigned to Member may submit for review");
    this.name = "SubmitNotAssigned";
  }
}

/**
 * Decide whether a Member may submit a Submission for PM review.
 *
 * Score 0 is allowed. Description must be present. Only Draft may submit.
 * Only the Assigned to Member may submit.
 *
 * @param state - Current Submission lifecycle state.
 * @param description - Description from the form.
 * @param assignedTo - Member the Submission is assigned to.
 * @param actor - Caller attempting to submit.
 * @returns Submitted when allowed, or a tagged refusal.
 */
export function decideSubmitForReview(
  state: SubmissionState,
  description: string,
  assignedTo: MemberId,
  actor: MemberId,
): Result<SubmissionState, DescriptionRequired | SubmitNotAllowed | SubmitNotAssigned> {
  if (actor !== assignedTo) {
    return err(new SubmitNotAssigned());
  }

  if (state !== SUBMISSION_STATE.DRAFT) {
    return err(new SubmitNotAllowed(state));
  }

  if (description.trim() === "") {
    return err(new DescriptionRequired());
  }

  return ok(SUBMISSION_STATE.SUBMITTED);
}

/**
 * First-gate actions available to a PM.
 */
export const PM_GATE_ACTION = {
  APPROVE: "approve",
  REJECT: "reject",
} as const;

/**
 * A first-gate PM action.
 */
export type PmGateAction = (typeof PM_GATE_ACTION)[keyof typeof PM_GATE_ACTION];

/**
 * Refused because the actor is not a member of Skill Evaluation PM.
 */
export class PmMembershipRequired extends Error {
  readonly _tag = "PmMembershipRequired";

  constructor() {
    super("Only a member of Skill Evaluation PM may take the PM gate");
    this.name = "PmMembershipRequired";
  }
}

/**
 * Refused because the Submission is not waiting at the PM gate.
 */
export class PmGateNotAvailable extends Error {
  readonly _tag = "PmGateNotAvailable";

  /** Lifecycle state that blocked the PM gate. */
  readonly state: SubmissionState;

  /**
   * @param state - Lifecycle state that blocked the PM gate.
   */
  constructor(state: SubmissionState) {
    super("PM approval and rejection are only available on Submitted");
    this.name = "PmGateNotAvailable";
    this.state = state;
  }
}

/**
 * Refused because a PM cannot review their own Submission.
 */
export class PmSelfReviewNotAllowed extends Error {
  readonly _tag = "PmSelfReviewNotAllowed";

  constructor() {
    super("A PM cannot approve or reject a Submission assigned to themselves");
    this.name = "PmSelfReviewNotAllowed";
  }
}

/**
 * Decide the first approval gate for a Submitted Submission.
 *
 * @param state - Current Submission lifecycle state.
 * @param assignedTo - Member the Submission is assigned to.
 * @param actor - Caller attempting to take the gate.
 * @param isPm - Whether the caller belongs to Skill Evaluation PM.
 * @param action - Approve to Reviewed, or reject back to Draft.
 * @returns The next state when allowed, or a tagged refusal.
 */
export function decidePmGate(
  state: SubmissionState,
  assignedTo: MemberId,
  actor: MemberId,
  isPm: boolean,
  action: PmGateAction,
): Result<SubmissionState, PmMembershipRequired | PmGateNotAvailable | PmSelfReviewNotAllowed> {
  if (!isPm) {
    return err(new PmMembershipRequired());
  }

  if (state !== SUBMISSION_STATE.SUBMITTED) {
    return err(new PmGateNotAvailable(state));
  }

  if (actor === assignedTo) {
    return err(new PmSelfReviewNotAllowed());
  }

  if (action === PM_GATE_ACTION.APPROVE) {
    return ok(SUBMISSION_STATE.REVIEWED);
  }

  return ok(SUBMISSION_STATE.DRAFT);
}

/**
 * Second-gate actions available to a CoE Head.
 */
export const COE_GATE_ACTION = {
  APPROVE: "approve",
  REJECT: "reject",
} as const;

/**
 * A second-gate CoE Head action.
 */
export type CoeGateAction = (typeof COE_GATE_ACTION)[keyof typeof COE_GATE_ACTION];

/**
 * Plain snapshot of Valid on a stored Submission, used when completing.
 */
export type ValidSubmissionSnapshot = {
  /** Sys id of the Submission. */
  readonly id: SubmissionId;

  /** Member the Submission is assigned to. */
  readonly assignedTo: MemberId;

  /** Whether this Submission is currently the official result. */
  readonly valid: boolean;
};

/**
 * Next state, Valid flag, and sibling Valid rows to clear after a CoE gate action.
 */
export type CoeGateOutcome = {
  /** Lifecycle state after the gate action. */
  readonly state: SubmissionState;

  /** Whether this Submission is the official result after the action. */
  readonly valid: boolean;

  /** Other Valid Submissions for this member that must be cleared. */
  readonly invalidate: ReadonlyArray<SubmissionId>;
};

/**
 * Refused because the actor is not a member of Skill Evaluation COE.
 */
export class CoeMembershipRequired extends Error {
  readonly _tag = "CoeMembershipRequired";

  constructor() {
    super("Only a member of Skill Evaluation COE may take the CoE Head gate");
    this.name = "CoeMembershipRequired";
  }
}

/**
 * Refused because the Submission is not waiting at the CoE Head gate.
 */
export class CoeGateNotAvailable extends Error {
  readonly _tag = "CoeGateNotAvailable";

  /** Lifecycle state that blocked the CoE Head gate. */
  readonly state: SubmissionState;

  /**
   * @param state - Lifecycle state that blocked the CoE Head gate.
   */
  constructor(state: SubmissionState) {
    super("CoE Head approval and rejection are only available on Reviewed");
    this.name = "CoeGateNotAvailable";
    this.state = state;
  }
}

/**
 * Refused because a CoE Head cannot review their own Submission.
 */
export class CoeSelfReviewNotAllowed extends Error {
  readonly _tag = "CoeSelfReviewNotAllowed";

  constructor() {
    super("A CoE Head cannot approve or reject a Submission assigned to themselves");
    this.name = "CoeSelfReviewNotAllowed";
  }
}

/**
 * Collect other currently Valid Submissions for the same member.
 *
 * @param assignedTo - Member whose official result is being replaced.
 * @param currentId - Submission being completed; it is never invalidated.
 * @param existing - Stored Valid flags for Submissions in view of this decision.
 * @returns Sys ids of sibling Valid Submissions to clear.
 */
function siblingValidIds(
  assignedTo: MemberId,
  currentId: SubmissionId,
  existing: ReadonlyArray<ValidSubmissionSnapshot>,
): ReadonlyArray<SubmissionId> {
  const invalidate: SubmissionId[] = [];

  for (const snapshot of existing) {
    if (!snapshot.valid) {
      continue;
    }

    if (snapshot.assignedTo !== assignedTo) {
      continue;
    }

    if (snapshot.id === currentId) {
      continue;
    }

    invalidate.push(snapshot.id);
  }

  return invalidate;
}

/**
 * Decide the second approval gate for a Reviewed Submission.
 *
 * Approve completes this Submission as Valid and clears Valid on every other
 * Valid Submission for that Assigned to. Reject returns Draft and leaves Valid false.
 *
 * @param state - Current Submission lifecycle state.
 * @param assignedTo - Member the Submission is assigned to.
 * @param actor - Caller attempting to take the gate.
 * @param isCoe - Whether the caller belongs to Skill Evaluation COE.
 * @param action - Approve to Completed, or reject back to Draft.
 * @param currentId - Sys id of the Submission at the gate.
 * @param existing - Valid flags for Submissions considered when completing.
 * @returns The next state and Valid outcome when allowed, or a tagged refusal.
 */
export function decideCoeGate(
  state: SubmissionState,
  assignedTo: MemberId,
  actor: MemberId,
  isCoe: boolean,
  action: CoeGateAction,
  currentId: SubmissionId,
  existing: ReadonlyArray<ValidSubmissionSnapshot>,
): Result<CoeGateOutcome, CoeMembershipRequired | CoeGateNotAvailable | CoeSelfReviewNotAllowed> {
  if (!isCoe) {
    return err(new CoeMembershipRequired());
  }

  if (state !== SUBMISSION_STATE.REVIEWED) {
    return err(new CoeGateNotAvailable(state));
  }

  if (actor === assignedTo) {
    return err(new CoeSelfReviewNotAllowed());
  }

  if (action === COE_GATE_ACTION.REJECT) {
    return ok({
      state: SUBMISSION_STATE.DRAFT,
      valid: false,
      invalidate: [],
    });
  }

  return ok({
    state: SUBMISSION_STATE.COMPLETED,
    valid: true,
    invalidate: siblingValidIds(assignedTo, currentId, existing),
  });
}

/**
 * Whether a Submission record may still be edited, including Work notes.
 *
 * @param state - Current Submission lifecycle state.
 * @returns False when the Submission is Completed.
 */
export function canMutateSubmission(state: SubmissionState): boolean {
  return state !== SUBMISSION_STATE.COMPLETED;
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
