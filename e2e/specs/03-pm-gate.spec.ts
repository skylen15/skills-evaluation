import type { Browser } from "@playwright/test";

import { AUTH_FILES, INSTANCE_URL } from "../../playwright.config.ts";
import { type DataCleanupTracker, expect, test } from "../fixtures/cleanup.ts";
import { ServiceNowFrame } from "../pages/service-now-frame.ts";

/** Helper to ensure a Member-owned Submission is submitted and registered with cleanupTracker */
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

test.describe("03 - PM Gate 1 Review, Approval & Rejection Acceptance E2E", () => {
  test.use({ storageState: AUTH_FILES.pm });

  test("positive review & approval path: PM views submitted submission, verifies action buttons, adds work note, and approves to reviewed", async ({
    page,
    browser,
    cleanupTracker,
  }) => {
    const subId = await createMemberSubmittedSubmission(
      browser,
      cleanupTracker,
      "Member Assessment for PM Approval",
    );

    const frame = new ServiceNowFrame(page);

    // Verify submission awaiting review is discoverable in the reviewer's queue before opening its form
    await frame.gotoList("x_711398_se_submission", "state=submitted");
    const isDiscoverable = await frame.isRecordInList(subId);

    expect(isDiscoverable).toBe(true);

    await frame.gotoRecord("x_711398_se_submission", subId);

    // 1. Verifies state is submitted
    const state = await frame.getFieldValue("state");
    expect(state.toLowerCase()).toBe("submitted");

    // 2. Verifies "Approve" and "Reject" buttons are present on Submitted Submission
    const isApproveVisible = await frame.isButtonVisible("pm_approve_submission");
    const isRejectVisible = await frame.isButtonVisible("pm_reject_submission");
    expect(isApproveVisible).toBe(true);
    expect(isRejectVisible).toBe(true);

    // 3. PM successfully adds a Work note during review
    const workNote = `PM review notes: self-assessment verified ${cleanupTracker.correlationToken}`;
    await frame.addWorkNote(workNote);

    // Verifies state remains submitted after adding work note
    const stateAfterNote = await frame.getFieldValue("state");
    expect(stateAfterNote.toLowerCase()).toBe("submitted");

    // 4. PM clicks "Approve" UI action
    await frame.clickApprove(subId);

    // 5. Verifies Submission advances to Reviewed state
    const stateAfterApproval = await frame.getFieldValue("state");
    expect(stateAfterApproval.toLowerCase()).toBe("reviewed");

    // 6. Verifies "Approve" and "Reject" buttons disappear once state transitions to Reviewed
    expect(await frame.isButtonVisible("pm_approve_submission")).toBe(false);
    expect(await frame.isButtonVisible("pm_reject_submission")).toBe(false);

    // 7. Verifies DataCleanupTracker tracked the record
    expect(cleanupTracker.getRegistered("x_711398_se_submission").length).toBeGreaterThanOrEqual(1);
  });

  test("negative rejection path: PM opens separate submitted submission and clicks reject to transition back to draft", async ({
    page,
    browser,
    cleanupTracker,
  }) => {
    const subId = await createMemberSubmittedSubmission(
      browser,
      cleanupTracker,
      "Member Assessment for PM Rejection",
    );

    const frame = new ServiceNowFrame(page);

    // Verify submission awaiting review is discoverable in the reviewer's queue before opening its form
    await frame.gotoList("x_711398_se_submission", "state=submitted");
    const isDiscoverable = await frame.isRecordInList(subId);

    expect(isDiscoverable).toBe(true);

    await frame.gotoRecord("x_711398_se_submission", subId);

    // 1. Verifies state is submitted
    const state = await frame.getFieldValue("state");
    expect(state.toLowerCase()).toBe("submitted");

    // 2. Verifies "Approve" and "Reject" buttons are present
    expect(await frame.isButtonVisible("pm_approve_submission")).toBe(true);
    expect(await frame.isButtonVisible("pm_reject_submission")).toBe(true);

    // 3. PM clicks "Reject" UI action
    await frame.clickReject(subId);

    // 4. Verifies Submission transitions back to Draft state for Member revision
    const stateAfterRejection = await frame.getFieldValue("state");
    expect(stateAfterRejection.toLowerCase()).toBe("draft");

    // 5. Verifies "Approve" and "Reject" buttons are no longer visible once returned to Draft
    expect(await frame.isButtonVisible("pm_approve_submission")).toBe(false);
    expect(await frame.isButtonVisible("pm_reject_submission")).toBe(false);

    // 6. Verifies DataCleanupTracker tracked the record
    expect(cleanupTracker.getRegistered("x_711398_se_submission").length).toBeGreaterThanOrEqual(1);
  });

  test("self-approval barrier: PM persona cannot approve or reject their own submission", async ({
    page,
    cleanupTracker,
  }) => {
    const frame = new ServiceNowFrame(page);

    // 1. PM navigates to create a new Submission (assigned to PM persona se_pm_test)
    await frame.gotoNewRecord("x_711398_se_submission");

    const assignedToInitial = await frame.getFieldValue("assigned_to");
    expect(assignedToInitial).toBe("se_pm_test");

    const descriptionText = `PM Self-Assessment Submission ${cleanupTracker.correlationToken}`;
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

    // 2. PM clicks "Submit for Review"
    await frame.clickSubmitForReview(realSysId);
    await frame.gotoRecord("x_711398_se_submission", realSysId);

    // 3. Verifies state transitions to Submitted
    const submittedState = await frame.getFieldValue("state");
    expect(submittedState.toLowerCase()).toBe("submitted");

    const assignedToFinal = await frame.getFieldValue("assigned_to");
    expect(assignedToFinal).toBe("se_pm_test");

    // 4. Verifies PM is blocked from approving or rejecting their own Submission:
    // Action buttons MUST NOT be visible (due to condition current.assigned_to != gs.getUserID())
    const isApproveVisible = await frame.isButtonVisible("pm_approve_submission");
    const isApproveTextVisible = await frame.isButtonVisible("Approve");
    const isRejectVisible = await frame.isButtonVisible("pm_reject_submission");
    const isRejectTextVisible = await frame.isButtonVisible("Reject");

    expect(isApproveVisible).toBe(false);
    expect(isApproveTextVisible).toBe(false);
    expect(isRejectVisible).toBe(false);
    expect(isRejectTextVisible).toBe(false);

    // 6. Verifies state remains submitted
    expect((await frame.getFieldValue("state")).toLowerCase()).toBe("submitted");
  });
});
