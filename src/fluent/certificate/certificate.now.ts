import { ReferenceColumn, StringColumn, Table } from "@servicenow/sdk/core";

/** Named credential under a Product Line that a member may claim. */
export const x_711398_se_certificate = Table({
  name: "x_711398_se_certificate",
  label: "Certificate",
  display: "name",
  actions: ["read", "create", "update", "delete"],
  createAccessControls: false,
  index: [
    {
      unique: true,
      element: ["product_line", "name"],
    },
  ],
  schema: {
    name: StringColumn({
      label: "Name",
      maxLength: 255,
      mandatory: true,
    }),
    product_line: ReferenceColumn({
      label: "Product Line",
      referenceTable: "x_711398_se_product_line",
      mandatory: true,
    }),
  },
});
