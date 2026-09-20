import { Test } from "@servicenow/sdk/core";
import "@servicenow/sdk/global";

import { certificateSystemAdministrator } from "./certificate-seed.now.ts";
import { skillEvaluationPm, skillEvaluationUser } from "./groups.now.ts";

const SUBMISSION_TABLE = "x_711398_se_submission";

const CERT_ACQUISITION_TABLE = "x_711398_se_cert_acquisition";

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

    const submission = atf.server.recordInsert({
      $id: Now.ID["atf-submission-delete-insert-submission"],
      table: SUBMISSION_TABLE,
      fieldValues: {
        description: "Submission targeted for cascade delete testing",
      },
      assert: "record_successfully_inserted",
      enforceSecurity: true,
    });

    atf.server.recordInsert({
      $id: Now.ID["atf-submission-delete-insert-cert"],
      table: CERT_ACQUISITION_TABLE,
      fieldValues: {
        submission: submission.record_id,
        certificate: certificateSystemAdministrator,
      },
      assert: "record_successfully_inserted",
      enforceSecurity: true,
    });

    atf.server.impersonate({
      $id: Now.ID["atf-submission-delete-impersonate-admin"],
      user: admin.user,
    });

    atf.server.recordDelete({
      $id: Now.ID["atf-submission-delete-record"],
      table: SUBMISSION_TABLE,
      recordId: submission.record_id,
      assert: "record_successfully_deleted",
      enforceSecurity: true,
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
          var submissionId = "${submission.record_id}";

          describe("Submission cascade delete", function() {
            it("removes the Submission record", function() {
              var grSub = new GlideRecord(SUBMISSION_TABLE);
              expect(grSub.get(submissionId)).toBe(false);
            });

            it("removes all child Skill Assessments", function() {
              var grAssessment = new GlideRecord(SKILL_ASSESSMENT_TABLE);
              grAssessment.addQuery("submission", submissionId);
              grAssessment.query();
              expect(grAssessment.getRowCount()).toBe(0);
            });

            it("removes all child Cert Acquisitions", function() {
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
