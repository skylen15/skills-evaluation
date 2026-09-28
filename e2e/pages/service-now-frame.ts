import type { FrameLocator, Locator, Page } from "@playwright/test";

import { ServiceNowNavigator } from "./navigator.ts";

interface GFormApi {
  getValue: (field: string) => string;
  setValue?: (field: string, value: string) => void;
  isReadOnly?: (field: string) => boolean;
  isVisible?: (field: string) => boolean;
  isElementVisible?: (field: string) => boolean;
  save?: () => void;
  submit?: (action?: string) => void;
}

declare global {
  interface Window {
    g_form?: GFormApi;
  }
}

/**
 * Page Object Model encapsulating ServiceNow classic and Polaris UI frame interactions.
 * Strictly bans page.waitForLoadState("networkidle") due to ServiceNow AMB long-polling,
 * instead utilizing domcontentloaded, locator auto-waits, and window.g_form readiness polling.
 */
export class ServiceNowFrame {
  readonly page: Page;
  readonly navigator: ServiceNowNavigator;

  constructor(page: Page) {
    this.page = page;
    this.navigator = new ServiceNowNavigator(page);
  }

  /** Direct FrameLocator pointing to the primary content iframe #gsft_main */
  get frameLocator(): FrameLocator {
    return this.page.frameLocator("#gsft_main");
  }

  /**
   * Queries an element inside the #gsft_main iframe with auto-waiting.
   */
  locator(selector: string): Locator {
    return this.frameLocator.locator(selector);
  }

  /**
   * Navigates to a specific path using domcontentloaded and waits for form readiness.
   */
  async goto(path: string, options?: { timeout?: number }): Promise<void> {
    const timeout = options?.timeout ?? 30000;

    await this.page.goto(path, { waitUntil: "domcontentloaded", timeout });
    await this.waitForFrameReady(timeout);
  }

  /**
   * Navigates directly to create a new record in the target table inside #gsft_main.
   */
  async gotoNewRecord(table: string): Promise<void> {
    const targetUri = `${table}.do?sys_id=-1`;

    await this.goto(`/nav_to.do?uri=${encodeURIComponent(targetUri)}`);
  }

  /**
   * Navigates directly to an existing record in the target table inside #gsft_main.
   */
  async gotoRecord(table: string, sysId: string): Promise<void> {
    const targetUri = `${table}.do?sys_id=${sysId}`;

    await this.goto(`/nav_to.do?uri=${encodeURIComponent(targetUri)}`);
  }

  /**
   * Waits for frame readiness without networkidle by checking DOM completeness
   * and polling for window.g_form readiness.
   */
  async waitForFrameReady(timeout = 30000): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");

    const iframe = this.page.locator("#gsft_main");
    const hasIframe = await iframe.isVisible({ timeout: 5000 }).catch(() => false);

    if (hasIframe) {
      await iframe.waitFor({ state: "attached", timeout });

      await this.page
        .waitForFunction(
          () => {
            // SAFETY: #gsft_main in ServiceNow forms is standard iframe element
            const iframeEl = document.querySelector("#gsft_main") as HTMLIFrameElement | null;

            if (!iframeEl) {
              return false;
            }

            const frameDoc = iframeEl.contentDocument;

            if (!frameDoc) {
              return false;
            }

            const isDocComplete = frameDoc.readyState === "complete";
            const frameWindow = iframeEl.contentWindow;

            if (!frameWindow) {
              return isDocComplete;
            }

            const gForm = frameWindow.g_form;

            return isDocComplete && (!gForm || "getValue" in gForm);
          },
          undefined,
          { timeout },
        )
        .catch(() => {
          // Fallback to proceed once attached
        });
    } else {
      await this.page
        .waitForFunction(
          () => {
            const isDocComplete = document.readyState === "complete";
            const gForm = window.g_form;

            return isDocComplete && (!gForm || "getValue" in gForm);
          },
          undefined,
          { timeout },
        )
        .catch(() => {
          // Fallback to proceed
        });
    }
  }

  /**
   * Reads a field value from the form inside #gsft_main.
   */
  async getFieldValue(fieldName: string): Promise<string> {
    // Try g_form first via frame evaluation
    const gFormValue = await this.page
      .evaluate((fName): string | null => {
        // SAFETY: #gsft_main in ServiceNow is standard iframe
        const iframe = document.querySelector("#gsft_main") as HTMLIFrameElement | null;
        const targetWindow = iframe?.contentWindow || window;
        const formApi = targetWindow.g_form;

        if (formApi && "getValue" in formApi) {
          const val = formApi.getValue(fName);

          if (val) {
            return val;
          }
        }
      }, fieldName)
      .catch(() => null);

    if (gFormValue !== null && gFormValue !== undefined && gFormValue !== "") {
      return gFormValue;
    }

    // Fallback: input or textarea element locator
    const fieldLocator = this.frameLocator
      .locator(
        `input[name$="${fieldName}"], textarea[name$="${fieldName}"], select[name$="${fieldName}"]`,
      )
      .first();

    const inputVal = await fieldLocator.inputValue({ timeout: 2000 }).catch(() => "");

    if (inputVal) {
      return inputVal;
    }

    // Fallback: check for read-only span or display element
    const displayLocator = this.frameLocator
      .locator(
        `[id*="sys_readonly"][id*="${fieldName}"], [id="element.${fieldName}"] .form-control-static, [id$=".${fieldName}"] .form-control-static, span#sys_display\\.${fieldName}, span#view\\.${fieldName}`,
      )
      .first();

    const text = await displayLocator.innerText({ timeout: 2000 }).catch(() => "");

    return text.trim();
  }

  /**
   * Sets a field value on the form inside #gsft_main.
   */
  async setFieldValue(fieldName: string, value: string): Promise<void> {
    const gFormSet = await this.page.evaluate(
      ({ fName, val }): boolean => {
        // SAFETY: #gsft_main in ServiceNow is standard iframe
        const iframe = document.querySelector("#gsft_main") as HTMLIFrameElement | null;
        const targetWindow = iframe?.contentWindow || window;
        const formApi = targetWindow.g_form;

        if (formApi && "setValue" in formApi && formApi.setValue) {
          formApi.setValue(fName, val);

          return true;
        }

        return false;
      },
      { fName: fieldName, val: value },
    );

    if (gFormSet) {
      return;
    }

    const fieldLocator = this.frameLocator
      .locator(
        `input[name$="${fieldName}"], textarea[name$="${fieldName}"], select[name$="${fieldName}"], textarea[id*="${fieldName}"], input[id*="${fieldName}"]`,
      )
      .first();

    await fieldLocator.waitFor({ state: "visible", timeout: 10000 });
    const tagName = await fieldLocator.evaluate((el) => el.tagName.toLowerCase()).catch(() => "");

    if (tagName === "select") {
      await fieldLocator.selectOption(value);
    } else {
      await fieldLocator.fill(value);
    }
  }

  /**
   * Clicks a UI action button inside #gsft_main by ID or text.
   */
  async clickButton(actionIdOrText: string): Promise<void> {
    const buttonLocator = this.frameLocator
      .locator(
        `button#${actionIdOrText}, button[value="${actionIdOrText}"], button[id*="${actionIdOrText}"], button:has-text("${actionIdOrText}"), input[value="${actionIdOrText}"]`,
      )
      .first();

    await buttonLocator.waitFor({ state: "visible", timeout: 10000 });
    await buttonLocator.click();
    await this.waitForFrameReady();
  }

  /**
   * Checks whether a specific button is visible inside #gsft_main.
   */
  async isButtonVisible(actionIdOrText: string): Promise<boolean> {
    const buttonLocator = this.frameLocator
      .locator(
        `button#${actionIdOrText}, button[value="${actionIdOrText}"], button[id*="${actionIdOrText}"], button:has-text("${actionIdOrText}"), input[value="${actionIdOrText}"]`,
      )
      .first();

    return buttonLocator.isVisible({ timeout: 3000 }).catch(() => false);
  }

  /**
   * Saves or submits the current record using standard form actions.
   */
  async saveRecord(): Promise<void> {
    const saveButton = this.frameLocator
      .locator(
        `button#sysverb_insert:visible, button#sysverb_update:visible, button#cert_modal_submit:visible, button:visible:has-text("Submit"), button:visible:has-text("Save"), button:visible:has-text("Update")`,
      )
      .first();

    await saveButton.waitFor({ state: "visible", timeout: 10000 });
    await saveButton.click();
    await this.waitForFrameReady();
  }

  /**
   * Verifies if a field is rendered read-only or disabled.
   */
  async isFieldReadOnly(fieldName: string): Promise<boolean> {
    const isGFormReadOnly = await this.page
      .evaluate((fName): boolean | null => {
        // SAFETY: #gsft_main in ServiceNow is standard iframe
        const iframe = document.querySelector("#gsft_main") as HTMLIFrameElement | null;
        const targetWindow = iframe?.contentWindow || window;
        const formApi = targetWindow.g_form;

        if (formApi && formApi.isReadOnly && "isReadOnly" in formApi) {
          return Boolean(formApi.isReadOnly(fName));
        }

        return null;
      }, fieldName)
      .catch(() => null);

    if (isGFormReadOnly !== null && isGFormReadOnly !== undefined) {
      return isGFormReadOnly;
    }

    // Check for ServiceNow sys_readonly span or form-control-static
    const readOnlyContainer = this.frameLocator
      .locator(
        `[id*="sys_readonly"][id*="${fieldName}"], [id="element.${fieldName}"] .form-control-static, [id$=".${fieldName}"] .form-control-static`,
      )
      .first();

    const isReadOnlyContainerVisible = await readOnlyContainer
      .isVisible({ timeout: 2000 })
      .catch(() => false);

    if (isReadOnlyContainerVisible) {
      return true;
    }

    const fieldLocator = this.frameLocator
      .locator(
        `input[name$="${fieldName}"], textarea[name$="${fieldName}"], select[name$="${fieldName}"]`,
      )
      .first();

    const isDisabled = await fieldLocator.isDisabled({ timeout: 3000 }).catch(() => false);

    const isReadOnlyAttr = await fieldLocator
      .getAttribute("readonly")
      .then((val) => val !== null)
      .catch(() => false);

    return isDisabled || isReadOnlyAttr;
  }

  /**
   * Checks whether a form field element is currently visible.
   */
  async isFieldVisible(fieldName: string): Promise<boolean> {
    const isGFormVisible = await this.page.evaluate((fName): boolean | null => {
      // SAFETY: #gsft_main in ServiceNow is standard iframe
      const iframe = document.querySelector("#gsft_main") as HTMLIFrameElement | null;
      const targetWindow = iframe?.contentWindow || window;
      const formApi = targetWindow.g_form;

      if (formApi && "isElementVisible" in formApi && formApi.isElementVisible) {
        return Boolean(formApi.isElementVisible(fName));
      }

      if (formApi && "isVisible" in formApi && formApi.isVisible) {
        return Boolean(formApi.isVisible(fName));
      }

      return null;
    }, fieldName);

    if (isGFormVisible !== null && isGFormVisible !== undefined) {
      return isGFormVisible;
    }

    const elementContainer = this.frameLocator
      .locator(
        `[id="element.x_711398_se_submission.${fieldName}"], [id="element.${fieldName}"], [id$=".${fieldName}"]`,
      )
      .first();

    const containerCount = await elementContainer.count().catch(() => 0);

    if (containerCount > 0) {
      return elementContainer.isVisible({ timeout: 2000 }).catch(() => false);
    }

    const fieldLocator = this.frameLocator
      .locator(
        `input[name$="${fieldName}"], textarea[name$="${fieldName}"], select[name$="${fieldName}"]`,
      )
      .first();

    return fieldLocator.isVisible({ timeout: 2000 }).catch(() => false);
  }

  /**
   * Rates Skill Assessments in the x_711398_se_skill_assessment related list.
   */
  async rateSkillAssessments(
    ratings: Array<{ index: number; proficiencyLevel: string }>,
  ): Promise<void> {
    for (const rating of ratings) {
      // Check if inline select is directly accessible in the related list table
      const inlineSelect = this.frameLocator
        .locator(
          `[id*="x_711398_se_skill_assessment"] select, table[id*="skill_assessment"] select, select[name*="proficiency_level"]`,
        )
        .nth(rating.index);

      const isSelectVisible = await inlineSelect.isVisible({ timeout: 2000 }).catch(() => false);

      if (isSelectVisible) {
        await inlineSelect.selectOption(rating.proficiencyLevel);
      } else {
        // Click into the record row link, set proficiency level on form, and update
        const rowLink = this.frameLocator
          .locator(
            `[id*="x_711398_se_skill_assessment"] tr.list_row a.linked, table[id*="skill_assessment"] tr a[href*="x_711398_se_skill_assessment"]`,
          )
          .nth(rating.index);

        if (await rowLink.isVisible({ timeout: 3000 }).catch(() => false)) {
          await rowLink.click();
          await this.waitForFrameReady();
          await this.setFieldValue("proficiency_level", rating.proficiencyLevel);
          await this.clickButton("sysverb_update");
          await this.waitForFrameReady();
        }
      }
    }
  }

  /**
   * Adds a Certificate Acquisition record via the related list.
   */
  async addCertAcquisition(details: {
    certificate: string;
    certificationNumber: string;
    certifiedDate: string;
    release: string;
  }): Promise<void> {
    // Find and click "New" button on Cert Acquisition related list
    const newButton = this.frameLocator
      .locator(
        `[id*="x_711398_se_cert_acquisition"] button:has-text("New"), button[id*="cert_acquisition"][id*="new"], [id*="cert_acquisition"] #sysverb_new, button#sysverb_new`,
      )
      .first();

    await newButton.waitFor({ state: "visible", timeout: 10000 });
    await newButton.click();
    await this.waitForFrameReady();

    // Populate cert acquisition form fields
    await this.setFieldValue("certificate", details.certificate);
    await this.setFieldValue("certification_number", details.certificationNumber);
    await this.setFieldValue("certified_date", details.certifiedDate);
    await this.setFieldValue("servicenow_release", details.release);

    // Submit cert acquisition record scoped to cert form container if present, or page insert
    const certContainer = this.frameLocator
      .locator('[id*="cert_form"], [id*="cert_acquisition_form"]')
      .first();

    const isContainerVisible = await certContainer.isVisible({ timeout: 1000 }).catch(() => false);

    if (isContainerVisible) {
      const modalSubmit = certContainer
        .locator('button#cert_modal_submit, button#sysverb_insert, button:has-text("Submit")')
        .first();

      await modalSubmit.waitFor({ state: "visible", timeout: 5000 });
      await modalSubmit.click();
    } else {
      const pageSubmit = this.frameLocator
        .locator("button#sysverb_insert:visible, button#sysverb_update:visible")
        .first();

      await pageSubmit.waitFor({ state: "visible", timeout: 10000 });
      await pageSubmit.click();
    }

    await this.waitForFrameReady();
  }

  /**
   * Checks whether a related list has become read-only (New button absent or disabled).
   */
  async isRelatedListReadOnly(relatedListTable: string): Promise<boolean> {
    const newButton = this.frameLocator
      .locator(
        `[id*="${relatedListTable}"] button:has-text("New"), button[id*="${relatedListTable}"][id*="new"]`,
      )
      .first();

    const isVisible = await newButton.isVisible({ timeout: 2000 }).catch(() => false);

    if (!isVisible) {
      return true;
    }

    return newButton.isDisabled({ timeout: 2000 }).catch(() => false);
  }

  /**
   * Adds a Work note to the submission and saves the record.
   */
  async addWorkNote(note: string): Promise<void> {
    await this.setFieldValue("work_notes", note);
    await this.saveRecord();
  }

  /**
   * Checks whether an error message banner is visible in the frame.
   */
  async hasErrorMessage(messageOrPattern?: string | RegExp): Promise<boolean> {
    const errorBanner = this.frameLocator
      .locator(
        `.outputmsg_error, .notification-error, .alert-danger, [role="alert"], div.dp-msg-text`,
      )
      .first();

    const isVisible = await errorBanner.isVisible({ timeout: 2000 }).catch(() => false);

    if (!isVisible) {
      return false;
    }

    if (!messageOrPattern) {
      return true;
    }

    const text = await errorBanner.innerText().catch(() => "");

    if (messageOrPattern instanceof RegExp) {
      return messageOrPattern.test(text);
    }

    return text.includes(messageOrPattern);
  }
}
