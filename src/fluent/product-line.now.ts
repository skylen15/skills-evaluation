import { StringColumn, Table } from "@servicenow/sdk/core";

/** Grouping of Skills, such as ITSM or Business Apps. */
export const x_711398_se_product_line = Table({
  name: "x_711398_se_product_line",
  label: "Product Line",
  display: "name",
  actions: ["read", "create", "update", "delete"],
  createAccessControls: false,
  schema: {
    name: StringColumn({
      label: "Name",
      maxLength: 80,
      mandatory: true,
    }),
    description: StringColumn({
      label: "Description",
      maxLength: 255,
    }),
  },
});
