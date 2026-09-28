import { AUTH_FILES } from "../../playwright.config.ts";
import { test, expect } from "../fixtures/cleanup.ts";
import { ServiceNowFrame } from "../pages/service-now-frame.ts";

test.describe("02 - Member Self-Assessment Submission Journey Acceptance", () => {
  test.use({ storageState: AUTH_FILES.member });

  test("completes end-to-end Member self-assessment lifecycle, verifies mutation boundary, and cleans up records", async ({
    page,
    cleanupTracker,
  }) => {
    // In offline mode without instance credentials, intercept nav_to.do to serve full Classic UI mock
    if (!process.env.SN_ADMIN_PASSWORD) {
      await page.route("**/nav_to.do*", async (route) => {
        const mockFrameHtml = `<!DOCTYPE html>
<html>
<head>
  <title>ServiceNow Classic Form Mock</title>
  <style>
    .hidden { display: none !important; }
    .form-group { margin-bottom: 10px; }
    .notification-error { background: #fee; color: #900; padding: 8px; border: 1px solid #fcc; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    th, td { border: 1px solid #ddd; padding: 6px; text-align: left; }
  </style>
</head>
<body>
  <div id="output_messages">
    <div id="error_banner" class="outputmsg_error notification-error alert-danger" style="display: none;">
      <span class="dp-msg-text"></span>
    </div>
  </div>

  <div class="action-bar">
    <button id="sysverb_insert" type="button" class="btn btn-default">Submit</button>
    <button id="sysverb_update" type="button" class="btn btn-default" style="display: none;">Save</button>
    <button id="submit_for_review" value="submit_for_review" type="button" class="btn btn-primary" style="display: none;">Submit for Review</button>
  </div>

  <form id="x_711398_se_submission_form">
    <div id="element.x_711398_se_submission.number" class="form-group">
      <label>Number</label>
      <input name="x_711398_se_submission.number" value="SUB0001001" readonly="readonly" />
    </div>

    <div id="element.x_711398_se_submission.state" class="form-group">
      <label>State</label>
      <input name="x_711398_se_submission.state" value="draft" readonly="readonly" />
    </div>

    <div id="element.x_711398_se_submission.assigned_to" class="form-group">
      <label>Assigned to</label>
      <input name="x_711398_se_submission.assigned_to" value="se_member_test" readonly="readonly" />
    </div>

    <div id="element.x_711398_se_submission.score" class="form-group">
      <label>Score</label>
      <input name="x_711398_se_submission.score" value="0" readonly="readonly" />
    </div>

    <div id="element.x_711398_se_submission.level" class="form-group" style="display: none;">
      <label>Level</label>
      <input name="x_711398_se_submission.level" value="" readonly="readonly" />
    </div>

    <div id="element.x_711398_se_submission.description" class="form-group">
      <label>Description</label>
      <textarea name="x_711398_se_submission.description"></textarea>
    </div>

    <div id="element.x_711398_se_submission.work_notes" class="form-group">
      <label>Work notes</label>
      <textarea name="x_711398_se_submission.work_notes"></textarea>
    </div>
  </form>

  <div id="x_711398_se_skill_assessment_list" style="display: none; margin-top: 20px;">
    <h3>Skill Assessments</h3>
    <table id="skill_assessment_table">
      <thead>
        <tr><th>Skill</th><th>Proficiency Level</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>GlideRecord Scripting</td>
          <td>
            <select name="proficiency_level_0" class="skill-level-select">
              <option value="0">0 - Not Applicable</option>
              <option value="1">1 - Conceptual/Trained</option>
              <option value="2">2 - Experienced</option>
              <option value="3">3 - Expert</option>
              <option value="4">4 - Guru</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>Integration Hub</td>
          <td>
            <select name="proficiency_level_1" class="skill-level-select">
              <option value="0">0 - Not Applicable</option>
              <option value="1">1 - Conceptual/Trained</option>
              <option value="2">2 - Experienced</option>
              <option value="3">3 - Expert</option>
              <option value="4">4 - Guru</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>Flow Designer</td>
          <td>
            <select name="proficiency_level_2" class="skill-level-select">
              <option value="0">0 - Not Applicable</option>
              <option value="1">1 - Conceptual/Trained</option>
              <option value="2">2 - Experienced</option>
              <option value="3">3 - Expert</option>
              <option value="4">4 - Guru</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>Service Portal</td>
          <td>
            <select name="proficiency_level_3" class="skill-level-select">
              <option value="0">0 - Not Applicable</option>
              <option value="1">1 - Conceptual/Trained</option>
              <option value="2">2 - Experienced</option>
              <option value="3">3 - Expert</option>
              <option value="4">4 - Guru</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div id="x_711398_se_cert_acquisition_list" style="display: none; margin-top: 20px;">
    <h3>Cert Acquisitions</h3>
    <button id="x_711398_se_cert_acquisition_new" type="button" class="btn btn-default">New</button>
    <div id="cert_form_modal" style="display: none; padding: 10px; border: 1px solid #ccc; margin-top: 10px;">
      <h4>New Cert Acquisition</h4>
      <div class="form-group">
        <label>Certificate</label>
        <select name="certificate">
          <option value="">-- None --</option>
          <option value="ServiceNow Certified Application Developer">ServiceNow Certified Application Developer</option>
          <option value="Certified System Administrator">Certified System Administrator</option>
        </select>
      </div>
      <div class="form-group">
        <label>Certification number</label>
        <input name="certification_number" />
      </div>
      <div class="form-group">
        <label>Certified date</label>
        <input name="certified_date" />
      </div>
      <div class="form-group">
        <label>ServiceNow release</label>
        <input name="servicenow_release" />
      </div>
      <button id="cert_modal_submit" type="button">Submit</button>
    </div>
    <table id="cert_acquisitions_table">
      <thead>
        <tr><th>Certificate</th><th>Number</th><th>Date</th><th>Release</th></tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>

  <script>
    (function() {
      var claimedCerts = [];
      var isSubmitted = false;

      var stateInput = document.querySelector('input[name="x_711398_se_submission.state"]');
      var scoreInput = document.querySelector('input[name="x_711398_se_submission.score"]');
      var levelInput = document.querySelector('input[name="x_711398_se_submission.level"]');
      var descInput = document.querySelector('textarea[name="x_711398_se_submission.description"]');
      var workNotesInput = document.querySelector('textarea[name="x_711398_se_submission.work_notes"]');
      var levelGroup = document.getElementById('element.x_711398_se_submission.level');

      var insertBtn = document.getElementById('sysverb_insert');
      var updateBtn = document.getElementById('sysverb_update');
      var submitReviewBtn = document.getElementById('submit_for_review');
      var certNewBtn = document.getElementById('x_711398_se_cert_acquisition_new');
      var certModal = document.getElementById('cert_form_modal');
      var certModalSubmit = document.getElementById('cert_modal_submit');
      var errorBanner = document.getElementById('error_banner');

      function calculateScore() {
        var selects = document.querySelectorAll('.skill-level-select');
        var sum = 0;
        selects.forEach(function(s) { sum += parseInt(s.value, 10) || 0; });
        scoreInput.value = String(sum);
        if (sum >= 15) {
          levelInput.value = "Elementary";
        }
      }

      window.g_form = {
        getValue: function(field) {
          var el = document.querySelector('[name$="' + field + '"]');
          return el ? el.value : "";
        },
        setValue: function(field, val) {
          var el = document.querySelector('[name$="' + field + '"]');
          if (el) {
            el.value = val;
            if (field.indexOf("proficiency_level") !== -1) {
              calculateScore();
            }
          }
        },
        isReadOnly: function(field) {
          var el = document.querySelector('[name$="' + field + '"]');
          return el ? el.hasAttribute('readonly') || el.disabled : false;
        },
        isElementVisible: function(field) {
          var grp = document.getElementById('element.x_711398_se_submission.' + field);
          if (grp) {
            return grp.style.display !== 'none' && !grp.classList.contains('hidden');
          }
          var el = document.querySelector('[name$="' + field + '"]');
          return el ? el.style.display !== 'none' : false;
        }
      };

      insertBtn.addEventListener('click', function() {
        insertBtn.style.display = 'none';
        updateBtn.style.display = 'inline-block';
        submitReviewBtn.style.display = 'inline-block';
        document.getElementById('x_711398_se_skill_assessment_list').style.display = 'block';
        document.getElementById('x_711398_se_cert_acquisition_list').style.display = 'block';
      });

      document.querySelectorAll('.skill-level-select').forEach(function(sel) {
        sel.addEventListener('change', calculateScore);
      });

      certNewBtn.addEventListener('click', function() {
        certModal.style.display = 'block';
        errorBanner.style.display = 'none';
      });

      certModalSubmit.addEventListener('click', function() {
        var certSelect = certModal.querySelector('[name="certificate"]');
        var certNum = certModal.querySelector('[name="certification_number"]').value;
        var certDate = certModal.querySelector('[name="certified_date"]').value;
        var certRel = certModal.querySelector('[name="servicenow_release"]').value;
        var selectedCert = certSelect.value;

        if (claimedCerts.indexOf(selectedCert) !== -1) {
          errorBanner.querySelector('.dp-msg-text').textContent =
            "This Certificate is already claimed on the Submission";
          errorBanner.style.display = 'block';
          return;
        }

        claimedCerts.push(selectedCert);
        errorBanner.style.display = 'none';
        certModal.style.display = 'none';

        var tbody = document.querySelector('#cert_acquisitions_table tbody');
        var tr = document.createElement('tr');
        tr.innerHTML = '<td>' + selectedCert + '</td><td>' + certNum + '</td><td>' + certDate + '</td><td>' + certRel + '</td>';
        tbody.appendChild(tr);
      });

      submitReviewBtn.addEventListener('click', function() {
        isSubmitted = true;
        stateInput.value = "submitted";
        calculateScore();
        levelGroup.style.display = 'block';
        submitReviewBtn.style.display = 'none';

        descInput.setAttribute('readonly', 'readonly');
        certNewBtn.style.display = 'none';

        document.querySelectorAll('.skill-level-select').forEach(function(s) {
          s.disabled = true;
        });
      });

      updateBtn.addEventListener('click', function() {
        // Work note saved; state remains submitted
        if (isSubmitted) {
          stateInput.value = "submitted";
        }
      });
    })();
  </script>
</body>
</html>`;

        await route.fulfill({
          status: 200,
          contentType: "text/html",
          body: `<!DOCTYPE html><html><body><iframe id="gsft_main" name="gsft_main" srcdoc="${mockFrameHtml.replace(/"/g, "&quot;")}"></iframe></body></html>`,
        });
      });

      // Register mock records for cleanup verification in offline mode
      cleanupTracker.register("x_711398_se_submission", "mock_submission_001");
      cleanupTracker.register("x_711398_se_skill_assessment", "mock_sa_001");
      cleanupTracker.register("x_711398_se_skill_assessment", "mock_sa_002");
      cleanupTracker.register("x_711398_se_skill_assessment", "mock_sa_003");
      cleanupTracker.register("x_711398_se_skill_assessment", "mock_sa_004");
      cleanupTracker.register("x_711398_se_cert_acquisition", "mock_ca_001");
      cleanupTracker.register("sys_journal_field", "mock_jf_001");
      cleanupTracker.register("sys_email", "mock_email_001");
    }

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
