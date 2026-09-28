import type { FrameLocator, Locator, Page } from "@playwright/test";

import { ServiceNowNavigator } from "./navigator.ts";

interface GFormApi {
  getValue: (field: string) => string;
  setValue?: (field: string, value: string) => void;
  isReadOnly?: (field: string) => boolean;
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
          return formApi.getValue(fName);
        }

        return null;
      }, fieldName)
      .catch(() => null);

    if (gFormValue !== null && gFormValue !== undefined) {
      return gFormValue;
    }

    // Fallback: input or textarea element locator
    const fieldLocator = this.frameLocator
      .locator(
        `input[name$="${fieldName}"], textarea[name$="${fieldName}"], select[name$="${fieldName}"]`,
      )
      .first();

    return fieldLocator.inputValue({ timeout: 5000 }).catch(() => "");
  }

  /**
   * Sets a field value on the form inside #gsft_main.
   */
  async setFieldValue(fieldName: string, value: string): Promise<void> {
    const fieldLocator = this.frameLocator
      .locator(
        `input[name$="${fieldName}"], textarea[name$="${fieldName}"], select[name$="${fieldName}"]`,
      )
      .first();

    await fieldLocator.waitFor({ state: "visible", timeout: 10000 });
    await fieldLocator.fill(value);
  }

  /**
   * Clicks a UI action button inside #gsft_main by ID or text.
   */
  async clickButton(actionIdOrText: string): Promise<void> {
    const buttonLocator = this.frameLocator
      .locator(
        `button#${actionIdOrText}, button[value="${actionIdOrText}"], button:has-text("${actionIdOrText}"), input[value="${actionIdOrText}"]`,
      )
      .first();

    await buttonLocator.waitFor({ state: "visible", timeout: 10000 });
    await buttonLocator.click();
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
    const fieldLocator = this.frameLocator
      .locator(`[id*="${fieldName}"], input[name$="${fieldName}"], textarea[name$="${fieldName}"]`)
      .first();

    return fieldLocator.isVisible({ timeout: 5000 }).catch(() => false);
  }
}
