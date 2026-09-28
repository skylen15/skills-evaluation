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
  test.describe("Persona 1: Member (.auth/member.json)", () => {
    test.use({ storageState: AUTH_FILES.member });

    test("sees ONLY 'New Evaluation' and 'My Skill Evaluations'; reviewer and admin modules are hidden", async ({
      page,
      cleanupTracker,
    }) => {
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
