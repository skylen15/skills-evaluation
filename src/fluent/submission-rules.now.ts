import { BusinessRule } from "@servicenow/sdk/core";

import { generateSkillAssessments } from "../server/generate-skill-assessments.js";
import { refuseCompletedMutation } from "../server/refuse-completed-mutation.js";
import { refuseInProgressInsert } from "../server/refuse-in-progress-insert.js";
import { restrictMemberSubmissionQuery } from "../server/restrict-member-submission-query.js";

BusinessRule({
  $id: Now.ID["refuse-in-progress-insert"],
  name: "Refuse in-progress insert",
  table: "x_711398_se_submission",
  when: "before",
  action: ["insert"],
  order: 100,
  active: true,
  script: refuseInProgressInsert,
  description:
    "Refuse a second Submission while that Assigned to already has one that is not Completed",
});

BusinessRule({
  $id: Now.ID["restrict-member-submission-query"],
  name: "Restrict Member Submission query",
  table: "x_711398_se_submission",
  when: "before",
  action: ["query"],
  order: 100,
  active: true,
  script: restrictMemberSubmissionQuery,
  description: "Members see only Submissions assigned to themselves; se_admin is unrestricted",
});

BusinessRule({
  $id: Now.ID["generate-skill-assessments"],
  name: "Generate Skill Assessments",
  table: "x_711398_se_submission",
  when: "after",
  action: ["insert"],
  order: 100,
  active: true,
  script: generateSkillAssessments,
  description: "Create one Skill Assessment per Skill when a Submission is first inserted",
});

BusinessRule({
  $id: Now.ID["refuse-completed-mutation"],
  name: "Refuse Completed mutation",
  table: "x_711398_se_submission",
  when: "before",
  action: ["update"],
  order: 100,
  active: true,
  script: refuseCompletedMutation,
  description: "Refuse edits to a Completed Submission, including Work notes",
});
