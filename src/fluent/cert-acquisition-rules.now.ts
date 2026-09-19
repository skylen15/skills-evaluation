import { BusinessRule } from "@servicenow/sdk/core";

import { refuseDuplicateCertAcquisition } from "../server/refuse-duplicate-cert-acquisition.js";
import { restrictMemberCertAcquisitionQuery } from "../server/restrict-member-cert-acquisition-query.js";

BusinessRule({
  $id: Now.ID["refuse-duplicate-cert-acquisition"],
  name: "Refuse duplicate Cert Acquisition",
  table: "x_711398_se_cert_acquisition",
  when: "before",
  action: ["insert"],
  order: 100,
  active: true,
  script: refuseDuplicateCertAcquisition,
  description: "Refuse claiming the same Certificate twice on one Submission",
});

BusinessRule({
  $id: Now.ID["restrict-member-cert-acquisition-query"],
  name: "Restrict Member Cert Acquisition query",
  table: "x_711398_se_cert_acquisition",
  when: "before",
  action: ["query"],
  order: 100,
  active: true,
  script: restrictMemberCertAcquisitionQuery,
  description:
    "Members see only Cert Acquisitions on Submissions assigned to themselves; se_admin is unrestricted",
});
