import type { Browser } from "@playwright/test";

import { AUTH_FILES, INSTANCE_URL } from "../../playwright.config.ts";
import { type DataCleanupTracker, expect, test } from "../fixtures/cleanup.ts";
import { ServiceNowFrame } from "../pages/service-now-frame.ts";

/** Helper to create a Member-owned Submission and submit it for review */
async function createMemberSubmittedSubmission(
  browser: Browser,
  cleanupTracker: DataCleanupTracker,
  descriptionPrefix: string,
): Promise<string> {
  const memberContext = await browser.newContext({
    baseURL: INSTANCE_URL,
    storageState: AUTH_FILES.member,
  });

  const memberPage = await memberContext.newPage();
  const memberFrame = new ServiceNowFrame(memberPage);

  try {
    await memberFrame.gotoNewRecord("x_711398_se_submission");
    const desc = `${descriptionPrefix} ${cleanupTracker.correlationToken}`;

    await memberFrame.setFieldValue("description", desc);
    await memberFrame.saveRecord();

    // Ensure we open the newly created record form before clicking Submit for Review
    let realSysId = (await memberFrame.getRecordSysId()) || memberFrame.currentRecordSysId;
    if (!realSysId) {
      await memberFrame.gotoList("x_711398_se_submission", `description=${desc}`);
      const link = memberFrame.frameLocator
        .locator(`a.linked:has-text("${desc}"), a:has-text("${desc}"), table[id$="_table"] a[href*="sys_id="]`)
        .first();
      const href = await link.getAttribute("href", { timeout: 15000 }).catch(() => "");
      const match = href.match(/[?&]sys_id=([0-9a-fA-F]{32})/);
      if (match) {
        realSysId = match[1];
      }
    }

    if (realSysId) {
      cleanupTracker.register("x_711398_se_submission", realSysId);
      await memberFrame.gotoRecord("x_711398_se_submission", realSysId);
    }

    await memberFrame.clickSubmitForReview(realSysId);

    return realSysId;
  } finally {
    await memberContext.close();
  }
}

/** Helper for PM to approve a submitted Submission to Reviewed state */
async function advanceSubmissionToReviewed(browser: Browser, subId: string): Promise<void> {
  const pmContext = await browser.newContext({
    baseURL: INSTANCE_URL,
    storageState: AUTH_FILES.pm,
  });

  const pmPage = await pmContext.newPage();
  const pmFrame = new ServiceNowFrame(pmPage);

  try {
    await pmFrame.gotoRecord("x_711398_se_submission", subId);
    await pmFrame.clickApprove(subId);
  } finally {
    await pmContext.close();
  }
}

/** Helper to create a Submission in Reviewed state */
async function createReviewedSubmission(
  browser: Browser,
  cleanupTracker: DataCleanupTracker,
  descriptionPrefix: string,
): Promise<string> {
  const subId = await createMemberSubmittedSubmission(browser, cleanupTracker, descriptionPrefix);

  await advanceSubmissionToReviewed(browser, subId);

  return subId;
}

/** Helper to create an existing Completed Submission with valid = true */
async function createCompletedSubmission(
  browser: Browser,
  cleanupTracker: DataCleanupTracker,
  descriptionPrefix: string,
): Promise<string> {
  const subId = await createReviewedSubmission(browser, cleanupTracker, descriptionPrefix);

  const coeContext = await browser.newContext({
    baseURL: INSTANCE_URL,
    storageState: AUTH_FILES.coe,
  });

  const coePage = await coeContext.newPage();
  const coeFrame = new ServiceNowFrame(coePage);

  try {
    await coeFrame.gotoRecord("x_711398_se_submission", subId);
    await coeFrame.clickApprove(subId);
  } finally {
    await coeContext.close();
  }

  return subId;
}

test.describe("04 - CoE Head Gate 2 Review, Completion & Immutability Acceptance E2E", () => {
  test.use({ storageState: AUTH_FILES.coe });

  test("positive review, approval & completion path: CoE Head approves reviewed submission, sets valid flag, invalidates prior completed submission, and locks record for all personas", async ({
    page,
    browser,
    cleanupTracker,
  }) => {
    test.setTimeout(240000);
    // 1. Establish prior Completed submission for the member (valid = true)
    const priorSubId = await createCompletedSubmission(
      browser,
      cleanupTracker,
      "Prior Completed Submission",
    );

    // 2. Establish current Submission in Reviewed state
    const currentSubId = await createReviewedSubmission(
      browser,
      cleanupTracker,
      "Member Assessment for CoE Head Approval",
    );

    const frame = new ServiceNowFrame(page);

    // Verify submission awaiting review is discoverable in the reviewer's queue before opening its form
    await frame.gotoList("x_711398_se_submission", "state=reviewed");
    const isDiscoverable = await frame.isRecordInList(currentSubId);

    expect(isDiscoverable).toBe(true);

    await frame.gotoRecord("x_711398_se_submission", currentSubId);
    // 3. Verifies Submission is in Reviewed state
    const stateInitial = await frame.getFieldValue("state");
    expect(stateInitial.toLowerCase()).toBe("reviewed");

    // 4. Verifies "Approve" and "Reject" buttons are present on Reviewed Submission
    const isApproveVisible = await frame.isButtonVisible("coe_approve_submission");
    const isRejectVisible = await frame.isButtonVisible("coe_reject_submission");
    expect(isApproveVisible).toBe(true);
    expect(isRejectVisible).toBe(true);

    // 5. CoE Head successfully adds a Work note during review
    const workNoteText = `CoE Head review notes: criteria verified and officially completed ${cleanupTracker.correlationToken}`;
    await frame.addWorkNote(workNoteText);

    // Verifies state remains Reviewed after adding work note
    const stateAfterNote = await frame.getFieldValue("state");
    expect(stateAfterNote.toLowerCase()).toBe("reviewed");

    // 6. CoE Head clicks "Approve" UI action
    await frame.clickApprove(currentSubId);

    // 7. Verifies Submission advances to Completed state
    const stateAfterApproval = await frame.getFieldValue("state");
    expect(stateAfterApproval.toLowerCase()).toBe("completed");

    // 8. Verifies valid flag on current submission is toggled to true
    const currentValid = await frame.getFieldValue("valid");
    expect(currentValid === "true" || currentValid === "1").toBe(true);

    // 9. Verifies action buttons disappear once state is Completed
    expect(await frame.isButtonVisible("coe_approve_submission")).toBe(false);
    expect(await frame.isButtonVisible("coe_reject_submission")).toBe(false);
    expect(await frame.isButtonVisible("pm_approve_submission")).toBe(false);
    expect(await frame.isButtonVisible("pm_reject_submission")).toBe(false);
    expect(await frame.isButtonVisible("submit_for_review")).toBe(false);

    // 10. Verifies prior Completed submission for the same member has valid toggled to false
    await frame.gotoRecord("x_711398_se_submission", priorSubId);

    const priorState = await frame.getFieldValue("state");
    expect(priorState.toLowerCase()).toBe("completed");

    const priorValid = await frame.getFieldValue("valid");
    expect(priorValid === "false" || priorValid === "0").toBe(true);

    // 11. Navigates back to current completed submission and verifies full record immutability
    await frame.gotoRecord("x_711398_se_submission", currentSubId);

    const immutableFields = [
      "number",
      "state",
      "assigned_to",
      "valid",
      "score",
      "level",
      "description",
      "work_notes",
    ];

    for (const field of immutableFields) {
      const isReadOnly = await frame.isFieldReadOnly(field);
      expect(isReadOnly).toBe(true);
    }

    // Related lists are locked/read-only (New button absent or disabled)
    expect(await frame.isRelatedListReadOnly("x_711398_se_skill_assessment")).toBe(true);
    expect(await frame.isRelatedListReadOnly("x_711398_se_cert_acquisition")).toBe(true);

    // 12. Verifies record immutability for other personas (Member context)
    const memberContext = await browser.newContext({
      baseURL: INSTANCE_URL,
      storageState: AUTH_FILES.member,
    });

    const memberPage = await memberContext.newPage();

    const memberFrame = new ServiceNowFrame(memberPage);

    try {
      await memberFrame.gotoRecord("x_711398_se_submission", currentSubId);

      // Description and work notes journal locked/read-only for member persona
      expect(await memberFrame.isFieldReadOnly("work_notes")).toBe(true);
      expect(await memberFrame.isFieldReadOnly("description")).toBe(true);
      expect(await memberFrame.isFieldReadOnly("state")).toBe(true);
      expect(await memberFrame.isFieldReadOnly("valid")).toBe(true);

      // Related lists locked
      expect(await memberFrame.isRelatedListReadOnly("x_711398_se_skill_assessment")).toBe(true);
      expect(await memberFrame.isRelatedListReadOnly("x_711398_se_cert_acquisition")).toBe(true);

      // Action buttons absent
      expect(await memberFrame.isButtonVisible("submit_for_review")).toBe(false);
      expect(await memberFrame.isButtonVisible("coe_approve_submission")).toBe(false);
    } finally {
      await memberContext.close();
    }

    // 13. Verifies DataCleanupTracker tracked both submissions
    expect(cleanupTracker.getRegistered("x_711398_se_submission").length).toBeGreaterThanOrEqual(2);
  });

  test("negative rejection path: CoE Head opens separate reviewed submission and clicks reject to transition back to draft", async ({
    page,
    browser,
    cleanupTracker,
  }) => {
    test.setTimeout(180000);
    const subId = await createReviewedSubmission(
      browser,
      cleanupTracker,
      "Member Assessment for CoE Rejection",
    );

    const frame = new ServiceNowFrame(page);

    // Verify submission awaiting review is discoverable in the reviewer's queue before opening its form
    await frame.gotoList("x_711398_se_submission", "state=reviewed");
    const isDiscoverable = await frame.isRecordInList(subId);

    expect(isDiscoverable).toBe(true);

    await frame.gotoRecord("x_711398_se_submission", subId);

    // 1. Verifies state is reviewed
    const state = await frame.getFieldValue("state");
    expect(state.toLowerCase()).toBe("reviewed");

    // 2. Verifies "Approve" and "Reject" buttons are present
    expect(await frame.isButtonVisible("coe_approve_submission")).toBe(true);
    expect(await frame.isButtonVisible("coe_reject_submission")).toBe(true);

    // 3. CoE Head clicks "Reject" UI action
    await frame.clickReject(subId);

    // 4. Verifies Submission transitions back to Draft state for revision
    const stateAfterRejection = await frame.getFieldValue("state");
    expect(stateAfterRejection.toLowerCase()).toBe("draft");

    // 5. Verifies valid is false
    const validAfterRejection = await frame.getFieldValue("valid");
    expect(validAfterRejection === "false" || validAfterRejection === "0").toBe(true);

    // 6. Verifies "Approve" and "Reject" buttons are no longer visible once returned to Draft
    expect(await frame.isButtonVisible("coe_approve_submission")).toBe(false);
    expect(await frame.isButtonVisible("coe_reject_submission")).toBe(false);

    // 7. Verifies DataCleanupTracker tracked the record
    expect(cleanupTracker.getRegistered("x_711398_se_submission").length).toBeGreaterThanOrEqual(1);
  });

  test("self-approval barrier: CoE Head persona cannot approve or reject their own submission", async ({
    page,
    browser,
    cleanupTracker,
  }) => {
    test.setTimeout(180000);
    const frame = new ServiceNowFrame(page);

    // 1. CoE Head navigates to create a new Submission (assigned to CoE persona se_coe_test)
    await frame.gotoNewRecord("x_711398_se_submission");

    const assignedToInitial = await frame.getFieldValue("assigned_to");
    expect(assignedToInitial).toBe("se_coe_test");

    const descriptionText = `CoE Self-Assessment Submission ${cleanupTracker.correlationToken}`;
    await frame.setFieldValue("description", descriptionText);
    await frame.saveRecord();

    let realSysId = (await frame.getRecordSysId()) || frame.currentRecordSysId;
    if (!realSysId) {
      await frame.gotoList("x_711398_se_submission", `description=${descriptionText}`);
      const link = frame.frameLocator
        .locator(`a.linked:has-text("${descriptionText}"), a:has-text("${descriptionText}"), table[id$="_table"] a[href*="sys_id="]`)
        .first();
      const href = await link.getAttribute("href", { timeout: 15000 }).catch(() => "");
      const match = href.match(/[?&]sys_id=([0-9a-fA-F]{32})/);
      if (match) {
        realSysId = match[1];
      }
    }

    if (realSysId) {
      cleanupTracker.register("x_711398_se_submission", realSysId);
      await frame.gotoRecord("x_711398_se_submission", realSysId);
    }

    // 2. CoE Head submits for review
    await frame.clickSubmitForReview(realSysId);
    await frame.gotoRecord("x_711398_se_submission", realSysId);
    // 3. Verifies state transitions to Submitted
    const submittedState = await frame.getFieldValue("state");
    expect(submittedState.toLowerCase()).toBe("submitted");

    // 4. Advance submission to Reviewed state (via PM in online mode; in offline mock updated in store)
    await advanceSubmissionToReviewed(browser, realSysId);

    // 5. CoE Head reopens their own submission at the Reviewed gate
    await frame.gotoRecord("x_711398_se_submission", realSysId);

    const stateAtGate = await frame.getFieldValue("state");
    expect(stateAtGate.toLowerCase()).toBe("reviewed");

    const assignedToFinal = await frame.getFieldValue("assigned_to");
    expect(assignedToFinal).toBe("se_coe_test");

    // 6. Verifies CoE Head is blocked from approving or rejecting their own Submission:
    // Action buttons MUST NOT be visible (due to condition current.assigned_to != gs.getUserID())
    const isApproveVisible = await frame.isButtonVisible("coe_approve_submission");
    const isApproveTextVisible = await frame.isButtonVisible("Approve");
    const isRejectVisible = await frame.isButtonVisible("coe_reject_submission");
    const isRejectTextVisible = await frame.isButtonVisible("Reject");

    expect(isApproveVisible).toBe(false);
    expect(isApproveTextVisible).toBe(false);
    expect(isRejectVisible).toBe(false);
    expect(isRejectTextVisible).toBe(false);

    // 8. Verifies state remains reviewed and does not advance to completed
    expect((await frame.getFieldValue("state")).toLowerCase()).toBe("reviewed");

    // 9. Verifies DataCleanupTracker tracked the record
    expect(cleanupTracker.getRegistered("x_711398_se_submission").length).toBeGreaterThanOrEqual(1);
  });
});
