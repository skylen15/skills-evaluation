import { GlideRecord, gs } from "@servicenow/glide";

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

const MAX_ROWS = 500;

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
  applySubmissionScoreAndLevel(current.getValue("submission"));
}

/**
 * Write Score and Level on a Submission from its current Skill Assessments.
 *
 * @param submissionId - Parent Submission sys id.
 */
export function applySubmissionScoreAndLevel(submissionId: string): void {
  const assessments = loadAssessments(submissionId);

  if (assessments === undefined) {
    return;
  }

  const thresholds = loadLevelThresholds();

  if (thresholds === undefined) {
    return;
  }

  const score = scoreFromAssessments(assessments);
  const levelId = levelForScore(score, thresholds);
  const grSubmission = new GlideRecord(SUBMISSION_TABLE);

  if (!grSubmission.get(submissionId)) {
    return;
  }

  grSubmission.setValue("score", String(score));

  if (levelId === undefined) {
    grSubmission.setValue("level", "");
  } else {
    grSubmission.setValue("level", levelId);
  }

  grSubmission.setWorkflow(false);
  grSubmission.update();
}

/**
 * Load Skill Assessments for one Submission as policy snapshots.
 *
 * GlideRecord is required because Score is the sum of every sibling row, not
 * only the row that triggered this Business Rule.
 *
 * @param submissionId - Parent Submission sys id.
 * @returns Snapshots, or undefined when a stored Proficiency Level cannot be parsed.
 */
function loadAssessments(submissionId: string): ReadonlyArray<SkillAssessmentSnapshot> | undefined {
  const grAssessment = new GlideRecord(SKILL_ASSESSMENT_TABLE);
  grAssessment.addQuery("submission", submissionId);
  grAssessment.setLimit(MAX_ROWS);
  grAssessment.query();

  const assessments: SkillAssessmentSnapshot[] = [];

  while (grAssessment.next()) {
    const proficiency = parseProficiencyLevel(grAssessment.getValue("proficiency_level"));

    if (proficiency._tag === "err") {
      gs.warn("Skipping Score update: unknown Proficiency Level {0}", proficiency.error.raw);

      return undefined;
    }

    assessments.push({
      proficiency: proficiency.value,
      skillWeight: 0,
    });
  }

  return assessments;
}

/**
 * Load seeded Level thresholds for banding Score.
 *
 * GlideRecord is required because Level rows live on the Level table and are
 * maintained by se_admin rather than hardcoded in this adapter.
 *
 * @returns Snapshots, or undefined when a Level row cannot be parsed.
 */
function loadLevelThresholds(): ReadonlyArray<LevelThresholdSnapshot> | undefined {
  const grLevel = new GlideRecord(LEVEL_TABLE);
  grLevel.setLimit(MAX_ROWS);
  grLevel.query();

  const thresholds: LevelThresholdSnapshot[] = [];

  while (grLevel.next()) {
    const id = parseLevelId(grLevel.getUniqueValue());

    if (id._tag === "err") {
      gs.warn("Skipping Score update: Level row has an empty sys id");

      return undefined;
    }

    const minScore = Number.parseInt(grLevel.getValue("min_score"), 10);

    if (Number.isNaN(minScore)) {
      gs.warn("Skipping Score update: Level {0} has a non-numeric min score", id.value);

      return undefined;
    }

    thresholds.push({
      id: id.value,
      minScore,
    });
  }

  return thresholds;
}
