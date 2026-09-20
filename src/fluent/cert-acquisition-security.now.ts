import { Acl } from "@servicenow/sdk/core";

import { seAdmin, seUser } from "./roles.now.ts";

const DRAFT_STATE = "draft";

const ADMIN_DRAFT_SCRIPT = `var grSubmission = new GlideRecord('x_711398_se_submission');
answer = grSubmission.get(current.getValue('submission')) && grSubmission.getValue('state') == '${DRAFT_STATE}';`;

const OWNER_SCRIPT = `var grSubmission = new GlideRecord('x_711398_se_submission');
answer = grSubmission.get(current.getValue('submission')) && grSubmission.getValue('assigned_to') == gs.getUserID();`;

const OWNER_DRAFT_SCRIPT = `var grSubmission = new GlideRecord('x_711398_se_submission');
answer = grSubmission.get(current.getValue('submission')) && grSubmission.getValue('assigned_to') == gs.getUserID() && grSubmission.getValue('state') == '${DRAFT_STATE}';`;

Acl({
  $id: Now.ID["cert-acquisition-create-se-admin"],
  type: "record",
  table: "x_711398_se_cert_acquisition",
  operation: "create",
  roles: [seAdmin],
  script: ADMIN_DRAFT_SCRIPT,
  description: "PM and CoE Head may add Cert Acquisitions only while the parent is Draft",
});

Acl({
  $id: Now.ID["cert-acquisition-create-se-user-own"],
  type: "record",
  table: "x_711398_se_cert_acquisition",
  operation: "create",
  roles: [seUser],
  script: OWNER_DRAFT_SCRIPT,
  description:
    "Members may add Cert Acquisitions to their own Submissions only while the parent is Draft",
});

Acl({
  $id: Now.ID["cert-acquisition-read-se-admin"],
  type: "record",
  table: "x_711398_se_cert_acquisition",
  operation: "read",
  roles: [seAdmin],
  description: "PM and CoE Head may read every Cert Acquisition",
});

Acl({
  $id: Now.ID["cert-acquisition-read-se-user-own"],
  type: "record",
  table: "x_711398_se_cert_acquisition",
  operation: "read",
  roles: [seUser],
  script: OWNER_SCRIPT,
  description: "Members may read Cert Acquisitions on Submissions assigned to themselves",
});

Acl({
  $id: Now.ID["cert-acquisition-write-se-admin"],
  type: "record",
  table: "x_711398_se_cert_acquisition",
  operation: "write",
  roles: [seAdmin],
  script: ADMIN_DRAFT_SCRIPT,
  description: "PM and CoE Head may write Cert Acquisitions only while the parent is Draft",
});

Acl({
  $id: Now.ID["cert-acquisition-write-se-user-own"],
  type: "record",
  table: "x_711398_se_cert_acquisition",
  operation: "write",
  roles: [seUser],
  script: OWNER_DRAFT_SCRIPT,
  description:
    "Members may write Cert Acquisitions on their own Submissions only while the parent is Draft",
});

Acl({
  $id: Now.ID["cert-acquisition-delete-se-admin"],
  type: "record",
  table: "x_711398_se_cert_acquisition",
  operation: "delete",
  roles: [seAdmin],
  script: ADMIN_DRAFT_SCRIPT,
  description: "PM and CoE Head may remove Cert Acquisitions only while the parent is Draft",
});

Acl({
  $id: Now.ID["cert-acquisition-delete-se-user-own"],
  type: "record",
  table: "x_711398_se_cert_acquisition",
  operation: "delete",
  roles: [seUser],
  script: OWNER_DRAFT_SCRIPT,
  description:
    "Members may remove Cert Acquisitions from their own Submissions only while the parent is Draft",
});

Acl({
  $id: Now.ID["cert-acquisition-field-read"],
  type: "record",
  table: "x_711398_se_cert_acquisition",
  field: "*",
  operation: "read",
  roles: [seUser],
  description: "Members and admins may read Cert Acquisition fields",
});

Acl({
  $id: Now.ID["cert-acquisition-field-write"],
  type: "record",
  table: "x_711398_se_cert_acquisition",
  field: "*",
  operation: "write",
  roles: [seUser],
  description: "Members and admins may set Cert Acquisition fields when adding a claim",
});
