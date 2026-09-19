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
