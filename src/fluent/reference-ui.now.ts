import { default_view, Form, List, UiPolicy } from "@servicenow/sdk/core";

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

Form({
  table: "x_711398_se_skill_assessment",
  view: default_view,
  sections: [
    {
      caption: "Skill Assessment",
      content: [
        {
          layout: "two-column",
          leftElements: [
            { field: "skill", type: "table_field" },
            { field: "skill.description", type: "table_field" },
          ],
          rightElements: [
            { field: "skill.product_line", type: "table_field" },
            { field: "proficiency_level", type: "table_field" },
          ],
        },
      ],
    },
  ],
});

List({
  table: "x_711398_se_skill_assessment",
  view: default_view,
  columns: ["skill", "skill.description", "skill.product_line", "proficiency_level"],
});

UiPolicy({
  $id: Now.ID["skill-assessment-skill-readonly"],
  table: "x_711398_se_skill_assessment",
  shortDescription: "Skill description and Product Line are read-only",
  onLoad: true,
  global: true,
  reverseIfFalse: false,
  actions: [
    { field: "skill", readOnly: true },
    { field: "skill.description", readOnly: true },
    { field: "skill.product_line", readOnly: true },
    { field: "submission", readOnly: true },
  ],
});
