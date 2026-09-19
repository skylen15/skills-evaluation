import { ApplicationMenu, Record } from "@servicenow/sdk/core";

import { SE_USER_ROLE_NAME, seUser } from "./roles.now.ts";

export const skillEvaluationMenu = ApplicationMenu({
  $id: Now.ID["skill-evaluation-menu"],
  title: "Skill Evaluation",
  hint: "Self-assessment Submissions",
  description: "Create and view Skill Evaluation Submissions",
  roles: [seUser],
  active: true,
});

Record({
  $id: Now.ID["module-new-evaluation"],
  table: "sys_app_module",
  data: {
    title: "New Evaluation",
    application: skillEvaluationMenu,
    link_type: "NEW",
    name: "x_711398_se_submission",
    hint: "Start a Draft Submission assigned to you",
    roles: [SE_USER_ROLE_NAME],
    active: true,
    order: 100,
  },
});

Record({
  $id: Now.ID["module-my-skill-evaluations"],
  table: "sys_app_module",
  data: {
    title: "My Skill Evaluations",
    application: skillEvaluationMenu,
    link_type: "FILTER",
    name: "x_711398_se_submission",
    filter: "assigned_to=javascript:gs.getUserID()",
    hint: "Submissions assigned to you",
    roles: [SE_USER_ROLE_NAME],
    active: true,
    order: 200,
  },
});
