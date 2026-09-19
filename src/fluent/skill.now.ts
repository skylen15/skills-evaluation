import { IntegerColumn, ReferenceColumn, StringColumn, Table } from "@servicenow/sdk/core";

/** Named ServiceNow capability under a Product Line. */
export const x_711398_se_skill = Table({
  name: "x_711398_se_skill",
  label: "Skill",
  display: "description",
  actions: ["read", "create", "update", "delete"],
  createAccessControls: false,
  schema: {
    description: StringColumn({
      label: "Description",
      maxLength: 255,
      mandatory: true,
    }),
    product_line: ReferenceColumn({
      label: "Product Line",
      referenceTable: "x_711398_se_product_line",
      mandatory: true,
    }),
    weight: IntegerColumn({
      label: "Weight",
      default: 0,
    }),
  },
});
