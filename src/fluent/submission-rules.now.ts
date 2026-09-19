import { BusinessRule } from "@servicenow/sdk/core";

import { refuseInProgressInsert } from "../server/refuse-in-progress-insert.js";
import { restrictMemberSubmissionQuery } from "../server/restrict-member-submission-query.js";

BusinessRule({
  $id: Now.ID["refuse-in-progress-insert"],
  name: "Refuse in-progress insert",
  table: "x_711398_se_submission",
  when: "before",
  action: ["insert"],
  order: 100,
  active: true,
  script: refuseInProgressInsert,
  description:
    "Refuse a second Submission while that Assigned to already has one that is not Completed",
});

BusinessRule({
  $id: Now.ID["restrict-member-submission-query"],
  name: "Restrict Member Submission query",
  table: "x_711398_se_submission",
  when: "before",
  action: ["query"],
  order: 100,
  active: true,
  script: restrictMemberSubmissionQuery,
  description: "Members see only Submissions assigned to themselves; se_admin is unrestricted",
});
