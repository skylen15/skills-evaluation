import { Test } from "@servicenow/sdk/core";
import "@servicenow/sdk/global";

import { skillEvaluationPm, skillEvaluationUser } from "./groups.now.ts";

const SUBMISSION_TABLE = "x_711398_se_submission";

export const testSubmissionCascadeDelete = Test(
  {
    $id: Now.ID["atf-submission-cascade-delete"],
    name: "Submission - cascade delete",
    description:
      "Verifies that an se_admin deleting a Submission also cascades deletion to its Skill Assessments and Cert Acquisitions.",
    active: true,
    failOnServerError: true,
  },
  (atf) => {
    atf.server.createUser({
      $id: Now.ID["atf-submission-delete-create-member"],
      firstName: "ATF",
      lastName: "Delete Member",
      groups: [skillEvaluationUser],
      impersonate: true,
    });

    const admin = atf.server.createUser({
      $id: Now.ID["atf-submission-delete-create-admin"],
      firstName: "ATF",
      lastName: "Delete Admin",
      groups: [skillEvaluationPm],
    });

    atf.server.recordInsert({
      $id: Now.ID["atf-submission-delete-insert-submission"],
      table: SUBMISSION_TABLE,
      fieldValues: {
        description: "Submission targeted for cascade delete testing",
      },
      assert: "record_successfully_inserted",
      enforceSecurity: true,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-submission-delete-insert-cert"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          var SUBMISSION_TABLE = "x_711398_se_submission";
          var CERT_ACQUISITION_TABLE = "x_711398_se_cert_acquisition";
          var CERT_TABLE = "x_711398_se_certificate";

          var grCert = new GlideRecord(CERT_TABLE);
          grCert.addQuery("name", "ServiceNow Certified System Administrator");
          grCert.setLimit(1);
          grCert.query();
          var certId = grCert.next() ? grCert.getUniqueValue() : "";

          var grSub = new GlideRecord(SUBMISSION_TABLE);
          grSub.addQuery("description", "Submission targeted for cascade delete testing");
          grSub.setLimit(1);
          grSub.query();
          var subId = grSub.next() ? grSub.getUniqueValue() : "";

          var grAcq = new GlideRecord(CERT_ACQUISITION_TABLE);
          grAcq.initialize();
          grAcq.setValue("submission", subId);
          grAcq.setValue("certificate", certId);
          grAcq.insert();

          describe("Cascade delete prep", function() {
            it("inserts child cert acquisition", function() {
              expect(subId).not.toBe("");
              expect(certId).not.toBe("");
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });

    atf.server.impersonate({
      $id: Now.ID["atf-submission-delete-impersonate-admin"],
      user: admin.user,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-submission-delete-assertions"],
      jasmineVersion: "3.1",
      script: `
        // Type: ATF Run Server Side Script
        // ES mode: ES5 (Rhino)
        // Script context: outputs, steps, params, stepResult, assertEqual
        (function(outputs, steps, params, stepResult, assertEqual) {
          var SUBMISSION_TABLE = "x_711398_se_submission";
          var SKILL_ASSESSMENT_TABLE = "x_711398_se_skill_assessment";
          var CERT_ACQUISITION_TABLE = "x_711398_se_cert_acquisition";
          var grSeedSub = new GlideRecord(SUBMISSION_TABLE);
          grSeedSub.addQuery("description", "Submission targeted for cascade delete testing");
          grSeedSub.setLimit(1);
          grSeedSub.query();
          var submissionId = grSeedSub.next() ? grSeedSub.getUniqueValue() : "";

          describe("Submission cascade delete", function() {
            it("removes child records when Submission is deleted", function() {
              expect(submissionId).not.toBe("");

              var grAssessmentBefore = new GlideRecord(SKILL_ASSESSMENT_TABLE);
              grAssessmentBefore.addQuery("submission", submissionId);
              grAssessmentBefore.query();
              expect(grAssessmentBefore.getRowCount()).toBeGreaterThan(0);

              var grCertBefore = new GlideRecord(CERT_ACQUISITION_TABLE);
              grCertBefore.addQuery("submission", submissionId);
              grCertBefore.query();
              expect(grCertBefore.getRowCount()).toBe(1);

              expect(grSeedSub.deleteRecord()).toBe(true);

              var grSub = new GlideRecord(SUBMISSION_TABLE);
              expect(grSub.get(submissionId)).toBe(false);

              var grAssessment = new GlideRecord(SKILL_ASSESSMENT_TABLE);
              grAssessment.addQuery("submission", submissionId);
              grAssessment.query();
              expect(grAssessment.getRowCount()).toBe(0);

              var grAcquisition = new GlideRecord(CERT_ACQUISITION_TABLE);
              grAcquisition.addQuery("submission", submissionId);
              grAcquisition.query();
              expect(grAcquisition.getRowCount()).toBe(0);
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });
  },
);
