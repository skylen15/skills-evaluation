import "@servicenow/sdk/global";
import { Test } from "@servicenow/sdk/core";

import { skillEvaluationUser } from "./groups.now.ts";

const SUBMISSION_TABLE = "x_711398_se_submission";

export const testMemberSubmissionJourney = Test(
  {
    $id: Now.ID["atf-member-submission-journey"],
    name: "Member submission journey - UI acceptance",
    description:
      "Validates Member navigation, form defaults, Draft Level hiding, and related list exposure.",
    active: true,
    failOnServerError: true,
  },
  (atf) => {
    atf.server.createUser({
      $id: Now.ID["atf-member-journey-user"],
      firstName: "ATF",
      lastName: "Member Persona",
      groups: [skillEvaluationUser],
      impersonate: true,
    });

    atf.form.openNewForm({
      $id: Now.ID["atf-member-open-new-form"],
      table: SUBMISSION_TABLE,
      formUI: "standard_ui",
    });

    atf.form.fieldStateValidation({
      $id: Now.ID["atf-member-validate-draft-fields"],
      table: SUBMISSION_TABLE,
      visible: ["number", "assigned_to", "state", "valid", "score", "description", "work_notes"],
      notVisible: ["level"],
      readOnly: ["number", "assigned_to", "state", "valid", "score"],
      notReadOnly: ["description", "work_notes"],
      formUI: "standard_ui",
    });

    atf.form.setFieldValue({
      $id: Now.ID["atf-member-set-description"],
      table: SUBMISSION_TABLE,
      fieldValues: {
        description: "Member UI Journey self-assessment",
      },
      formUI: "standard_ui",
    });

    const submitResult = atf.form.submitForm({
      $id: Now.ID["atf-member-submit-draft"],
      assert: "form_submitted_to_server",
      formUI: "standard_ui",
    });

    atf.form.openExistingRecord({
      $id: Now.ID["atf-member-reopen-saved-draft"],
      table: SUBMISSION_TABLE,
      recordId: submitResult.record_id,
      formUI: "standard_ui",
    });

    atf.list.relatedListVisibility({
      $id: Now.ID["atf-member-validate-related-lists"],
      table: SUBMISSION_TABLE,
      visible: [
        "x_711398_se_skill_assessment.submission",
        "x_711398_se_cert_acquisition.submission",
      ],
    });

    atf.form.uiActionVisibility({
      $id: Now.ID["atf-member-validate-submit-action"],
      table: SUBMISSION_TABLE,
      visible: ["submit_for_review"],
      formUI: "standard_ui",
    });
  },
);
