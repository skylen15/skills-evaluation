import { ApplicationMenu, Record } from "@servicenow/sdk/core";

import { SE_ADMIN_ROLE_NAME, SE_USER_ROLE_NAME, seUser } from "../foundation/roles.now.ts";

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

Record({
  $id: Now.ID["module-all-submissions"],
  table: "sys_app_module",
  data: {
    title: "All",
    application: skillEvaluationMenu,
    link_type: "LIST",
    name: "x_711398_se_submission",
    hint: "All Skill Evaluation Submissions",
    roles: [SE_ADMIN_ROLE_NAME],
    active: true,
    order: 210,
  },
});

Record({
  $id: Now.ID["module-awaiting-approval"],
  table: "sys_app_module",
  data: {
    title: "Awaiting Approval",
    application: skillEvaluationMenu,
    link_type: "FILTER",
    name: "x_711398_se_submission",
    filter: "stateINsubmitted,reviewed",
    hint: "Submissions waiting at either approval gate",
    roles: [SE_ADMIN_ROLE_NAME],
    active: true,
    order: 220,
  },
});

Record({
  $id: Now.ID["module-completed-submissions"],
  table: "sys_app_module",
  data: {
    title: "Completed",
    application: skillEvaluationMenu,
    link_type: "FILTER",
    name: "x_711398_se_submission",
    filter: "state=completed",
    hint: "Completed Skill Evaluation Submissions",
    roles: [SE_ADMIN_ROLE_NAME],
    active: true,
    order: 230,
  },
});
