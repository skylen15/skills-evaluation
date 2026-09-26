import "@servicenow/sdk/global";
import { Test } from "@servicenow/sdk/core";

import { skillEvaluationUser } from "../../foundation/groups.now.ts";
import {
  moduleCertificates,
  moduleLevels,
  moduleProductLines,
  moduleSeAdminSeparator,
  moduleSkills,
} from "../../foundation/se-admin-menu.now.ts";
import {
  moduleAllSubmissions,
  moduleAwaitingApproval,
  moduleCompletedSubmissions,
  moduleMySkillEvaluations,
  moduleNewEvaluation,
} from "../submission-menu.now.ts";

const SUBMISSION_TABLE = "x_711398_se_submission";

export const testMemberSubmissionJourney = Test(
  {
    $id: Now.ID["atf-member-submission-journey"],
    name: "Member submission journey - UI acceptance",
    description:
      "Validates Member navigation, form creation, Draft Level hiding, related list controls, real Submit for Review action, persisted Submitted state, Level visibility, action disappearance, content lock, and Work notes access.",
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

    atf.applicationNavigator.moduleVisibility({
      $id: Now.ID["atf-member-nav-visibility"],
      visibleModules: [moduleNewEvaluation, moduleMySkillEvaluations],
      notVisibleModules: [
        moduleAllSubmissions,
        moduleAwaitingApproval,
        moduleCompletedSubmissions,
        moduleSeAdminSeparator,
        moduleProductLines,
        moduleSkills,
        moduleCertificates,
        moduleLevels,
      ],
    });

    atf.applicationNavigator.navigateToModule({
      $id: Now.ID["atf-member-navigate-new-eval"],
      module: moduleNewEvaluation,
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

    atf.list.listUIActionVisibility({
      $id: Now.ID["atf-member-check-skill-assessment-controls"],
      table: SUBMISSION_TABLE,
      relatedList: "x_711398_se_skill_assessment.submission",
      relatedListTable: "x_711398_se_skill_assessment",
      notVisible: ["New"],
    });
    // Validate Cert Acquisition evidence fields visibility on form
    atf.form.openNewForm({
      $id: Now.ID["atf-member-open-cert-acq-form"],
      table: "x_711398_se_cert_acquisition",
      formUI: "standard_ui",
    });

    atf.form.fieldStateValidation({
      $id: Now.ID["atf-member-validate-cert-evidence-fields"],
      table: "x_711398_se_cert_acquisition",
      visible: ["certification_number", "certified_date", "servicenow_release"],
      formUI: "standard_ui",
    });

    // Re-open saved draft submission to continue journey
    atf.form.openExistingRecord({
      $id: Now.ID["atf-member-reopen-draft-after-cert-check"],
      table: SUBMISSION_TABLE,
      recordId: submitResult.record_id,
      formUI: "standard_ui",
    });

    atf.form.uiActionVisibility({
      $id: Now.ID["atf-member-validate-submit-action"],
      table: SUBMISSION_TABLE,
      visible: ["submit_for_review"],
      formUI: "standard_ui",
    });

    atf.form.clickUIAction({
      $id: Now.ID["atf-member-click-submit-for-review"],
      table: SUBMISSION_TABLE,
      uiAction: "eca8ad8c42274843afc9ca351218af56",
      assert: "form_submitted_to_server",
      formUI: "standard_ui",
    });

    atf.server.recordValidation({
      $id: Now.ID["atf-member-validate-persisted-submitted"],
      table: SUBMISSION_TABLE,
      recordId: submitResult.record_id,
      fieldValues: "state=submitted",
      assert: "record_validated",
    });

    atf.form.openExistingRecord({
      $id: Now.ID["atf-member-open-submitted-record"],
      table: SUBMISSION_TABLE,
      recordId: submitResult.record_id,
      formUI: "standard_ui",
    });

    atf.form.fieldStateValidation({
      $id: Now.ID["atf-member-validate-level-visible"],
      table: SUBMISSION_TABLE,
      visible: ["level"],
      formUI: "standard_ui",
    });

    atf.form.uiActionVisibility({
      $id: Now.ID["atf-member-validate-submit-disappeared"],
      table: SUBMISSION_TABLE,
      notVisible: ["submit_for_review"],
      formUI: "standard_ui",
    });

    atf.form.fieldStateValidation({
      $id: Now.ID["atf-member-validate-submitted-fields-lock"],
      table: SUBMISSION_TABLE,
      readOnly: ["description", "number", "assigned_to", "state", "valid", "score", "level"],
      notReadOnly: ["work_notes"],
      formUI: "standard_ui",
    });

    atf.list.listUIActionVisibility({
      $id: Now.ID["atf-member-check-cert-acq-submitted-controls"],
      table: SUBMISSION_TABLE,
      relatedList: "x_711398_se_cert_acquisition.submission",
      relatedListTable: "x_711398_se_cert_acquisition",
      notVisible: ["New"],
    });

    atf.form.setFieldValue({
      $id: Now.ID["atf-member-set-submitted-work-notes"],
      table: SUBMISSION_TABLE,
      fieldValues: {
        work_notes: "Member added work note during review",
      },
      formUI: "standard_ui",
    });

    atf.form.submitForm({
      $id: Now.ID["atf-member-save-work-notes"],
      assert: "form_submitted_to_server",
      formUI: "standard_ui",
    });

    atf.server.recordValidation({
      $id: Now.ID["atf-member-validate-persisted-after-work-notes"],
      table: SUBMISSION_TABLE,
      recordId: submitResult.record_id,
      fieldValues: "state=submitted",
      assert: "record_validated",
    });
  },
);
