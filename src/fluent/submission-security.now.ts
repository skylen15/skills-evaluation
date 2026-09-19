import { Acl } from "@servicenow/sdk/core";

import { seAdmin, seUser } from "./roles.now.ts";

const OWNER_SCRIPT = `answer = current.getValue('assigned_to') == gs.getUserID();`;

Acl({
  $id: Now.ID["submission-create-se-user"],
  type: "record",
  table: "x_711398_se_submission",
  operation: "create",
  roles: [seUser],
  description: "Members may create a Submission",
});

Acl({
  $id: Now.ID["submission-read-se-admin"],
  type: "record",
  table: "x_711398_se_submission",
  operation: "read",
  roles: [seAdmin],
  description: "PM and CoE Head may read every Submission",
});

Acl({
  $id: Now.ID["submission-read-se-user-own"],
  type: "record",
  table: "x_711398_se_submission",
  operation: "read",
  roles: [seUser],
  script: OWNER_SCRIPT,
  description: "Members may read Submissions assigned to themselves",
});

Acl({
  $id: Now.ID["submission-write-se-admin"],
  type: "record",
  table: "x_711398_se_submission",
  operation: "write",
  roles: [seAdmin],
  description: "PM and CoE Head may write every Submission",
});

Acl({
  $id: Now.ID["submission-write-se-user-own"],
  type: "record",
  table: "x_711398_se_submission",
  operation: "write",
  roles: [seUser],
  script: OWNER_SCRIPT,
  description: "Members may write Submissions assigned to themselves",
});

Acl({
  $id: Now.ID["submission-delete-se-admin"],
  type: "record",
  table: "x_711398_se_submission",
  operation: "delete",
  roles: [seAdmin],
  description: "Only PM and CoE Head may delete a Submission",
});

Acl({
  $id: Now.ID["submission-field-read"],
  type: "record",
  table: "x_711398_se_submission",
  field: "*",
  operation: "read",
  roles: [seUser],
  description: "Members and admins may read Submission fields",
});

Acl({
  $id: Now.ID["submission-field-write"],
  type: "record",
  table: "x_711398_se_submission",
  field: "*",
  operation: "write",
  roles: [seUser],
  description: "Members and admins may write Submission fields the table ACL allows",
});
