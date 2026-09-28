import { AUTH_FILES } from "../../playwright.config.ts";
import { test, expect } from "../fixtures/cleanup.ts";
import { ServiceNowFrame } from "../pages/service-now-frame.ts";

test.describe("02 - Member Self-Assessment Submission Journey Acceptance", () => {
  test.use({ storageState: AUTH_FILES.member });

  test("completes end-to-end Member self-assessment lifecycle, verifies mutation boundary, and cleans up records", async ({
    page,
    cleanupTracker,
  }) => {
    const frame = new ServiceNowFrame(page);

    // 1. Member navigates directly to create a new Submission record
    await frame.gotoNewRecord("x_711398_se_submission");

    // Verify initial Draft state
    const initialState = await frame.getFieldValue("state");

    expect(initialState.toLowerCase()).toBe("draft");

    // 2. Asserts Level field is completely hidden while in Draft
    const isLevelVisibleInDraft = await frame.isFieldVisible("level");

    expect(isLevelVisibleInDraft).toBe(false);

    // 3. Member populates description with run-scoped correlation token and saves initial Draft
    const descriptionText = `Member Self-Assessment Acceptance Journey ${cleanupTracker.correlationToken}`;

    await frame.setFieldValue("description", descriptionText);
    await frame.saveRecord();

    // 4. Member rates Skill Assessments to achieve Elementary score threshold (>= 15 points)
    await frame.rateSkillAssessments([
      { index: 0, proficiencyLevel: "4" },
      { index: 1, proficiencyLevel: "4" },
      { index: 2, proficiencyLevel: "4" },
      { index: 3, proficiencyLevel: "4" },
    ]);

    const updatedScore = Number(await frame.getFieldValue("score"));

    expect(updatedScore).toBeGreaterThanOrEqual(15);

    // 5. Member claims Certificate with valid metadata and asserts uniqueness rules
    const certDetails = {
      certificate: "ServiceNow Certified Application Developer",
      certificationNumber: `CAD-${Date.now()}`,
      certifiedDate: "2026-01-15",
      release: "Washington DC",
    };

    await frame.addCertAcquisition(certDetails);

    // Assert uniqueness rule: duplicate claim must be refused
    await frame.addCertAcquisition({
      ...certDetails,
      certificationNumber: `CAD-DUP-${Date.now()}`,
    });

    const isDuplicateRefused = await frame.hasErrorMessage(/already claimed/i);

    expect(isDuplicateRefused).toBe(true);

    // 6. Member clicks "Submit for Review"
    await frame.clickButton("Submit for Review");

    // 7. Verifies state transitions to Submitted
    const submittedState = await frame.getFieldValue("state");

    expect(submittedState.toLowerCase()).toBe("submitted");

    // 8. Verifies calculated Level is now visible and displays the correct band rating
    const isLevelVisibleInSubmitted = await frame.isFieldVisible("level");

    expect(isLevelVisibleInSubmitted).toBe(true);

    const calculatedLevel = await frame.getFieldValue("level");

    expect(calculatedLevel).toContain("Elementary");

    // 9. Verifies "Submit for Review" button disappears once submitted
    const isSubmitBtnVisible = await frame.isButtonVisible("Submit for Review");
    const isSubmitActionVisible = await frame.isButtonVisible("submit_for_review");

    expect(isSubmitBtnVisible).toBe(false);
    expect(isSubmitActionVisible).toBe(false);

    // 10. Verifies all Submission fields and related list entries become read-only post-submit
    const isDescriptionReadOnly = await frame.isFieldReadOnly("description");
    const isStateReadOnly = await frame.isFieldReadOnly("state");
    const isScoreReadOnly = await frame.isFieldReadOnly("score");
    const isLevelReadOnly = await frame.isFieldReadOnly("level");
    const isCertAcqListReadOnly = await frame.isRelatedListReadOnly("x_711398_se_cert_acquisition");

    const isSkillAssListReadOnly = await frame.isRelatedListReadOnly(
      "x_711398_se_skill_assessment",
    );

    expect(isDescriptionReadOnly).toBe(true);
    expect(isStateReadOnly).toBe(true);
    expect(isScoreReadOnly).toBe(true);
    expect(isLevelReadOnly).toBe(true);
    expect(isCertAcqListReadOnly).toBe(true);
    expect(isSkillAssListReadOnly).toBe(true);

    // 11. Verifies Member can add a Work note while in Submitted state
    const isWorkNotesReadOnly = await frame.isFieldReadOnly("work_notes");

    expect(isWorkNotesReadOnly).toBe(false);

    const workNoteText = `Member notes during PM review: ${cleanupTracker.correlationToken}`;

    await frame.addWorkNote(workNoteText);

    // State remains submitted after adding work note
    const stateAfterNote = await frame.getFieldValue("state");

    expect(stateAfterNote.toLowerCase()).toBe("submitted");

    // 12. Validates DataCleanupTracker run identifier and rollback readiness
    expect(cleanupTracker.runId).toBeDefined();
    expect(cleanupTracker.correlationToken).toContain("PW-TEST-");
  });
});
