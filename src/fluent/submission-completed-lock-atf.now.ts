import { Test } from "@servicenow/sdk/core";
import "@servicenow/sdk/global";

import { skillEvaluationCoe, skillEvaluationPm, skillEvaluationUser } from "./groups.now.ts";

const SUBMISSION_TABLE = "x_711398_se_submission";

export const testSubmissionCompletedImmutability = Test(
  {
    $id: Now.ID["atf-submission-completed-immutability"],
    name: "Submission - completed immutability",
    description:
      "Verifies that a Completed Submission refuses any updates, including edits to Description and Work notes.",
    active: true,
    failOnServerError: true,
  },
  (atf) => {
    const member = atf.server.createUser({
      $id: Now.ID["atf-submission-lock-create-member"],
      firstName: "ATF",
      lastName: "Lock Member",
      groups: [skillEvaluationUser],
      impersonate: true,
    });

    const pm = atf.server.createUser({
      $id: Now.ID["atf-submission-lock-create-pm"],
      firstName: "ATF",
      lastName: "Lock PM",
      groups: [skillEvaluationPm],
    });

    const coeHead = atf.server.createUser({
      $id: Now.ID["atf-submission-lock-create-coe"],
      firstName: "ATF",
      lastName: "Lock CoE Head",
      groups: [skillEvaluationCoe],
    });

    const submission = atf.server.recordInsert({
      $id: Now.ID["atf-submission-lock-insert-submission"],
      table: SUBMISSION_TABLE,
      fieldValues: {
        description: "Original completed submission description",
      },
      assert: "record_successfully_inserted",
      enforceSecurity: true,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-submission-lock-assertions"],
      jasmineVersion: "3.1",
      script: `
        // Type: ATF Run Server Side Script
        // ES mode: ES5 (Rhino)
        // Script context: outputs, steps, params, stepResult, assertEqual
        (function(outputs, steps, params, stepResult, assertEqual) {
          var SUBMISSION_TABLE = "x_711398_se_submission";
          var memberId = "${member.user}";
          var pmId = "${pm.user}";
          var coeHeadId = "${coeHead.user}";
          var submissionId = "${submission.record_id}";

          var submitModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/submit-for-review.ts");
          var pmModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/take-pm-gate.ts");
          var coeModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/take-coe-gate.ts");

          describe("Completed Submission immutability", function() {
            it("drives Submission to Completed state", function() {
              gs.getSession().impersonate(memberId);
              var grSub = new GlideRecord(SUBMISSION_TABLE);
              expect(grSub.get(submissionId)).toBe(true);
              submitModule.submitForReview(grSub);

              gs.getSession().impersonate(pmId);
              var grPm = new GlideRecord(SUBMISSION_TABLE);
              expect(grPm.get(submissionId)).toBe(true);
              pmModule.approveAtPmGate(grPm);

              gs.getSession().impersonate(coeHeadId);
              var grCoe = new GlideRecord(SUBMISSION_TABLE);
              expect(grCoe.get(submissionId)).toBe(true);
              coeModule.approveAtCoeGate(grCoe);

              var grCheck = new GlideRecord(SUBMISSION_TABLE);
              expect(grCheck.get(submissionId)).toBe(true);
              expect(grCheck.getValue("state")).toBe("completed");
            });

            it("refuses updating Description on Completed Submission", function() {
              gs.getSession().impersonate(memberId);
              var grSub = new GlideRecord(SUBMISSION_TABLE);
              expect(grSub.get(submissionId)).toBe(true);

              grSub.setValue("description", "Modified description after completion");
              var updateResult = grSub.update();
              expect(updateResult).toBeNull();

              var grReload = new GlideRecord(SUBMISSION_TABLE);
              expect(grReload.get(submissionId)).toBe(true);
              expect(grReload.getValue("description")).toBe("Original completed submission description");
            });

            it("refuses updating Work notes on Completed Submission", function() {
              gs.getSession().impersonate(pmId);
              var grSub = new GlideRecord(SUBMISSION_TABLE);
              expect(grSub.get(submissionId)).toBe(true);

              grSub.setValue("work_notes", "Attempting work notes update on completed record");
              var updateResult = grSub.update();
              expect(updateResult).toBeNull();

              var grReload = new GlideRecord(SUBMISSION_TABLE);
              expect(grReload.get(submissionId)).toBe(true);
              expect(grReload.getValue("state")).toBe("completed");
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });
  },
);
