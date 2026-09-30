import { Test } from "@servicenow/sdk/core";
import "@servicenow/sdk/global";

import {
  skillEvaluationCoe,
  skillEvaluationPm,
  skillEvaluationUser,
} from "../../foundation/groups.now.ts";

const SUBMISSION_TABLE = "x_711398_se_submission";

export const testSubmissionCompletedImmutability = Test(
  {
    $id: Now.ID["atf-submission-completed-immutability"],
    name: "Submission - completed immutability",
    description:
      "Verifies that Submitted and Reviewed refuse mutations, Work notes is allowed before Completed, direct State/Valid forgery is refused, and Completed is fully immutable.",
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
          var submitModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/submission/submit-for-review.ts");
          var grSub = new GlideRecord(SUBMISSION_TABLE);
          grSub.addQuery("assigned_to", gs.getUserID());
          grSub.setLimit(1);
          grSub.query();
          var subId = grSub.next() ? grSub.getUniqueValue() : "";

          describe("Lock - member submit and mutation refusal", function() {
            it("moves state to submitted and enforces Submitted mutation boundary", function() {
              expect(subId).not.toBe("");
              submitModule.submitForReview(grSub);
              var grCheck = new GlideRecord(SUBMISSION_TABLE);
              expect(grCheck.get(subId)).toBe(true);
              expect(grCheck.getValue("state")).toBe("submitted");

              // Description mutation refused in Submitted
              expect(grCheck.description.canWrite()).toBe(false);
              grCheck.setValue("description", "Hacked description in submitted");
              grCheck.update();
              expect(grCheck.isActionAborted()).toBe(true);

              var grReload = new GlideRecord(SUBMISSION_TABLE);
              expect(grReload.get(subId)).toBe(true);
              expect(grReload.getValue("description")).toBe("Original completed submission description");

              // Direct State and Valid forgery refused via field ACL
              expect(grCheck.state.canWrite()).toBe(false);
              expect(grCheck.valid.canWrite()).toBe(false);

              // Child content locked in Submitted: Skill Assessment & Cert Acquisition
              var grSkillAss = new GlideRecord("x_711398_se_skill_assessment");
              grSkillAss.addQuery("submission", subId);
              grSkillAss.setLimit(1);
              grSkillAss.query();
              if (grSkillAss.next()) {
                expect(grSkillAss.proficiency_level.canWrite()).toBe(false);
              }

              var grCertAcq = new GlideRecord("x_711398_se_cert_acquisition");
              grCertAcq.addQuery("submission", subId);
              grCertAcq.setLimit(1);
              grCertAcq.query();
              if (grCertAcq.next()) {
                expect(grCertAcq.canWrite()).toBe(false);
              }
              // Work notes allowed in Submitted
              var grNote = new GlideRecord(SUBMISSION_TABLE);
              expect(grNote.get(subId)).toBe(true);
              expect(grNote.work_notes.canWrite()).toBe(true);
              grNote.setValue("work_notes", "Member note in submitted state");
              grNote.update();
              expect(grNote.isActionAborted()).toBe(false);
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
          var pmModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/submission/take-pm-gate.ts");
          var grSub = new GlideRecord(SUBMISSION_TABLE);
          grSub.addQuery("description", "Original completed submission description");
          grSub.setLimit(1);
          grSub.query();
          var subId = grSub.next() ? grSub.getUniqueValue() : "";

          describe("Lock - PM review and mutation refusal", function() {
            it("enforces Submitted boundary for PM then approves to reviewed", function() {
              expect(subId).not.toBe("");
              // PM Description mutation refused on Submitted
              expect(grSub.description.canWrite()).toBe(false);
              // PM Work notes allowed on Submitted
              expect(grSub.work_notes.canWrite()).toBe(true);
              grSub.setValue("work_notes", "PM note on submitted record");
              grSub.update();
              expect(grSub.isActionAborted()).toBe(false);

              var grApprove = new GlideRecord(SUBMISSION_TABLE);
              expect(grApprove.get(subId)).toBe(true);
              pmModule.approveAtPmGate(grApprove);
              var grCheck = new GlideRecord(SUBMISSION_TABLE);
              expect(grCheck.get(subId)).toBe(true);
              expect(grCheck.getValue("state")).toBe("reviewed");

              // PM Description mutation refused on Reviewed
              expect(grCheck.description.canWrite()).toBe(false);

              // Child content locked in Reviewed: Skill Assessment
              var grSkillAssRev = new GlideRecord("x_711398_se_skill_assessment");
              grSkillAssRev.addQuery("submission", subId);
              grSkillAssRev.setLimit(1);
              grSkillAssRev.query();
              if (grSkillAssRev.next()) {
                expect(grSkillAssRev.proficiency_level.canWrite()).toBe(false);
              }
              expect(grCheck.work_notes.canWrite()).toBe(true);
              grCheck.setValue("work_notes", "PM note on reviewed record");
              grCheck.update();
              expect(grCheck.isActionAborted()).toBe(false);
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
          var coeModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/submission/take-coe-gate.ts");
          var grSub = new GlideRecord(SUBMISSION_TABLE);
          grSub.addQuery("description", "Original completed submission description");
          grSub.setLimit(1);
          grSub.query();
          var subId = grSub.next() ? grSub.getUniqueValue() : "";

          describe("Lock - CoE Head approve and mutation refusal", function() {
            it("enforces Reviewed boundary for CoE then approves to completed", function() {
              expect(subId).not.toBe("");
              // CoE Description mutation refused on Reviewed
              expect(grSub.description.canWrite()).toBe(false);
              // CoE Work notes allowed on Reviewed
              expect(grSub.work_notes.canWrite()).toBe(true);
              grSub.setValue("work_notes", "CoE note on reviewed record");
              grSub.update();
              expect(grSub.isActionAborted()).toBe(false);

              var grApprove = new GlideRecord(SUBMISSION_TABLE);
              expect(grApprove.get(subId)).toBe(true);
              coeModule.approveAtCoeGate(grApprove);
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
