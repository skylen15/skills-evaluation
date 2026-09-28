import fs from "node:fs";
import path from "node:path";

import { chromium, type FullConfig } from "@playwright/test";

import { AUTH_DIR, AUTH_FILES, INSTANCE_URL } from "../playwright.config.ts";
import { normalizeInstanceUrl } from "./fixtures/cleanup.ts";

declare global {
  interface Window {
    g_ck?: string;
    NOW?: { g_ck?: string };
  }
}

interface TableApiResponse<T> {
  result?: T;
}

interface UserRecord {
  sys_id: string;
  user_name: string;
}

interface GroupRecord {
  sys_id: string;
}

type PersonaKey = "member" | "pm" | "coe";

const PERSONA_CONFIG: Record<PersonaKey, { userName: string; groupName: string; label: string }> = {
  member: {
    userName: "se_member_test",
    groupName: "Skill Evaluation User",
    label: "Member",
  },
  pm: {
    userName: "se_pm_test",
    groupName: "Skill Evaluation PM",
    label: "PM",
  },
  coe: {
    userName: "se_coe_test",
    groupName: "Skill Evaluation COE",
    label: "CoE Head",
  },
};

const PERSONA_KEYS: PersonaKey[] = ["member", "pm", "coe"];

/** Pre-flight warm-up probe & hibernation guard with 60s timeout */
async function checkHibernationAndWarmUp(instanceUrl: string, authHeader?: string): Promise<void> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000);

  try {
    const headers: HeadersInit = authHeader
      ? { Accept: "application/json", Authorization: authHeader }
      : { Accept: "application/json" };

    const res = await fetch(`${instanceUrl}/api/now/table/sys_user?sysparm_limit=1`, {
      signal: controller.signal,
      headers,
    });

    clearTimeout(timeoutId);

    const bodyText = await res.text();

    const isHibernating =
      bodyText.toLowerCase().includes("hibernat") ||
      bodyText.toLowerCase().includes("instance is hibernating") ||
      res.url.includes("signon.service-now.com") ||
      res.url.includes("/wakeup");

    if (isHibernating) {
      throw new Error(
        `[ServiceNow E2E] Instance at ${instanceUrl} is currently hibernating. Please wake up the instance at https://developer.servicenow.com before running E2E acceptance tests.`,
      );
    }
  } catch (err: unknown) {
    clearTimeout(timeoutId);

    if (err instanceof Error) {
      if (err.name === "AbortError") {
        throw new Error(
          `[ServiceNow E2E] Instance pre-flight warm-up timed out after 60s at ${instanceUrl}. The instance may be hibernating or unresponsive.`,
        );
      }

      if (err.message.includes("[ServiceNow E2E]")) {
        throw err;
      }

      console.warn(`[ServiceNow E2E] Pre-flight probe notice: ${err.message}`);
    }
  }
}

/** Ensure test users exist on instance and retrieve their sys_ids */
async function resolvePersonaSysIds(
  instanceUrl: string,
  authHeader?: string,
  sessionHeaders: Record<string, string> = {},
): Promise<Record<PersonaKey, string>> {
  const result: Record<PersonaKey, string> = {
    member: "",
    pm: "",
    coe: "",
  };

  const userNames = Object.values(PERSONA_CONFIG).map((p) => p.userName);
  const queryUrl = `${instanceUrl}/api/now/table/sys_user?sysparm_query=user_nameIN${userNames.join(",")}&sysparm_fields=sys_id,user_name`;

  const apiHeaders = { ...sessionHeaders };

  if (authHeader) {
    apiHeaders.Authorization = authHeader;
  }

  try {
    const res = await fetch(queryUrl, {
      headers: {
        ...apiHeaders,
        Accept: "application/json",
      },
    });

    if (res.ok) {
      // SAFETY: ServiceNow Table API returns an object wrapping a result array for queries.
      const data = (await res.json()) as TableApiResponse<UserRecord[]>;

      if (Array.isArray(data.result)) {
        for (const user of data.result) {
          for (const personaKey of PERSONA_KEYS) {
            const config = PERSONA_CONFIG[personaKey];

            if (user.user_name === config.userName) {
              result[personaKey] = user.sys_id;
            }
          }
        }
      }
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);

    console.warn(`[ServiceNow E2E] Failed to query existing persona users: ${message}`);
  }

  // For any persona, ensure user exists and has group membership on instance
  for (const personaKey of PERSONA_KEYS) {
    const config = PERSONA_CONFIG[personaKey];

    if (!result[personaKey]) {
      try {
        const createRes = await fetch(`${instanceUrl}/api/now/table/sys_user`, {
          method: "POST",
          headers: {
            ...apiHeaders,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            user_name: config.userName,
            first_name: "SE",
            last_name: `${config.label} Test`,
            email: `${config.userName}@example.com`,
            active: true,
          }),
        });

        if (createRes.ok) {
          // SAFETY: ServiceNow Table API returns an object wrapping the newly created record in result.
          const createData = (await createRes.json()) as TableApiResponse<UserRecord>;
          const userSysId = createData.result?.sys_id;

          if (userSysId) {
            result[personaKey] = userSysId;
          }
        }
      } catch (createErr: unknown) {
        const message = createErr instanceof Error ? createErr.message : String(createErr);

        console.warn(
          `[ServiceNow E2E] Could not auto-provision seed user ${config.userName}: ${message}`,
        );
      }
    }

    // Ensure persona belongs to their required group
    const userSysId = result[personaKey];
    if (userSysId) {
      try {
        const checkMemberRes = await fetch(
          `${instanceUrl}/api/now/table/sys_user_grmember?sysparm_query=user=${userSysId}^group.name=${encodeURIComponent(config.groupName)}&sysparm_fields=sys_id`,
          {
            headers: {
              ...apiHeaders,
              Accept: "application/json",
            },
          },
        );

        let hasMembership = false;
        if (checkMemberRes.ok) {
          const memberData = (await checkMemberRes.json()) as TableApiResponse<{ sys_id: string }[]>;
          if (Array.isArray(memberData.result) && memberData.result.length > 0) {
            hasMembership = true;
          }
        }

        if (!hasMembership) {
          const groupRes = await fetch(
            `${instanceUrl}/api/now/table/sys_user_group?sysparm_query=name=${encodeURIComponent(config.groupName)}&sysparm_fields=sys_id`,
            {
              headers: {
                ...apiHeaders,
                Accept: "application/json",
              },
            },
          );

          if (groupRes.ok) {
            const groupData = (await groupRes.json()) as TableApiResponse<GroupRecord[]>;
            const groupSysId = groupData.result?.[0]?.sys_id;

            if (groupSysId) {
              const grmemberRes = await fetch(`${instanceUrl}/api/now/table/sys_user_grmember`, {
                method: "POST",
                headers: {
                  ...apiHeaders,
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                body: JSON.stringify({
                  user: userSysId,
                  group: groupSysId,
                }),
              });

              if (grmemberRes.ok) {
                console.log(
                  `[ServiceNow E2E] Associated ${config.userName} (${userSysId}) with group ${config.groupName} (${groupSysId})`,
                );
              }
            }
          }
        }
      } catch (grmemberErr: unknown) {
        const message = grmemberErr instanceof Error ? grmemberErr.message : String(grmemberErr);
        console.warn(
          `[ServiceNow E2E] Could not ensure group membership for ${config.userName}: ${message}`,
        );
      }
    }
  }

  return result;
}

export default async function globalSetup(_config: FullConfig): Promise<void> {
  const instanceUrl = process.env.SN_INSTANCE_URL;
  const adminUser = process.env.SN_ADMIN_USER;
  const adminPassword = process.env.SN_ADMIN_PASSWORD;

  const missing: string[] = [];

  if (!instanceUrl) {
    missing.push("SN_INSTANCE_URL");
  }

  if (!adminUser) {
    missing.push("SN_ADMIN_USER");
  }

  if (!adminPassword) {
    missing.push("SN_ADMIN_PASSWORD");
  }

  if (missing.length > 0) {
    throw new Error(
      `[ServiceNow E2E] Missing required environment variable(s): ${missing.join(
        ", ",
      )}. Real ServiceNow instance credentials are required per ADR 0009.`,
    );
  }

  // Guarantee .auth directory exists
  if (!fs.existsSync(AUTH_DIR)) {
    fs.mkdirSync(AUTH_DIR, { recursive: true });
  }

  const basicAuth = `Basic ${Buffer.from(`${adminUser}:${adminPassword}`).toString("base64")}`;

  const cleanUrl = normalizeInstanceUrl(INSTANCE_URL);

  // 1. Pre-flight cache warm-up and hibernation guard
  console.log(`[ServiceNow E2E] Running pre-flight warm-up against ${cleanUrl}...`);
  await checkHibernationAndWarmUp(cleanUrl, basicAuth);

  // 3. Admin login once to acquire browser session and CSRF token
  console.log(`[ServiceNow E2E] Logging in as Admin (${adminUser}) to capture CSRF token...`);
  const browser = await chromium.launch({ headless: true });
  const adminContext = await browser.newContext({ baseURL: cleanUrl });
  const adminPage = await adminContext.newPage();

  try {
    await adminPage.goto(`${cleanUrl}/login.do`, {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });

    const userInput = adminPage.locator("#user_name");

    if (await userInput.isVisible({ timeout: 5000 }).catch(() => false)) {
      await userInput.fill(adminUser);
      await adminPage.locator("#user_password").fill(adminPassword);
      await adminPage.locator("#sysverb_login").click();
      await adminPage.waitForTimeout(1500);
      const adminContinue = adminPage.locator(
        '#sysverb_login, button:has-text("Continue"), input[value="Continue"], button:has-text("Yes")',
      );
      if (adminPage.url().includes("login.do") && (await adminContinue.isVisible().catch(() => false))) {
        await adminContinue.click();
      }
      await adminPage
        .waitForURL((url) => !url.href.includes("login.do"), { timeout: 20000 })
        .catch(() => {});
    }

    // Navigate to classic navpage to ensure window.g_ck is populated
    await adminPage.goto(`${cleanUrl}/navpage.do`, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    let g_ck: string | null = await adminPage.evaluate(() => {
      return window.g_ck || window.NOW?.g_ck || null;
    });

    if (!g_ck) {
      try {
        const handle = await adminPage.waitForFunction(
          () => window.g_ck || window.NOW?.g_ck,
          undefined,
          { timeout: 15000 },
        );

        // SAFETY: waitForFunction returns the string token when resolved.
        g_ck = (await handle.jsonValue()) as string;
      } catch {
        console.warn("[ServiceNow E2E] window.g_ck could not be read within timeout");
      }
    }

    if (!g_ck) {
      throw new Error(
        "[ServiceNow E2E] Failed to acquire valid CSRF token (window.g_ck) after admin login. Cannot proceed with impersonation.",
      );
    }

    // Save admin storage state
    await adminContext.storageState({ path: AUTH_FILES.admin });

    // Resolve seed users through the authenticated browser session. Some instances
    // reject Basic Auth for Table API requests even when the same credentials work
    // for the browser login.
    const sessionHeaders = {
      Cookie: (await adminContext.cookies())
        .map(({ name, value }) => `${name}=${value}`)
        .join("; "),
      "X-UserToken": g_ck,
    };

    const adminSessionFile = path.resolve(AUTH_DIR, "admin-session.json");
    fs.writeFileSync(adminSessionFile, JSON.stringify(sessionHeaders, null, 2), "utf-8");

    console.log("[ServiceNow E2E] Resolving seed test user identifiers...");

    const personaSysIds = await resolvePersonaSysIds(cleanUrl, undefined, sessionHeaders);
    console.log(
      `[ServiceNow E2E] Admin session established (CSRF token: ${g_ck ? "acquired" : "fallback"}).`,
    );

    // Clean up any stale submissions belonging to the seed test personas from prior failed runs
    try {
      const userSysIdList = Object.values(personaSysIds).filter(Boolean);
      if (userSysIdList.length > 0) {
        const queryUrl = `${cleanUrl}/api/now/table/x_711398_se_submission?sysparm_query=assigned_toIN${userSysIdList.join(",")}^ORopened_byIN${userSysIdList.join(",")}&sysparm_fields=sys_id`;
        const existingRes = await fetch(queryUrl, { headers: sessionHeaders });
        if (existingRes.ok) {
          const body = (await existingRes.json()) as { result?: Array<{ sys_id: string }> };
          const records = body.result || [];
          for (const rec of records) {
            await fetch(`${cleanUrl}/api/now/table/x_711398_se_submission/${rec.sys_id}`, {
              method: "DELETE",
              headers: sessionHeaders,
            });
          }
          if (records.length > 0) {
            console.log(`[ServiceNow E2E] Cleaned up ${records.length} stale submission(s) from prior runs.`);
          }
        }
      }
    } catch (cleanupErr) {
      console.warn("[ServiceNow E2E] Non-fatal error cleaning up stale submissions:", cleanupErr);
    }
    // Close admin context so it does not conflict with persona logins
    await adminContext.close().catch(() => {});

    // 4. Impersonate each persona and export isolated storage states
    for (const personaKey of PERSONA_KEYS) {
      const config = PERSONA_CONFIG[personaKey];
      const userSysId = personaSysIds[personaKey];

      if (!userSysId) {
        throw new Error(
          `[ServiceNow E2E] Impersonation failed for ${config.label}: sys_id could not be resolved or provisioned.`,
        );
      }

      console.log(
        `[ServiceNow E2E] Impersonating ${config.label} (${config.userName} -> ${userSysId})...`,
      );

      // Use a fresh browser context per persona so each gets a distinct server session (JSESSIONID)
      const personaContext = await browser.newContext({
        baseURL: cleanUrl,
      });

      const personaPage = await personaContext.newPage();

      await personaPage.goto(`${cleanUrl}/login.do`, {
        waitUntil: "domcontentloaded",
        timeout: 45000,
      });

      const userInput = personaPage.locator("#user_name");

      if (await userInput.isVisible({ timeout: 5000 }).catch(() => false)) {
        await userInput.fill(adminUser);
        await personaPage.locator("#user_password").fill(adminPassword);
      await personaPage.locator("#sysverb_login").click();
      await personaPage.waitForTimeout(1500);
      const personaContinue = personaPage.locator(
        '#sysverb_login, button:has-text("Continue"), input[value="Continue"], button:has-text("Yes")',
      );
      if (personaPage.url().includes("login.do") && (await personaContinue.isVisible().catch(() => false))) {
        await personaContinue.click();
      }
      await personaPage
        .waitForURL((url) => !url.href.includes("login.do"), { timeout: 20000 })
        .catch(() => {});
    }

      await personaPage.goto(`${cleanUrl}/navpage.do`, {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      });

      let userToken = await personaPage.evaluate(() => window.g_ck || window.NOW?.g_ck || null);

      if (!userToken) {
        try {
          const handle = await personaPage.waitForFunction(
            () => window.g_ck || window.NOW?.g_ck,
            undefined,
            { timeout: 15000 },
          );
          userToken = (await handle.jsonValue()) as string;
        } catch {
          userToken = g_ck;
        }
      }

      if (!userToken) {
        throw new Error(
          `[ServiceNow E2E] Missing valid X-UserToken for impersonating ${config.label} (${config.userName}).`,
        );
      }

      const impersonateRes = await personaContext.request.post(
        `${cleanUrl}/api/now/ui/impersonate/${userSysId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-UserToken": userToken,
          },
          data: {},
        },
      );

      const impersonateStatus = impersonateRes.status();
      let impersonateBodyText = "";
      let impersonatedUser: string | undefined;

      try {
        const data = (await impersonateRes.json()) as {
          result?: { impersonatedUser?: string };
        };
        impersonatedUser = data?.result?.impersonatedUser;
        impersonateBodyText = JSON.stringify(data);
      } catch {
        impersonateBodyText = await impersonateRes.text().catch(() => "");
      }

      const isImpersonateSuccess =
        (impersonateStatus === 200 || impersonateStatus === 201) &&
        typeof impersonatedUser === "string" &&
        impersonatedUser.toLowerCase() === userSysId.toLowerCase();

      if (!isImpersonateSuccess) {
        throw new Error(
          `[ServiceNow E2E] Impersonation failed for ${config.label} (${config.userName}): HTTP ${impersonateStatus} - ${impersonateBodyText}`,
        );
      }

      // Refresh to lock session cookies to impersonated user
      try {
        await personaPage.goto(`${cleanUrl}/navpage.do`, {
          waitUntil: "domcontentloaded",
          timeout: 15000,
        });
      } catch {
        // Fall through if navpage redirect or network takes longer; session cookie is already set
      }
      await personaContext.storageState({ path: AUTH_FILES[personaKey] });
      await personaContext.close();

      console.log(`[ServiceNow E2E] Exported isolated session to ${AUTH_FILES[personaKey]}`);
    }
  } finally {
    await browser.close().catch(() => {});
  }

  console.log("[ServiceNow E2E] Global setup completed: all persona storage states primed.");
}
