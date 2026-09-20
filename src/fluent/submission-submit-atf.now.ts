import { Test } from "@servicenow/sdk/core";
import "@servicenow/sdk/global";

import { skillEvaluationUser } from "./groups.now.ts";

const SUBMISSION_TABLE = "x_711398_se_submission";

export const testSubmissionSubmitForReview = Test(
  {
    $id: Now.ID["atf-submission-submit-for-review"],
    name: "Submission - submit for review",
    description:
      "Verifies that submitting with Description moves state to Submitted, while submitting without Description or by a non-assigned user is refused.",
    active: true,
    failOnServerError: true,
  },
  (atf) => {
    const member = atf.server.createUser({
      $id: Now.ID["atf-submission-submit-create-member"],
      firstName: "ATF",
      lastName: "Submit Member",
      groups: [skillEvaluationUser],
      impersonate: true,
    });

    const otherUser = atf.server.createUser({
      $id: Now.ID["atf-submission-submit-create-other-user"],
      firstName: "ATF",
      lastName: "Submit Other User",
      groups: [skillEvaluationUser],
    });

    const submission = atf.server.recordInsert({
      $id: Now.ID["atf-submission-submit-insert-submission"],
      table: SUBMISSION_TABLE,
      fieldValues: {
        description: "",
      },
      assert: "record_successfully_inserted",
      enforceSecurity: true,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-submission-submit-assertions"],
      jasmineVersion: "3.1",
      script: `
        // Type: ATF Run Server Side Script
        // ES mode: ES5 (Rhino)
        // Script context: outputs, steps, params, stepResult, assertEqual
        (function(outputs, steps, params, stepResult, assertEqual) {
          var SUBMISSION_TABLE = "x_711398_se_submission";
          var submissionId = "${submission.record_id}";
          var memberId = "${member.user}";
          var otherUserId = "${otherUser.user}";
          var submitModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/submit-for-review.ts");

          describe("Submission submit for review", function() {
            it("refuses submit when Description is empty", function() {
              gs.getSession().impersonate(memberId);
              var grSub = new GlideRecord(SUBMISSION_TABLE);
              expect(grSub.get(submissionId)).toBe(true);
              expect(grSub.getValue("state")).toBe("draft");

              submitModule.submitForReview(grSub);

              var grReload = new GlideRecord(SUBMISSION_TABLE);
              expect(grReload.get(submissionId)).toBe(true);
              expect(grReload.getValue("state")).toBe("draft");
            });

            it("refuses submit when caller is not Assigned to", function() {
              // Add a valid description first
              gs.getSession().impersonate(memberId);
              var grSub = new GlideRecord(SUBMISSION_TABLE);
              expect(grSub.get(submissionId)).toBe(true);
              grSub.setValue("description", "Valid self-assessment ready for review");
              grSub.update();

              // Impersonate other user who is not assigned_to
              gs.getSession().impersonate(otherUserId);
              var grOther = new GlideRecord(SUBMISSION_TABLE);
              if (grOther.get(submissionId)) {
                submitModule.submitForReview(grOther);
              }

              var grReload = new GlideRecord(SUBMISSION_TABLE);
              expect(grReload.get(submissionId)).toBe(true);
              expect(grReload.getValue("state")).toBe("draft");
            });

            it("moves state to Submitted when submitted with Description by Assigned to", function() {
              gs.getSession().impersonate(memberId);
              var grSub = new GlideRecord(SUBMISSION_TABLE);
              expect(grSub.get(submissionId)).toBe(true);

              submitModule.submitForReview(grSub);

              var grReload = new GlideRecord(SUBMISSION_TABLE);
              expect(grReload.get(submissionId)).toBe(true);
              expect(grReload.getValue("state")).toBe("submitted");
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });
  },
);
