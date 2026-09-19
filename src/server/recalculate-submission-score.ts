import { GlideRecord } from "@servicenow/glide";

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
 * @param current - The Skill Assessment that was just saved.
 * @param _previous - Unused; Score is always recomputed from every sibling row.
 */
export function recalculateSubmissionScore(current: GlideRecord, _previous: GlideRecord): void {
  const submissionId = current.getValue("submission");
  const score = scoreFromAssessments(loadAssessments(submissionId));
  const levelId = levelForScore(score, loadLevelThresholds());
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
 * @returns Snapshots. Skill Weight is unused; adapters pass 0.
 */
function loadAssessments(submissionId: string): ReadonlyArray<SkillAssessmentSnapshot> {
  const grAssessment = new GlideRecord(SKILL_ASSESSMENT_TABLE);
  grAssessment.addQuery("submission", submissionId);
  grAssessment.setLimit(MAX_ROWS);
  grAssessment.query();

  const assessments: SkillAssessmentSnapshot[] = [];

  while (grAssessment.next()) {
    const proficiency = parseProficiencyLevel(grAssessment.getValue("proficiency_level"));
    const proficiencyValue = proficiency._tag === "ok" ? proficiency.value : 0;

    assessments.push({
      proficiency: proficiencyValue,
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
 * @returns Snapshots of every Level min-score row.
 */
function loadLevelThresholds(): ReadonlyArray<LevelThresholdSnapshot> {
  const grLevel = new GlideRecord(LEVEL_TABLE);
  grLevel.setLimit(MAX_ROWS);
  grLevel.query();

  const thresholds: LevelThresholdSnapshot[] = [];

  while (grLevel.next()) {
    const id = parseLevelId(grLevel.getUniqueValue());

    if (id._tag === "err") {
      continue;
    }

    const minScore = Number.parseInt(grLevel.getValue("min_score"), 10);

    if (Number.isNaN(minScore)) {
      continue;
    }

    thresholds.push({
      id: id.value,
      minScore,
    });
  }

  return thresholds;
}
