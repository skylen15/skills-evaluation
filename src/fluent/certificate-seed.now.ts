import { Record } from "@servicenow/sdk/core";

import {
  productLineBusinessApps,
  productLineItsm,
  productLinePlatform,
} from "./product-line-seed.now.ts";

// Record.table accepts a table name, not the object returned by Table().
const CERTIFICATE_TABLE = "x_711398_se_certificate";

Record({
  $id: Now.ID["certificate-system-administrator"],
  table: CERTIFICATE_TABLE,
  data: {
    name: "ServiceNow Certified System Administrator",
    product_line: productLinePlatform,
  },
});

Record({
  $id: Now.ID["certificate-application-developer"],
  table: CERTIFICATE_TABLE,
  data: {
    name: "ServiceNow Certified Application Developer",
    product_line: productLineBusinessApps,
  },
});

Record({
  $id: Now.ID["certificate-implementation-specialist-itsm"],
  table: CERTIFICATE_TABLE,
  data: {
    name: "ServiceNow Certified Implementation Specialist – IT Service Management",
    product_line: productLineItsm,
  },
});
