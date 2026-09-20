import { Test } from "@servicenow/sdk/core";
import "@servicenow/sdk/global";

import { skillEvaluationUser } from "../../foundation/groups.now.ts";

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

    atf.server.impersonate({
      $id: Now.ID["atf-submission-submit-impersonate-member-initial"],
      user: member.user,
    });

    atf.server.recordInsert({
      $id: Now.ID["atf-submission-submit-insert-submission"],
      table: SUBMISSION_TABLE,
      fieldValues: {
        description: "",
      },
      assert: "record_successfully_inserted",
      enforceSecurity: true,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-submission-submit-assert-empty-desc"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          var SUBMISSION_TABLE = "x_711398_se_submission";
          var submitModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/submit-for-review.ts");
          var grSeedSub = new GlideRecord(SUBMISSION_TABLE);
          grSeedSub.addQuery("assigned_to", gs.getUserID());
          grSeedSub.setLimit(1);
          grSeedSub.query();
          var submissionId = grSeedSub.next() ? grSeedSub.getUniqueValue() : "";

          describe("Submission submit for review - empty description", function() {
            it("refuses submit when Description is empty", function() {
              var grSub = new GlideRecord(SUBMISSION_TABLE);
              expect(grSub.get(submissionId)).toBe(true);
              expect(grSub.getValue("state")).toBe("draft");

              submitModule.submitForReview(grSub);

              var grReload = new GlideRecord(SUBMISSION_TABLE);
              expect(grReload.get(submissionId)).toBe(true);
              expect(grReload.getValue("state")).toBe("draft");
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-submission-submit-set-valid-desc"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          var SUBMISSION_TABLE = "x_711398_se_submission";
          var grSub = new GlideRecord(SUBMISSION_TABLE);
          grSub.addQuery("assigned_to", gs.getUserID());
          grSub.setLimit(1);
          grSub.query();
          var subId = "";
          if (grSub.next()) {
            subId = grSub.getUniqueValue();
            grSub.setValue("description", "Valid self-assessment ready for review");
            grSub.update();
          }
          outputs.table = SUBMISSION_TABLE;
          outputs.record_id = subId;
          describe("Submission set valid description", function() {
            it("updates description", function() {
              expect(grSub.getValue("description")).toBe("Valid self-assessment ready for review");
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });

    atf.server.impersonate({
      $id: Now.ID["atf-submission-submit-impersonate-other"],
      user: otherUser.user,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-submission-submit-assert-non-assigned"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          var SUBMISSION_TABLE = "x_711398_se_submission";
          var submitModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/submit-for-review.ts");
          var grMember = new GlideRecord("sys_user");
          grMember.addQuery("first_name", "ATF");
          grMember.addQuery("last_name", "Submit Member");
          grMember.setLimit(1);
          grMember.query();
          var memberId = grMember.next() ? grMember.getUniqueValue() : "";

          var grSub = new GlideRecord(SUBMISSION_TABLE);
          grSub.setWorkflow(false);
          grSub.addQuery("assigned_to", memberId);
          grSub.setLimit(1);
          grSub.query();
          var submissionId = grSub.next() ? grSub.getUniqueValue() : "";

          describe("Submission submit for review - non assigned", function() {
            it("refuses submit when caller is not Assigned to", function() {
              expect(submissionId).not.toBe("");
              var grTarget = new GlideRecord(SUBMISSION_TABLE);
              grTarget.setWorkflow(false);
              expect(grTarget.get(submissionId)).toBe(true);
              submitModule.submitForReview(grTarget);

              var grReload = new GlideRecord(SUBMISSION_TABLE);
              grReload.setWorkflow(false);
              expect(grReload.get(submissionId)).toBe(true);
              expect(grReload.getValue("state")).toBe("draft");
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });

    atf.server.impersonate({
      $id: Now.ID["atf-submission-submit-impersonate-member-final"],
      user: member.user,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-submission-submit-assert-success"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          var SUBMISSION_TABLE = "x_711398_se_submission";
          var submitModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/submit-for-review.ts");
          var grSub = new GlideRecord(SUBMISSION_TABLE);
          grSub.addQuery("assigned_to", gs.getUserID());
          grSub.setLimit(1);
          grSub.query();
          var submissionId = grSub.next() ? grSub.getUniqueValue() : "";

          describe("Submission submit for review - success", function() {
            it("moves state to Submitted when submitted with Description by Assigned to", function() {
              var grTarget = new GlideRecord(SUBMISSION_TABLE);
              expect(grTarget.get(submissionId)).toBe(true);
              submitModule.submitForReview(grTarget);

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
