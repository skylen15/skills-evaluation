import { Test } from "@servicenow/sdk/core";
import "@servicenow/sdk/global";

import {
  certificateApplicationDeveloper,
  certificateSystemAdministrator,
} from "./certificate-seed.now.ts";
import { skillEvaluationUser } from "./groups.now.ts";

const SUBMISSION_TABLE = "x_711398_se_submission";

const CERT_ACQUISITION_TABLE = "x_711398_se_cert_acquisition";

export const testSubmissionCertUniqueness = Test(
  {
    $id: Now.ID["atf-submission-cert-uniqueness"],
    name: "Submission - certificate acquisition uniqueness",
    description:
      "Verifies that claiming the same Certificate twice on one Submission is refused, while claiming a different Certificate is allowed.",
    active: true,
    failOnServerError: true,
  },
  (atf) => {
    atf.server.createUser({
      $id: Now.ID["atf-submission-cert-create-member"],
      firstName: "ATF",
      lastName: "Cert Member",
      groups: [skillEvaluationUser],
      impersonate: true,
    });

    const submission = atf.server.recordInsert({
      $id: Now.ID["atf-submission-cert-insert-submission"],
      table: SUBMISSION_TABLE,
      fieldValues: {
        description: "ATF cert acquisition uniqueness test",
      },
      assert: "record_successfully_inserted",
      enforceSecurity: true,
    });

    atf.server.recordInsert({
      $id: Now.ID["atf-submission-cert-first-insert"],
      table: CERT_ACQUISITION_TABLE,
      fieldValues: {
        submission: submission.record_id,
        certificate: certificateSystemAdministrator,
      },
      assert: "record_successfully_inserted",
      enforceSecurity: true,
    });

    atf.server.recordInsert({
      $id: Now.ID["atf-submission-cert-duplicate-insert"],
      table: CERT_ACQUISITION_TABLE,
      fieldValues: {
        submission: submission.record_id,
        certificate: certificateSystemAdministrator,
      },
      assert: "record_not_inserted",
      enforceSecurity: true,
    });

    atf.server.recordInsert({
      $id: Now.ID["atf-submission-cert-different-insert"],
      table: CERT_ACQUISITION_TABLE,
      fieldValues: {
        submission: submission.record_id,
        certificate: certificateApplicationDeveloper,
      },
      assert: "record_successfully_inserted",
      enforceSecurity: true,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-submission-cert-assertions"],
      jasmineVersion: "3.1",
      script: `
        // Type: ATF Run Server Side Script
        // ES mode: ES5 (Rhino)
        // Script context: outputs, steps, params, stepResult, assertEqual
        (function(outputs, steps, params, stepResult, assertEqual) {
          var CERT_ACQUISITION_TABLE = "x_711398_se_cert_acquisition";
          var submissionId = "${submission.record_id}";

          describe("Cert Acquisition uniqueness", function() {
            it("contains exactly two distinct Certificate claims for this Submission", function() {
              var grAcquisition = new GlideRecord(CERT_ACQUISITION_TABLE);
              grAcquisition.addQuery("submission", submissionId);
              grAcquisition.query();

              var certs = [];
              while (grAcquisition.next()) {
                certs.push(grAcquisition.getValue("certificate"));
              }

              expect(certs.length).toBe(2);
              expect(certs[0]).not.toEqual(certs[1]);
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });
  },
);
