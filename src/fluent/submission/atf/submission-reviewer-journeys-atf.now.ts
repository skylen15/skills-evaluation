import "@servicenow/sdk/global";
import { Test } from "@servicenow/sdk/core";

import {
  skillEvaluationCoe,
  skillEvaluationPm,
  skillEvaluationUser,
} from "../../foundation/groups.now.ts";
import { seAdmin } from "../../foundation/roles.now.ts";
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
} from "../submission-menu.now.ts";

const SUBMISSION_TABLE = "x_711398_se_submission";

const PM_APPROVE_ACTION = "2873cba923a442daaacf36796847cd50";

const PM_REJECT_ACTION = "04d6a7685c244e90a07719dda70bef82";

const COE_APPROVE_ACTION = "35046450d8b44c05aac3a9d6acfcd8a4";

const COE_REJECT_ACTION = "f8eea6a97daa46debc62052537a6fbc8";

export const testReviewerAdminJourneys = Test(
  {
    $id: Now.ID["atf-reviewer-admin-journeys"],
    name: "Reviewer and Admin journeys - UI acceptance",
    description:
      "Validates PM and CoE real gate actions, wrong-role/wrong-state/self-approval refusal, direct se_admin module visibility without gate access, and Completed terminal lock.",
    active: true,
    failOnServerError: true,
  },
  (atf) => {
    const member = atf.server.createUser({
      $id: Now.ID["atf-raj-member-user"],
      firstName: "ATF",
      lastName: "Raj Member",
      groups: [skillEvaluationUser],
    });

    const pm = atf.server.createUser({
      $id: Now.ID["atf-raj-pm-user"],
      firstName: "ATF",
      lastName: "Raj PM",
      groups: [skillEvaluationPm],
    });

    const coe = atf.server.createUser({
      $id: Now.ID["atf-raj-coe-user"],
      firstName: "ATF",
      lastName: "Raj CoE",
      groups: [skillEvaluationCoe],
    });

    const adminUser = atf.server.createUser({
      $id: Now.ID["atf-raj-se-admin-user"],
      firstName: "ATF",
      lastName: "Raj Admin",
      roles: [seAdmin],
    });

    // --- Scenario 1: Direct se_admin user module visibility and gate refusal ---
    atf.server.impersonate({
      $id: Now.ID["atf-raj-impersonate-admin-nav"],
      user: adminUser.user,
    });

    atf.applicationNavigator.moduleVisibility({
      $id: Now.ID["atf-raj-admin-module-visibility"],
      visibleModules: [
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

    // --- Create Submissions under Member context ---
    atf.server.impersonate({
      $id: Now.ID["atf-raj-impersonate-member-setup"],
      user: member.user,
    });

    // Sub 1: For PM Reject journey
    const sub1 = atf.server.recordInsert({
      $id: Now.ID["atf-raj-create-sub-1"],
      table: SUBMISSION_TABLE,
      fieldValues: {
        description: "Sub 1 for PM Reject test",
      },
      assert: "record_successfully_inserted",
      enforceSecurity: true,
    });

    // Sub 2: For PM Approve + CoE Approve journey
    const sub2 = atf.server.recordInsert({
      $id: Now.ID["atf-raj-create-sub-2"],
      table: SUBMISSION_TABLE,
      fieldValues: {
        description: "Sub 2 for PM Approve and CoE Approve test",
      },
      assert: "record_successfully_inserted",
      enforceSecurity: true,
    });

    // Sub 3: For CoE Reject journey
    const sub3 = atf.server.recordInsert({
      $id: Now.ID["atf-raj-create-sub-3"],
      table: SUBMISSION_TABLE,
      fieldValues: {
        description: "Sub 3 for CoE Reject test",
      },
      assert: "record_successfully_inserted",
      enforceSecurity: true,
    });

    // Submit Sub 1, Sub 2, and Sub 3 to Submitted state
    atf.server.runServerSideScript({
      $id: Now.ID["atf-raj-member-submit-all"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          var submitModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/submission/submit-for-review.ts");

          var gr1 = new GlideRecord("x_711398_se_submission");
          gr1.addQuery("description", "Sub 1 for PM Reject test");
          gr1.query();
          if (gr1.next()) { submitModule.submitForReview(gr1); }

          var gr2 = new GlideRecord("x_711398_se_submission");
          gr2.addQuery("description", "Sub 2 for PM Approve and CoE Approve test");
          gr2.query();
          if (gr2.next()) { submitModule.submitForReview(gr2); }

          var gr3 = new GlideRecord("x_711398_se_submission");
          gr3.addQuery("description", "Sub 3 for CoE Reject test");
          gr3.query();
          if (gr3.next()) { submitModule.submitForReview(gr3); }
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });

    // --- Negative Checks on Submitted Sub 1 ---
    // A. Self-approval: Member opens own Submitted record -> gate actions NOT visible
    atf.form.openExistingRecord({
      $id: Now.ID["atf-raj-member-open-own-submitted"],
      table: SUBMISSION_TABLE,
      recordId: sub1.record_id,
      formUI: "standard_ui",
    });

    atf.form.uiActionVisibility({
      $id: Now.ID["atf-raj-member-check-no-gate-actions"],
      table: SUBMISSION_TABLE,
      notVisible: [
        "pm_approve_submission",
        "pm_reject_submission",
        "coe_approve_submission",
        "coe_reject_submission",
      ],
      formUI: "standard_ui",
    });

    // B. Direct se_admin user (no PM/CoE group) opens Submitted record -> gate actions NOT visible
    atf.server.impersonate({
      $id: Now.ID["atf-raj-impersonate-admin-check-gates"],
      user: adminUser.user,
    });

    atf.form.openExistingRecord({
      $id: Now.ID["atf-raj-admin-open-submitted"],
      table: SUBMISSION_TABLE,
      recordId: sub1.record_id,
      formUI: "standard_ui",
    });

    atf.form.uiActionVisibility({
      $id: Now.ID["atf-raj-admin-check-no-gates"],
      table: SUBMISSION_TABLE,
      notVisible: [
        "pm_approve_submission",
        "pm_reject_submission",
        "coe_approve_submission",
        "coe_reject_submission",
      ],
      formUI: "standard_ui",
    });

    // C. Wrong role: CoE Head opens Submitted record -> no gates visible
    atf.server.impersonate({
      $id: Now.ID["atf-raj-impersonate-coe-check-submitted"],
      user: coe.user,
    });

    atf.form.openExistingRecord({
      $id: Now.ID["atf-raj-coe-open-submitted"],
      table: SUBMISSION_TABLE,
      recordId: sub1.record_id,
      formUI: "standard_ui",
    });

    atf.form.uiActionVisibility({
      $id: Now.ID["atf-raj-coe-check-submitted-actions"],
      table: SUBMISSION_TABLE,
      notVisible: [
        "pm_approve_submission",
        "pm_reject_submission",
        "coe_approve_submission",
        "coe_reject_submission",
      ],
      formUI: "standard_ui",
    });

    // --- PM Persona: Real Reject on Sub 1 ---
    atf.server.impersonate({
      $id: Now.ID["atf-raj-impersonate-pm-reject"],
      user: pm.user,
    });

    atf.form.openExistingRecord({
      $id: Now.ID["atf-raj-pm-open-sub-1"],
      table: SUBMISSION_TABLE,
      recordId: sub1.record_id,
      formUI: "standard_ui",
    });

    atf.form.uiActionVisibility({
      $id: Now.ID["atf-raj-pm-check-sub-1-actions"],
      table: SUBMISSION_TABLE,
      visible: ["pm_approve_submission", "pm_reject_submission"],
      notVisible: ["submit_for_review", "coe_approve_submission", "coe_reject_submission"],
      formUI: "standard_ui",
    });

    atf.form.clickUIAction({
      $id: Now.ID["atf-raj-pm-click-reject-sub-1"],
      table: SUBMISSION_TABLE,
      uiAction: PM_REJECT_ACTION,
      assert: "form_submitted_to_server",
      formUI: "standard_ui",
    });

    // Verify Sub 1 returned to Draft server-side
    atf.server.recordValidation({
      $id: Now.ID["atf-raj-validate-sub-1-rejected-draft"],
      table: SUBMISSION_TABLE,
      recordId: sub1.record_id,
      fieldValues: "state=draft",
      assert: "record_validated",
    });

    // Wrong state check: PM opens Sub 1 in Draft -> PM actions NOT visible
    atf.form.openExistingRecord({
      $id: Now.ID["atf-raj-pm-open-sub-1-draft"],
      table: SUBMISSION_TABLE,
      recordId: sub1.record_id,
      formUI: "standard_ui",
    });

    atf.form.uiActionVisibility({
      $id: Now.ID["atf-raj-pm-check-sub-1-draft-actions"],
      table: SUBMISSION_TABLE,
      notVisible: [
        "pm_approve_submission",
        "pm_reject_submission",
        "coe_approve_submission",
        "coe_reject_submission",
      ],
      formUI: "standard_ui",
    });

    // --- PM Persona: Real Approve on Sub 2 and Sub 3 ---
    atf.form.openExistingRecord({
      $id: Now.ID["atf-raj-pm-open-sub-2"],
      table: SUBMISSION_TABLE,
      recordId: sub2.record_id,
      formUI: "standard_ui",
    });

    atf.form.clickUIAction({
      $id: Now.ID["atf-raj-pm-click-approve-sub-2"],
      table: SUBMISSION_TABLE,
      uiAction: PM_APPROVE_ACTION,
      assert: "form_submitted_to_server",
      formUI: "standard_ui",
    });

    // Verify Sub 2 moved to Reviewed
    atf.server.recordValidation({
      $id: Now.ID["atf-raj-validate-sub-2-reviewed"],
      table: SUBMISSION_TABLE,
      recordId: sub2.record_id,
      fieldValues: "state=reviewed",
      assert: "record_validated",
    });

    // Also approve Sub 3 to Reviewed for CoE Reject test
    atf.form.openExistingRecord({
      $id: Now.ID["atf-raj-pm-open-sub-3"],
      table: SUBMISSION_TABLE,
      recordId: sub3.record_id,
      formUI: "standard_ui",
    });

    atf.form.clickUIAction({
      $id: Now.ID["atf-raj-pm-click-approve-sub-3"],
      table: SUBMISSION_TABLE,
      uiAction: PM_APPROVE_ACTION,
      assert: "form_submitted_to_server",
      formUI: "standard_ui",
    });

    atf.server.recordValidation({
      $id: Now.ID["atf-raj-validate-sub-3-reviewed"],
      table: SUBMISSION_TABLE,
      recordId: sub3.record_id,
      fieldValues: "state=reviewed",
      assert: "record_validated",
    });

    // --- CoE Head Persona: Real Reject on Sub 3 ---
    atf.server.impersonate({
      $id: Now.ID["atf-raj-impersonate-coe-actions"],
      user: coe.user,
    });

    atf.form.openExistingRecord({
      $id: Now.ID["atf-raj-coe-open-sub-3"],
      table: SUBMISSION_TABLE,
      recordId: sub3.record_id,
      formUI: "standard_ui",
    });

    atf.form.uiActionVisibility({
      $id: Now.ID["atf-raj-coe-check-sub-3-actions"],
      table: SUBMISSION_TABLE,
      visible: ["coe_approve_submission", "coe_reject_submission"],
      notVisible: ["submit_for_review", "pm_approve_submission", "pm_reject_submission"],
      formUI: "standard_ui",
    });

    atf.form.clickUIAction({
      $id: Now.ID["atf-raj-coe-click-reject-sub-3"],
      table: SUBMISSION_TABLE,
      uiAction: COE_REJECT_ACTION,
      assert: "form_submitted_to_server",
      formUI: "standard_ui",
    });

    // Verify Sub 3 returned to Draft
    atf.server.recordValidation({
      $id: Now.ID["atf-raj-validate-sub-3-draft"],
      table: SUBMISSION_TABLE,
      recordId: sub3.record_id,
      fieldValues: "state=draft",
      assert: "record_validated",
    });

    // --- CoE Head Persona: Real Approve on Sub 2 to Completed ---
    atf.form.openExistingRecord({
      $id: Now.ID["atf-raj-coe-open-sub-2"],
      table: SUBMISSION_TABLE,
      recordId: sub2.record_id,
      formUI: "standard_ui",
    });

    atf.form.uiActionVisibility({
      $id: Now.ID["atf-raj-coe-check-sub-2-actions"],
      table: SUBMISSION_TABLE,
      visible: ["coe_approve_submission", "coe_reject_submission"],
      notVisible: ["submit_for_review", "pm_approve_submission", "pm_reject_submission"],
      formUI: "standard_ui",
    });

    atf.form.clickUIAction({
      $id: Now.ID["atf-raj-coe-click-approve-sub-2"],
      table: SUBMISSION_TABLE,
      uiAction: COE_APPROVE_ACTION,
      assert: "form_submitted_to_server",
      formUI: "standard_ui",
    });

    // Verify Sub 2 is Completed and Valid=true
    atf.server.recordValidation({
      $id: Now.ID["atf-raj-validate-sub-2-completed"],
      table: SUBMISSION_TABLE,
      recordId: sub2.record_id,
      fieldValues: "state=completed^valid=true",
      assert: "record_validated",
    });

    // --- Terminal Verification on Completed Sub 2 ---
    atf.form.openExistingRecord({
      $id: Now.ID["atf-raj-coe-open-completed-sub-2"],
      table: SUBMISSION_TABLE,
      recordId: sub2.record_id,
      formUI: "standard_ui",
    });

    // Terminal field lock: every field including work_notes is read-only
    atf.form.fieldStateValidation({
      $id: Now.ID["atf-raj-completed-field-lock"],
      table: SUBMISSION_TABLE,
      readOnly: [
        "number",
        "assigned_to",
        "state",
        "valid",
        "score",
        "level",
        "description",
        "work_notes",
      ],
      formUI: "standard_ui",
    });

    // Absent gate actions
    atf.form.uiActionVisibility({
      $id: Now.ID["atf-raj-completed-absent-gate-actions"],
      table: SUBMISSION_TABLE,
      notVisible: [
        "submit_for_review",
        "pm_approve_submission",
        "pm_reject_submission",
        "coe_approve_submission",
        "coe_reject_submission",
      ],
      formUI: "standard_ui",
    });
  },
);
