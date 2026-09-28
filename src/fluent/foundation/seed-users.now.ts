import { Record } from "@servicenow/sdk/core";

import { skillEvaluationCoe, skillEvaluationPm, skillEvaluationUser } from "./groups.now.ts";

/** Seed Member user with fixed Skill Evaluation User group membership. */
export const memberTestUser = Record({
  $id: Now.ID["seed-user-member"],
  table: "sys_user",
  data: {
    user_name: "se_member_test",
    first_name: "SE",
    last_name: "Member Test",
    email: "se_member_test@example.com",
    active: true,
  },
});

/** Seed PM user with fixed Skill Evaluation PM group membership. */
export const pmTestUser = Record({
  $id: Now.ID["seed-user-pm"],
  table: "sys_user",
  data: {
    user_name: "se_pm_test",
    first_name: "SE",
    last_name: "PM Test",
    email: "se_pm_test@example.com",
    active: true,
  },
});

/** Seed CoE Head user with fixed Skill Evaluation COE group membership. */
export const coeTestUser = Record({
  $id: Now.ID["seed-user-coe"],
  table: "sys_user",
  data: {
    user_name: "se_coe_test",
    first_name: "SE",
    last_name: "CoE Test",
    email: "se_coe_test@example.com",
    active: true,
  },
});

Record({
  $id: Now.ID["seed-user-member-grmember"],
  table: "sys_user_grmember",
  data: {
    user: memberTestUser,
    group: skillEvaluationUser,
  },
});

Record({
  $id: Now.ID["seed-user-pm-grmember"],
  table: "sys_user_grmember",
  data: {
    user: pmTestUser,
    group: skillEvaluationPm,
  },
});

Record({
  $id: Now.ID["seed-user-coe-grmember"],
  table: "sys_user_grmember",
  data: {
    user: coeTestUser,
    group: skillEvaluationCoe,
  },
});
