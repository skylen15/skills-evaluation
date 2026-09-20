import { Test } from "@servicenow/sdk/core";
import "@servicenow/sdk/global";

import { skillEvaluationUser } from "./groups.now.ts";

const SUBMISSION_TABLE = "x_711398_se_submission";

export const testSubmissionScore = Test(
  {
    $id: Now.ID["atf-submission-score-recalculation"],
    name: "Submission - proficiency level updates score",
    description:
      "Verifies that updating Proficiency Levels on a Submission's Skill Assessments updates Score as the unweighted sum of 0-4 values, with seeded Skills left at Not Applicable counting as 0.",
    active: true,
    failOnServerError: true,
  },
  (atf) => {
    atf.server.createUser({
      $id: Now.ID["atf-submission-score-create-member"],
      firstName: "ATF",
      lastName: "Score Member",
      groups: [skillEvaluationUser],
      impersonate: true,
    });

    atf.server.recordInsert({
      $id: Now.ID["atf-submission-score-insert-submission"],
      table: SUBMISSION_TABLE,
      fieldValues: {
        description: "ATF score recalculation test",
      },
      assert: "record_successfully_inserted",
      enforceSecurity: true,
    });

    atf.server.runServerSideScript({
      $id: Now.ID["atf-submission-score-assertions"],
      jasmineVersion: "3.1",
      script: `
        // Type: ATF Run Server Side Script
        // ES mode: ES5 (Rhino)
        // Script context: outputs, steps, params, stepResult, assertEqual
        (function(outputs, steps, params, stepResult, assertEqual) {
          var SUBMISSION_TABLE = "x_711398_se_submission";
          var SKILL_ASSESSMENT_TABLE = "x_711398_se_skill_assessment";
          var grSeedSub = new GlideRecord(SUBMISSION_TABLE);
          grSeedSub.addQuery("description", "ATF score recalculation test");
          grSeedSub.setLimit(1);
          grSeedSub.query();
          var submissionId = grSeedSub.next() ? grSeedSub.getUniqueValue() : "";

          describe("Submission score recalculation", function() {
            it("recalculates score as sum of proficiency levels with unrated skills counting as 0", function() {
              var grAssessment = new GlideRecord(SKILL_ASSESSMENT_TABLE);
              grAssessment.addQuery("submission", submissionId);
              grAssessment.orderBy("sys_id");
              grAssessment.query();

              var assessmentIds = [];
              while (grAssessment.next()) {
                assessmentIds.push(grAssessment.getUniqueValue());
              }

              expect(assessmentIds.length).toBeGreaterThan(1);

              // Set first assessment to proficiency level 2 (Experienced)
              var grFirst = new GlideRecord(SKILL_ASSESSMENT_TABLE);
              if (grFirst.get(assessmentIds[0])) {
                grFirst.setValue("proficiency_level", "2");
                grFirst.update();
              }

              // Set second assessment to proficiency level 3 (Expert)
              var grSecond = new GlideRecord(SKILL_ASSESSMENT_TABLE);
              if (grSecond.get(assessmentIds[1])) {
                grSecond.setValue("proficiency_level", "3");
                grSecond.update();
              }

              // Reload submission to verify recalculated score
              // Expected: 2 + 3 + remaining at 0 = 5
              var grSubmission = new GlideRecord(SUBMISSION_TABLE);
              expect(grSubmission.get(submissionId)).toBe(true);
              expect(parseInt(grSubmission.getValue("score"), 10)).toBe(5);

              // Update first assessment to proficiency level 4 (Guru)
              if (grFirst.get(assessmentIds[0])) {
                grFirst.setValue("proficiency_level", "4");
                grFirst.update();
              }

              // Reload submission: expected 4 + 3 = 7, Level is empty (< 15)
              expect(grSubmission.get(submissionId)).toBe(true);
              expect(parseInt(grSubmission.getValue("score"), 10)).toBe(7);
              expect(grSubmission.getValue("level")).toBe("");

              // Cross Elementary threshold (min_score: 15) by rating more assessments
              // 4 assessments at 4 (Guru) = 16 points >= 15
              for (var i = 0; i < 4 && i < assessmentIds.length; i++) {
                var grItem = new GlideRecord(SKILL_ASSESSMENT_TABLE);
                if (grItem.get(assessmentIds[i])) {
                  grItem.setValue("proficiency_level", "4");
                  grItem.update();
                }
              }

              expect(grSubmission.get(submissionId)).toBe(true);
              var finalScore = parseInt(grSubmission.getValue("score"), 10);
              expect(finalScore).toBeGreaterThanOrEqual(15);

              var levelId = grSubmission.getValue("level");
              expect(levelId).not.toBe("");
              var grLevel = new GlideRecord("x_711398_se_level");
              expect(grLevel.get(levelId)).toBe(true);
              expect(grLevel.getValue("name")).toBe("Elementary");
          });
        })(outputs, steps, params, stepResult, assertEqual);
        jasmine.getEnv().execute();
      `,
    });
  },
);
