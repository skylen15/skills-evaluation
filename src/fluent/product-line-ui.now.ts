import { default_view, Form, List } from "@servicenow/sdk/core";

Form({
  table: "x_711398_se_product_line",
  view: default_view,
  sections: [
    {
      caption: "Product Line",
      content: [
        {
          layout: "one-column",
          elements: [
            { field: "name", type: "table_field" },
            { field: "description", type: "table_field" },
          ],
        },
      ],
    },
  ],
});

List({
  table: "x_711398_se_product_line",
  view: default_view,
  columns: ["name", "description"],
});
