import { TestSuite } from "@servicenow/sdk/core";

import { testSubmissionCascadeDelete } from "./submission-cascade-delete-atf.now.ts";
import { testSubmissionCertUniqueness } from "./submission-cert-atf.now.ts";
import { testSubmissionCompletedImmutability } from "./submission-completed-lock-atf.now.ts";
import { testSubmissionGates } from "./submission-gates-atf.now.ts";
import { testSubmissionInsertAndInProgress } from "./submission-insert-atf.now.ts";
import { testSubmissionMemberQueryIsolation } from "./submission-query-isolation-atf.now.ts";
import { testSubmissionScore } from "./submission-score-atf.now.ts";
import { testSubmissionSubmitForReview } from "./submission-submit-atf.now.ts";

export const skillEvaluationTestSuite = TestSuite({
  $id: Now.ID["atf-skill-evaluation-suite"],
  name: "Skill Evaluation",
  description:
    "Automated Test Framework suite for Skill Evaluation covering submission lifecycle, scoring, uniqueness, gates, immutability, and security rules.",
  active: true,
  tests: [
    testSubmissionInsertAndInProgress,
    testSubmissionScore,
    testSubmissionCertUniqueness,
    testSubmissionSubmitForReview,
    testSubmissionGates,
    testSubmissionCompletedImmutability,
    testSubmissionMemberQueryIsolation,
    testSubmissionCascadeDelete,
  ],
});
