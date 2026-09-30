import type { Locator, Page } from "@playwright/test";

export interface NavigatorModuleResult {
  title: string;
  id?: string;
  roles?: string;
  applicationTitle?: string;
}

declare global {
  interface Window {
    g_ck?: string;
  }
}

/**
 * Page object helper for interacting with and asserting ServiceNow Classic and Polaris navigators.
 * Supports DOM inspection, navigation filtering, and internal navigator REST querying.
 */
export class ServiceNowNavigator {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to the base portal / standard navigation page.
   */
  async goto(): Promise<void> {
    await this.page.goto("/navpage.do", { waitUntil: "domcontentloaded" });
  }

  /**
   * Filters the navigator via the search/filter input in Classic UI or Polaris UI.
   */
  async filterNavigator(term: string): Promise<void> {
    // Classic filter input: #filter; Polaris filter input: input#filter or [placeholder*='Filter']
    const filterInput = this.page
      .locator(
        "#filter, input#filter, input[placeholder*='Filter' i], input[aria-label*='Filter' i]",
      )
      .first();

    const isVisible = await filterInput.isVisible({ timeout: 5000 }).catch(() => false);

    if (isVisible) {
      await filterInput.fill(term);
    }
  }

  /**
   * Returns a locator for an application menu item by title.
   */
  getApplicationMenuLocator(title: string): Locator {
    return this.page.locator(
      `[data-id="app-${title}"], .nav-app-title:has-text("${title}"), .app-node:has-text("${title}"), span:has-text("${title}")`,
    );
  }

  /**
   * Returns a locator for a module item by title in the application navigator.
   */
  getModuleLocator(title: string): Locator {
    return this.page.locator(
      `[data-id="module-${title}"], a.nav-item:has-text("${title}"), .sn-widget-list-item:has-text("${title}"), .module-node:has-text("${title}"), a:has-text("${title}")`,
    );
  }

  /**
   * Queries visible modules for the current session via the internal navigator or Table API endpoint.
   * This executes purely read-only assertions without any record creation or mutation.
   */
  async getNavigatorModules(filterTerm = "Skill Evaluation"): Promise<NavigatorModuleResult[]> {
    return this.page.evaluate(async (term) => {
      // 1. Try querying the internal navigator endpoint if available
      try {
        const userToken = window.g_ck || "";

        const navRes = await fetch(`/api/now/ui/navigator?filter=${encodeURIComponent(term)}`, {
          headers: {
            Accept: "application/json",
            "X-UserToken": userToken,
          },
        });

        if (navRes.ok) {
          const json = await navRes.json();
          const items: NavigatorModuleResult[] = [];

          if (json?.result?.applications) {
            for (const app of json.result.applications) {
              if (
                app.title?.toLowerCase().includes(term.toLowerCase()) &&
                Array.isArray(app.modules)
              ) {
                for (const mod of app.modules) {
                  items.push({
                    title: mod.title,
                    id: mod.id,
                    roles: Array.isArray(mod.roles) ? mod.roles.join(",") : mod.roles,
                    applicationTitle: app.title,
                  });
                }
              }
            }

            return items;
          }
        }
      } catch {
        // Fall back to Table API
      }

      // 2. Query sys_app_module via Table API using session credentials
      try {
        const userToken = window.g_ck || "";
        const query = encodeURIComponent(`application.title=${term}^active=true^ORDERBYorder`);

        const tableRes = await fetch(
          `/api/now/table/sys_app_module?sysparm_query=${query}&sysparm_fields=title,sys_id,roles,application.title`,
          {
            headers: {
              Accept: "application/json",
              "X-UserToken": userToken,
            },
          },
        );

        if (tableRes.ok) {
          const json = await tableRes.json();

          if (Array.isArray(json?.result)) {
            // SAFETY: ServiceNow Table API returns array of record objects with queried sysparm_fields
            const rawRecords = json.result as Array<{
              title: string;
              sys_id: string;
              roles: string;
              "application.title"?: string;
            }>;

            return rawRecords.map((r) => ({
              title: r.title,
              id: r.sys_id,
              roles: r.roles,
              applicationTitle: r["application.title"],
            }));
          }
        }
      } catch {
        // Fall back to DOM inspection
      }

      // 3. Fallback: inspect the DOM elements matching navigator items
      const domModules: NavigatorModuleResult[] = [];

      const moduleNodes = document.querySelectorAll(
        ".nav-item, [data-id^='module-'], a.sn-widget-list-item, .app-node a",
      );

      moduleNodes.forEach((node) => {
        const text = node.textContent?.trim();

        if (text) {
          domModules.push({ title: text });
        }
      });

      return domModules;
    }, filterTerm);
  }
}
