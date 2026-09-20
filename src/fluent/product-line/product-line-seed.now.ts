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

export const productLineItom = Record({
  $id: Now.ID["product-line-itom"],
  table: PRODUCT_LINE_TABLE,
  data: {
    name: "ITOM",
    description: "IT Operations Management",
  },
});

export const productLineItbm = Record({
  $id: Now.ID["product-line-itbm"],
  table: PRODUCT_LINE_TABLE,
  data: {
    name: "ITBM",
    description: "IT Business Management",
  },
});

export const productLineCsm = Record({
  $id: Now.ID["product-line-csm"],
  table: PRODUCT_LINE_TABLE,
  data: {
    name: "CSM",
    description: "Customer Service Management",
  },
});

export const productLineHr = Record({
  $id: Now.ID["product-line-hr"],
  table: PRODUCT_LINE_TABLE,
  data: {
    name: "HR",
    description: "Human Resources",
  },
});

export const productLineSecurity = Record({
  $id: Now.ID["product-line-security"],
  table: PRODUCT_LINE_TABLE,
  data: {
    name: "Security",
    description: "Security Operations",
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

export const productLineNonstopCloud = Record({
  $id: Now.ID["product-line-nonstop-cloud"],
  table: PRODUCT_LINE_TABLE,
  data: {
    name: "Nonstop Cloud",
    description: "Nonstop Cloud Infrastructure",
  },
});
