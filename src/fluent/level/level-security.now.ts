import { Acl } from "@servicenow/sdk/core";

import { seAdmin, seUser } from "../foundation/roles.now.ts";

Acl({
  $id: Now.ID["level-read-se-user"],
  type: "record",
  table: "x_711398_se_level",
  operation: "read",
  roles: [seUser],
  description: "Members may read Levels used to band Score",
});

Acl({
  $id: Now.ID["level-create-se-admin"],
  type: "record",
  table: "x_711398_se_level",
  operation: "create",
  roles: [seAdmin],
  description: "Only se_admin may create a Level",
});

Acl({
  $id: Now.ID["level-write-se-admin"],
  type: "record",
  table: "x_711398_se_level",
  operation: "write",
  roles: [seAdmin],
  description: "Only se_admin may write a Level",
});

Acl({
  $id: Now.ID["level-delete-se-admin"],
  type: "record",
  table: "x_711398_se_level",
  operation: "delete",
  roles: [seAdmin],
  description: "Only se_admin may delete a Level",
});

Acl({
  $id: Now.ID["level-field-read"],
  type: "record",
  table: "x_711398_se_level",
  field: "*",
  operation: "read",
  roles: [seUser],
  description: "Members and admins may read Level fields",
});

Acl({
  $id: Now.ID["level-field-write"],
  type: "record",
  table: "x_711398_se_level",
  field: "*",
  operation: "write",
  roles: [seAdmin],
  description: "Only se_admin may write Level fields",
});
