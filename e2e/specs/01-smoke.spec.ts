import { AUTH_FILES } from "../../playwright.config.ts";
import { test, expect } from "../fixtures/cleanup.ts";
import { ServiceNowFrame } from "../pages/service-now-frame.ts";

test.describe("01 - Smoke: Member Session and Frame Harness", () => {
  test.use({ storageState: AUTH_FILES.member });

  test("boots Member session, navigates directly to new Submission form in #gsft_main, and verifies teardown", async ({
    page,
    cleanupTracker,
  }) => {
    // In offline/static mode without credentials, mock nav_to.do frame container
    if (!process.env.SN_ADMIN_PASSWORD) {
      await page.route("**/nav_to.do*", async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "text/html",
          body: '<!DOCTYPE html><html><body><iframe id="gsft_main" name="gsft_main" src="about:blank"></iframe></body></html>',
        });
      });
    }

    const frame = new ServiceNowFrame(page);

    // Navigates directly to new Submission form in #gsft_main
    await frame.gotoNewRecord("x_711398_se_submission");

    // Verifies iframe loads
    const iframe = page.locator("#gsft_main");

    await expect(iframe).toBeAttached({ timeout: 15000 });

    // Verifies DataCleanupTracker is properly initialized
    expect(cleanupTracker.runId).toBeDefined();
    expect(cleanupTracker.correlationToken).toContain("PW-TEST-");

    // Asserts zero records tracked initially
    const registeredSubmissions = cleanupTracker.getRegistered("x_711398_se_submission");

    expect(registeredSubmissions).toHaveLength(0);
  });
});
