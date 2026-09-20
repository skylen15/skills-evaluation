import { default_view, Form, List } from "@servicenow/sdk/core";

Form({
  table: "x_711398_se_certificate",
  view: default_view,
  sections: [
    {
      caption: "Certificate",
      content: [
        {
          layout: "two-column",
          leftElements: [{ field: "name", type: "table_field" }],
          rightElements: [{ field: "product_line", type: "table_field" }],
        },
      ],
    },
  ],
});

List({
  table: "x_711398_se_certificate",
  view: default_view,
  columns: ["name", "product_line"],
});
