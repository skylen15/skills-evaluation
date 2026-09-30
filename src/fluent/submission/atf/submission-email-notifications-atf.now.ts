import "@servicenow/sdk/global";
import { Test } from "@servicenow/sdk/core";

import {
  skillEvaluationCoe,
  skillEvaluationPm,
  skillEvaluationUser,
} from "../../foundation/groups.now.ts";

const SUBMISSION_TABLE = "x_711398_se_submission";

const TWO_MINUTES_TIMEOUT = {
  minutes: 2,
};

export const testSubmissionEmailNotifications = Test(
  {
    $id: Now.ID["atf-submission-email-notifications"],
    name: "Submission - lifecycle email notifications",
    description:
      "Validates that each of the five valid lifecycle triggers creates exactly one sys_email record with the expected recipient and subject.",
    active: true,
    failOnServerError: true,
  },
  (atf) => {
    const member1 = atf.server.createUser({
      $id: Now.ID["atf-email-create-member-1"],
      firstName: "ATF",
      lastName: "Email Member One",
      groups: [skillEvaluationUser],
      fieldValues: {
        email: "atf.member1@example.com",
      },
    });

    const member2 = atf.server.createUser({
      $id: Now.ID["atf-email-create-member-2"],
      firstName: "ATF",
      lastName: "Email Member Two",
      groups: [skillEvaluationUser],
      fieldValues: {
        email: "atf.member2@example.com",
      },
    });

    const member3 = atf.server.createUser({
      $id: Now.ID["atf-email-create-member-3"],
      firstName: "ATF",
      lastName: "Email Member Three",
      groups: [skillEvaluationUser],
      fieldValues: {
        email: "atf.member3@example.com",
      },
    });

    const pm = atf.server.createUser({
      $id: Now.ID["atf-email-create-pm"],
      firstName: "ATF",
      lastName: "Email PM",
      groups: [skillEvaluationPm],
      fieldValues: {
        email: "atf.pm@example.com",
      },
    });

    const coeHead = atf.server.createUser({
      $id: Now.ID["atf-email-create-coe"],
      firstName: "ATF",
      lastName: "Email CoE",
      groups: [skillEvaluationCoe],
      fieldValues: {
        email: "atf.coe@example.com",
      },
    });

    // ==========================================
    // --- Trigger 1: Submission Created ---
    // ==========================================
    atf.server.impersonate({
      $id: Now.ID["atf-email-impersonate-member-1"],
      user: member1.user,
    });

    atf.server.recordInsert({
      $id: Now.ID["atf-email-insert-sub-1"],
      table: SUBMISSION_TABLE,
      fieldValues: {
        description: "Submission 1 for created, submitted, and pm_approved notifications",
      },
      assert: "record_successfully_inserted",
      enforceSecurity: true,
    });

    atf.email.validateOutboundEmail({
      $id: Now.ID["atf-email-validate-created"],
      conditions: "subjectLIKESkill Evaluation^subjectLIKEcreated^bodyLIKESubmission 1 for created",
      timeout: TWO_MINUTES_TIMEOUT,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-email-assert-created-count"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          describe("Email - created", function() {
            it("asserts exactly one created email with recipient and subject", function() {
              var grSub = new GlideRecord("x_711398_se_submission");
              grSub.addQuery("description", "Submission 1 for created, submitted, and pm_approved notifications");
              grSub.setLimit(1);
              grSub.query();
              expect(grSub.next()).toBe(true);
              var subId = grSub.getUniqueValue();

              var grEmail = new GlideRecord("sys_email");
              grEmail.addQuery("instance", subId);
              grEmail.addQuery("subject", "CONTAINS", "created");
              grEmail.query();

              var count = 0;
              while (grEmail.next()) {
                count++;
                expect(grEmail.getValue("subject")).toContain("Skill Evaluation");
                expect(grEmail.getValue("subject")).toContain("created");
                expect(grEmail.getValue("recipients")).toContain("atf.member1@example.com");
              }
              expect(count).toBe(1);
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });

    // ==========================================
    // --- Trigger 2: Submission Submitted ---
    // ==========================================
    atf.server.impersonate({
      $id: Now.ID["atf-email-impersonate-member-for-submit-1"],
      user: member1.user,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-email-member-submit-1"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          describe("Trigger - submit 1", function() {
            it("submits sub 1 for review", function() {
              var submitModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/submission/submit-for-review.ts");
              var grSub = new GlideRecord("x_711398_se_submission");
              grSub.addQuery("description", "Submission 1 for created, submitted, and pm_approved notifications");
              grSub.setLimit(1);
              grSub.query();
              expect(grSub.next()).toBe(true);
              var subId = grSub.getUniqueValue();
              submitModule.submitForReview(grSub);

              var grCheck = new GlideRecord("x_711398_se_submission");
              expect(grCheck.get(subId)).toBe(true);
              expect(grCheck.getValue("state")).toBe("submitted");
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });

    atf.email.validateOutboundEmail({
      $id: Now.ID["atf-email-validate-submitted"],
      conditions:
        "subjectLIKESkill Evaluation^subjectLIKEsubmitted for PM review^bodyLIKESubmission 1 for created",
      timeout: TWO_MINUTES_TIMEOUT,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-email-assert-submitted-count"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          describe("Email - submitted", function() {
            it("asserts exactly one submitted email with recipient and subject", function() {
              var grSub = new GlideRecord("x_711398_se_submission");
              grSub.addQuery("description", "Submission 1 for created, submitted, and pm_approved notifications");
              grSub.setLimit(1);
              grSub.query();
              expect(grSub.next()).toBe(true);
              var subId = grSub.getUniqueValue();

              var grEmail = new GlideRecord("sys_email");
              grEmail.addQuery("instance", subId);
              grEmail.addQuery("subject", "CONTAINS", "submitted for PM review");
              grEmail.query();

              var count = 0;
              while (grEmail.next()) {
                count++;
                expect(grEmail.getValue("subject")).toContain("Skill Evaluation");
                expect(grEmail.getValue("subject")).toContain("submitted for PM review");
                expect(grEmail.getValue("recipients")).toContain("atf.pm@example.com");
              }
              expect(count).toBe(1);
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });

    // ==========================================
    // --- Trigger 3: PM Approved ---
    // ==========================================
    atf.server.impersonate({
      $id: Now.ID["atf-email-impersonate-pm-1"],
      user: pm.user,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-email-pm-approve-1"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          describe("Trigger - PM approve 1", function() {
            it("approves sub 1 at PM gate", function() {
              var pmModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/submission/take-pm-gate.ts");
              var grSub = new GlideRecord("x_711398_se_submission");
              grSub.addQuery("description", "Submission 1 for created, submitted, and pm_approved notifications");
              grSub.setLimit(1);
              grSub.query();
              expect(grSub.next()).toBe(true);
              var subId = grSub.getUniqueValue();
              pmModule.approveAtPmGate(grSub);

              var grCheck = new GlideRecord("x_711398_se_submission");
              expect(grCheck.get(subId)).toBe(true);
              expect(grCheck.getValue("state")).toBe("reviewed");
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });

    atf.email.validateOutboundEmail({
      $id: Now.ID["atf-email-validate-pm-approved"],
      conditions:
        "subjectLIKESkill Evaluation^subjectLIKEreviewed by PM and awaiting CoE review^bodyLIKESubmission 1 for created",
      timeout: TWO_MINUTES_TIMEOUT,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-email-assert-pm-approved-count"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          describe("Email - pm_approved", function() {
            it("asserts exactly one pm_approved email with recipient and subject", function() {
              var grSub = new GlideRecord("x_711398_se_submission");
              grSub.addQuery("description", "Submission 1 for created, submitted, and pm_approved notifications");
              grSub.setLimit(1);
              grSub.query();
              expect(grSub.next()).toBe(true);
              var subId = grSub.getUniqueValue();

              var grEmail = new GlideRecord("sys_email");
              grEmail.addQuery("instance", subId);
              grEmail.addQuery("subject", "CONTAINS", "reviewed by PM and awaiting CoE review");
              grEmail.query();

              var count = 0;
              while (grEmail.next()) {
                count++;
                expect(grEmail.getValue("subject")).toContain("Skill Evaluation");
                expect(grEmail.getValue("subject")).toContain("reviewed by PM and awaiting CoE review");
                expect(grEmail.getValue("recipients")).toContain("atf.coe@example.com");
              }
              expect(count).toBe(1);
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });

    // ==========================================
    // --- Trigger 4: PM Rejected (using member2) ---
    // ==========================================
    atf.server.impersonate({
      $id: Now.ID["atf-email-impersonate-member-2"],
      user: member2.user,
    });

    atf.server.recordInsert({
      $id: Now.ID["atf-email-insert-sub-2"],
      table: SUBMISSION_TABLE,
      fieldValues: {
        description: "Submission 2 for pm_rejected notification",
      },
      assert: "record_successfully_inserted",
      enforceSecurity: true,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-email-member-submit-2"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          describe("Trigger - submit 2", function() {
            it("submits sub 2 for review", function() {
              var submitModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/submission/submit-for-review.ts");
              var grSub = new GlideRecord("x_711398_se_submission");
              grSub.addQuery("description", "Submission 2 for pm_rejected notification");
              grSub.setLimit(1);
              grSub.query();
              expect(grSub.next()).toBe(true);
              var subId = grSub.getUniqueValue();
              submitModule.submitForReview(grSub);

              var grCheck = new GlideRecord("x_711398_se_submission");
              expect(grCheck.get(subId)).toBe(true);
              expect(grCheck.getValue("state")).toBe("submitted");
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });

    atf.server.impersonate({
      $id: Now.ID["atf-email-impersonate-pm-2"],
      user: pm.user,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-email-pm-reject-2"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          describe("Trigger - PM reject 2", function() {
            it("rejects sub 2 at PM gate", function() {
              var pmModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/submission/take-pm-gate.ts");
              var grSub = new GlideRecord("x_711398_se_submission");
              grSub.addQuery("description", "Submission 2 for pm_rejected notification");
              grSub.setLimit(1);
              grSub.query();
              expect(grSub.next()).toBe(true);
              var subId = grSub.getUniqueValue();
              pmModule.rejectAtPmGate(grSub);

              var grCheck = new GlideRecord("x_711398_se_submission");
              expect(grCheck.get(subId)).toBe(true);
              expect(grCheck.getValue("state")).toBe("draft");
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });

    atf.email.validateOutboundEmail({
      $id: Now.ID["atf-email-validate-pm-rejected"],
      conditions:
        "subjectLIKESkill Evaluation^subjectLIKErejected by PM^bodyLIKESubmission 2 for pm_rejected",
      timeout: TWO_MINUTES_TIMEOUT,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-email-assert-pm-rejected-count"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          describe("Email - pm_rejected", function() {
            it("asserts exactly one pm_rejected email with recipient and subject", function() {
              var grSub = new GlideRecord("x_711398_se_submission");
              grSub.addQuery("description", "Submission 2 for pm_rejected notification");
              grSub.setLimit(1);
              grSub.query();
              expect(grSub.next()).toBe(true);
              var subId = grSub.getUniqueValue();

              var grEmail = new GlideRecord("sys_email");
              grEmail.addQuery("instance", subId);
              grEmail.addQuery("subject", "CONTAINS", "rejected by PM");
              grEmail.query();

              var count = 0;
              while (grEmail.next()) {
                count++;
                expect(grEmail.getValue("subject")).toContain("Skill Evaluation");
                expect(grEmail.getValue("subject")).toContain("rejected by PM");
                expect(grEmail.getValue("recipients")).toContain("atf.member2@example.com");
              }
              expect(count).toBe(1);
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });

    // ==========================================
    // --- Trigger 5: CoE Rejected (using member3) ---
    // ==========================================
    atf.server.impersonate({
      $id: Now.ID["atf-email-impersonate-member-3"],
      user: member3.user,
    });

    atf.server.recordInsert({
      $id: Now.ID["atf-email-insert-sub-3"],
      table: SUBMISSION_TABLE,
      fieldValues: {
        description: "Submission 3 for coe_rejected notification",
      },
      assert: "record_successfully_inserted",
      enforceSecurity: true,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-email-member-submit-3"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          describe("Trigger - submit 3", function() {
            it("submits sub 3 for review", function() {
              var submitModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/submission/submit-for-review.ts");
              var grSub = new GlideRecord("x_711398_se_submission");
              grSub.addQuery("description", "Submission 3 for coe_rejected notification");
              grSub.setLimit(1);
              grSub.query();
              expect(grSub.next()).toBe(true);
              var subId = grSub.getUniqueValue();
              submitModule.submitForReview(grSub);

              var grCheck = new GlideRecord("x_711398_se_submission");
              expect(grCheck.get(subId)).toBe(true);
              expect(grCheck.getValue("state")).toBe("submitted");
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });

    atf.server.impersonate({
      $id: Now.ID["atf-email-impersonate-pm-3"],
      user: pm.user,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-email-pm-approve-3"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          describe("Trigger - PM approve 3", function() {
            it("approves sub 3 at PM gate", function() {
              var pmModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/submission/take-pm-gate.ts");
              var grSub = new GlideRecord("x_711398_se_submission");
              grSub.addQuery("description", "Submission 3 for coe_rejected notification");
              grSub.setLimit(1);
              grSub.query();
              expect(grSub.next()).toBe(true);
              var subId = grSub.getUniqueValue();
              pmModule.approveAtPmGate(grSub);

              var grCheck = new GlideRecord("x_711398_se_submission");
              expect(grCheck.get(subId)).toBe(true);
              expect(grCheck.getValue("state")).toBe("reviewed");
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });

    atf.server.impersonate({
      $id: Now.ID["atf-email-impersonate-coe-3"],
      user: coeHead.user,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-email-coe-reject-3"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          describe("Trigger - CoE reject 3", function() {
            it("rejects sub 3 at CoE gate", function() {
              var coeModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/submission/take-coe-gate.ts");
              var grSub = new GlideRecord("x_711398_se_submission");
              grSub.addQuery("description", "Submission 3 for coe_rejected notification");
              grSub.setLimit(1);
              grSub.query();
              expect(grSub.next()).toBe(true);
              var subId = grSub.getUniqueValue();
              coeModule.rejectAtCoeGate(grSub);

              var grCheck = new GlideRecord("x_711398_se_submission");
              expect(grCheck.get(subId)).toBe(true);
              expect(grCheck.getValue("state")).toBe("draft");
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });

    atf.email.validateOutboundEmail({
      $id: Now.ID["atf-email-validate-coe-rejected"],
      conditions:
        "subjectLIKESkill Evaluation^subjectLIKErejected by CoE Head^bodyLIKESubmission 3 for coe_rejected",
      timeout: TWO_MINUTES_TIMEOUT,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-email-assert-coe-rejected-count"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          describe("Email - coe_rejected", function() {
            it("asserts exactly one coe_rejected email with recipient and subject", function() {
              var grSub = new GlideRecord("x_711398_se_submission");
              grSub.addQuery("description", "Submission 3 for coe_rejected notification");
              grSub.setLimit(1);
              grSub.query();
              expect(grSub.next()).toBe(true);
              var subId = grSub.getUniqueValue();

              var grEmail = new GlideRecord("sys_email");
              grEmail.addQuery("instance", subId);
              grEmail.addQuery("subject", "CONTAINS", "rejected by CoE Head");
              grEmail.query();

              var count = 0;
              while (grEmail.next()) {
                count++;
                expect(grEmail.getValue("subject")).toContain("Skill Evaluation");
                expect(grEmail.getValue("subject")).toContain("rejected by CoE Head");
                expect(grEmail.getValue("recipients")).toContain("atf.member3@example.com");
              }
              expect(count).toBe(1);
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });
  },
);
