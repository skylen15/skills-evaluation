import { GlideRecord } from "@servicenow/glide";

const SKILL_TABLE = "x_711398_se_skill";

const SKILL_ASSESSMENT_TABLE = "x_711398_se_skill_assessment";

const PROFICIENCY_NOT_APPLICABLE = "0";

const QUERY_BATCH_SIZE = 200;

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
  let lastSkillId = "";
  let hasMore = true;

  // GlideRecord is required because each Skill sys_id becomes a reference on a new child row.
  while (hasMore) {
    const grSkill = new GlideRecord(SKILL_TABLE);

    if (lastSkillId !== "") {
      grSkill.addQuery("sys_id", ">", lastSkillId);
    }

    grSkill.orderBy("sys_id");
    grSkill.setLimit(QUERY_BATCH_SIZE);
    grSkill.query();

    let rowsRead = 0;

    while (grSkill.next()) {
      rowsRead += 1;
      lastSkillId = grSkill.getUniqueValue();

      const grAssessment = new GlideRecord(SKILL_ASSESSMENT_TABLE);
      grAssessment.initialize();
      grAssessment.setValue("submission", submissionId);
      grAssessment.setValue("skill", lastSkillId);
      grAssessment.setValue("proficiency_level", PROFICIENCY_NOT_APPLICABLE);
      grAssessment.setWorkflow(false);
      grAssessment.insert();
    }

    hasMore = rowsRead === QUERY_BATCH_SIZE;
  }
}
