import { Acl } from "@servicenow/sdk/core";

import { seAdmin, seUser } from "./roles.now.ts";

const DRAFT_STATE = "draft";

const OWNER_SCRIPT = `answer = current.getValue('assigned_to') == gs.getUserID();`;

const OWNER_DRAFT_SCRIPT = `answer = current.getValue('assigned_to') == gs.getUserID() && current.getValue('state') == '${DRAFT_STATE}';`;

const NOT_COMPLETED_SCRIPT = `answer = current.getValue('state') != 'completed';`;

const OWNER_NOT_COMPLETED_SCRIPT = `answer = current.getValue('assigned_to') == gs.getUserID() && current.getValue('state') != 'completed';`;

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
  script: NOT_COMPLETED_SCRIPT,
  description:
    "PM and CoE Head may write Submissions until Completed (Work notes only when post-submit)",
});

Acl({
  $id: Now.ID["submission-write-se-user-own"],
  type: "record",
  table: "x_711398_se_submission",
  operation: "write",
  roles: [seUser],
  script: OWNER_NOT_COMPLETED_SCRIPT,
  description:
    "Members may write their own Submission until Completed (Work notes only when post-submit)",
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

Acl({
  $id: Now.ID["submission-description-write-se-admin"],
  type: "record",
  table: "x_711398_se_submission",
  field: "description",
  operation: "write",
  roles: [seAdmin],
  script: `answer = current.getValue('state') == '${DRAFT_STATE}';`,
  description: "PM and CoE Head may write Description only while Draft",
});

Acl({
  $id: Now.ID["submission-description-write-se-user-own"],
  type: "record",
  table: "x_711398_se_submission",
  field: "description",
  operation: "write",
  roles: [seUser],
  script: OWNER_DRAFT_SCRIPT,
  description: "Members may write Description on their own Submissions only while Draft",
});

Acl({
  $id: Now.ID["submission-work-notes-write-se-admin"],
  type: "record",
  table: "x_711398_se_submission",
  field: "work_notes",
  operation: "write",
  roles: [seAdmin],
  script: NOT_COMPLETED_SCRIPT,
  description: "PM and CoE Head may write Work notes until the Submission is Completed",
});

Acl({
  $id: Now.ID["submission-work-notes-write-se-user-own"],
  type: "record",
  table: "x_711398_se_submission",
  field: "work_notes",
  operation: "write",
  roles: [seUser],
  script: OWNER_NOT_COMPLETED_SCRIPT,
  description: "Members may write Work notes on their own Submissions until Completed",
});

Acl({
  $id: Now.ID["submission-state-write"],
  type: "record",
  table: "x_711398_se_submission",
  field: "state",
  operation: "write",
  roles: [seUser],
  script: "answer = false;",
  description:
    "Direct updates to state are refused; transitions occur only through authorized actions",
});

Acl({
  $id: Now.ID["submission-valid-write"],
  type: "record",
  table: "x_711398_se_submission",
  field: "valid",
  operation: "write",
  roles: [seUser],
  script: "answer = false;",
  description: "Direct updates to valid are refused; valid is updated only by the CoE gate",
});
