import { Record } from "@servicenow/sdk/core";

import {
  productLineBusinessApps,
  productLineItsm,
  productLinePlatform,
} from "./product-line-seed.now.ts";

// Record.table accepts a table name, not the object returned by Table().
const SKILL_TABLE = "x_711398_se_skill";

Record({
  $id: Now.ID["skill-design-application"],
  table: SKILL_TABLE,
  data: {
    description:
      "Design an application including business logic, user interface, and database logic",
    product_line: productLineBusinessApps,
    weight: 1,
  },
});

Record({
  $id: Now.ID["skill-write-scripts"],
  table: SKILL_TABLE,
  data: {
    description: "Write, test, and debug client-side and server-side scripts",
    product_line: productLineBusinessApps,
    weight: 1,
  },
});

Record({
  $id: Now.ID["skill-implement-security"],
  table: SKILL_TABLE,
  data: {
    description: "Implement security using contextual security and application scope",
    product_line: productLineBusinessApps,
    weight: 1,
  },
});

Record({
  $id: Now.ID["skill-itsm-process"],
  table: SKILL_TABLE,
  data: {
    description: "Configure ITSM processes on the Now Platform",
    product_line: productLineItsm,
    weight: 1,
  },
});

Record({
  $id: Now.ID["skill-platform-architecture"],
  table: SKILL_TABLE,
  data: {
    description: "Explain Now Platform architecture and application scope",
    product_line: productLinePlatform,
    weight: 1,
  },
});
