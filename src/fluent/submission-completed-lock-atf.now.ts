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

    atf.server.impersonate({
      $id: Now.ID["atf-submission-lock-impersonate-member-initial"],
      user: member.user,
    });

    atf.server.recordInsert({
      $id: Now.ID["atf-submission-lock-insert-submission"],
      table: SUBMISSION_TABLE,
      fieldValues: {
        description: "Original completed submission description",
      },
      assert: "record_successfully_inserted",
      enforceSecurity: true,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-submission-lock-member-submit"],
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

          describe("Lock - member submit", function() {
            it("moves state to submitted", function() {
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
      $id: Now.ID["atf-submission-lock-impersonate-pm"],
      user: pm.user,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-submission-lock-pm-approve"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          var SUBMISSION_TABLE = "x_711398_se_submission";
          var pmModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/take-pm-gate.ts");
          var grSub = new GlideRecord(SUBMISSION_TABLE);
          grSub.addQuery("description", "Original completed submission description");
          grSub.setLimit(1);
          grSub.query();
          var subId = grSub.next() ? grSub.getUniqueValue() : "";

          describe("Lock - PM approve", function() {
            it("moves state to reviewed", function() {
              expect(subId).not.toBe("");
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
      $id: Now.ID["atf-submission-lock-impersonate-coe"],
      user: coeHead.user,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-submission-lock-coe-approve"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          var SUBMISSION_TABLE = "x_711398_se_submission";
          var coeModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/take-coe-gate.ts");
          var grSub = new GlideRecord(SUBMISSION_TABLE);
          grSub.addQuery("description", "Original completed submission description");
          grSub.setLimit(1);
          grSub.query();
          var subId = grSub.next() ? grSub.getUniqueValue() : "";

          describe("Lock - CoE Head approve", function() {
            it("moves state to completed", function() {
              expect(subId).not.toBe("");
              coeModule.approveAtCoeGate(grSub);
              var grCheck = new GlideRecord(SUBMISSION_TABLE);
              expect(grCheck.get(subId)).toBe(true);
              expect(grCheck.getValue("state")).toBe("completed");
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });

    atf.server.impersonate({
      $id: Now.ID["atf-submission-lock-impersonate-member-for-update"],
      user: member.user,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-submission-lock-assert-desc-update-refused"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          var SUBMISSION_TABLE = "x_711398_se_submission";
          var grSub = new GlideRecord(SUBMISSION_TABLE);
          grSub.addQuery("assigned_to", gs.getUserID());
          grSub.setLimit(1);
          grSub.query();
          var subId = grSub.next() ? grSub.getUniqueValue() : "";

          describe("Completed Submission immutability - Description", function() {
            it("refuses updating Description on Completed Submission", function() {
              expect(subId).not.toBe("");
              grSub.setValue("description", "Modified description after completion");
              var updateResult = grSub.update();
              expect(updateResult).toBeNull();

              var grReload = new GlideRecord(SUBMISSION_TABLE);
              expect(grReload.get(subId)).toBe(true);
              expect(grReload.getValue("description")).toBe("Original completed submission description");
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });

    atf.server.impersonate({
      $id: Now.ID["atf-submission-lock-impersonate-pm-for-work-notes"],
      user: pm.user,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-submission-lock-assert-work-notes-refused"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          var SUBMISSION_TABLE = "x_711398_se_submission";
          var grFind = new GlideRecord(SUBMISSION_TABLE);
          grFind.addQuery("description", "Original completed submission description");
          grFind.setLimit(1);
          grFind.query();
          var subId = grFind.next() ? grFind.getUniqueValue() : "";

          describe("Completed Submission immutability - Work notes", function() {
            it("refuses updating Work notes on Completed Submission", function() {
              expect(subId).not.toBe("");
              var grSub = new GlideRecord(SUBMISSION_TABLE);
              expect(grSub.get(subId)).toBe(true);
              expect(grSub.getValue("state")).toBe("completed");
              grSub.setValue("work_notes", "Attempting work notes update on completed record");
              grSub.update();

              var grReload = new GlideRecord(SUBMISSION_TABLE);
              expect(grReload.get(subId)).toBe(true);
              expect(grReload.getValue("state")).toBe("completed");
              expect(grSub.isActionAborted() || grReload.getValue("work_notes") !== "Attempting work notes update on completed record").toBe(true);

              var grJournal = new GlideRecord("sys_journal_field");
              grJournal.addQuery("name", SUBMISSION_TABLE);
              grJournal.addQuery("element_id", subId);
              grJournal.addQuery("value", "CONTAINS", "Attempting work notes update on completed record");
              grJournal.query();
              expect(grJournal.hasNext()).toBe(false);
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });
  },
);
