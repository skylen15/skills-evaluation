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

    atf.server.impersonate({
      $id: Now.ID["atf-submission-gates-impersonate-member-1"],
      user: member.user,
    });

    atf.server.recordInsert({
      $id: Now.ID["atf-submission-gates-insert-first-submission"],
      table: SUBMISSION_TABLE,
      fieldValues: {
        description: "First submission for lifecycle and sibling valid gate testing",
      },
      assert: "record_successfully_inserted",
      enforceSecurity: true,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-submission-gates-member-submit-1"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          var SUBMISSION_TABLE = "x_711398_se_submission";
          var submitModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/submit-for-review.ts");
          var grSub = new GlideRecord(SUBMISSION_TABLE);
          grSub.addQuery("assigned_to", gs.getUserID());
          grSub.setLimit(1);
          grSub.query();
          var subId = grSub.next() ? grSub.getUniqueValue() : "";

          describe("Gates - member submit first", function() {
            it("submits first submission", function() {
              expect(subId).not.toBe("");
              submitModule.submitForReview(grSub);
              var grCheck = new GlideRecord(SUBMISSION_TABLE);
              expect(grCheck.get(subId)).toBe(true);
              expect(grCheck.getValue("state")).toBe("submitted");
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });

    atf.server.impersonate({
      $id: Now.ID["atf-submission-gates-impersonate-pm-1"],
      user: pm.user,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-submission-gates-pm-approve-1"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          var SUBMISSION_TABLE = "x_711398_se_submission";
          var pmModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/take-pm-gate.ts");
          var grSub = new GlideRecord(SUBMISSION_TABLE);
          grSub.addQuery("description", "First submission for lifecycle and sibling valid gate testing");
          grSub.setLimit(1);
          grSub.query();
          var subId = grSub.next() ? grSub.getUniqueValue() : "";

          describe("Gates - PM approve first", function() {
            it("approves first submission to reviewed", function() {
              expect(subId).not.toBe("");
              expect(grSub.getValue("state")).toBe("submitted");
              pmModule.approveAtPmGate(grSub);
              var grCheck = new GlideRecord(SUBMISSION_TABLE);
              expect(grCheck.get(subId)).toBe(true);
              expect(grCheck.getValue("state")).toBe("reviewed");
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });

    atf.server.impersonate({
      $id: Now.ID["atf-submission-gates-impersonate-coe-1"],
      user: coeHead.user,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-submission-gates-coe-approve-1"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          var SUBMISSION_TABLE = "x_711398_se_submission";
          var coeModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/take-coe-gate.ts");
          var grSub = new GlideRecord(SUBMISSION_TABLE);
          grSub.addQuery("description", "First submission for lifecycle and sibling valid gate testing");
          grSub.setLimit(1);
          grSub.query();
          var subId = grSub.next() ? grSub.getUniqueValue() : "";

          describe("Gates - CoE Head approve first", function() {
            it("completes first submission with Valid=1", function() {
              expect(subId).not.toBe("");
              expect(grSub.getValue("state")).toBe("reviewed");
              coeModule.approveAtCoeGate(grSub);
              var grCheck = new GlideRecord(SUBMISSION_TABLE);
              expect(grCheck.get(subId)).toBe(true);
              expect(grCheck.getValue("state")).toBe("completed");
              expect(grCheck.getValue("valid")).toBe("1");
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });

    atf.server.impersonate({
      $id: Now.ID["atf-submission-gates-impersonate-member-2"],
      user: member.user,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-submission-gates-member-insert-and-submit-2"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          var SUBMISSION_TABLE = "x_711398_se_submission";
          var submitModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/submit-for-review.ts");
          var grNew = new GlideRecord(SUBMISSION_TABLE);
          grNew.initialize();
          grNew.setValue("description", "Second submission testing reject and sibling clear");
          var secondSubId = grNew.insert();

          describe("Gates - Member insert and submit second", function() {
            it("creates and submits second submission", function() {
              expect(secondSubId).not.toBeNull();
              grNew.get(secondSubId);
              submitModule.submitForReview(grNew);
              var grCheck = new GlideRecord(SUBMISSION_TABLE);
              expect(grCheck.get(secondSubId)).toBe(true);
              expect(grCheck.getValue("state")).toBe("submitted");
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });

    atf.server.impersonate({
      $id: Now.ID["atf-submission-gates-impersonate-pm-2"],
      user: pm.user,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-submission-gates-pm-reject-2"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          var SUBMISSION_TABLE = "x_711398_se_submission";
          var pmModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/take-pm-gate.ts");
          var grPm = new GlideRecord(SUBMISSION_TABLE);
          grPm.addQuery("description", "Second submission testing reject and sibling clear");
          grPm.setLimit(1);
          grPm.query();
          var subId = grPm.next() ? grPm.getUniqueValue() : "";

          describe("Gates - PM reject second", function() {
            it("rejects second submission to draft", function() {
              expect(subId).not.toBe("");
              expect(grPm.getValue("state")).toBe("submitted");
              pmModule.rejectAtPmGate(grPm);
              var grCheck = new GlideRecord(SUBMISSION_TABLE);
              expect(grCheck.get(subId)).toBe(true);
              expect(grCheck.getValue("state")).toBe("draft");
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });

    atf.server.impersonate({
      $id: Now.ID["atf-submission-gates-impersonate-member-3"],
      user: member.user,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-submission-gates-member-resubmit-2"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          var SUBMISSION_TABLE = "x_711398_se_submission";
          var submitModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/submit-for-review.ts");
          var grSub = new GlideRecord(SUBMISSION_TABLE);
          grSub.addQuery("description", "Second submission testing reject and sibling clear");
          grSub.setLimit(1);
          grSub.query();
          var subId = grSub.next() ? grSub.getUniqueValue() : "";

          describe("Gates - Member resubmit second", function() {
            it("resubmits second submission", function() {
              expect(subId).not.toBe("");
              submitModule.submitForReview(grSub);
              var grCheck = new GlideRecord(SUBMISSION_TABLE);
              expect(grCheck.get(subId)).toBe(true);
              expect(grCheck.getValue("state")).toBe("submitted");
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });

    atf.server.impersonate({
      $id: Now.ID["atf-submission-gates-impersonate-pm-3"],
      user: pm.user,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-submission-gates-pm-approve-and-coe-reject-prep"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          var SUBMISSION_TABLE = "x_711398_se_submission";
          var pmModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/take-pm-gate.ts");
          var grPm = new GlideRecord(SUBMISSION_TABLE);
          grPm.addQuery("description", "Second submission testing reject and sibling clear");
          grPm.setLimit(1);
          grPm.query();
          var subId = grPm.next() ? grPm.getUniqueValue() : "";

          describe("Gates - PM approve second before CoE reject", function() {
            it("approves second submission to reviewed", function() {
              expect(subId).not.toBe("");
              pmModule.approveAtPmGate(grPm);
              var grCheck = new GlideRecord(SUBMISSION_TABLE);
              expect(grCheck.get(subId)).toBe(true);
              expect(grCheck.getValue("state")).toBe("reviewed");
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });

    atf.server.impersonate({
      $id: Now.ID["atf-submission-gates-impersonate-coe-2"],
      user: coeHead.user,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-submission-gates-coe-reject-2"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          var SUBMISSION_TABLE = "x_711398_se_submission";
          var coeModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/take-coe-gate.ts");
          var grCoe = new GlideRecord(SUBMISSION_TABLE);
          grCoe.addQuery("description", "Second submission testing reject and sibling clear");
          grCoe.setLimit(1);
          grCoe.query();
          var subId = grCoe.next() ? grCoe.getUniqueValue() : "";

          describe("Gates - CoE Head reject second", function() {
            it("rejects second submission to draft", function() {
              expect(subId).not.toBe("");
              coeModule.rejectAtCoeGate(grCoe);
              var grCheck = new GlideRecord(SUBMISSION_TABLE);
              expect(grCheck.get(subId)).toBe(true);
              expect(grCheck.getValue("state")).toBe("draft");
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });

    atf.server.impersonate({
      $id: Now.ID["atf-submission-gates-impersonate-member-4"],
      user: member.user,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-submission-gates-member-resubmit-final"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          var SUBMISSION_TABLE = "x_711398_se_submission";
          var submitModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/submit-for-review.ts");
          var grSub = new GlideRecord(SUBMISSION_TABLE);
          grSub.addQuery("description", "Second submission testing reject and sibling clear");
          grSub.setLimit(1);
          grSub.query();
          var subId = grSub.next() ? grSub.getUniqueValue() : "";

          describe("Gates - Member resubmit second final", function() {
            it("resubmits second submission to submitted", function() {
              expect(subId).not.toBe("");
              submitModule.submitForReview(grSub);
              var grCheck = new GlideRecord(SUBMISSION_TABLE);
              expect(grCheck.get(subId)).toBe(true);
              expect(grCheck.getValue("state")).toBe("submitted");
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });

    atf.server.impersonate({
      $id: Now.ID["atf-submission-gates-impersonate-pm-4"],
      user: pm.user,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-submission-gates-pm-approve-final"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          var SUBMISSION_TABLE = "x_711398_se_submission";
          var pmModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/take-pm-gate.ts");
          var grPm = new GlideRecord(SUBMISSION_TABLE);
          grPm.addQuery("description", "Second submission testing reject and sibling clear");
          grPm.setLimit(1);
          grPm.query();
          var subId = grPm.next() ? grPm.getUniqueValue() : "";

          describe("Gates - PM approve second final", function() {
            it("approves second submission to reviewed", function() {
              expect(subId).not.toBe("");
              pmModule.approveAtPmGate(grPm);
              var grCheck = new GlideRecord(SUBMISSION_TABLE);
              expect(grCheck.get(subId)).toBe(true);
              expect(grCheck.getValue("state")).toBe("reviewed");
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });

    atf.server.impersonate({
      $id: Now.ID["atf-submission-gates-impersonate-coe-final"],
      user: coeHead.user,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-submission-gates-coe-approve-final"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          var SUBMISSION_TABLE = "x_711398_se_submission";
          var coeModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/take-coe-gate.ts");

          var grFirst = new GlideRecord(SUBMISSION_TABLE);
          grFirst.addQuery("description", "First submission for lifecycle and sibling valid gate testing");
          grFirst.setLimit(1);
          grFirst.query();
          var firstSubId = grFirst.next() ? grFirst.getUniqueValue() : "";

          var grSecond = new GlideRecord(SUBMISSION_TABLE);
          grSecond.addQuery("description", "Second submission testing reject and sibling clear");
          grSecond.setLimit(1);
          grSecond.query();
          var secondSubId = grSecond.next() ? grSecond.getUniqueValue() : "";

          describe("Gates - CoE Head complete second and clear first valid", function() {
            it("completes second and clears first valid", function() {
              expect(firstSubId).not.toBe("");
              expect(secondSubId).not.toBe("");
              coeModule.approveAtCoeGate(grSecond);

              var grCheckSecond = new GlideRecord(SUBMISSION_TABLE);
              expect(grCheckSecond.get(secondSubId)).toBe(true);
              expect(grCheckSecond.getValue("state")).toBe("completed");
              expect(grCheckSecond.getValue("valid")).toBe("1");

              var grCheckFirst = new GlideRecord(SUBMISSION_TABLE);
              expect(grCheckFirst.get(firstSubId)).toBe(true);
              expect(grCheckFirst.getValue("valid")).toBe("0");
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });

    atf.server.impersonate({
      $id: Now.ID["atf-submission-gates-impersonate-pm-self-approval"],
      user: pm.user,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-submission-gates-assert-self-approval-refused"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          var SUBMISSION_TABLE = "x_711398_se_submission";
          var submitModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/submit-for-review.ts");
          var pmModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/take-pm-gate.ts");

          var grPmSub = new GlideRecord(SUBMISSION_TABLE);
          grPmSub.initialize();
          grPmSub.setValue("description", "Submission assigned to PM for self-approval test");
          var pmSubId = grPmSub.insert();

          describe("Gates - Refuse self approval", function() {
            it("refuses self-approval when approver is Assigned to", function() {
              expect(pmSubId).not.toBeNull();
              grPmSub.get(pmSubId);
              submitModule.submitForReview(grPmSub);
              expect(grPmSub.getValue("state")).toBe("submitted");

              pmModule.approveAtPmGate(grPmSub);

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
