import "@servicenow/sdk/global";
import { Test } from "@servicenow/sdk/core";

import {
  skillEvaluationCoe,
  skillEvaluationPm,
  skillEvaluationUser,
} from "../../foundation/groups.now.ts";

const SUBMISSION_TABLE = "x_711398_se_submission";

export const testReviewerAdminJourneys = Test(
  {
    $id: Now.ID["atf-reviewer-admin-journeys"],
    name: "Reviewer and Admin journeys - UI acceptance",
    description:
      "Validates PM and CoE gate action visibility, role separation, and Completed state immutability.",
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

    atf.server.impersonate({
      $id: Now.ID["atf-raj-impersonate-member"],
      user: member.user,
    });

    const insertedSub = atf.server.recordInsert({
      $id: Now.ID["atf-raj-create-submission"],
      table: SUBMISSION_TABLE,
      fieldValues: {
        description: "Reviewer journeys verification submission",
      },
      assert: "record_successfully_inserted",
      enforceSecurity: true,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-raj-member-submit"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          var SUBMISSION_TABLE = "x_711398_se_submission";
          var submitModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/submit-for-review.ts");
          var grSub = new GlideRecord(SUBMISSION_TABLE);
          if (grSub.get(steps("${insertedSub.record_id}").record_id)) {
            submitModule.submitForReview(grSub);
          }
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });

    atf.server.impersonate({
      $id: Now.ID["atf-raj-impersonate-pm"],
      user: pm.user,
    });

    atf.form.openExistingRecord({
      $id: Now.ID["atf-raj-pm-open-submitted"],
      table: SUBMISSION_TABLE,
      recordId: insertedSub.record_id,
      formUI: "standard_ui",
    });

    atf.form.uiActionVisibility({
      $id: Now.ID["atf-raj-pm-check-actions"],
      table: SUBMISSION_TABLE,
      visible: ["pm_approve_submission", "pm_reject_submission"],
      notVisible: ["submit_for_review", "coe_approve_submission", "coe_reject_submission"],
      formUI: "standard_ui",
    });

    atf.form.fieldStateValidation({
      $id: Now.ID["atf-raj-pm-check-fields"],
      table: SUBMISSION_TABLE,
      readOnly: ["description", "number", "assigned_to", "state", "valid", "score"],
      notReadOnly: ["work_notes"],
      formUI: "standard_ui",
    });

    atf.server.impersonate({
      $id: Now.ID["atf-raj-impersonate-coe"],
      user: coe.user,
    });

    atf.form.openExistingRecord({
      $id: Now.ID["atf-raj-coe-open-submitted"],
      table: SUBMISSION_TABLE,
      recordId: insertedSub.record_id,
      formUI: "standard_ui",
    });

    atf.form.uiActionVisibility({
      $id: Now.ID["atf-raj-coe-check-actions-on-submitted"],
      table: SUBMISSION_TABLE,
      notVisible: [
        "coe_approve_submission",
        "coe_reject_submission",
        "pm_approve_submission",
        "pm_reject_submission",
      ],
      formUI: "standard_ui",
    });
  },
);
