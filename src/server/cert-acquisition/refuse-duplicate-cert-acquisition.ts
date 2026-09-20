import { GlideRecord, gs } from "@servicenow/glide";

import {
  decideCertAcquisitionInsert,
  parseCertificateId,
  parseSubmissionId,
  type CertificateId,
  type CertAcquisitionSnapshot,
  type SubmissionId,
} from "../submission/submission-policy.ts";

const CERT_ACQUISITION_TABLE = "x_711398_se_cert_acquisition";

/**
 * Abort when a Submission already claims the selected Certificate.
 *
 * Type: Business Rule
 * Target table: x_711398_se_cert_acquisition
 * ES mode: ES2022 (sys_module)
 * Script context: current, previous
 *
 * @param current - The Cert Acquisition being inserted.
 * @param _previous - Unused; insert has no previous row.
 */
export function refuseDuplicateCertAcquisition(current: GlideRecord, _previous: GlideRecord): void {
  const certificate = parseCertificateId(current.getValue("certificate"));

  if (certificate._tag === "err") {
    gs.addErrorMessage(certificate.error.message);
    current.setAbortAction(true);

    return;
  }

  const submission = parseSubmissionId(current.getValue("submission"));

  if (submission._tag === "err") {
    gs.addErrorMessage(submission.error.message);
    current.setAbortAction(true);

    return;
  }

  const decision = decideCertAcquisitionInsert(
    {
      submission: submission.value,
      certificate: certificate.value,
    },
    loadExisting(submission.value, certificate.value),
  );

  if (decision._tag === "err") {
    gs.addErrorMessage(decision.error.message);
    current.setAbortAction(true);
  }
}

/**
 * Load another matching claim on the same Submission.
 *
 * @param submission - Parent Submission sys id.
 * @param certificate - Certificate selected on the current row.
 * @returns Zero or one matching sibling snapshot.
 */
function loadExisting(
  submission: SubmissionId,
  certificate: CertificateId,
): ReadonlyArray<CertAcquisitionSnapshot> {
  const grAcquisition = new GlideRecord(CERT_ACQUISITION_TABLE);
  grAcquisition.addQuery("submission", submission);
  grAcquisition.addQuery("certificate", certificate);
  grAcquisition.setLimit(1);
  grAcquisition.query();

  if (grAcquisition.next()) {
    return [{ submission, certificate }];
  }

  return [];
}
