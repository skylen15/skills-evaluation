import { Role } from "@servicenow/sdk/core";

/** Member role: create and view own Submissions. */
export const seUser = Role({
  name: "x_711398_se.se_user",
  description: "Member: create and view own Skill Evaluation Submissions",
});

/** PM and CoE Head role: all Member rights plus manage Submissions. */
export const seAdmin = Role({
  name: "x_711398_se.se_admin",
  description: "PM and CoE Head: all Member rights plus manage Submissions and reference data",
  containsRoles: [seUser],
});
