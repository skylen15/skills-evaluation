import { ChoiceColumn, ReferenceColumn, Table } from "@servicenow/sdk/core";

/** One Proficiency Level for one Skill on one Submission. */
export const x_711398_se_skill_assessment = Table({
  name: "x_711398_se_skill_assessment",
  label: "Skill Assessment",
  display: "skill",
  actions: ["read", "create", "update", "delete"],
  createAccessControls: false,
  index: [
    {
      unique: true,
      element: ["submission", "skill"],
    },
  ],
  schema: {
    submission: ReferenceColumn({
      label: "Submission",
      referenceTable: "x_711398_se_submission",
      mandatory: true,
      readOnly: true,
      cascadeRule: "delete",
    }),
    skill: ReferenceColumn({
      label: "Skill",
      referenceTable: "x_711398_se_skill",
      mandatory: true,
      readOnly: true,
    }),
    proficiency_level: ChoiceColumn({
      label: "Proficiency Level",
      default: "0",
      dropdown: "dropdown_without_none",
      choices: {
        "0": { label: "Not Applicable", sequence: 10 },
        "1": { label: "Conceptual/Trained", sequence: 20 },
        "2": { label: "Experienced", sequence: 30 },
        "3": { label: "Expert", sequence: 40 },
        "4": { label: "Guru", sequence: 50 },
      },
    }),
  },
});
