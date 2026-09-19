import { GlideRecord } from "@servicenow/glide";

import { applySubmissionScoreAndLevel } from "./recalculate-submission-score.ts";

const SKILL_TABLE = "x_711398_se_skill";

const SKILL_ASSESSMENT_TABLE = "x_711398_se_skill_assessment";

const PROFICIENCY_NOT_APPLICABLE = "0";

const MAX_SKILLS = 500;

/**
 * Create one Skill Assessment per Skill when a Submission is first inserted.
 *
 * Type: Business Rule
 * Target table: x_711398_se_submission
 * ES mode: ES2022 (sys_module)
 * Script context: current, previous
 *
 * @param current - The Submission that was just inserted.
 * @param _previous - Unused; insert has no previous row.
 */
export function generateSkillAssessments(current: GlideRecord, _previous: GlideRecord): void {
  const submissionId = current.getUniqueValue();
  const grSkill = new GlideRecord(SKILL_TABLE);
  grSkill.setLimit(MAX_SKILLS);
  grSkill.query();

  while (grSkill.next()) {
    const grAssessment = new GlideRecord(SKILL_ASSESSMENT_TABLE);
    grAssessment.initialize();
    grAssessment.setValue("submission", submissionId);
    grAssessment.setValue("skill", grSkill.getUniqueValue());
    grAssessment.setValue("proficiency_level", PROFICIENCY_NOT_APPLICABLE);
    grAssessment.setWorkflow(false);
    grAssessment.insert();
  }

  applySubmissionScoreAndLevel(submissionId);
}
