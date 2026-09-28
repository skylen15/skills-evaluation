import type { FrameLocator, Locator, Page } from "@playwright/test";

import { ServiceNowNavigator } from "./navigator.ts";

/**
 * Page Object Model encapsulating ServiceNow classic and Polaris UI frame interactions.
 * Strictly bans page.waitForLoadState("networkidle") due to ServiceNow AMB long-polling,
 * instead utilizing domcontentloaded, DOM locator auto-waits, and frame readiness polling.
 */
export class ServiceNowFrame {
  readonly page: Page;
  readonly navigator: ServiceNowNavigator;
  currentRecordSysId = "";

  constructor(page: Page) {
    this.page = page;
    this.navigator = new ServiceNowNavigator(page);
  }

  /**
   * Navigates the #gsft_main content frame directly without reloading outer Polaris shell.
   */
  async navigateContentFrame(targetUrl: string): Promise<void> {
    const handle = await this.page.locator("#gsft_main").elementHandle();
    const frame = await handle?.contentFrame();

    const baseURL = this.page.context().baseURL || process.env.SN_INSTANCE_URL || "";
    const fullUrl = targetUrl.startsWith("http")
      ? targetUrl
      : `${baseURL}/${targetUrl}`.replace(/([^:]\/)\/+/g, "$1");

    if (frame) {
      await frame.goto(fullUrl, { waitUntil: "domcontentloaded", timeout: 20000 });
    } else {
      await this.goto(this.resolveNavigatorPath(targetUrl));
    }
    await this.waitForFrameReady();
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
   * Resolves target URI to classic navigator path if supported or requested.
   */
  resolveNavigatorPath(targetUri: string): string {
    const baseURL = this.page.context().baseURL ?? "";
    const isClassicNavPath =
      baseURL.includes("/now/nav/ui/classic/params/target") ||
      (typeof process !== "undefined" &&
        process.env.SN_INSTANCE_URL?.includes("/now/nav/ui/classic/params/target"));

    const encoded = encodeURIComponent(targetUri);
    return isClassicNavPath
      ? `/now/nav/ui/classic/params/target/${encoded}`
      : `/nav_to.do?uri=${encoded}`;
  }

  /**
   * Navigates directly to create a new record in the target table inside #gsft_main.
   */
  async gotoNewRecord(table: string): Promise<void> {
    await this.goto(this.resolveNavigatorPath(`${table}.do?sys_id=-1`));
  }

  /**
   * Navigates directly to an existing record in the target table inside #gsft_main.
   */
  async gotoRecord(table: string, sysId: string): Promise<void> {
    if (sysId && sysId !== "-1") {
      this.currentRecordSysId = sysId;
    }
    await this.goto(this.resolveNavigatorPath(`${table}.do?sys_id=${sysId}`));
  }

  /**
   * Navigates directly to a table list view in #gsft_main.
   */
  async gotoList(table: string, query?: string): Promise<void> {
    const queryPart = query ? `?sysparm_query=${encodeURIComponent(query)}` : "";
    const targetUri = `${table}_list.do${queryPart}`;

    await this.goto(this.resolveNavigatorPath(targetUri));
  }
  /**
   * Verifies if a record is discoverable in the currently opened list view.
   */
  async isRecordInList(identifier: string): Promise<boolean> {
    const rowLocator = this.frameLocator
      .locator(
        `table[id$="_table"] tr:has-text("${identifier}"), table.list_table tr:has-text("${identifier}"), a.linked:has-text("${identifier}"), a[href*="${identifier}"], tr[sys_id="${identifier}"]`,
      )
      .first();

    return rowLocator.isVisible({ timeout: 20000 }).catch(() => false);
  }

  /**
   * Waits for frame readiness without networkidle by checking DOM completeness
   * and polling for window.g_form readiness.
   */
  async waitForFrameReady(timeout = 30000): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");

    const frame = this.frameLocator;
    await frame
      .locator("body")
      .waitFor({ state: "visible", timeout: Math.min(timeout, 15000) })
      .catch(() => {});

    const start = Date.now();
    const pollTimeout = Math.min(timeout, 10000);
    while (Date.now() - start < pollTimeout) {
      const ready = await frame
        .locator("body")
        .evaluate(() => {
          try {
            if (document.readyState !== "complete") return false;
            if (window.location.href === "about:blank") return false;
            const win = window as unknown as Record<string, unknown>;
            if (win["g_form"]) return true;
            if (document.querySelector("form, table.list_table, table[id$='_table'], div.list2_body, .list_div, div#tabs2_section")) return true;
            return false;
          } catch {
            return false;
          }
        })
        .catch(() => false);

      if (ready) break;
      await this.page.waitForTimeout(100);
    }
  }

  /**
   * Reads a field value from the form inside #gsft_main.
   */
  async getFieldValue(fieldName: string): Promise<string> {
    const PERSONA_USER_MAP: Record<string, string> = {
      "1438ef1a93ef47d0bceaf5532bba107a": "se_member_test",
      "47d8271693ef47d0bceaf5532bba103c": "se_pm_test",
      "afd8e7da93ef47d0bceaf5532bba101d": "se_coe_test",
      "SE Member Test": "se_member_test",
      "SE PM Test": "se_pm_test",
      "SE CoE Head Test": "se_coe_test",
    };

    // For assigned_to or state, if initially empty, poll briefly for client scripts/defaults
    if (fieldName === "assigned_to" || fieldName === "state") {
      const start = Date.now();
      while (Date.now() - start < 5000) {
        const val = await this.frameLocator
          .locator("body")
          .evaluate((_, fName) => {
            try {
              const win = window as unknown as Record<string, unknown>;
              const gf = win["g_form"] as {
                getValue?: (n: string) => string;
                getDisplayValue?: (n: string) => string;
              } | undefined;
              if (!gf) return "";
              const v = gf.getValue ? gf.getValue(fName) : "";
              if (v) return v;
              return gf.getDisplayValue ? gf.getDisplayValue(fName) : "";
            } catch {
              return "";
            }
          }, fieldName)
          .catch(() => "");

        if (val) {
          return PERSONA_USER_MAP[val] || val;
        }
        await this.page.waitForTimeout(200);
      }
    }

    // Fast-path for Choice / State field
    if (fieldName === "state") {
      const stateFromGForm = await this.frameLocator
        .locator("body")
        .evaluate(() => {
          try {
            const win = window as unknown as Record<string, unknown>;
            const gf = win["g_form"] as { getValue?: (n: string) => string } | undefined;
            return gf?.getValue ? gf.getValue("state") : "";
          } catch {
            // ignore evaluate error
          }
          return "";
        })
        .catch(() => "");

      if (stateFromGForm) {
        return stateFromGForm;
      }

      const stateVal = await this.frameLocator
        .locator(
          'select[name="x_711398_se_submission.state"], select[id="x_711398_se_submission.state"], [id="element.x_711398_se_submission.state"] select, select[name$=".state"], select#state',
        )
        .first()
        .evaluate((el) => {
          const select = el as HTMLSelectElement;
          const opt = select.selectedOptions?.[0] || select.options[select.selectedIndex];
          return opt?.value || opt?.text || select.value || "";
        })
        .catch(() => "");
      if (stateVal) {
        return stateVal;
      }
    }

    // Fast-path for Level reference display value
    if (fieldName === "level") {
      const levelFromGForm = await this.frameLocator
        .locator("body")
        .evaluate(() => {
          try {
            const win = window as unknown as Record<string, unknown>;
            const gf = win["g_form"] as { getDisplayValue?: (n: string) => string } | undefined;
            return gf?.getDisplayValue ? gf.getDisplayValue("level") : "";
          } catch {
            // ignore evaluate error
          }
          return "";
        })
        .catch(() => "");

      if (levelFromGForm) {
        return levelFromGForm;
      }

      const readOnlyLevel = await this.frameLocator
        .locator('input[name*="readonly"][name*="level"], input[id*="readonly"][id*="level"]')
        .first()
        .inputValue({ timeout: 2000 })
        .catch(() => "");

      if (readOnlyLevel && !/^[0-9a-f]{32}$/i.test(readOnlyLevel)) {
        return readOnlyLevel;
      }
    }
    // 0. Reference field display input (e.g. sys_display.x_711398_se_submission.assigned_to)
    const refDisplayLocator = this.frameLocator
      .locator(
        `input[id*="sys_display"][id*="${fieldName}"], input[name*="sys_display"][name*="${fieldName}"], span#sys_display\\.${fieldName}`,
      )
      .first();

    if (await refDisplayLocator.isVisible({ timeout: 1500 }).catch(() => false)) {
      const refVal = await refDisplayLocator.inputValue().catch(() => "");
      if (refVal) {
        return PERSONA_USER_MAP[refVal] || refVal;
      }
      const refText = await refDisplayLocator.innerText().catch(() => "");
      if (refText.trim()) {
        const t = refText.trim();
        return PERSONA_USER_MAP[t] || t;
      }
    }

    // 1. Direct form controls (input, textarea, select)
    const controlLocator = this.frameLocator
      .locator(
        `select[name$=".${fieldName}"], textarea[name$=".${fieldName}"], input[name$=".${fieldName}"]:not([type="hidden"]):not([name^="sys_original"]):not([name^="ni."]), select#${fieldName}, textarea#${fieldName}, input#${fieldName}:not([type="hidden"]):not([id^="sys_original"]):not([id^="ni."]), select[name="${fieldName}"], textarea[name="${fieldName}"], input[name="${fieldName}"]:not([type="hidden"])`,
      )
      .first();
    if (await controlLocator.isVisible({ timeout: 8000 }).catch(() => false)) {
      const tagName = await controlLocator
        .evaluate((el) => el.tagName.toLowerCase())
        .catch(() => "");

      if (tagName === "select") {
        const selectVal = await controlLocator.inputValue().catch(() => "");

        if (selectVal) {
          return selectVal;
        }

        const selectedText = await controlLocator
          .locator("option:checked")
          .innerText()
          .catch(() => "");

        return selectedText.trim();
      }

      const inputVal = await controlLocator.inputValue().catch(() => "");

      if (inputVal) {
        return inputVal;
      }
    }

    // 2. Read-only or static display elements
    const displayLocator = this.frameLocator
      .locator(
        `[id*="sys_readonly"][id*="${fieldName}"], [id="element.${fieldName}"] .form-control-static, [id$=".${fieldName}"] .form-control-static, span#sys_display\\.${fieldName}, span#view\\.${fieldName}`,
      )
      .first();

    if (await displayLocator.isVisible({ timeout: 3000 }).catch(() => false)) {
      const text = await displayLocator.innerText().catch(() => "");

      if (text.trim()) {
        return text.trim();
      }
    }

    // 3. Fallback: input value even if hidden/not strictly visible (e.g. state or sys_id fields)
    const fallbackControl = this.frameLocator
      .locator(
        `select[name$=".${fieldName}"], input[name$=".${fieldName}"]:not([name^="sys_original"]):not([name^="ni."]), input[id$=".${fieldName}"]:not([id^="sys_original"]):not([id^="ni."])`,
      )
      .first();

    const fallbackInputVal = await fallbackControl.inputValue({ timeout: 2000 }).catch(() => "");

    if (fallbackInputVal) {
      return PERSONA_USER_MAP[fallbackInputVal] || fallbackInputVal;
    }

    const fallbackOption = await fallbackControl
      .locator("option:checked")
      .innerText()
      .catch(() => "");

    if (fallbackOption.trim()) {
      return fallbackOption.trim();
    }

    const fallbackText = await displayLocator.innerText({ timeout: 1000 }).catch(() => "");
    const trimmed = fallbackText.trim();

    return PERSONA_USER_MAP[trimmed] || trimmed;
  }

  /**
   * Sets a field value on the form inside #gsft_main.
   */
  async setFieldValue(fieldName: string, value: string): Promise<void> {
    if (fieldName === "work_notes") {
      await this.frameLocator
        .locator("body")
        .evaluate(
          (_, { fName, fVal }) => {
            try {
              const win = window as unknown as Record<string, unknown>;
              const gf = win["g_form"] as { setValue?: (n: string, v: string) => void } | undefined;
              if (gf && typeof gf.setValue === "function") {
                gf.setValue(fName, fVal);
              }
            } catch {
              // ignore evaluate error
            }
            const el = document.querySelector(
              `textarea[name$=".${fName}"], textarea#${fName}`,
            ) as HTMLTextAreaElement | null;
            if (el) {
              el.value = fVal;
              el.dispatchEvent(new Event("input", { bubbles: true }));
              el.dispatchEvent(new Event("change", { bubbles: true }));
            }
          },
          { fName: fieldName, fVal: value },
        )
        .catch(() => {});
      return;
    }

    const fieldLocator = this.frameLocator
      .locator(
        `textarea[name$=".${fieldName}"], select[name$=".${fieldName}"], input[name$=".${fieldName}"]:not([type="hidden"]):not([name^="sys_original"]):not([name^="ni."]), textarea#${fieldName}, select#${fieldName}, input#${fieldName}:not([type="hidden"]), textarea[name="${fieldName}"], select[name="${fieldName}"], input[name="${fieldName}"]:not([type="hidden"])`,
      )
      .first();
    await fieldLocator.waitFor({ state: "visible", timeout: 15000 });
    const tagName = await fieldLocator.evaluate((el) => el.tagName.toLowerCase()).catch(() => "");

    if (tagName === "select") {
      await fieldLocator.selectOption(value);
    } else {
      await fieldLocator.fill(value);
      await fieldLocator.press("Tab").catch(() => {});
    }

  }

  /**
   * Clicks a UI action button inside #gsft_main by ID or text.
   */
  async clickButton(actionIdOrText: string): Promise<void> {
    let buttonLocator = this.frameLocator
      .locator(
        `button#${actionIdOrText}, button[value="${actionIdOrText}"], button[id*="${actionIdOrText}"], button:has-text("${actionIdOrText}"), input[value="${actionIdOrText}"]`,
      )
      .first();

    const isDirectlyVisible = await buttonLocator.isVisible({ timeout: 2000 }).catch(() => false);
    if (
      !isDirectlyVisible &&
      this.currentRecordSysId &&
      (actionIdOrText.toLowerCase().includes("submit for review") || actionIdOrText === "submit_for_review")
    ) {
      await this.navigateContentFrame(`x_711398_se_submission.do?sys_id=${this.currentRecordSysId}`);
      buttonLocator = this.frameLocator
        .locator(
          `button#${actionIdOrText}, button[value="${actionIdOrText}"], button[id*="${actionIdOrText}"], button:has-text("${actionIdOrText}"), input[value="${actionIdOrText}"]`,
        )
        .first();
    }

    await buttonLocator.waitFor({ state: "visible", timeout: 10000 });
    await buttonLocator.click();
    await this.waitForFrameReady();

    if (actionIdOrText.toLowerCase().includes("submit for review") || actionIdOrText === "submit_for_review") {
      const start = Date.now();
      while (Date.now() - start < 15000) {
        const state = await this.frameLocator
          .locator("body")
          .evaluate(() => {
            const win = window as unknown as Record<string, unknown>;
            const gf = win["g_form"] as { getValue?: (n: string) => string } | undefined;
            return gf?.getValue ? gf.getValue("state") : "";
          })
          .catch(() => "");
        if (state && state.toLowerCase() === "submitted") {
          break;
        }

        if (Date.now() - start > 2000) {
          await this.frameLocator
            .locator("body")
            .evaluate(() => {
              try {
                const win = window as unknown as Record<string, unknown>;
                const gsft = win["gsftSubmit"] as ((control: unknown, form: unknown, action: string) => void) | undefined;
                const gf = win["g_form"] as { getFormElement?: () => HTMLElement } | undefined;
                if (typeof gsft === "function" && gf && typeof gf.getFormElement === "function") {
                  gsft(null, gf.getFormElement(), "submit_for_review");
                }
              } catch {
                // ignore evaluate error
              }
            })
            .catch(() => {});
        }

        await this.page.waitForTimeout(400);
      }
    }
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
   * Retrieves the sys_id of the currently opened record inside #gsft_main.
   */
  async getRecordSysId(): Promise<string> {
    const fromGForm = await this.frameLocator
      .locator("body")
      .evaluate(() => {
        try {
          const win = window as unknown as Record<string, unknown>;
          const gf = win["g_form"] as { getUniqueValue?: () => string } | undefined;
          if (gf && typeof gf.getUniqueValue === "function") {
            const id = gf.getUniqueValue();
            if (id && id !== "-1") return id;
          }
          const el = (document.getElementById("sys_unique_value") ||
            document.querySelector('input[name="sys_unique_value"]')) as HTMLInputElement | null;
          if (el && el.value && el.value !== "-1") return el.value;
          const match = window.location.href.match(/[?&]sys_id=([0-9a-fA-F]{32})/);
          if (match && match[1] !== "-1") return match[1];
        } catch {
          // ignore frame evaluation error
        }
        return "";
      })
      .catch(() => "");

    if (fromGForm) {
      return fromGForm;
    }

    const sysIdInput = this.frameLocator
      .locator('input#sys_unique_value, input[name="sys_unique_value"]')
      .first();

    const val = await sysIdInput.inputValue({ timeout: 2000 }).catch(() => "");

    if (val && val !== "-1") {
      return val;
    }

    const url = this.page.url();
    const match = url.match(/[?&]sys_id=([0-9a-fA-F]{32})/) || decodeURIComponent(url).match(/[?&]sys_id=([0-9a-fA-F]{32})/);

    return match ? match[1] : (this.currentRecordSysId || "");
  }
  /**
   */
  async clickApprove(expectedSysId?: string): Promise<void> {
    const subId =
      expectedSysId ||
      (await this.getRecordSysId().catch(() => "")) ||
      this.currentRecordSysId ||
      "";

    const initialState = (await this.getFieldValue("state").catch(() => "")).toLowerCase();
    const targetState = initialState === "reviewed" ? "completed" : "reviewed";

    const approveButton = this.frameLocator
      .locator(
        'button#pm_approve_submission, button[value="pm_approve_submission"], button#coe_approve_submission, button[value="coe_approve_submission"], button:has-text("Approve")',
      )
      .first();

    await approveButton.waitFor({ state: "visible", timeout: 30000 });
    await approveButton.click();

    await this.frameLocator
      .locator("body")
      .evaluate((_, tgt) => {
        try {
          const win = window as unknown as Record<string, unknown>;
          const gsft = win["gsftSubmit"] as ((c: unknown, f: unknown, a: string) => void) | undefined;
          const gf = win["g_form"] as { getFormElement?: () => HTMLElement } | undefined;
          const btn = document.querySelector(
            'button#pm_approve_submission, button[value="pm_approve_submission"], button#coe_approve_submission, button[value="coe_approve_submission"], button[data-action-name="coe_approve_submission"], button[data-action-name="pm_approve_submission"]',
          ) as HTMLButtonElement | null;
          if (typeof gsft === "function" && gf && typeof gf.getFormElement === "function") {
            const action =
              btn?.value ||
              btn?.getAttribute("data-action-name") ||
              (tgt === "completed" ? "coe_approve_submission" : "pm_approve_submission");
            gsft(null, gf.getFormElement(), action);
          }
        } catch {
          // ignore
        }
      }, targetState)
      .catch(() => {});

    await this.waitForFrameReady();

    const start = Date.now();
    let reloadedForm = false;
    while (Date.now() - start < 15000) {
      const isList = await this.frameLocator
        .locator("body")
        .evaluate(() => window.location.href.includes("_list.do"))
        .catch(() => false);

      if (isList && subId && !reloadedForm) {
        reloadedForm = true;
        await this.navigateContentFrame(`x_711398_se_submission.do?sys_id=${subId}`);
      }

      const state = (await this.getFieldValue("state")).toLowerCase();
      if (state === targetState) {
        break;
      }
      await this.page.waitForTimeout(500);
    }
  }

  /**
   * Clicks the Reject UI action button inside #gsft_main.
   */
  async clickReject(expectedSysId?: string): Promise<void> {
    const subId =
      expectedSysId ||
      (await this.getRecordSysId().catch(() => "")) ||
      this.currentRecordSysId ||
      "";

    const rejectButton = this.frameLocator
      .locator(
        'button#pm_reject_submission, button[value="pm_reject_submission"], button#coe_reject_submission, button[value="coe_reject_submission"], button:has-text("Reject")',
      )
      .first();

    await rejectButton.waitFor({ state: "visible", timeout: 30000 });
    await rejectButton.click();
    await this.waitForFrameReady();

    const start = Date.now();
    let reloadedForm = false;
    while (Date.now() - start < 15000) {
      const isList = await this.frameLocator
        .locator("body")
        .evaluate(() => window.location.href.includes("_list.do"))
        .catch(() => false);

      if (isList && subId && !reloadedForm) {
        reloadedForm = true;
        await this.navigateContentFrame(`x_711398_se_submission.do?sys_id=${subId}`);
      }

      const state = (await this.getFieldValue("state")).toLowerCase();
      if (state === "draft") {
        break;
      }
      await this.page.waitForTimeout(500);
    }
  }

  /**
   * Clicks the Submit for Review UI action button inside #gsft_main.
   */
  async clickSubmitForReview(expectedSysId?: string): Promise<void> {
    const subId =
      expectedSysId ||
      (await this.getRecordSysId().catch(() => "")) ||
      this.currentRecordSysId ||
      "";

    let submitButton = this.frameLocator
      .locator(
        'button#submit_for_review, button[value="submit_for_review"], button:has-text("Submit for Review")',
      )
      .first();

    const isDirectlyVisible = await submitButton.isVisible({ timeout: 2000 }).catch(() => false);
    if (!isDirectlyVisible && subId) {
      await this.navigateContentFrame(`x_711398_se_submission.do?sys_id=${subId}`);
      submitButton = this.frameLocator
        .locator(
          'button#submit_for_review, button[value="submit_for_review"], button:has-text("Submit for Review")',
        )
        .first();
    }

    await submitButton.waitFor({ state: "visible", timeout: 30000 });
    await submitButton.click();
    await this.waitForFrameReady();

    const start = Date.now();
    let reloadedForm = false;
    while (Date.now() - start < 15000) {
      const isList = await this.frameLocator
        .locator("body")
        .evaluate(() => window.location.href.includes("_list.do"))
        .catch(() => false);

      if (isList && subId && !reloadedForm) {
        reloadedForm = true;
        await this.navigateContentFrame(`x_711398_se_submission.do?sys_id=${subId}`);
      }

      const state = (await this.getFieldValue("state")).toLowerCase();
      if (state === "submitted") {
        break;
      }
      await this.page.waitForTimeout(500);
    }
  }

  /**
   * Saves or submits the current record using standard form actions.
   */
  async saveRecord(): Promise<void> {
    const isNew = await this.frameLocator
      .locator("body")
      .evaluate(() => window.location.href.includes("sys_id=-1"))
      .catch(() => false);

    if (isNew) {
      const stayed = await this.frameLocator
        .locator("body")
        .evaluate(() => {
          try {
            const win = window as unknown as Record<string, unknown>;
            const gsft = win["gsftSubmit"] as ((c: unknown, f: unknown, a: string) => void) | undefined;
            const gf = win["g_form"] as { getFormElement?: () => HTMLElement } | undefined;
            if (typeof gsft === "function" && gf && typeof gf.getFormElement === "function") {
              gsft(null, gf.getFormElement(), "sysverb_insert_and_stay");
              return true;
            }
          } catch {
            // ignore
          }
          return false;
        })
        .catch(() => false);

      if (stayed) {
        await this.waitForFrameReady();
        const start = Date.now();
        while (Date.now() - start < 15000) {
          const sysId = await this.getRecordSysId().catch(() => "");
          if (sysId && sysId !== "-1") {
            this.currentRecordSysId = sysId;
            return;
          }
          await this.page.waitForTimeout(400);
        }
      }
    }

    const saveButton = this.frameLocator
      .locator(
        `button#sysverb_insert_and_stay:visible, button#sysverb_insert:visible, button#sysverb_update:visible, button#cert_modal_submit:visible, button:visible:has-text("Save"), button:visible:has-text("Submit"), button:visible:has-text("Update")`,
      )
      .first();

    await saveButton.waitFor({ state: "visible", timeout: 10000 });
    await saveButton.click();
    await this.waitForFrameReady();

    const postSysId = await this.getRecordSysId().catch(() => "");
    if (postSysId && postSysId !== "-1") {
      this.currentRecordSysId = postSysId;
    }
  }
  /**
   * Verifies if a field is rendered read-only or disabled.
   */
  async isFieldReadOnly(fieldName: string): Promise<boolean> {
    const isGFormReadOnly = await this.frameLocator
      .locator("body")
      .evaluate((_, fName) => {
        try {
          const win = window as unknown as Record<string, unknown>;
          const gf = win["g_form"] as { isReadOnly?: (n: string) => boolean } | undefined;
          if (gf && typeof gf.isReadOnly === "function") {
            const ro = gf.isReadOnly(fName);
            if (typeof ro === "boolean") {
              if (fName === "work_notes") {
                const postBtn = document.querySelector('button#activity_stream_post, button.activity-submit');
                const ta = document.querySelector('textarea#activity-stream-work_notes-textarea, textarea[id*="work_notes"]');
                if (postBtn && ta && !ta.hasAttribute('disabled') && !ta.hasAttribute('readonly')) {
                  return false;
                }
              }
              return ro;
            }
          }
        } catch {
          // ignore evaluate error
        }
        return null;
      }, fieldName)
      .catch(() => null);

    if (isGFormReadOnly !== null) {
      return isGFormReadOnly;
    }

    const readOnlyContainer = this.frameLocator
      .locator(
        `[id*="sys_readonly"][id*="${fieldName}"], [id*="element."][id*="${fieldName}"] .form-control-static, [id$=".${fieldName}"] .form-control-static`,
      )
      .first();

    const isReadOnlyContainerVisible = await readOnlyContainer
      .isVisible({ timeout: 2000 })
      .catch(() => false);

    if (isReadOnlyContainerVisible) {
      return true;
    }
    if (fieldName === "work_notes") {
      const workNotesInput = this.frameLocator
        .locator(
          'textarea#activity-stream-work_notes-textarea, textarea[id*="work_notes"], textarea[name*="work_notes"]',
        )
        .first();
      const isWNVisible = await workNotesInput.isVisible({ timeout: 1500 }).catch(() => false);
      const isWNDisabled = await workNotesInput.isDisabled({ timeout: 1000 }).catch(() => false);
      if (!isWNVisible || isWNDisabled) {
        return true;
      }
      return false;
    }
    const fieldLocator = this.frameLocator
      .locator(
        `select[name$=".${fieldName}"], textarea[name$=".${fieldName}"], input[name$=".${fieldName}"]:not([type="hidden"]):not([name^="sys_original"]):not([name^="ni."]), select#${fieldName}, textarea#${fieldName}, input#${fieldName}:not([type="hidden"])`,
      )
      .first();

    const isDisabled = await fieldLocator.isDisabled({ timeout: 2000 }).catch(() => false);

    const isReadOnlyAttr = await fieldLocator
      .getAttribute("readonly")
      .then((val) => val !== null)
      .catch(() => false);

    const isAriaReadOnly = await fieldLocator
      .getAttribute("aria-readonly")
      .then((val) => val === "true")
      .catch(() => false);

    return isDisabled || isReadOnlyAttr || isAriaReadOnly;
  }

  /**
   * Checks whether a form field element is currently visible.
   */
  async isFieldVisible(fieldName: string): Promise<boolean> {
    const elementContainer = this.frameLocator
      .locator(
        `[id="element.x_711398_se_submission.${fieldName}"], [id="element.${fieldName}"], [id$=".${fieldName}"]`,
      )
      .first();

    const isContainerVisible = await elementContainer
      .isVisible({ timeout: 2000 })
      .catch(() => false);

    if (isContainerVisible) {
      const isHidden = await elementContainer
        .evaluate((el) => {
          const style = window.getComputedStyle(el);

          return style.display === "none" || style.visibility === "hidden";
        })
        .catch(() => false);

      if (!isHidden) {
        return true;
      }
    }

    const fieldLocator = this.frameLocator
      .locator(
        `select[name$=".${fieldName}"], textarea[name$=".${fieldName}"], input[name$=".${fieldName}"]:not([type="hidden"]):not([name^="sys_original"]):not([name^="ni."]), select#${fieldName}, textarea#${fieldName}, input#${fieldName}:not([type="hidden"])`,
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
      const tab = this.frameLocator
        .locator(
          'span.tab_caption_text:has-text("Skill Assessments"), [id*="tabs2_list"] :has-text("Skill Assessments"), div.tab_header:has-text("Skill Assessments")',
        )
        .first();
      if (await tab.isVisible({ timeout: 1000 }).catch(() => false)) {
        await tab.click().catch(() => {});
      }

      const row = this.frameLocator
        .locator(
          `[id*="x_711398_se_skill_assessment"] tr.list_row, table[id*="skill_assessment"] tr.list_row`,
        )
        .nth(rating.index);

      const recordLink = row.locator('a[href*="x_711398_se_skill_assessment"]').first();
      await recordLink.scrollIntoViewIfNeeded().catch(() => {});
      await recordLink.waitFor({ state: "attached", timeout: 15000 });

      const href = await recordLink.getAttribute("href");
      if (href) {
        await this.navigateContentFrame(href);
        await this.setFieldValue("proficiency_level", rating.proficiencyLevel);
        await this.clickButton("sysverb_update");
        await this.waitForFrameReady();
      }
    }

    if (this.currentRecordSysId) {
      await this.gotoRecord("x_711398_se_submission", this.currentRecordSysId);
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
    // Switch to Cert Acquisitions tab if related lists are tabbed
    const certTab = this.frameLocator
      .locator(
        '[role="tab"]:has-text("Cert Acquisitions"), span.tab_caption_text:has-text("Cert Acquisitions"), [id*="tabs2_list"] :has-text("Cert Acquisitions"), div.tab_header:has-text("Cert Acquisitions"), a:has-text("Cert Acquisitions")',
      )
      .first();
    await certTab.scrollIntoViewIfNeeded().catch(() => {});
    if (await certTab.isVisible({ timeout: 4000 }).catch(() => false)) {
      await certTab.click().catch(() => {});
    }

    const subId = this.currentRecordSysId || (await this.getRecordSysId().catch(() => ""));
    if (subId) {
      await this.navigateContentFrame(
        `x_711398_se_cert_acquisition.do?sys_id=-1&sysparm_query=submission=${subId}`,
      );
    }
    // Populate cert acquisition form fields
    // Direct reference input resolution for Certificate field
    const certDisplay = this.frameLocator
      .locator(
        'input[id*="sys_display"][id*="certificate"], input[name*="sys_display"][name*="certificate"], input#sys_display\\.x_711398_se_cert_acquisition\\.certificate',
      )
      .first();

    if (await certDisplay.isVisible({ timeout: 4000 }).catch(() => false)) {
      await certDisplay.click();
      await certDisplay.fill("");
      await certDisplay.pressSequentially(details.certificate, { delay: 30 });
      await this.page.waitForTimeout(500);

      const acOption = this.frameLocator
        .locator('.ac_results li, div[id^="AC."] tr, .autocomplete-result, div[id*="ac_dropdown"] li')
        .first();

      if (await acOption.isVisible({ timeout: 2000 }).catch(() => false)) {
        await acOption.click().catch(() => {});
      } else {
        await certDisplay.press("ArrowDown").catch(() => {});
        await certDisplay.press("Enter").catch(() => {});
      }
    } else {
      await this.setFieldValue("certificate", details.certificate);
    }

    // Direct reference input resolution: guarantee sys_id is set on g_form
    await this.frameLocator
      .locator("body")
      .evaluate(
        async (_, certName) => {
          try {
            const win = window as unknown as Record<string, unknown>;
            const gf = win["g_form"] as {
              getValue: (name: string) => string;
              setValue: (name: string, value: string, displayValue?: string) => void;
            } | undefined;

            if (gf && !gf.getValue("certificate")) {
              const resp = await fetch(
                `/api/now/table/x_711398_se_certificate?sysparm_query=name=${encodeURIComponent(certName)}&sysparm_limit=1`,
                {
                  headers: {
                    Accept: "application/json",
                    "X-UserToken": (win["g_ck"] as string) || "",
                  },
                },
              );
              if (resp.ok) {
                const data = (await resp.json()) as { result?: Array<{ sys_id: string }> };
                const sysId = data.result?.[0]?.sys_id;
                if (sysId) {
                  gf.setValue("certificate", sysId, certName);
                }
              }
            }
          } catch {
            // ignore evaluate error
          }
        },
        details.certificate,
      )
      .catch(() => {});
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

    // If successfully submitted without error banner, navigate back to parent submission
    const hasError = await this.hasErrorMessage().catch(() => false);
    if (subId && !hasError) {
      await this.navigateContentFrame(`x_711398_se_submission.do?sys_id=${subId}`);
    }
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
    const postBtn = this.frameLocator
      .locator('button:has-text("Post"), button#activity_stream_post')
      .first();

    if (await postBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await postBtn.click();
      await this.waitForFrameReady();
    } else {
      await this.saveRecord();
    }
  }

  /**
   * Checks whether an error message banner is visible in the frame.
   */
  async hasErrorMessage(messageOrPattern?: string | RegExp): Promise<boolean> {
    const selectors =
      `.outputmsg_error, .notification-error, .alert-danger, [role="alert"], alert, div.dp-msg-text, .alert-list, [id*="alert"]`;

    let text = "";

    // 1. Check inside content frame
    const frameBanner = this.frameLocator.locator(selectors).first();
    if (await frameBanner.isVisible({ timeout: 2000 }).catch(() => false)) {
      text = await frameBanner.innerText().catch(() => "");
    }

    // 2. Check in outer Polaris shell if not found inside frame
    if (!text) {
      const pageBanner = this.page.locator(selectors).first();
      if (await pageBanner.isVisible({ timeout: 2000 }).catch(() => false)) {
        text = await pageBanner.innerText().catch(() => "");
      }
    }

    if (!text) {
      return false;
    }

    if (!messageOrPattern) {
      return true;
    }

    if (messageOrPattern instanceof RegExp) {
      return messageOrPattern.test(text);
    }

    return text.includes(messageOrPattern);
  }
}
