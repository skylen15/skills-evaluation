import { Acl } from "@servicenow/sdk/core";

import { seAdmin, seUser } from "./roles.now.ts";

const OWNER_SCRIPT = `var grSubmission = new GlideRecord('x_711398_se_submission');
answer = grSubmission.get(current.getValue('submission')) && grSubmission.getValue('assigned_to') == gs.getUserID();`;

Acl({
  $id: Now.ID["skill-assessment-create-se-user"],
  type: "record",
  table: "x_711398_se_skill_assessment",
  operation: "create",
  roles: [seUser],
  description: "Members may insert generated Skill Assessments",
});

Acl({
  $id: Now.ID["skill-assessment-read-se-admin"],
  type: "record",
  table: "x_711398_se_skill_assessment",
  operation: "read",
  roles: [seAdmin],
  description: "PM and CoE Head may read every Skill Assessment",
});

Acl({
  $id: Now.ID["skill-assessment-read-se-user-own"],
  type: "record",
  table: "x_711398_se_skill_assessment",
  operation: "read",
  roles: [seUser],
  script: OWNER_SCRIPT,
  description: "Members may read Skill Assessments on Submissions assigned to themselves",
});

Acl({
  $id: Now.ID["skill-assessment-write-se-admin"],
  type: "record",
  table: "x_711398_se_skill_assessment",
  operation: "write",
  roles: [seAdmin],
  description: "PM and CoE Head may write every Skill Assessment",
});

Acl({
  $id: Now.ID["skill-assessment-write-se-user-own"],
  type: "record",
  table: "x_711398_se_skill_assessment",
  operation: "write",
  roles: [seUser],
  script: OWNER_SCRIPT,
  description: "Members may write Skill Assessments on Submissions assigned to themselves",
});

Acl({
  $id: Now.ID["skill-assessment-delete-se-admin"],
  type: "record",
  table: "x_711398_se_skill_assessment",
  operation: "delete",
  roles: [seAdmin],
  description: "Only PM and CoE Head may delete a Skill Assessment",
});

Acl({
  $id: Now.ID["skill-assessment-field-read"],
  type: "record",
  table: "x_711398_se_skill_assessment",
  field: "*",
  operation: "read",
  roles: [seUser],
  description: "Members and admins may read Skill Assessment fields",
});

Acl({
  $id: Now.ID["skill-assessment-field-write"],
  type: "record",
  table: "x_711398_se_skill_assessment",
  field: "*",
  operation: "write",
  roles: [seUser],
  description: "Members and admins may write Skill Assessment fields the table ACL allows",
});
