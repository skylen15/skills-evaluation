import { default_view, Form, List, UiAction, UiPolicy } from "@servicenow/sdk/core";

import { SKILL_EVALUATION_PM_GROUP_NAME } from "../server/group-names.js";
import { submitForReview } from "../server/submit-for-review.js";
import { approveAtPmGate, rejectAtPmGate } from "../server/take-pm-gate.js";
import { seAdmin, seUser } from "./roles.now.ts";

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

UiPolicy({
  $id: Now.ID["lock-member-fields-after-draft"],
  table: "x_711398_se_submission",
  shortDescription: "Lock Description after leaving Draft",
  onLoad: true,
  global: true,
  reverseIfFalse: true,
  conditions: "state!=draft",
  actions: [{ field: "description", readOnly: true }],
});

UiAction({
  $id: Now.ID["submit-for-review"],
  table: "x_711398_se_submission",
  name: "Submit for Review",
  actionName: "submit_for_review",
  showInsert: false,
  showUpdate: true,
  hint: "Send this Draft Submission to the PM",
  condition:
    "current.getValue('state') == 'draft' && current.getValue('assigned_to') == gs.getUserID()",
  form: {
    showButton: true,
    style: "primary",
  },
  roles: [seUser],
  order: 100,
  script: submitForReview,
});

const PM_GATE_CONDITION = `current.getValue('state') == 'submitted' &&
current.getValue('assigned_to') != gs.getUserID() &&
gs.getUser().isMemberOf('${SKILL_EVALUATION_PM_GROUP_NAME}')`;

UiAction({
  $id: Now.ID["pm-approve-submission"],
  table: "x_711398_se_submission",
  name: "Approve",
  actionName: "pm_approve_submission",
  showInsert: false,
  showUpdate: true,
  hint: "Approve this Submitted Submission for CoE Head review",
  condition: PM_GATE_CONDITION,
  form: {
    showButton: true,
    style: "primary",
  },
  roles: [seAdmin],
  order: 200,
  script: approveAtPmGate,
});

UiAction({
  $id: Now.ID["pm-reject-submission"],
  table: "x_711398_se_submission",
  name: "Reject",
  actionName: "pm_reject_submission",
  showInsert: false,
  showUpdate: true,
  hint: "Return this Submitted Submission to Draft",
  condition: PM_GATE_CONDITION,
  form: {
    showButton: true,
    style: "unstyled",
  },
  roles: [seAdmin],
  order: 210,
  script: rejectAtPmGate,
});
