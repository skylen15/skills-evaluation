import { GlideRecord, gs } from "@servicenow/glide";

import { err, ok, type Result } from "./prelude.ts";
import {
  levelForScore,
  parseLevelId,
  parseProficiencyLevel,
  scoreFromAssessments,
  type LevelThresholdSnapshot,
  type SkillAssessmentSnapshot,
} from "./submission-policy.ts";

const SKILL_ASSESSMENT_TABLE = "x_711398_se_skill_assessment";

const LEVEL_TABLE = "x_711398_se_level";

const SUBMISSION_TABLE = "x_711398_se_submission";

const QUERY_BATCH_SIZE = 200;

const LOG_SOURCE = "[Skill Evaluation]";

type ScoreRecalculationError = InvalidStoredScoreData | SubmissionNotFound;

class InvalidStoredScoreData extends Error {
  readonly _tag = "InvalidStoredScoreData";

  readonly detail: string;

  constructor(detail: string) {
    super(detail);
    this.name = "InvalidStoredScoreData";
    this.detail = detail;
  }
}

class SubmissionNotFound extends Error {
  readonly _tag = "SubmissionNotFound";

  readonly submissionId: string;

  constructor(submissionId: string) {
    super(`Submission ${submissionId} was not found`);
    this.name = "SubmissionNotFound";
    this.submissionId = submissionId;
  }
}

/**
 * Recalculate Score and Level on the parent Submission when Skill Assessments change.
 *
 * Type: Business Rule
 * Target table: x_711398_se_skill_assessment
 * ES mode: ES2022 (sys_module)
 * Script context: current, previous
 *
 * @param current - The Skill Assessment that was just saved or deleted.
 * @param _previous - Unused; Score is always recomputed from every remaining sibling row.
 */
export function recalculateSubmissionScore(current: GlideRecord, _previous: GlideRecord): void {
  const result = applySubmissionScoreAndLevel(current.getValue("submission"));

  if (result._tag === "err" && result.error._tag === "InvalidStoredScoreData") {
    gs.warn("{0} Skipping Score update: {1}", LOG_SOURCE, result.error.message);
  }
}

/**
 * Write Score and Level on a Submission from its current Skill Assessments.
 *
 * @param submissionId - Parent Submission sys id.
 * @returns Success after updating, or the expected reason recalculation could not run.
 */
function applySubmissionScoreAndLevel(submissionId: string): Result<void, ScoreRecalculationError> {
  const assessments = loadAssessments(submissionId);

  if (assessments._tag === "err") {
    return assessments;
  }

  const thresholds = loadLevelThresholds();

  if (thresholds._tag === "err") {
    return thresholds;
  }

  const score = scoreFromAssessments(assessments.value);
  const levelId = levelForScore(score, thresholds.value);
  const grSubmission = new GlideRecord(SUBMISSION_TABLE);

  if (!grSubmission.get(submissionId)) {
    return err(new SubmissionNotFound(submissionId));
  }

  grSubmission.setValue("score", String(score));

  if (levelId === undefined) {
    grSubmission.setValue("level", "");
  } else {
    grSubmission.setValue("level", levelId);
  }

  grSubmission.setWorkflow(false);
  grSubmission.update();

  return ok(undefined);
}

/**
 * Load Skill Assessments for one Submission as policy snapshots.
 *
 * GlideRecord is required because Score is the sum of every sibling row, not
 * only the row that triggered this Business Rule.
 *
 * @param submissionId - Parent Submission sys id.
 * @returns Snapshots, or an error when a stored Proficiency Level cannot be parsed.
 */
function loadAssessments(
  submissionId: string,
): Result<ReadonlyArray<SkillAssessmentSnapshot>, InvalidStoredScoreData> {
  const assessments: SkillAssessmentSnapshot[] = [];
  let lastId = "";
  let hasMore = true;

  while (hasMore) {
    const grAssessment = new GlideRecord(SKILL_ASSESSMENT_TABLE);
    grAssessment.addQuery("submission", submissionId);

    if (lastId !== "") {
      grAssessment.addQuery("sys_id", ">", lastId);
    }

    grAssessment.orderBy("sys_id");
    grAssessment.setLimit(QUERY_BATCH_SIZE);
    grAssessment.query();

    let rowsRead = 0;

    while (grAssessment.next()) {
      rowsRead += 1;
      lastId = grAssessment.getUniqueValue();

      const proficiency = parseProficiencyLevel(grAssessment.getValue("proficiency_level"));

      if (proficiency._tag === "err") {
        return err(
          new InvalidStoredScoreData(
            `unknown Proficiency Level ${proficiency.error.raw} on Skill Assessment ${lastId}`,
          ),
        );
      }

      assessments.push({
        proficiency: proficiency.value,
        skillWeight: 0,
      });
    }

    hasMore = rowsRead === QUERY_BATCH_SIZE;
  }

  return ok(assessments);
}

/**
 * Load seeded Level thresholds for banding Score.
 *
 * GlideRecord is required because Level rows live on the Level table and are
 * maintained by se_admin rather than hardcoded in this adapter.
 *
 * @returns Snapshots, or an error when a Level row cannot be parsed.
 */
function loadLevelThresholds(): Result<
  ReadonlyArray<LevelThresholdSnapshot>,
  InvalidStoredScoreData
> {
  const thresholds: LevelThresholdSnapshot[] = [];
  let lastId = "";
  let hasMore = true;

  while (hasMore) {
    const grLevel = new GlideRecord(LEVEL_TABLE);

    if (lastId !== "") {
      grLevel.addQuery("sys_id", ">", lastId);
    }

    grLevel.orderBy("sys_id");
    grLevel.setLimit(QUERY_BATCH_SIZE);
    grLevel.query();

    let rowsRead = 0;

    while (grLevel.next()) {
      rowsRead += 1;
      lastId = grLevel.getUniqueValue();

      const id = parseLevelId(lastId);

      if (id._tag === "err") {
        return err(new InvalidStoredScoreData("Level row has an empty sys id"));
      }

      const minScore = Number.parseInt(grLevel.getValue("min_score"), 10);

      if (Number.isNaN(minScore)) {
        return err(new InvalidStoredScoreData(`Level ${id.value} has a non-numeric min score`));
      }

      thresholds.push({
        id: id.value,
        minScore,
      });
    }

    hasMore = rowsRead === QUERY_BATCH_SIZE;
  }

  return ok(thresholds);
}
