import { Record } from "@servicenow/sdk/core";

import {
  SKILL_EVALUATION_COE_GROUP_NAME,
  SKILL_EVALUATION_PM_GROUP_NAME,
} from "../../server/common/group-names.js";
import { seAdmin, seUser } from "./roles.now.ts";

/** Group that grants se_user to Members. */
export const skillEvaluationUser = Record({
  $id: Now.ID["skill-evaluation-user-group"],
  table: "sys_user_group",
  data: {
    name: "Skill Evaluation User",
    description: "ECA team members who file their own Submissions",
    active: true,
  },
});

/** Group that grants se_admin to PMs. */
export const skillEvaluationPm = Record({
  $id: Now.ID["skill-evaluation-pm-group"],
  table: "sys_user_group",
  data: {
    name: SKILL_EVALUATION_PM_GROUP_NAME,
    description: "ECA project managers who take the first approval gate",
    active: true,
    include_members: true,
  },
});

/** Group that grants se_admin to CoE Heads. */
export const skillEvaluationCoe = Record({
  $id: Now.ID["skill-evaluation-coe-group"],
  table: "sys_user_group",
  data: {
    name: SKILL_EVALUATION_COE_GROUP_NAME,
    description: "ECA CoE Heads who take the second approval gate",
    active: true,
    include_members: true,
  },
});

Record({
  $id: Now.ID["skill-evaluation-user-has-se-user"],
  table: "sys_group_has_role",
  data: {
    group: skillEvaluationUser,
    role: seUser,
    inherits: true,
  },
});

Record({
  $id: Now.ID["skill-evaluation-pm-has-se-admin"],
  table: "sys_group_has_role",
  data: {
    group: skillEvaluationPm,
    role: seAdmin,
    inherits: true,
  },
});

Record({
  $id: Now.ID["skill-evaluation-coe-has-se-admin"],
  table: "sys_group_has_role",
  data: {
    group: skillEvaluationCoe,
    role: seAdmin,
    inherits: true,
  },
});
