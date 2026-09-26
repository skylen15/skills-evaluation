import { Test } from "@servicenow/sdk/core";
import "@servicenow/sdk/global";

import { skillEvaluationUser } from "../../foundation/groups.now.ts";

export const testSubmissionCertUniqueness = Test(
  {
    $id: Now.ID["atf-submission-cert-uniqueness"],
    name: "Submission - certificate acquisition uniqueness",
    description:
      "Verifies that claiming the same Certificate twice on one Submission is refused, Cert Acquisition evidence fields persist, and mutation is allowed only while Draft.",
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
          grCert1.addQuery("name", "ServiceNow Certified System Administrator");
          grCert1.setLimit(1);
          grCert1.query();
          var cert1Id = grCert1.next() ? grCert1.getUniqueValue() : "";

          var grCert2 = new GlideRecord(CERT_TABLE);
          grCert2.addQuery("name", "ServiceNow Certified Application Developer");
          grCert2.setLimit(1);
          grCert2.query();
          var cert2Id = grCert2.next() ? grCert2.getUniqueValue() : "";

          var grSub = new GlideRecord(SUBMISSION_TABLE);
          grSub.initialize();
          grSub.setValue("description", "ATF cert acquisition uniqueness test");
          var submissionId = grSub.insert();
          var acq1Id = "";
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
              acq1Id = grAcq1.insert();

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

            it("persists evidence fields and enforces Draft-only mutation", function() {
              // Set evidence fields on acq1 while parent is Draft
              var grAcqEvidence = new GlideRecord(CERT_ACQUISITION_TABLE);
              expect(grAcqEvidence.get(acq1Id)).toBe(true);
              expect(grAcqEvidence.canWrite()).toBe(true);
              grAcqEvidence.setValue("certification_number", "SN-12345");
              grAcqEvidence.setValue("certified_date", "2026-01-15");
              grAcqEvidence.setValue("servicenow_release", "Washington DC");
              expect(grAcqEvidence.update()).not.toBeNull();

              // Assert evidence persistence
              var grCheckAcq = new GlideRecord(CERT_ACQUISITION_TABLE);
              expect(grCheckAcq.get(acq1Id)).toBe(true);
              expect(grCheckAcq.getValue("certification_number")).toBe("SN-12345");
              expect(grCheckAcq.getValue("certified_date")).toBe("2026-01-15");
              expect(grCheckAcq.getValue("servicenow_release")).toBe("Washington DC");

              // Submit parent Submission
              var submitModule = require("x_711398_se/skill-evaluation/0.0.1/src/server/submission/submit-for-review.ts");
              var grSubDraft = new GlideRecord(SUBMISSION_TABLE);
              expect(grSubDraft.get(submissionId)).toBe(true);
              submitModule.submitForReview(grSubDraft);

              var grSubCheck = new GlideRecord(SUBMISSION_TABLE);
              expect(grSubCheck.get(submissionId)).toBe(true);
              expect(grSubCheck.getValue("state")).toBe("submitted");

              // Once parent is Submitted, Member cannot mutate or create Cert Acquisitions
              var grAcqSubmitted = new GlideRecord(CERT_ACQUISITION_TABLE);
              expect(grAcqSubmitted.get(acq1Id)).toBe(true);
              expect(grAcqSubmitted.canWrite()).toBe(false);
              expect(grAcqSubmitted.canCreate()).toBe(false);
              expect(grAcqSubmitted.canDelete()).toBe(false);
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });
  },
);
