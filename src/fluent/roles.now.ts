import { Role } from "@servicenow/sdk/core";

export const SE_USER_ROLE_NAME = "x_711398_se.se_user";

export const SE_ADMIN_ROLE_NAME = "x_711398_se.se_admin";

/** Member role: create and view own Submissions. */
export const seUser = Role({
  name: SE_USER_ROLE_NAME,
  description: "Member: create and view own Skill Evaluation Submissions",
});

/** PM and CoE Head role: all Member rights plus manage Submissions. */
export const seAdmin = Role({
  name: SE_ADMIN_ROLE_NAME,
  description: "PM and CoE Head: all Member rights plus manage Submissions and reference data",
  containsRoles: [seUser],
});
