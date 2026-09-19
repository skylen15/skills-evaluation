import { Acl } from "@servicenow/sdk/core";

import { seAdmin, seUser } from "./roles.now.ts";

Acl({
  $id: Now.ID["product-line-read-se-user"],
  type: "record",
  table: "x_711398_se_product_line",
  operation: "read",
  roles: [seUser],
  description: "Members may read Product Lines shown on Skill Assessments",
});

Acl({
  $id: Now.ID["product-line-create-se-admin"],
  type: "record",
  table: "x_711398_se_product_line",
  operation: "create",
  roles: [seAdmin],
  description: "Only se_admin may create a Product Line",
});

Acl({
  $id: Now.ID["product-line-write-se-admin"],
  type: "record",
  table: "x_711398_se_product_line",
  operation: "write",
  roles: [seAdmin],
  description: "Only se_admin may write a Product Line",
});

Acl({
  $id: Now.ID["product-line-delete-se-admin"],
  type: "record",
  table: "x_711398_se_product_line",
  operation: "delete",
  roles: [seAdmin],
  description: "Only se_admin may delete a Product Line",
});

Acl({
  $id: Now.ID["product-line-field-read"],
  type: "record",
  table: "x_711398_se_product_line",
  field: "*",
  operation: "read",
  roles: [seUser],
  description: "Members and admins may read Product Line fields",
});

Acl({
  $id: Now.ID["product-line-field-write"],
  type: "record",
  table: "x_711398_se_product_line",
  field: "*",
  operation: "write",
  roles: [seAdmin],
  description: "Only se_admin may write Product Line fields",
});

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
