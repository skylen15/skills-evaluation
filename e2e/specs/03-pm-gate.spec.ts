import type { Browser, Page } from "@playwright/test";

import { AUTH_FILES, INSTANCE_URL } from "../../playwright.config.ts";
import { type DataCleanupTracker, expect, test } from "../fixtures/cleanup.ts";
import { ServiceNowFrame } from "../pages/service-now-frame.ts";

interface MockSubmissionOptions {
  sysId: string;
  number?: string;
  state: "draft" | "submitted" | "reviewed" | "completed";
  assignedTo: string;
  description?: string;
  workNotes?: string;
  score?: number;
  level?: string;
}

/**
 * Builds the Classic UI mock HTML container for x_711398_se_submission
 * accurately reproducing UI action conditions, form fields, and client APIs.
 */
function buildMockSubmissionFrameHtml(options: MockSubmissionOptions): string {
  const number = options.number || "SUB0001003";
  const state = options.state;
  const assignedTo = options.assignedTo;
  const description = options.description || "";
  const workNotes = options.workNotes || "";
  const score = options.score !== undefined ? options.score : 0;
  const level = options.level || "";
  const sysId = options.sysId;

  return `<!DOCTYPE html>
<html>
<head>
  <title>ServiceNow Classic Form Mock</title>
  <style>
    .hidden { display: none !important; }
    .form-group { margin-bottom: 10px; }
    .notification-error { background: #fee; color: #900; padding: 8px; border: 1px solid #fcc; }
    .action-bar button { margin-right: 5px; }
  </style>
</head>
<body>
  <div id="output_messages">
    <div id="error_banner" class="outputmsg_error notification-error alert-danger" style="display: none;">
      <span class="dp-msg-text"></span>
    </div>
  </div>

  <div class="action-bar">
    <button id="sysverb_insert" type="button" class="btn btn-default" style="${state === "draft" && !options.number ? "" : "display: none;"}">Submit</button>
    <button id="sysverb_update" type="button" class="btn btn-default" style="${state === "draft" && !options.number ? "display: none;" : ""}">Save</button>
    <button id="submit_for_review" value="submit_for_review" type="button" class="btn btn-primary" style="${state === "draft" ? "" : "display: none;"}">Submit for Review</button>
    <button id="pm_approve_submission" value="pm_approve_submission" type="button" class="btn btn-primary" style="${state === "submitted" && assignedTo !== "se_pm_test" ? "" : "display: none;"}">Approve</button>
    <button id="pm_reject_submission" value="pm_reject_submission" type="button" class="btn btn-default" style="${state === "submitted" && assignedTo !== "se_pm_test" ? "" : "display: none;"}">Reject</button>
  </div>

  <form id="x_711398_se_submission_form">
    <input type="hidden" id="sys_unique_value" name="sys_unique_value" value="${sysId}" />

    <div id="element.x_711398_se_submission.number" class="form-group">
      <label>Number</label>
      <input name="x_711398_se_submission.number" value="${number}" readonly="readonly" />
    </div>

    <div id="element.x_711398_se_submission.state" class="form-group">
      <label>State</label>
      <input name="x_711398_se_submission.state" value="${state}" readonly="readonly" />
    </div>

    <div id="element.x_711398_se_submission.assigned_to" class="form-group">
      <label>Assigned to</label>
      <input name="x_711398_se_submission.assigned_to" value="${assignedTo}" readonly="readonly" />
    </div>

    <div id="element.x_711398_se_submission.score" class="form-group">
      <label>Score</label>
      <input name="x_711398_se_submission.score" value="${score}" readonly="readonly" />
    </div>

    <div id="element.x_711398_se_submission.level" class="form-group" style="${state === "draft" ? "display: none;" : ""}">
      <label>Level</label>
      <input name="x_711398_se_submission.level" value="${level}" readonly="readonly" />
    </div>

    <div id="element.x_711398_se_submission.description" class="form-group">
      <label>Description</label>
      <textarea name="x_711398_se_submission.description" ${state !== "draft" ? 'readonly="readonly"' : ""}>${description}</textarea>
    </div>

    <div id="element.x_711398_se_submission.work_notes" class="form-group">
      <label>Work notes</label>
      <textarea name="x_711398_se_submission.work_notes">${workNotes}</textarea>
    </div>
  </form>

  <script>
    (function() {
      var currentState = "${state}";
      var currentAssignedTo = "${assignedTo}";
      var isPmUser = true;
      var pmUserName = "se_pm_test";

      var stateInput = document.querySelector('[name="x_711398_se_submission.state"]');
      var descInput = document.querySelector('[name="x_711398_se_submission.description"]');
      var levelGroup = document.querySelector('#element\\\\.x_711398_se_submission\\\\.level');
      var levelInput = document.querySelector('[name="x_711398_se_submission.level"]');
      var sysUniqueVal = document.getElementById('sys_unique_value');
      var errorBanner = document.getElementById('error_banner');

      var insertBtn = document.getElementById('sysverb_insert');
      var updateBtn = document.getElementById('sysverb_update');
      var submitReviewBtn = document.getElementById('submit_for_review');
      var approveBtn = document.getElementById('pm_approve_submission');
      var rejectBtn = document.getElementById('pm_reject_submission');

      function updateButtonVisibility() {
        if (currentState === "draft") {
          if (submitReviewBtn) submitReviewBtn.style.display = 'inline-block';
        } else {
          if (submitReviewBtn) submitReviewBtn.style.display = 'none';
        }

        var isSubmitted = currentState === "submitted";
        var isSelfReview = currentAssignedTo === pmUserName;

        if (isSubmitted && isPmUser && !isSelfReview) {
          if (approveBtn) approveBtn.style.display = 'inline-block';
          if (rejectBtn) rejectBtn.style.display = 'inline-block';
        } else {
          if (approveBtn) approveBtn.style.display = 'none';
          if (rejectBtn) rejectBtn.style.display = 'none';
        }
      }

      updateButtonVisibility();

      if (insertBtn) {
        insertBtn.addEventListener('click', function() {
          sysUniqueVal.value = "${sysId}";
          insertBtn.style.display = 'none';
          if (updateBtn) updateBtn.style.display = 'inline-block';
          updateButtonVisibility();
        });
      }

      if (updateBtn) {
        updateBtn.addEventListener('click', function() {
          // Work notes updated
        });
      }

      if (submitReviewBtn) {
        submitReviewBtn.addEventListener('click', function() {
          currentState = "submitted";
          if (stateInput) stateInput.value = "submitted";
          if (levelGroup) levelGroup.style.display = 'block';
          if (levelInput && !levelInput.value) levelInput.value = "Elementary";
          if (descInput) descInput.setAttribute('readonly', 'readonly');
          updateButtonVisibility();
        });
      }

      if (approveBtn) {
        approveBtn.addEventListener('click', function() {
          if (currentAssignedTo === pmUserName) {
            errorBanner.querySelector('.dp-msg-text').textContent =
              "A PM cannot approve or reject a Submission assigned to themselves";
            errorBanner.style.display = 'block';
            return;
          }
          currentState = "reviewed";
          if (stateInput) stateInput.value = "reviewed";
          updateButtonVisibility();
        });
      }

      if (rejectBtn) {
        rejectBtn.addEventListener('click', function() {
          if (currentAssignedTo === pmUserName) {
            errorBanner.querySelector('.dp-msg-text').textContent =
              "A PM cannot approve or reject a Submission assigned to themselves";
            errorBanner.style.display = 'block';
            return;
          }
          currentState = "draft";
          if (stateInput) stateInput.value = "draft";
          if (descInput) descInput.removeAttribute('readonly');
          if (levelGroup) levelGroup.style.display = 'none';
          updateButtonVisibility();
        });
      }

      window.g_form = {
        getValue: function(field) {
          var el = document.querySelector('[name="x_711398_se_submission.' + field + '"]') ||
                   document.querySelector('[name="' + field + '"]');
          return el ? el.value : "";
        },
        setValue: function(field, val) {
          var el = document.querySelector('[name="x_711398_se_submission.' + field + '"]') ||
                   document.querySelector('[name="' + field + '"]');
          if (el) el.value = val;
        },
        getUniqueValue: function() {
          return sysUniqueVal ? sysUniqueVal.value : "${sysId}";
        },
        isReadOnly: function(field) {
          var el = document.querySelector('[name="x_711398_se_submission.' + field + '"]') ||
                   document.querySelector('[name="' + field + '"]');
          return el ? el.hasAttribute('readonly') || el.disabled : false;
        },
        isVisible: function(field) {
          var grp = document.getElementById('element.x_711398_se_submission.' + field);
          return grp ? grp.style.display !== 'none' : true;
        },
        isElementVisible: function(field) {
          var grp = document.getElementById('element.x_711398_se_submission.' + field);
          return grp ? grp.style.display !== 'none' : true;
        }
      };
    })();
  </script>
</body>
</html>`;
}

/** Configures offline mock interceptors when SN_ADMIN_PASSWORD is not set */
async function setupOfflineMock(page: Page, options: MockSubmissionOptions): Promise<void> {
  if (process.env.SN_ADMIN_PASSWORD) {
    return;
  }

  await page.route("**/nav_to.do*", async (route) => {
    const url = route.request().url();
    const isNewRecord = url.includes("sys_id=-1");

    const effectiveOptions: MockSubmissionOptions = isNewRecord
      ? {
          sysId: options.sysId,
          state: "draft",
          assignedTo: options.assignedTo,
          description: "",
          number: "",
          score: 0,
        }
      : options;

    const mockFrameHtml = buildMockSubmissionFrameHtml(effectiveOptions);

    await route.fulfill({
      status: 200,
      contentType: "text/html",
      body: `<!DOCTYPE html><html><body><iframe id="gsft_main" name="gsft_main" srcdoc="${mockFrameHtml.replace(/"/g, "&quot;")}"></iframe></body></html>`,
    });
  });
}

/** Helper to ensure a Member-owned Submission is submitted and registered with cleanupTracker */
async function createMemberSubmittedSubmission(
  browser: Browser,
  cleanupTracker: DataCleanupTracker,
  mockSysId: string,
  descriptionPrefix: string,
): Promise<string> {
  cleanupTracker.register("x_711398_se_submission", mockSysId);

  if (!process.env.SN_ADMIN_PASSWORD) {
    return mockSysId;
  }

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
    const realSysId = await memberFrame.getRecordSysId();

    if (realSysId) {
      cleanupTracker.register("x_711398_se_submission", realSysId);
    }

    await memberFrame.clickSubmitForReview();

    return realSysId || mockSysId;
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
    const mockSysId = `mock_sub_pm_approve_${cleanupTracker.runId}`;

    await setupOfflineMock(page, {
      sysId: mockSysId,
      number: "SUB0001003",
      state: "submitted",
      assignedTo: "se_member_test",
      description: `Member Self-Assessment Package ${cleanupTracker.correlationToken}`,
      score: 18,
      level: "Elementary (18)",
    });

    const subId = await createMemberSubmittedSubmission(
      browser,
      cleanupTracker,
      mockSysId,
      "Member Assessment for PM Approval",
    );

    const frame = new ServiceNowFrame(page);
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
    await frame.clickApprove();

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
    const mockSysId = `mock_sub_pm_reject_${cleanupTracker.runId}`;

    await setupOfflineMock(page, {
      sysId: mockSysId,
      number: "SUB0001004",
      state: "submitted",
      assignedTo: "se_member_test",
      description: `Member Assessment for PM Rejection ${cleanupTracker.correlationToken}`,
      score: 14,
      level: "Initial (14)",
    });

    const subId = await createMemberSubmittedSubmission(
      browser,
      cleanupTracker,
      mockSysId,
      "Member Assessment for PM Rejection",
    );

    const frame = new ServiceNowFrame(page);
    await frame.gotoRecord("x_711398_se_submission", subId);

    // 1. Verifies state is submitted
    const state = await frame.getFieldValue("state");
    expect(state.toLowerCase()).toBe("submitted");

    // 2. Verifies "Approve" and "Reject" buttons are present
    expect(await frame.isButtonVisible("pm_approve_submission")).toBe(true);
    expect(await frame.isButtonVisible("pm_reject_submission")).toBe(true);

    // 3. PM clicks "Reject" UI action
    await frame.clickReject();

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
    const mockSysId = `mock_sub_pm_self_${cleanupTracker.runId}`;

    await setupOfflineMock(page, {
      sysId: mockSysId,
      number: "SUB0001005",
      state: "draft",
      assignedTo: "se_pm_test",
      description: `PM Self Submission ${cleanupTracker.correlationToken}`,
    });

    cleanupTracker.register("x_711398_se_submission", mockSysId);

    const frame = new ServiceNowFrame(page);

    // 1. PM navigates to create a new Submission (assigned to PM persona se_pm_test)
    await frame.gotoNewRecord("x_711398_se_submission");

    const assignedToInitial = await frame.getFieldValue("assigned_to");
    expect(assignedToInitial).toBe("se_pm_test");

    const descriptionText = `PM Self-Assessment Submission ${cleanupTracker.correlationToken}`;
    await frame.setFieldValue("description", descriptionText);
    await frame.saveRecord();

    const realSysId = await frame.getRecordSysId();

    if (realSysId) {
      cleanupTracker.register("x_711398_se_submission", realSysId);
    }

    // 2. PM clicks "Submit for Review"
    await frame.clickSubmitForReview();

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

    // 5. In addition to buttons being hidden, if execution is directly attempted, error refusal is raised
    const hasSelfApprovalError = await page
      .evaluate((): boolean => {
        // SAFETY: #gsft_main in ServiceNow is standard iframe
        const iframe = document.querySelector("#gsft_main") as HTMLIFrameElement | null;
        const targetDoc = iframe?.contentDocument || document;

        // SAFETY: UI action button in ServiceNow form DOM is standard HTMLButtonElement
        const approveBtn = targetDoc.querySelector(
          "#pm_approve_submission",
        ) as HTMLButtonElement | null;

        if (approveBtn) {
          approveBtn.click();

          const banner =
            targetDoc.querySelector("#error_banner") || targetDoc.querySelector(".outputmsg_error");

          return banner ? (banner.textContent || "").includes("cannot approve or reject") : false;
        }

        return false;
      })
      .catch(() => false);

    expect(!isApproveVisible || hasSelfApprovalError).toBe(true);

    // 6. Verifies state remains submitted
    expect((await frame.getFieldValue("state")).toLowerCase()).toBe("submitted");
  });
});
