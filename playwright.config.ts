import fs from "node:fs";
import path from "node:path";

import { defineConfig, devices } from "@playwright/test";

// Support .env via native process.loadEnvFile if available and present
const envPath = path.resolve(process.cwd(), ".env");

if (fs.existsSync(envPath)) {
  try {
    process.loadEnvFile(envPath);
  } catch {
    // Environment file already loaded or unreadable
  }
}

export const INSTANCE_URL = (
  process.env.SN_INSTANCE_URL || "https://dev308764.service-now.com"
).replace(/\/+$/, "");

export const AUTH_DIR = path.resolve(process.cwd(), ".auth");

export const AUTH_FILES = {
  member: path.resolve(AUTH_DIR, "member.json"),
  pm: path.resolve(AUTH_DIR, "pm.json"),
  coe: path.resolve(AUTH_DIR, "coe.json"),
  admin: path.resolve(AUTH_DIR, "admin.json"),
};

export default defineConfig({
  testDir: "./e2e/specs",
  timeout: 90000,
  expect: {
    timeout: 15000,
  },
  fullyParallel: false,
  workers: 1,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  globalSetup: "./e2e/global-setup.ts",
  globalTeardown: "./e2e/global-teardown.ts",
  use: {
    baseURL: INSTANCE_URL,
    headless: true,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },
  projects: [
    {
      name: "e2e",
      use: {
        ...devices["Desktop Chrome"],
        storageState: AUTH_FILES.member,
      },
    },
  ],
});
