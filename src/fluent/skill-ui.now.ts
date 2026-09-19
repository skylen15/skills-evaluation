import { default_view, Form, List } from "@servicenow/sdk/core";

Form({
  table: "x_711398_se_skill",
  view: default_view,
  sections: [
    {
      caption: "Skill",
      content: [
        {
          layout: "two-column",
          leftElements: [
            { field: "description", type: "table_field" },
            { field: "product_line", type: "table_field" },
          ],
          rightElements: [{ field: "weight", type: "table_field" }],
        },
      ],
    },
  ],
});

List({
  table: "x_711398_se_skill",
  view: default_view,
  columns: ["description", "product_line", "weight"],
});
