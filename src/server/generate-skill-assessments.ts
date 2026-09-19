import { GlideRecord, gs } from "@servicenow/glide";

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
    grAssessment.insert();
  }
}

/**
 * Refuse a Skill Assessment insert once the Submission already has one row per Skill.
 *
 * Type: Business Rule
 * Target table: x_711398_se_skill_assessment
 * ES mode: ES2022 (sys_module)
 * Script context: current, previous
 *
 * @param current - The Skill Assessment being inserted.
 * @param _previous - Unused; insert has no previous row.
 */
export function refuseExtraSkillAssessmentInsert(
  current: GlideRecord,
  _previous: GlideRecord,
): void {
  const skillCount = countRows(SKILL_TABLE);
  const existingCount = countAssessmentsForSubmission(current.getValue("submission"));

  if (existingCount >= skillCount) {
    gs.addErrorMessage("Skill Assessments cannot be added");
    current.setAbortAction(true);
  }
}

/**
 * Count rows on a table, bounded so the query cannot scan without limit.
 *
 * GlideRecord is required because this Business Rule must know how many Skills
 * exist before deciding whether another Skill Assessment may be inserted.
 *
 * @param table - Table to count.
 * @returns How many rows were returned within the bound.
 */
function countRows(table: string): number {
  const grTable = new GlideRecord(table);
  grTable.setLimit(MAX_SKILLS);
  grTable.query();

  let count = 0;

  while (grTable.next()) {
    count += 1;
  }

  return count;
}

/**
 * Count Skill Assessments already stored for one Submission.
 *
 * GlideRecord is required because this Business Rule must count sibling rows
 * on the same table before the insert commits.
 *
 * @param submissionId - Submission sys id on the new Skill Assessment.
 * @returns How many Skill Assessments already exist for that Submission.
 */
function countAssessmentsForSubmission(submissionId: string): number {
  const grAssessment = new GlideRecord(SKILL_ASSESSMENT_TABLE);
  grAssessment.addQuery("submission", submissionId);
  grAssessment.setLimit(MAX_SKILLS);
  grAssessment.query();

  let count = 0;

  while (grAssessment.next()) {
    count += 1;
  }

  return count;
}
