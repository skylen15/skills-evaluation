import { DateColumn, ReferenceColumn, StringColumn, Table } from "@servicenow/sdk/core";

/** One Certificate claimed on one Submission. */
export const x_711398_se_cert_acquisition = Table({
  name: "x_711398_se_cert_acquisition",
  label: "Cert Acquisition",
  display: "certificate",
  actions: ["read", "create", "update", "delete"],
  createAccessControls: false,
  index: [
    {
      unique: true,
      element: ["submission", "certificate"],
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
    certificate: ReferenceColumn({
      label: "Certificate",
      referenceTable: "x_711398_se_certificate",
      mandatory: true,
    }),
    certification_number: StringColumn({
      label: "Certification number",
      maxLength: 100,
    }),
    certified_date: DateColumn({
      label: "Certified date",
    }),
    servicenow_release: StringColumn({
      label: "ServiceNow release",
      maxLength: 80,
    }),
  },
});
