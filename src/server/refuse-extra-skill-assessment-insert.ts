import { GlideRecord, gs } from "@servicenow/glide";

/**
 * Refuse every Skill Assessment insert that is not generated with workflow off.
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
  gs.addErrorMessage("Skill Assessments cannot be added");
  current.setAbortAction(true);
}
