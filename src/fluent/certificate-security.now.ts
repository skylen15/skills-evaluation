import { Acl } from "@servicenow/sdk/core";

import { seAdmin, seUser } from "./roles.now.ts";

Acl({
  $id: Now.ID["certificate-read-se-user"],
  type: "record",
  table: "x_711398_se_certificate",
  operation: "read",
  roles: [seUser],
  description: "Members may read Certificates when claiming them",
});

Acl({
  $id: Now.ID["certificate-create-se-admin"],
  type: "record",
  table: "x_711398_se_certificate",
  operation: "create",
  roles: [seAdmin],
  description: "Only se_admin may create a Certificate",
});

Acl({
  $id: Now.ID["certificate-write-se-admin"],
  type: "record",
  table: "x_711398_se_certificate",
  operation: "write",
  roles: [seAdmin],
  description: "Only se_admin may write a Certificate",
});

Acl({
  $id: Now.ID["certificate-delete-se-admin"],
  type: "record",
  table: "x_711398_se_certificate",
  operation: "delete",
  roles: [seAdmin],
  description: "Only se_admin may delete a Certificate",
});

Acl({
  $id: Now.ID["certificate-field-read"],
  type: "record",
  table: "x_711398_se_certificate",
  field: "*",
  operation: "read",
  roles: [seUser],
  description: "Members and admins may read Certificate fields",
});

Acl({
  $id: Now.ID["certificate-field-write"],
  type: "record",
  table: "x_711398_se_certificate",
  field: "*",
  operation: "write",
  roles: [seAdmin],
  description: "Only se_admin may write Certificate fields",
});
