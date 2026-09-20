import { Test } from "@servicenow/sdk/core";
import "@servicenow/sdk/global";

import { skillEvaluationUser } from "./groups.now.ts";

const SUBMISSION_TABLE = "x_711398_se_submission";

Test(
  {
    $id: Now.ID["atf-submission-insert-and-in-progress"],
    name: "Submission - insert and refuse in-progress duplicate",
    description:
      "Creates and impersonates a Skill Evaluation User group member, inserts a Submission, and verifies one Not Applicable Skill Assessment per seeded Skill. A second Submission insert for that member must be refused while the first remains in progress.",
    active: true,
    failOnServerError: true,
  },
  (atf) => {
    const member = atf.server.createUser({
      $id: Now.ID["atf-submission-insert-create-member"],
      firstName: "ATF",
      lastName: "Submission Insert Member",
      groups: [skillEvaluationUser],
      impersonate: true,
    });

    const firstSubmission = atf.server.recordInsert({
      $id: Now.ID["atf-submission-insert-first-submission"],
      table: SUBMISSION_TABLE,
      fieldValues: {
        description: "ATF insert and in-progress gate",
      },
      assert: "record_successfully_inserted",
      enforceSecurity: true,
    });

    atf.server.recordInsert({
      $id: Now.ID["atf-submission-insert-second-submission"],
      table: SUBMISSION_TABLE,
      fieldValues: {
        description: "ATF duplicate in-progress Submission",
      },
      assert: "record_not_inserted",
      enforceSecurity: true,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-submission-insert-assertions"],
      jasmineVersion: "3.1",
      script: `
        // Type: ATF Run Server Side Script
        // ES mode: ES5 (Rhino)
        // Script context: outputs, steps, params, stepResult, assertEqual
        (function(outputs, steps, params, stepResult, assertEqual) {
          var SUBMISSION_TABLE = "x_711398_se_submission";
          var SKILL_TABLE = "x_711398_se_skill";
          var SKILL_ASSESSMENT_TABLE = "x_711398_se_skill_assessment";
          var COMPLETED_STATE = "completed";
          var PROFICIENCY_NOT_APPLICABLE = "0";
          var QUERY_ROW_LIMIT = 201;
          var submissionId = "${firstSubmission.record_id}";
          var memberId = "${member.user}";

          describe("Submission insert and in-progress guard", function() {
            it("creates one Not Applicable Skill Assessment per seeded Skill", function() {
              var skillIds = {};
              var assessmentCounts = {};
              var skillCount = 0;
              var assessmentCount = 0;
              var grSkill = new GlideRecord(SKILL_TABLE);
              var grAssessment = new GlideRecord(SKILL_ASSESSMENT_TABLE);

              grSkill.setLimit(QUERY_ROW_LIMIT);
              grSkill.query();
              while (grSkill.next()) {
                skillIds[grSkill.getUniqueValue()] = true;
                skillCount += 1;
              }

              grAssessment.addQuery("submission", submissionId);
              grAssessment.setLimit(QUERY_ROW_LIMIT);
              grAssessment.query();
              while (grAssessment.next()) {
                var skillId = grAssessment.getValue("skill");

                assessmentCounts[skillId] = (assessmentCounts[skillId] || 0) + 1;
                assessmentCount += 1;

                expect(grAssessment.getValue("proficiency_level")).toBe(PROFICIENCY_NOT_APPLICABLE);
              }

              expect(skillCount).toBeGreaterThan(0);
              expect(skillCount).toBeLessThan(QUERY_ROW_LIMIT);
              expect(assessmentCount).toBeLessThan(QUERY_ROW_LIMIT);
              expect(assessmentCount).toBe(skillCount);

              Object.keys(skillIds).forEach(function(skillId) {
                expect(assessmentCounts[skillId]).toBe(1);
              });
            });

            it("keeps only the first in-progress Submission", function() {
              var grSubmission = new GlideRecord(SUBMISSION_TABLE);
              var matchingIds = [];

              grSubmission.addQuery("assigned_to", memberId);
              grSubmission.addQuery("state", "!=", COMPLETED_STATE);
              grSubmission.setLimit(2);
              grSubmission.query();

              while (grSubmission.next()) {
                matchingIds.push(grSubmission.getUniqueValue());
              }

              expect(matchingIds).toEqual([submissionId]);
            });
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });
  },
);
