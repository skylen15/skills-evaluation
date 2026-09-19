import { Record } from "@servicenow/sdk/core";

import { x_711398_se_level } from "./level.now.ts";
import { x_711398_se_product_line } from "./product-line.now.ts";
import { x_711398_se_skill } from "./skill.now.ts";

export const productLineItsm = Record({
  $id: Now.ID["product-line-itsm"],
  table: x_711398_se_product_line,
  data: {
    name: "ITSM",
    description: "IT Service Management",
  },
});

export const productLineBusinessApps = Record({
  $id: Now.ID["product-line-business-apps"],
  table: x_711398_se_product_line,
  data: {
    name: "Business Apps",
    description: "Application Development",
  },
});

export const productLinePlatform = Record({
  $id: Now.ID["product-line-platform"],
  table: x_711398_se_product_line,
  data: {
    name: "Platform",
    description: "Now Platform",
  },
});

Record({
  $id: Now.ID["skill-design-application"],
  table: x_711398_se_skill,
  data: {
    description:
      "Design an application including business logic, user interface, and database logic",
    product_line: productLineBusinessApps,
    weight: 1,
  },
});

Record({
  $id: Now.ID["skill-write-scripts"],
  table: x_711398_se_skill,
  data: {
    description: "Write, test, and debug client-side and server-side scripts",
    product_line: productLineBusinessApps,
    weight: 1,
  },
});

Record({
  $id: Now.ID["skill-implement-security"],
  table: x_711398_se_skill,
  data: {
    description: "Implement security using contextual security and application scope",
    product_line: productLineBusinessApps,
    weight: 1,
  },
});

Record({
  $id: Now.ID["skill-itsm-process"],
  table: x_711398_se_skill,
  data: {
    description: "Configure ITSM processes on the Now Platform",
    product_line: productLineItsm,
    weight: 1,
  },
});

Record({
  $id: Now.ID["skill-platform-architecture"],
  table: x_711398_se_skill,
  data: {
    description: "Explain Now Platform architecture and application scope",
    product_line: productLinePlatform,
    weight: 1,
  },
});

Record({
  $id: Now.ID["level-elementary"],
  table: x_711398_se_level,
  data: {
    name: "Elementary",
    min_score: 15,
  },
});

Record({
  $id: Now.ID["level-pre-intermediate"],
  table: x_711398_se_level,
  data: {
    name: "Pre-intermediate",
    min_score: 25,
  },
});

Record({
  $id: Now.ID["level-intermediate"],
  table: x_711398_se_level,
  data: {
    name: "Intermediate",
    min_score: 30,
  },
});

Record({
  $id: Now.ID["level-upper-intermediate"],
  table: x_711398_se_level,
  data: {
    name: "Upper intermediate",
    min_score: 45,
  },
});

Record({
  $id: Now.ID["level-advanced"],
  table: x_711398_se_level,
  data: {
    name: "Advanced",
    min_score: 60,
  },
});
