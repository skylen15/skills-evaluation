import { Test } from "@servicenow/sdk/core";
import "@servicenow/sdk/global";

import { skillEvaluationCoe, skillEvaluationPm, skillEvaluationUser } from "./groups.now.ts";

const SUBMISSION_TABLE = "x_711398_se_submission";

export const testSubmissionGates = Test(
  {
    $id: Now.ID["atf-submission-gates"],
    name: "Submission - PM and CoE Head gates",
    description:
      "Verifies that a PM can approve to Reviewed or reject to Draft, a CoE Head can complete (setting Valid and clearing previous Valid), and self-approval is refused.",
    active: true,
    failOnServerError: true,
  },
  (atf) => {
    const member = atf.server.createUser({
      $id: Now.ID["atf-submission-gates-create-member"],
      firstName: "ATF",
      lastName: "Gates Member",
      groups: [skillEvaluationUser],
      impersonate: true,
    });

    const pm = atf.server.createUser({
      $id: Now.ID["atf-submission-gates-create-pm"],
      firstName: "ATF",
      lastName: "Gates PM",
      groups: [skillEvaluationPm],
    });

    const coeHead = atf.server.createUser({
      $id: Now.ID["atf-submission-gates-create-coe"],
      firstName: "ATF",
      lastName: "Gates CoE Head",
      groups: [skillEvaluationCoe],
    });

    const firstSubmission = atf.server.recordInsert({
      $id: Now.ID["atf-submission-gates-insert-first-submission"],
      table: SUBMISSION_TABLE,
      fieldValues: {
        description: "First submission for lifecycle and sibling valid gate testing",
      },
      assert: "record_successfully_inserted",
      enforceSecurity: true,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-submission-gates-assertions"],
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
          var firstSubId = "${firstSubmission.record_id}";

          var submitModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/submit-for-review.ts");
          var pmModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/take-pm-gate.ts");
          var coeModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/take-coe-gate.ts");

          describe("Submission approval gates and Valid clearing", function() {
            it("drives first submission to Completed and Valid", function() {
              // Member submits
              gs.getSession().impersonate(memberId);
              var grSub = new GlideRecord(SUBMISSION_TABLE);
              expect(grSub.get(firstSubId)).toBe(true);
              submitModule.submitForReview(grSub);

              // PM approves to Reviewed
              gs.getSession().impersonate(pmId);
              var grPm = new GlideRecord(SUBMISSION_TABLE);
              expect(grPm.get(firstSubId)).toBe(true);
              expect(grPm.getValue("state")).toBe("submitted");
              pmModule.approveAtPmGate(grPm);

              // CoE Head completes
              gs.getSession().impersonate(coeHeadId);
              var grCoe = new GlideRecord(SUBMISSION_TABLE);
              expect(grCoe.get(firstSubId)).toBe(true);
              expect(grCoe.getValue("state")).toBe("reviewed");
              coeModule.approveAtCoeGate(grCoe);

              // First submission is completed and valid
              var grFinal = new GlideRecord(SUBMISSION_TABLE);
              expect(grFinal.get(firstSubId)).toBe(true);
              expect(grFinal.getValue("state")).toBe("completed");
              expect(grFinal.getValue("valid")).toBe("1");
            });

            it("handles PM reject, CoE reject, and clears previous Valid when second completes", function() {
              // Member inserts second submission now that first is completed
              gs.getSession().impersonate(memberId);
              var grNew = new GlideRecord(SUBMISSION_TABLE);
              grNew.initialize();
              grNew.setValue("description", "Second submission testing reject and sibling clear");
              var secondSubId = grNew.insert();
              expect(secondSubId).not.toBeNull();

              // Member submits second submission
              grNew.get(secondSubId);
              submitModule.submitForReview(grNew);
              expect(grNew.getValue("state")).toBe("submitted");

              // PM rejects to Draft
              gs.getSession().impersonate(pmId);
              var grPm = new GlideRecord(SUBMISSION_TABLE);
              expect(grPm.get(secondSubId)).toBe(true);
              pmModule.rejectAtPmGate(grPm);

              var grCheck = new GlideRecord(SUBMISSION_TABLE);
              expect(grCheck.get(secondSubId)).toBe(true);
              expect(grCheck.getValue("state")).toBe("draft");

              // Member re-submits
              gs.getSession().impersonate(memberId);
              expect(grCheck.get(secondSubId)).toBe(true);
              submitModule.submitForReview(grCheck);
              expect(grCheck.getValue("state")).toBe("submitted");

              // PM approves to Reviewed
              gs.getSession().impersonate(pmId);
              expect(grPm.get(secondSubId)).toBe(true);
              pmModule.approveAtPmGate(grPm);

              // CoE Head rejects to Draft
              gs.getSession().impersonate(coeHeadId);
              var grCoe = new GlideRecord(SUBMISSION_TABLE);
              expect(grCoe.get(secondSubId)).toBe(true);
              expect(grCoe.getValue("state")).toBe("reviewed");
              coeModule.rejectAtCoeGate(grCoe);

              expect(grCheck.get(secondSubId)).toBe(true);
              expect(grCheck.getValue("state")).toBe("draft");

              // Member re-submits again
              gs.getSession().impersonate(memberId);
              submitModule.submitForReview(grCheck);

              // PM approves again
              gs.getSession().impersonate(pmId);
              expect(grPm.get(secondSubId)).toBe(true);
              pmModule.approveAtPmGate(grPm);

              // CoE Head completes second submission
              gs.getSession().impersonate(coeHeadId);
              expect(grCoe.get(secondSubId)).toBe(true);
              coeModule.approveAtCoeGate(grCoe);

              // Second submission is now Completed and Valid
              expect(grCheck.get(secondSubId)).toBe(true);
              expect(grCheck.getValue("state")).toBe("completed");
              expect(grCheck.getValue("valid")).toBe("1");

              // First submission's Valid must now be cleared (0)
              var grFirst = new GlideRecord(SUBMISSION_TABLE);
              expect(grFirst.get(firstSubId)).toBe(true);
              expect(grFirst.getValue("valid")).toBe("0");
            });

            it("refuses self-approval when approver is Assigned to", function() {
              // Create a submission assigned to PM
              gs.getSession().impersonate(pmId);
              var grPmSub = new GlideRecord(SUBMISSION_TABLE);
              grPmSub.initialize();
              grPmSub.setValue("description", "Submission assigned to PM for self-approval test");
              var pmSubId = grPmSub.insert();
              expect(pmSubId).not.toBeNull();

              // Submit it
              grPmSub.get(pmSubId);
              submitModule.submitForReview(grPmSub);
              expect(grPmSub.getValue("state")).toBe("submitted");

              // PM attempts to approve own submission
              pmModule.approveAtPmGate(grPmSub);

              // Must still be submitted, not reviewed
              var grReload = new GlideRecord(SUBMISSION_TABLE);
              expect(grReload.get(pmSubId)).toBe(true);
              expect(grReload.getValue("state")).toBe("submitted");
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });
  },
);
