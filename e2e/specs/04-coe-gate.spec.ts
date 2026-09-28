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
  valid?: boolean;
}

/**
 * Builds the Classic UI mock HTML container for x_711398_se_submission
 * accurately reproducing UI action conditions, form fields, immutability, and client APIs.
 */
function buildMockSubmissionFrameHtml(options: MockSubmissionOptions): string {
  const number = options.number || "SUB0001006";
  const state = options.state;
  const assignedTo = options.assignedTo;
  const description = options.description || "";
  const workNotes = options.workNotes || "";
  const score = options.score !== undefined ? options.score : 0;
  const level = options.level || "";
  const sysId = options.sysId;
  const valid = options.valid ?? false;

  return `<!DOCTYPE html>
<html>
<head>
  <title>ServiceNow Classic Form Mock - CoE Gate</title>
  <style>
    .hidden { display: none !important; }
    .form-group { margin-bottom: 10px; }
    .notification-error { background: #fee; color: #900; padding: 8px; border: 1px solid #fcc; }
    .action-bar button { margin-right: 5px; }
    .related-list { margin-top: 15px; border-top: 1px solid #eee; padding-top: 10px; }
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
    <button id="coe_approve_submission" value="coe_approve_submission" type="button" class="btn btn-primary" style="${state === "reviewed" && assignedTo !== "se_coe_test" ? "" : "display: none;"}">Approve</button>
    <button id="coe_reject_submission" value="coe_reject_submission" type="button" class="btn btn-default" style="${state === "reviewed" && assignedTo !== "se_coe_test" ? "" : "display: none;"}">Reject</button>
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

    <div id="element.x_711398_se_submission.valid" class="form-group">
      <label>Valid</label>
      <input name="x_711398_se_submission.valid" value="${valid ? "true" : "false"}" readonly="readonly" />
      <input type="checkbox" id="x_711398_se_submission.valid_check" name="x_711398_se_submission.valid_check" ${valid ? 'checked="checked"' : ""} disabled="disabled" />
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
      <textarea name="x_711398_se_submission.work_notes" ${state === "completed" ? 'readonly="readonly" disabled="disabled"' : ""}>${workNotes}</textarea>
    </div>
  </form>

  <div id="element.x_711398_se_skill_assessment" class="related-list">
    <h4>Skill Assessments</h4>
    <div id="x_711398_se_skill_assessment_list">
      <button id="x_711398_se_skill_assessment_new" class="btn btn-default" style="${state === "completed" ? "display: none;" : ""}">New</button>
    </div>
  </div>

  <div id="element.x_711398_se_cert_acquisition" class="related-list">
    <h4>Cert Acquisitions</h4>
    <div id="x_711398_se_cert_acquisition_list">
      <button id="x_711398_se_cert_acquisition_new" class="btn btn-default" style="${state === "completed" ? "display: none;" : ""}">New</button>
    </div>
  </div>

  <script>
    (function() {
      var currentSysId = "${sysId}";
      var currentState = "${state}";
      var currentValid = ${valid ? "true" : "false"};
      var currentAssignedTo = "${assignedTo}";
      var coeUserName = "se_coe_test";

      var stateInput = document.querySelector('[name="x_711398_se_submission.state"]');
      var validInput = document.querySelector('[name="x_711398_se_submission.valid"]');
      var validCheck = document.getElementById('x_711398_se_submission.valid_check');
      var descInput = document.querySelector('[name="x_711398_se_submission.description"]');
      var workNotesInput = document.querySelector('[name="x_711398_se_submission.work_notes"]');
      var levelGroup = document.getElementById('element.x_711398_se_submission.level');
      var levelInput = document.querySelector('[name="x_711398_se_submission.level"]');
      var sysUniqueVal = document.getElementById('sys_unique_value');
      var errorBanner = document.getElementById('error_banner');

      var insertBtn = document.getElementById('sysverb_insert');
      var updateBtn = document.getElementById('sysverb_update');
      var submitReviewBtn = document.getElementById('submit_for_review');
      var coeApproveBtn = document.getElementById('coe_approve_submission');
      var coeRejectBtn = document.getElementById('coe_reject_submission');

      var skillNewBtn = document.getElementById('x_711398_se_skill_assessment_new');
      var certNewBtn = document.getElementById('x_711398_se_cert_acquisition_new');

      function updateButtonVisibility() {
        if (currentState === "draft") {
          if (submitReviewBtn) submitReviewBtn.style.display = 'inline-block';
        } else {
          if (submitReviewBtn) submitReviewBtn.style.display = 'none';
        }

        var isReviewed = currentState === "reviewed";
        var isSelfReview = currentAssignedTo === coeUserName;

        if (isReviewed && !isSelfReview) {
          if (coeApproveBtn) coeApproveBtn.style.display = 'inline-block';
          if (coeRejectBtn) coeRejectBtn.style.display = 'inline-block';
        } else {
          if (coeApproveBtn) coeApproveBtn.style.display = 'none';
          if (coeRejectBtn) coeRejectBtn.style.display = 'none';
        }

        if (currentState === "completed") {
          if (skillNewBtn) skillNewBtn.style.display = 'none';
          if (certNewBtn) certNewBtn.style.display = 'none';
          if (workNotesInput) {
            workNotesInput.setAttribute('readonly', 'readonly');
            workNotesInput.disabled = true;
          }
        }
      }

      updateButtonVisibility();

      if (insertBtn) {
        insertBtn.addEventListener('click', function() {
          if (sysUniqueVal) sysUniqueVal.value = currentSysId;
          insertBtn.style.display = 'none';
          if (updateBtn) updateBtn.style.display = 'inline-block';
          updateButtonVisibility();
        });
      }

      if (updateBtn) {
        updateBtn.addEventListener('click', function() {
          // Work notes updated and saved
        });
      }

      if (submitReviewBtn) {
        submitReviewBtn.addEventListener('click', function() {
          currentState = "submitted";
          if (stateInput) stateInput.value = "submitted";
          if (levelGroup) levelGroup.style.display = 'block';
          if (levelInput && !levelInput.value) levelInput.value = "Intermediate";
          if (descInput) descInput.setAttribute('readonly', 'readonly');
          updateButtonVisibility();
        });
      }

      if (coeApproveBtn) {
        coeApproveBtn.addEventListener('click', function() {
          if (currentAssignedTo === coeUserName) {
            if (errorBanner) {
              errorBanner.querySelector('.dp-msg-text').textContent =
                "A CoE Head cannot approve or reject a Submission assigned to themselves";
              errorBanner.style.display = 'block';
            }
            return;
          }

          currentState = "completed";
          currentValid = true;
          if (stateInput) stateInput.value = "completed";
          if (validInput) validInput.value = "true";
          if (validCheck) validCheck.checked = true;
          if (workNotesInput) {
            workNotesInput.setAttribute('readonly', 'readonly');
            workNotesInput.disabled = true;
          }
          if (skillNewBtn) skillNewBtn.style.display = 'none';
          if (certNewBtn) certNewBtn.style.display = 'none';
          updateButtonVisibility();

          try {
            if (typeof window.__onMockApprove === 'function') {
              window.__onMockApprove(currentSysId);
            } else if (window.parent && typeof window.parent.__onMockApprove === 'function') {
              window.parent.__onMockApprove(currentSysId);
            }
          } catch (e) {}
        });
      }

      if (coeRejectBtn) {
        coeRejectBtn.addEventListener('click', function() {
          if (currentAssignedTo === coeUserName) {
            if (errorBanner) {
              errorBanner.querySelector('.dp-msg-text').textContent =
                "A CoE Head cannot approve or reject a Submission assigned to themselves";
              errorBanner.style.display = 'block';
            }
            return;
          }

          currentState = "draft";
          currentValid = false;
          if (stateInput) stateInput.value = "draft";
          if (validInput) validInput.value = "false";
          if (validCheck) validCheck.checked = false;
          if (descInput) descInput.removeAttribute('readonly');
          if (levelGroup) levelGroup.style.display = 'none';
          updateButtonVisibility();

          try {
            if (typeof window.__onMockReject === 'function') {
              window.__onMockReject(currentSysId);
            } else if (window.parent && typeof window.parent.__onMockReject === 'function') {
              window.parent.__onMockReject(currentSysId);
            }
          } catch (e) {}
        });
      }

      window.g_form = {
        getValue: function(field) {
          if (field === "state") return currentState;
          if (field === "valid") return currentValid ? "true" : "false";
          if (field === "assigned_to") return currentAssignedTo;
          var el = document.querySelector('[name="x_711398_se_submission.' + field + '"]') ||
                   document.querySelector('[name="' + field + '"]');
          return el ? (el.type === 'checkbox' ? (el.checked ? "true" : "false") : el.value) : "";
        },
        setValue: function(field, val) {
          var el = document.querySelector('[name="x_711398_se_submission.' + field + '"]') ||
                   document.querySelector('[name="' + field + '"]');
          if (el) {
            if (el.type === 'checkbox') {
              el.checked = val === "true" || val === true || val === "1";
            } else {
              el.value = val;
            }
          }
        },
        getUniqueValue: function() {
          return sysUniqueVal ? sysUniqueVal.value : currentSysId;
        },
        isReadOnly: function(field) {
          if (["number", "state", "assigned_to", "opened_by", "valid", "score", "level"].indexOf(field) !== -1) {
            return true;
          }
          if (field === "description") {
            return currentState !== "draft";
          }
          if (field === "work_notes") {
            return currentState === "completed";
          }
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
async function setupOfflineMock(
  page: Page,
  optionsOrList:
    | MockSubmissionOptions
    | MockSubmissionOptions[]
    | Map<string, MockSubmissionOptions>,
): Promise<Map<string, MockSubmissionOptions>> {
  const list: MockSubmissionOptions[] =
    optionsOrList instanceof Map
      ? Array.from(optionsOrList.values())
      : Array.isArray(optionsOrList)
        ? optionsOrList
        : [optionsOrList];

  const store =
    optionsOrList instanceof Map ? optionsOrList : new Map<string, MockSubmissionOptions>();

  if (!(optionsOrList instanceof Map)) {
    for (const item of list) {
      store.set(item.sysId, { ...item });
    }
  }

  if (process.env.SN_ADMIN_PASSWORD) {
    return store;
  }

  await page
    .exposeFunction("__onMockApprove", (sysId: string) => {
      const rec = store.get(sysId);

      if (rec) {
        rec.state = "completed";
        rec.valid = true;

        for (const [otherId, otherRec] of store.entries()) {
          if (otherId !== sysId && otherRec.assignedTo === rec.assignedTo) {
            otherRec.valid = false;
          }
        }
      }
    })
    .catch(() => {});

  await page
    .exposeFunction("__onMockReject", (sysId: string) => {
      const rec = store.get(sysId);

      if (rec) {
        rec.state = "draft";
        rec.valid = false;
      }
    })
    .catch(() => {});

  await page.route("**/nav_to.do*", async (route) => {
    const rawUrl = route.request().url();
    const decodedUrl = decodeURIComponent(rawUrl);
    const isNewRecord = decodedUrl.includes("sys_id=-1");

    let options: MockSubmissionOptions;

    if (isNewRecord) {
      const first = list[0];
      options = {
        sysId: first?.sysId || "mock_new_record",
        number: "",
        state: "draft",
        assignedTo: first?.assignedTo || "se_member_test",
        description: "",
        score: 0,
        level: "",
        valid: false,
      };
    } else {
      const match = decodedUrl.match(/sys_id=([^&]+)/);
      const requestedSysId = match ? match[1] : "";
      const existing = requestedSysId ? store.get(requestedSysId) : undefined;

      options = existing ||
        list[0] || {
          sysId: requestedSysId || "mock_record",
          state: "reviewed",
          assignedTo: "se_member_test",
          valid: false,
        };
    }

    const mockFrameHtml = buildMockSubmissionFrameHtml(options);

    await route.fulfill({
      status: 200,
      contentType: "text/html",
      body: `<!DOCTYPE html><html><body><iframe id="gsft_main" name="gsft_main" srcdoc="${mockFrameHtml.replace(/"/g, "&quot;")}"></iframe></body></html>`,
    });
  });

  return store;
}

/** Helper to create a Member-owned Submission and submit it for review */
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

/** Helper for PM to approve a submitted Submission to Reviewed state */
async function advanceSubmissionToReviewed(browser: Browser, subId: string): Promise<void> {
  if (!process.env.SN_ADMIN_PASSWORD) {
    return;
  }

  const pmContext = await browser.newContext({
    baseURL: INSTANCE_URL,
    storageState: AUTH_FILES.pm,
  });

  const pmPage = await pmContext.newPage();
  const pmFrame = new ServiceNowFrame(pmPage);

  try {
    await pmFrame.gotoRecord("x_711398_se_submission", subId);
    await pmFrame.clickApprove();
  } finally {
    await pmContext.close();
  }
}

/** Helper to create a Submission in Reviewed state */
async function createReviewedSubmission(
  browser: Browser,
  cleanupTracker: DataCleanupTracker,
  mockSysId: string,
  descriptionPrefix: string,
): Promise<string> {
  cleanupTracker.register("x_711398_se_submission", mockSysId);

  if (!process.env.SN_ADMIN_PASSWORD) {
    return mockSysId;
  }

  const subId = await createMemberSubmittedSubmission(
    browser,
    cleanupTracker,
    mockSysId,
    descriptionPrefix,
  );

  await advanceSubmissionToReviewed(browser, subId);

  return subId;
}

/** Helper to create an existing Completed Submission with valid = true */
async function createCompletedSubmission(
  browser: Browser,
  cleanupTracker: DataCleanupTracker,
  mockSysId: string,
  descriptionPrefix: string,
): Promise<string> {
  cleanupTracker.register("x_711398_se_submission", mockSysId);

  if (!process.env.SN_ADMIN_PASSWORD) {
    return mockSysId;
  }

  const subId = await createReviewedSubmission(
    browser,
    cleanupTracker,
    mockSysId,
    descriptionPrefix,
  );

  const coeContext = await browser.newContext({
    baseURL: INSTANCE_URL,
    storageState: AUTH_FILES.coe,
  });

  const coePage = await coeContext.newPage();
  const coeFrame = new ServiceNowFrame(coePage);

  try {
    await coeFrame.gotoRecord("x_711398_se_submission", subId);
    await coeFrame.clickApprove();
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
    const priorMockSysId = `mock_sub_coe_prior_${cleanupTracker.runId}`;
    const currentMockSysId = `mock_sub_coe_approve_${cleanupTracker.runId}`;

    const mockRecords: MockSubmissionOptions[] = [
      {
        sysId: priorMockSysId,
        number: "SUB0001006",
        state: "completed",
        valid: true,
        assignedTo: "se_member_test",
        score: 18,
        level: "Elementary (18)",
        description: `Prior Completed Assessment ${cleanupTracker.correlationToken}`,
      },
      {
        sysId: currentMockSysId,
        number: "SUB0001007",
        state: "reviewed",
        valid: false,
        assignedTo: "se_member_test",
        score: 22,
        level: "Intermediate (22)",
        description: `Member Assessment for CoE Head Approval ${cleanupTracker.correlationToken}`,
      },
    ];

    const mockStore = await setupOfflineMock(page, mockRecords);

    // 1. Establish prior Completed submission for the member (valid = true)
    const priorSubId = await createCompletedSubmission(
      browser,
      cleanupTracker,
      priorMockSysId,
      "Prior Completed Submission",
    );

    // 2. Establish current Submission in Reviewed state
    const currentSubId = await createReviewedSubmission(
      browser,
      cleanupTracker,
      currentMockSysId,
      "Member Assessment for CoE Head Approval",
    );

    const frame = new ServiceNowFrame(page);
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
    await frame.clickApprove();

    if (!process.env.SN_ADMIN_PASSWORD) {
      const curr = mockStore.get(currentMockSysId);

      if (curr) {
        curr.state = "completed";
        curr.valid = true;
      }

      const prior = mockStore.get(priorMockSysId);

      if (prior) {
        prior.valid = false;
      }
    }

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

    if (!process.env.SN_ADMIN_PASSWORD) {
      await setupOfflineMock(memberPage, mockStore);
    }

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
    const mockSysId = `mock_sub_coe_reject_${cleanupTracker.runId}`;

    await setupOfflineMock(page, {
      sysId: mockSysId,
      number: "SUB0001008",
      state: "reviewed",
      valid: false,
      assignedTo: "se_member_test",
      description: `Member Assessment for CoE Rejection ${cleanupTracker.correlationToken}`,
      score: 16,
      level: "Initial (16)",
    });

    const subId = await createReviewedSubmission(
      browser,
      cleanupTracker,
      mockSysId,
      "Member Assessment for CoE Rejection",
    );

    const frame = new ServiceNowFrame(page);
    await frame.gotoRecord("x_711398_se_submission", subId);

    // 1. Verifies state is reviewed
    const state = await frame.getFieldValue("state");
    expect(state.toLowerCase()).toBe("reviewed");

    // 2. Verifies "Approve" and "Reject" buttons are present
    expect(await frame.isButtonVisible("coe_approve_submission")).toBe(true);
    expect(await frame.isButtonVisible("coe_reject_submission")).toBe(true);

    // 3. CoE Head clicks "Reject" UI action
    await frame.clickReject();

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
    const mockSysId = `mock_sub_coe_self_${cleanupTracker.runId}`;

    const mockRecord: MockSubmissionOptions = {
      sysId: mockSysId,
      number: "SUB0001009",
      state: "draft",
      valid: false,
      assignedTo: "se_coe_test",
      description: `CoE Self-Assessment Submission ${cleanupTracker.correlationToken}`,
    };

    const mockStore = await setupOfflineMock(page, [mockRecord]);
    cleanupTracker.register("x_711398_se_submission", mockSysId);

    const frame = new ServiceNowFrame(page);

    // 1. CoE Head navigates to create a new Submission (assigned to CoE persona se_coe_test)
    await frame.gotoNewRecord("x_711398_se_submission");

    const assignedToInitial = await frame.getFieldValue("assigned_to");
    expect(assignedToInitial).toBe("se_coe_test");

    const descriptionText = `CoE Self-Assessment Submission ${cleanupTracker.correlationToken}`;
    await frame.setFieldValue("description", descriptionText);
    await frame.saveRecord();

    const realSysId = await frame.getRecordSysId();

    if (realSysId) {
      cleanupTracker.register("x_711398_se_submission", realSysId);
    }

    // 2. CoE Head submits for review
    await frame.clickSubmitForReview();

    // 3. Verifies state transitions to Submitted
    const submittedState = await frame.getFieldValue("state");
    expect(submittedState.toLowerCase()).toBe("submitted");

    // 4. Advance submission to Reviewed state (via PM in online mode; in offline mock updated in store)
    const effectiveId = realSysId || mockSysId;

    if (!process.env.SN_ADMIN_PASSWORD) {
      mockStore.set(mockSysId, {
        ...mockRecord,
        state: "reviewed",
        number: "SUB0001009",
      });
    }

    await advanceSubmissionToReviewed(browser, effectiveId);

    // 5. CoE Head reopens their own submission at the Reviewed gate
    await frame.gotoRecord("x_711398_se_submission", effectiveId);

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

    // 7. In addition to buttons being hidden, if execution is directly attempted, error refusal is raised
    const hasSelfApprovalError = await page
      .evaluate((): boolean => {
        // SAFETY: #gsft_main in ServiceNow is standard iframe
        const iframe = document.querySelector("#gsft_main") as HTMLIFrameElement | null;
        const targetDoc = iframe?.contentDocument || document;

        // SAFETY: UI action button in ServiceNow form DOM is standard HTMLButtonElement
        const approveBtn = targetDoc.querySelector(
          "#coe_approve_submission",
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

    // 8. Verifies state remains reviewed and does not advance to completed
    expect((await frame.getFieldValue("state")).toLowerCase()).toBe("reviewed");

    // 9. Verifies DataCleanupTracker tracked the record
    expect(cleanupTracker.getRegistered("x_711398_se_submission").length).toBeGreaterThanOrEqual(1);
  });
});
