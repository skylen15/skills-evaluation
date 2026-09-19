import { default_view, Form, List } from "@servicenow/sdk/core";

Form({
  table: "x_711398_se_level",
  view: default_view,
  sections: [
    {
      caption: "Level",
      content: [
        {
          layout: "two-column",
          leftElements: [{ field: "name", type: "table_field" }],
          rightElements: [{ field: "min_score", type: "table_field" }],
        },
      ],
    },
  ],
});

List({
  table: "x_711398_se_level",
  view: default_view,
  columns: ["name", "min_score"],
});
