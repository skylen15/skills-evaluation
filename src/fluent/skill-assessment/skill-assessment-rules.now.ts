import { BusinessRule } from "@servicenow/sdk/core";

import { refuseExtraSkillAssessmentInsert } from "../../server/skill-assessment/refuse-extra-skill-assessment-insert.js";
import { restrictMemberSkillAssessmentQuery } from "../../server/skill-assessment/restrict-member-skill-assessment-query.js";
import { recalculateSubmissionScore } from "../../server/submission/recalculate-submission-score.js";

BusinessRule({
  $id: Now.ID["refuse-extra-skill-assessment-insert"],
  name: "Refuse extra Skill Assessment insert",
  table: "x_711398_se_skill_assessment",
  when: "before",
  action: ["insert"],
  order: 100,
  active: true,
  script: refuseExtraSkillAssessmentInsert,
  description: "Refuse adding a Skill Assessment; the generated set is complete",
});

BusinessRule({
  $id: Now.ID["recalculate-submission-score"],
  name: "Recalculate Submission Score",
  table: "x_711398_se_skill_assessment",
  when: "after",
  action: ["insert", "update", "delete"],
  order: 100,
  active: true,
  script: recalculateSubmissionScore,
  description: "Update Submission Score and Level when Skill Assessments change",
});

BusinessRule({
  $id: Now.ID["restrict-member-skill-assessment-query"],
  name: "Restrict Member Skill Assessment query",
  table: "x_711398_se_skill_assessment",
  when: "before",
  action: ["query"],
  order: 100,
  active: true,
  script: restrictMemberSkillAssessmentQuery,
  description:
    "Members see only Skill Assessments on Submissions assigned to themselves; se_admin is unrestricted",
});
