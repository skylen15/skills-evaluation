import { Test } from "@servicenow/sdk/core";
import "@servicenow/sdk/global";

import { skillEvaluationUser } from "./groups.now.ts";

const SUBMISSION_TABLE = "x_711398_se_submission";

export const testSubmissionMemberQueryIsolation = Test(
  {
    $id: Now.ID["atf-submission-member-query-isolation"],
    name: "Submission - member query isolation",
    description:
      "Verifies that a Member's secure query returns only their own Submissions and does not return another Member's Submission.",
    active: true,
    failOnServerError: true,
  },
  (atf) => {
    const member1 = atf.server.createUser({
      $id: Now.ID["atf-submission-query-member-1"],
      firstName: "ATF",
      lastName: "Query Member One",
      groups: [skillEvaluationUser],
      impersonate: true,
    });

    atf.server.recordInsert({
      $id: Now.ID["atf-submission-query-insert-sub-1"],
      table: SUBMISSION_TABLE,
      fieldValues: {
        description: "Submission belonging to Member One",
      },
      assert: "record_successfully_inserted",
      enforceSecurity: true,
    });

    atf.server.createUser({
      $id: Now.ID["atf-submission-query-member-2"],
      firstName: "ATF",
      lastName: "Query Member Two",
      groups: [skillEvaluationUser],
      impersonate: true,
    });

    atf.server.recordInsert({
      $id: Now.ID["atf-submission-query-insert-sub-2"],
      table: SUBMISSION_TABLE,
      fieldValues: {
        description: "Submission belonging to Member Two",
      },
      assert: "record_successfully_inserted",
      enforceSecurity: true,
    });

    atf.server.impersonate({
      $id: Now.ID["atf-submission-query-impersonate-member-1"],
      user: member1.user,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-submission-query-assertions"],
      jasmineVersion: "3.1",
      script: `
        (function(outputs, steps, params, stepResult, assertEqual) {
          var SUBMISSION_TABLE = "x_711398_se_submission";
          var grSub1 = new GlideRecord(SUBMISSION_TABLE);
          grSub1.setWorkflow(false);
          grSub1.addQuery("description", "Submission belonging to Member One");
          grSub1.setLimit(1);
          grSub1.query();
          var sub1Id = grSub1.next() ? grSub1.getUniqueValue() : "";

          var grSub2 = new GlideRecord(SUBMISSION_TABLE);
          grSub2.setWorkflow(false);
          grSub2.addQuery("description", "Submission belonging to Member Two");
          grSub2.setLimit(1);
          grSub2.query();
          var sub2Id = grSub2.next() ? grSub2.getUniqueValue() : "";

          describe("Member query isolation", function() {
            it("does not return another Member's Submission in secure queries", function() {
              expect(sub1Id).not.toBe("");
              expect(sub2Id).not.toBe("");

              // Query via GlideRecordSecure (enforces read ACLs and query rules as Member 1)
              var grSecure = new GlideRecordSecure(SUBMISSION_TABLE);
              grSecure.query();

              var visibleIds = [];
              while (grSecure.next()) {
                visibleIds.push(grSecure.getUniqueValue());
              }

              expect(visibleIds).toContain(sub1Id);
              expect(visibleIds).not.toContain(sub2Id);

              // Direct read of Member 2's submission is refused under GlideRecordSecure
              var grDirect = new GlideRecordSecure(SUBMISSION_TABLE);
              var canReadSub2 = grDirect.get(sub2Id);
              expect(canReadSub2).toBe(false);
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });
  },
);
