import { Record } from "@servicenow/sdk/core";

// Record.table accepts a table name, not the object returned by Table().
const PRODUCT_LINE_TABLE = "x_711398_se_product_line";

export const productLineItsm = Record({
  $id: Now.ID["product-line-itsm"],
  table: PRODUCT_LINE_TABLE,
  data: {
    name: "ITSM",
    description: "IT Service Management",
  },
});

export const productLineBusinessApps = Record({
  $id: Now.ID["product-line-business-apps"],
  table: PRODUCT_LINE_TABLE,
  data: {
    name: "Business Apps",
    description: "Application Development",
  },
});

export const productLinePlatform = Record({
  $id: Now.ID["product-line-platform"],
  table: PRODUCT_LINE_TABLE,
  data: {
    name: "Platform",
    description: "Now Platform",
  },
});
