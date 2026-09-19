import { default_view, Form, List, UiPolicy } from "@servicenow/sdk/core";

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
            { field: "skill.product_line", type: "table_field" },
          ],
          rightElements: [{ field: "proficiency_level", type: "table_field" }],
        },
      ],
    },
  ],
});

List({
  table: "x_711398_se_skill_assessment",
  view: default_view,
  columns: ["skill", "skill.product_line", "proficiency_level"],
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
    { field: "submission", readOnly: true },
  ],
});
