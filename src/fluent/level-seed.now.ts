import { Record } from "@servicenow/sdk/core";

// Record.table accepts a table name, not the object returned by Table().
const LEVEL_TABLE = "x_711398_se_level";

Record({
  $id: Now.ID["level-elementary"],
  table: LEVEL_TABLE,
  data: {
    name: "Elementary",
    min_score: 15,
  },
});

Record({
  $id: Now.ID["level-pre-intermediate"],
  table: LEVEL_TABLE,
  data: {
    name: "Pre-intermediate",
    min_score: 25,
  },
});

Record({
  $id: Now.ID["level-intermediate"],
  table: LEVEL_TABLE,
  data: {
    name: "Intermediate",
    min_score: 30,
  },
});

Record({
  $id: Now.ID["level-upper-intermediate"],
  table: LEVEL_TABLE,
  data: {
    name: "Upper intermediate",
    min_score: 45,
  },
});

Record({
  $id: Now.ID["level-advanced"],
  table: LEVEL_TABLE,
  data: {
    name: "Advanced",
    min_score: 60,
  },
});
