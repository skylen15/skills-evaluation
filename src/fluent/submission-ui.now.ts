import { default_view, Form, List, UiPolicy } from "@servicenow/sdk/core";

Form({
  table: "x_711398_se_submission",
  view: default_view,
  sections: [
    {
      caption: "Submission",
      content: [
        {
          layout: "two-column",
          leftElements: [
            { field: "number", type: "table_field" },
            { field: "assigned_to", type: "table_field" },
            { field: "valid", type: "table_field" },
          ],
          rightElements: [
            { field: "state", type: "table_field" },
            { field: "opened_by", type: "table_field" },
            { field: "score", type: "table_field" },
            { field: "level", type: "table_field" },
          ],
        },
        {
          layout: "one-column",
          elements: [{ field: "description", type: "table_field" }],
        },
      ],
    },
    {
      caption: "Notes",
      content: [
        {
          layout: "one-column",
          elements: [
            { field: "work_notes", type: "table_field" },
            {
              type: "formatter",
              formatterRef: "Activities_Filtered",
            },
          ],
        },
      ],
    },
  ],
});

List({
  table: "x_711398_se_submission",
  view: default_view,
  columns: ["number", "assigned_to", "state", "valid", "description"],
});

UiPolicy({
  $id: Now.ID["submission-readonly-except-description-work-notes"],
  table: "x_711398_se_submission",
  shortDescription: "Members may edit only Description and Work notes",
  onLoad: true,
  global: true,
  reverseIfFalse: false,
  actions: [
    { field: "number", readOnly: true },
    { field: "state", readOnly: true },
    { field: "assigned_to", readOnly: true },
    { field: "opened_by", readOnly: true },
    { field: "valid", readOnly: true },
    { field: "score", readOnly: true },
    { field: "level", readOnly: true },
  ],
});

UiPolicy({
  $id: Now.ID["hide-level-in-draft"],
  table: "x_711398_se_submission",
  shortDescription: "Hide Level while the Submission is Draft",
  onLoad: true,
  global: true,
  reverseIfFalse: true,
  conditions: "state=draft",
  actions: [{ field: "level", visible: false }],
});
