import { Acl } from "@servicenow/sdk/core";

import { seAdmin, seUser } from "../foundation/roles.now.ts";

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
