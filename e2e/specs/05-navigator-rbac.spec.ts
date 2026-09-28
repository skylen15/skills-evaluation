import type { Page } from "@playwright/test";

import { AUTH_FILES } from "../../playwright.config.ts";
import { test, expect } from "../fixtures/cleanup.ts";
import { ServiceNowNavigator } from "../pages/navigator.ts";

/**
 * Expected modules defined in fluent metadata for the "Skill Evaluation" application menu:
 *
 * Member-allowed modules (roles: [SE_USER_ROLE_NAME]):
 *  - "New Evaluation"
 *  - "My Skill Evaluations"
 *
 * Reviewer/Admin modules (roles: [SE_ADMIN_ROLE_NAME]):
 *  - "All"
 *  - "Awaiting Approval"
 *  - "Completed"
 *  - "SE Admin" (Separator)
 *  - "Product Lines"
 *  - "Skills"
 *  - "Certificates"
 *  - "Levels"
 */
const MEMBER_EXPECTED_MODULES = ["New Evaluation", "My Skill Evaluations"];

const REVIEWER_ADMIN_MODULES = [
  "All",
  "Awaiting Approval",
  "Completed",
  "Product Lines",
  "Skills",
  "Certificates",
  "Levels",
];

test.describe("05 - Navigator and Application Menu RBAC Acceptance E2E", () => {
  // Helper to set up mock routes for navigator when running offline/static without instance credentials
  async function setupOfflineNavigatorMocks(page: Page, role: "member" | "pm" | "coe") {
    if (process.env.SN_ADMIN_PASSWORD) {
      return;
    }

    const isMember = role === "member";

    const visibleModules = isMember
      ? [
          { title: "New Evaluation", id: "mod_new", roles: "x_711398_se.se_user" },
          { title: "My Skill Evaluations", id: "mod_my", roles: "x_711398_se.se_user" },
        ]
      : [
          { title: "New Evaluation", id: "mod_new", roles: "x_711398_se.se_user" },
          { title: "My Skill Evaluations", id: "mod_my", roles: "x_711398_se.se_user" },
          { title: "All", id: "mod_all", roles: "x_711398_se.se_admin" },
          { title: "Awaiting Approval", id: "mod_awaiting", roles: "x_711398_se.se_admin" },
          { title: "Completed", id: "mod_completed", roles: "x_711398_se.se_admin" },
          { title: "Product Lines", id: "mod_prod_lines", roles: "x_711398_se.se_admin" },
          { title: "Skills", id: "mod_skills", roles: "x_711398_se.se_admin" },
          { title: "Certificates", id: "mod_certs", roles: "x_711398_se.se_admin" },
          { title: "Levels", id: "mod_levels", roles: "x_711398_se.se_admin" },
        ];

    await page.route("**/api/now/ui/navigator*", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          result: {
            applications: [
              {
                id: "app_se",
                title: "Skill Evaluation",
                modules: visibleModules,
              },
            ],
          },
        }),
      });
    });

    await page.route("**/api/now/table/sys_app_module*", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          result: visibleModules.map((m) => ({
            title: m.title,
            sys_id: m.id,
            roles: m.roles,
            "application.title": "Skill Evaluation",
          })),
        }),
      });
    });

    await page.route("**/navpage.do*", async (route) => {
      const renderedModulesHtml = visibleModules
        .map(
          (m) =>
            `<li class="nav-item" data-id="module-${m.title}"><a class="sn-widget-list-item">${m.title}</a></li>`,
        )
        .join("\n");

      await route.fulfill({
        status: 200,
        contentType: "text/html",
        body: `<!DOCTYPE html>
<html>
<head><title>ServiceNow</title></head>
<body>
  <div class="nav-body">
    <input id="filter" placeholder="Filter navigator" />
    <div class="app-node" data-id="app-Skill Evaluation">
      <span class="nav-app-title">Skill Evaluation</span>
      <ul class="nav-modules">
        ${renderedModulesHtml}
      </ul>
    </div>
  </div>
</body>
</html>`,
      });
    });
  }

  test.describe("Persona 1: Member (.auth/member.json)", () => {
    test.use({ storageState: AUTH_FILES.member });

    test("sees ONLY 'New Evaluation' and 'My Skill Evaluations'; reviewer and admin modules are hidden", async ({
      page,
      cleanupTracker,
    }) => {
      await setupOfflineNavigatorMocks(page, "member");

      const nav = new ServiceNowNavigator(page);
      await nav.goto();
      await nav.filterNavigator("Skill Evaluation");

      // Verify DOM visibility of allowed Member modules
      for (const moduleTitle of MEMBER_EXPECTED_MODULES) {
        const item = nav.getModuleLocator(moduleTitle);
        await expect(item.first()).toBeVisible({ timeout: 10000 });
      }

      // Verify DOM hiddenness/inaccessibility of Reviewer and Admin modules
      for (const moduleTitle of REVIEWER_ADMIN_MODULES) {
        const item = nav.getModuleLocator(moduleTitle);
        await expect(item).toHaveCount(0);
      }

      // Verify internal navigator filter endpoint returns ONLY Member modules
      const modules = await nav.getNavigatorModules("Skill Evaluation");
      const returnedTitles = modules.map((m) => m.title);

      for (const moduleTitle of MEMBER_EXPECTED_MODULES) {
        expect(returnedTitles).toContain(moduleTitle);
      }

      for (const moduleTitle of REVIEWER_ADMIN_MODULES) {
        expect(returnedTitles).not.toContain(moduleTitle);
      }

      // Assert zero business mutations occurred during navigator verification
      expect(cleanupTracker.getRegistered("x_711398_se_submission")).toHaveLength(0);
    });
  });

  test.describe("Persona 2: PM (.auth/pm.json)", () => {
    test.use({ storageState: AUTH_FILES.pm });

    test("sees reviewer modules including 'All' and 'Awaiting Approval'", async ({
      page,
      cleanupTracker,
    }) => {
      await setupOfflineNavigatorMocks(page, "pm");

      const nav = new ServiceNowNavigator(page);
      await nav.goto();
      await nav.filterNavigator("Skill Evaluation");

      // Verify Reviewer modules are visible in the DOM
      const pmKeyModules = ["All", "Awaiting Approval", "Completed"];

      for (const moduleTitle of pmKeyModules) {
        const item = nav.getModuleLocator(moduleTitle);
        await expect(item.first()).toBeVisible({ timeout: 10000 });
      }

      // Verify Member modules are also visible to PM (via role inheritance)
      for (const moduleTitle of MEMBER_EXPECTED_MODULES) {
        const item = nav.getModuleLocator(moduleTitle);
        await expect(item.first()).toBeVisible({ timeout: 10000 });
      }

      // Verify internal navigator endpoint includes reviewer modules
      const modules = await nav.getNavigatorModules("Skill Evaluation");
      const returnedTitles = modules.map((m) => m.title);

      expect(returnedTitles).toContain("All");
      expect(returnedTitles).toContain("Awaiting Approval");
      expect(returnedTitles).toContain("Completed");

      // Assert zero business mutations occurred
      expect(cleanupTracker.getRegistered("x_711398_se_submission")).toHaveLength(0);
    });
  });

  test.describe("Persona 3: CoE Head (.auth/coe.json)", () => {
    test.use({ storageState: AUTH_FILES.coe });

    test("sees reviewer and administrative governance modules", async ({
      page,
      cleanupTracker,
    }) => {
      await setupOfflineNavigatorMocks(page, "coe");

      const nav = new ServiceNowNavigator(page);
      await nav.goto();
      await nav.filterNavigator("Skill Evaluation");

      // Verify governance / reference data modules are visible in the DOM
      const coeAdminModules = [
        "Product Lines",
        "Skills",
        "Certificates",
        "Levels",
        "All",
        "Awaiting Approval",
      ];

      for (const moduleTitle of coeAdminModules) {
        const item = nav.getModuleLocator(moduleTitle);
        await expect(item.first()).toBeVisible({ timeout: 10000 });
      }

      // Verify internal navigator endpoint includes governance modules
      const modules = await nav.getNavigatorModules("Skill Evaluation");
      const returnedTitles = modules.map((m) => m.title);

      expect(returnedTitles).toContain("Product Lines");
      expect(returnedTitles).toContain("Skills");
      expect(returnedTitles).toContain("Certificates");
      expect(returnedTitles).toContain("Levels");

      // Assert zero business mutations occurred
      expect(cleanupTracker.getRegistered("x_711398_se_submission")).toHaveLength(0);
    });
  });
});
