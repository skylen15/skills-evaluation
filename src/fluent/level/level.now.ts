import { IntegerColumn, StringColumn, Table } from "@servicenow/sdk/core";

/** Overall Score band for a Submission. */
export const x_711398_se_level = Table({
  name: "x_711398_se_level",
  label: "Level",
  display: "name",
  actions: ["read", "create", "update", "delete"],
  createAccessControls: false,
  schema: {
    name: StringColumn({
      label: "Name",
      maxLength: 80,
      mandatory: true,
    }),
    min_score: IntegerColumn({
      label: "Min score",
      mandatory: true,
    }),
  },
});
