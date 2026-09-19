import { Acl } from "@servicenow/sdk/core";

import { seAdmin, seUser } from "./roles.now.ts";

Acl({
  $id: Now.ID["skill-read-se-user"],
  type: "record",
  table: "x_711398_se_skill",
  operation: "read",
  roles: [seUser],
  description: "Members may read Skills shown on Skill Assessments",
});

Acl({
  $id: Now.ID["skill-create-se-admin"],
  type: "record",
  table: "x_711398_se_skill",
  operation: "create",
  roles: [seAdmin],
  description: "Only se_admin may create a Skill",
});

Acl({
  $id: Now.ID["skill-write-se-admin"],
  type: "record",
  table: "x_711398_se_skill",
  operation: "write",
  roles: [seAdmin],
  description: "Only se_admin may write a Skill",
});

Acl({
  $id: Now.ID["skill-delete-se-admin"],
  type: "record",
  table: "x_711398_se_skill",
  operation: "delete",
  roles: [seAdmin],
  description: "Only se_admin may delete a Skill",
});

Acl({
  $id: Now.ID["skill-field-read"],
  type: "record",
  table: "x_711398_se_skill",
  field: "*",
  operation: "read",
  roles: [seUser],
  description: "Members and admins may read Skill fields",
});

Acl({
  $id: Now.ID["skill-field-write"],
  type: "record",
  table: "x_711398_se_skill",
  field: "*",
  operation: "write",
  roles: [seAdmin],
  description: "Only se_admin may write Skill fields",
});
