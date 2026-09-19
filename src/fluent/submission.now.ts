import {
  BooleanColumn,
  ChoiceColumn,
  GenericColumn,
  IntegerColumn,
  ReferenceColumn,
  StringColumn,
  Table,
} from "@servicenow/sdk/core";

/** Skill Evaluation Submission: one self-assessment package for one member. */
export const x_711398_se_submission = Table({
  name: "x_711398_se_submission",
  label: "Submission",
  display: "number",
  actions: ["read", "create", "update", "delete"],
  createAccessControls: false,
  autoNumber: {
    prefix: "SUBM",
    number: 1000,
    numberOfDigits: 7,
  },
  index: [
    {
      unique: false,
      element: "assigned_to",
    },
  ],
  schema: {
    number: StringColumn({
      label: "Number",
      maxLength: 40,
      readOnly: true,
    }),
    state: ChoiceColumn({
      label: "State",
      default: "draft",
      dropdown: "dropdown_without_none",
      readOnly: true,
      choices: {
        draft: { label: "Draft", sequence: 10 },
        submitted: { label: "Submitted", sequence: 20 },
        reviewed: { label: "Reviewed", sequence: 30 },
        completed: { label: "Completed", sequence: 40 },
      },
    }),
    assigned_to: ReferenceColumn({
      label: "Assigned to",
      referenceTable: "sys_user",
      mandatory: true,
      readOnly: true,
      default: "javascript:gs.getUserID()",
    }),
    opened_by: ReferenceColumn({
      label: "Opened by",
      referenceTable: "sys_user",
      readOnly: true,
      default: "javascript:gs.getUserID()",
    }),
    description: StringColumn({
      label: "Description",
      maxLength: 4000,
    }),
    score: IntegerColumn({
      label: "Score",
      default: 0,
      readOnly: true,
    }),
    level: ReferenceColumn({
      label: "Level",
      referenceTable: "x_711398_se_level",
      readOnly: true,
    }),
    valid: BooleanColumn({
      label: "Valid",
      default: false,
      readOnly: true,
    }),
    work_notes: GenericColumn({
      label: "Work notes",
      columnType: "journal_input",
    }),
  },
});
