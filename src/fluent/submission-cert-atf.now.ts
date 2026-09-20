import { Test } from "@servicenow/sdk/core";
import "@servicenow/sdk/global";

import { skillEvaluationUser } from "./groups.now.ts";

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

    atf.server.runServerSideScript({
      $id: Now.ID["atf-submission-cert-assertions"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          var SUBMISSION_TABLE = "x_711398_se_submission";
          var CERT_ACQUISITION_TABLE = "x_711398_se_cert_acquisition";
          var CERT_TABLE = "x_711398_se_certificate";

          var grCert1 = new GlideRecord(CERT_TABLE);
          grCert1.addQuery("name", "Servicenow System Administrator Certification (CSA)");
          grCert1.setLimit(1);
          grCert1.query();
          var cert1Id = grCert1.next() ? grCert1.getUniqueValue() : "";

          var grCert2 = new GlideRecord(CERT_TABLE);
          grCert2.addQuery("name", "Servicenow Certified Application Developer (CAD)");
          grCert2.setLimit(1);
          grCert2.query();
          var cert2Id = grCert2.next() ? grCert2.getUniqueValue() : "";

          var grSub = new GlideRecord(SUBMISSION_TABLE);
          grSub.initialize();
          grSub.setValue("description", "ATF cert acquisition uniqueness test");
          var submissionId = grSub.insert();

          describe("Cert Acquisition uniqueness", function() {
            it("claims the same Certificate twice is refused and different Certificate is allowed", function() {
              expect(submissionId).not.toBeNull();
              expect(cert1Id).not.toBe("");
              expect(cert2Id).not.toBe("");

              // First insert with cert1
              var grAcq1 = new GlideRecord(CERT_ACQUISITION_TABLE);
              grAcq1.initialize();
              grAcq1.setValue("submission", submissionId);
              grAcq1.setValue("certificate", cert1Id);
              var acq1Id = grAcq1.insert();
              expect(acq1Id).not.toBeNull();

              // Duplicate insert with cert1 must fail
              var grAcqDup = new GlideRecord(CERT_ACQUISITION_TABLE);
              grAcqDup.initialize();
              grAcqDup.setValue("submission", submissionId);
              grAcqDup.setValue("certificate", cert1Id);
              var acqDupId = grAcqDup.insert();
              expect(acqDupId).toBeNull();

              // Different insert with cert2 must succeed
              var grAcq2 = new GlideRecord(CERT_ACQUISITION_TABLE);
              grAcq2.initialize();
              grAcq2.setValue("submission", submissionId);
              grAcq2.setValue("certificate", cert2Id);
              var acq2Id = grAcq2.insert();
              expect(acq2Id).not.toBeNull();

              // Verify exactly 2 distinct Certificate claims exist
              var grCount = new GlideRecord(CERT_ACQUISITION_TABLE);
              grCount.addQuery("submission", submissionId);
              grCount.query();
              var claims = [];
              while (grCount.next()) {
                claims.push(grCount.getValue("certificate"));
              }
              expect(claims.length).toBe(2);
              expect(claims).toContain(cert1Id);
              expect(claims).toContain(cert2Id);
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });
  },
);
