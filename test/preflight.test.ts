import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { PERSONA_MANIFEST } from "../e2e/fixtures/personas.ts";
import {
  executePreflightChecks,
  extractReferenceValue,
  formatPreflightReport,
  type PreflightReport,
  REQUIRED_MODULES,
  REQUIRED_PERSONAS,
} from "../e2e/preflight.ts";

describe("Preflight Check Harness and Diagnostic Formatting", () => {
  it("defines all three required personas via central manifest", () => {
    assert.ok(REQUIRED_PERSONAS.member);
    assert.equal(REQUIRED_PERSONAS.member.userName, "se_member_test");
    assert.equal(REQUIRED_PERSONAS.member.groupName, "Skill Evaluation User");
    assert.equal(REQUIRED_PERSONAS.member.requiredRole, "x_711398_se.se_user");

    assert.ok(REQUIRED_PERSONAS.pm);
    assert.equal(REQUIRED_PERSONAS.pm.userName, "se_pm_test");
    assert.equal(REQUIRED_PERSONAS.pm.groupName, "Skill Evaluation PM");
    assert.equal(REQUIRED_PERSONAS.pm.requiredRole, "x_711398_se.se_admin");

    assert.ok(REQUIRED_PERSONAS.coe);
    assert.equal(REQUIRED_PERSONAS.coe.userName, "se_coe_test");
    assert.equal(REQUIRED_PERSONAS.coe.groupName, "Skill Evaluation COE");
    assert.equal(REQUIRED_PERSONAS.coe.requiredRole, "x_711398_se.se_admin");

    assert.strictEqual(REQUIRED_PERSONAS, PERSONA_MANIFEST);
  });

  it("defines all 5 required navigation modules", () => {
    assert.equal(REQUIRED_MODULES.length, 5);
    assert.ok(REQUIRED_MODULES.includes("New Evaluation"));
    assert.ok(REQUIRED_MODULES.includes("My Skill Evaluations"));
    assert.ok(REQUIRED_MODULES.includes("All"));
    assert.ok(REQUIRED_MODULES.includes("Awaiting Approval"));
    assert.ok(REQUIRED_MODULES.includes("Completed"));
  });

  describe("extractReferenceValue helper", () => {
    it("handles plain strings and undefined", () => {
      assert.equal(extractReferenceValue(undefined), undefined);
      assert.equal(extractReferenceValue("simple_sys_id"), "simple_sys_id");
    });

    it("extracts value preference by default", () => {
      const ref = { value: "user_sys_id", display_value: "John Doe" };

      assert.equal(extractReferenceValue(ref, "value"), "user_sys_id");
    });

    it("extracts display_value preference", () => {
      const ref = { value: "group_sys_id", display_value: "Skill Evaluation PM" };

      assert.equal(extractReferenceValue(ref, "display_value"), "Skill Evaluation PM");
    });

    it("falls back to other field if preferred field is absent", () => {
      assert.equal(
        extractReferenceValue({ display_value: "Only Display" }, "value"),
        "Only Display",
      );
      assert.equal(extractReferenceValue({ value: "Only Value" }, "display_value"), "Only Value");
    });
  });

  describe("dependency-aware skipped checks and transient error handling", () => {
    it("marks dependent group and role checks as skipped when persona is missing", async () => {
      const originalFetch = globalThis.fetch;

      // SAFETY: mocking global fetch signature for test execution
      globalThis.fetch = (async (url: string | URL | Request) => {
        const urlStr = url.toString();

        if (urlStr.includes("sys_user?")) {
          // Empty user result: no seed users exist
          return new Response(JSON.stringify({ result: [] }), { status: 200 });
        }

        if (urlStr.includes("sys_user_grmember?")) {
          return new Response(JSON.stringify({ result: [] }), { status: 200 });
        }

        if (urlStr.includes("sys_group_has_role?")) {
          return new Response(JSON.stringify({ result: [] }), { status: 200 });
        }

        if (urlStr.includes("sys_app_application?")) {
          return new Response(
            JSON.stringify({ result: [{ active: true, title: "Skill Evaluation" }] }),
            { status: 200 },
          );
        }

        if (urlStr.includes("sys_app_module?")) {
          const modules = REQUIRED_MODULES.map((title) => ({ title, active: true }));

          return new Response(JSON.stringify({ result: modules }), { status: 200 });
        }

        if (urlStr.includes("navpage.do")) {
          return new Response("<html></html>", { status: 200 });
        }

        return new Response("Not Found", { status: 404 });
      }) as typeof fetch;

      try {
        const report = await executePreflightChecks("https://dev.service-now.com");

        assert.equal(report.passed, false);

        // 3 persona existence checks failed
        const userChecks = report.items.filter((i) => i.category === "personas");

        assert.equal(userChecks.length, 3);
        assert.ok(userChecks.every((i) => i.status === "failed"));

        // Effective access group membership checks should be SKIPPED because users were missing
        const groupChecks = report.items.filter((i) => i.name.startsWith("Group Membership:"));

        assert.equal(groupChecks.length, 3);

        for (const check of groupChecks) {
          assert.equal(check.status, "skipped", `Expected skipped for ${check.name}`);
          assert.match(check.skipReason || "", /Prerequisite persona '.*' does not exist/);
        }
      } finally {
        globalThis.fetch = originalFetch;
      }
    });

    it("never classifies transient 503 instance error as missing configuration", async () => {
      const originalFetch = globalThis.fetch;

      // SAFETY: mocking global fetch signature for test execution
      globalThis.fetch = (async (url: string | URL | Request) => {
        const urlStr = url.toString();

        if (urlStr.includes("sys_user?")) {
          return new Response("Service Unavailable", { status: 503 });
        }

        return new Response("<html></html>", { status: 200 });
      }) as typeof fetch;

      try {
        const report = await executePreflightChecks("https://dev.service-now.com", {
          maxRetries: 0,
        });

        assert.equal(report.passed, false);

        const personaItems = report.items.filter((i) => i.category === "personas");

        for (const item of personaItems) {
          assert.equal(item.status, "failed");
          assert.equal(item.classification, "AVAILABILITY");
          assert.match(item.diagnostic || "", /unavailable while querying sys_user/i);
          assert.match(item.diagnostic || "", /NOT a missing persona configuration/i);
        }
      } finally {
        globalThis.fetch = originalFetch;
      }
    });
  });

  describe("formatPreflightReport", () => {
    it("formats a successful preflight report cleanly", () => {
      const report: PreflightReport = {
        passed: true,
        totalChecks: 10,
        passedChecks: 10,
        failedChecks: 0,
        skippedChecks: 0,
        items: [
          { category: "personas", name: "Persona: Member", status: "passed", passed: true },
          {
            category: "navigator",
            name: "Application Menu: Skill Evaluation",
            status: "passed",
            passed: true,
          },
        ],
      };

      const formatted = formatPreflightReport(report);

      assert.match(formatted, /All 10 preflight checks PASSED/);
    });

    it("formats skipped checks distinctly with skip reasons", () => {
      const report: PreflightReport = {
        passed: false,
        totalChecks: 3,
        passedChecks: 1,
        failedChecks: 1,
        skippedChecks: 1,
        items: [
          {
            category: "personas",
            name: "Persona Existence: Member (se_member_test)",
            status: "failed",
            passed: false,
            classification: "CONFIGURATION",
            diagnostic: "Test persona user 'se_member_test' was not found in table sys_user.",
            remediation: "Deploy seed users via 'now-sdk install'.",
          },
          {
            category: "effective_access",
            name: "Group Membership: se_member_test -> Skill Evaluation User",
            status: "skipped",
            passed: false,
            skipReason: "Prerequisite persona 'se_member_test' does not exist.",
            diagnostic: "Skipped: Cannot verify group assignment because user record is missing.",
            remediation: "Resolve persona existence failure first.",
          },
          {
            category: "navigator",
            name: "Application Menu: Skill Evaluation",
            status: "passed",
            passed: true,
          },
        ],
      };

      const formatted = formatPreflightReport(report);

      assert.match(
        formatted,
        /Access and Environment Prerequisites FAILED \(1 failed, 1 skipped of 3 total\)/,
      );
      assert.match(formatted, /FAILED CHECKS:/);
      assert.match(formatted, /SKIPPED CHECKS \(Blocked by Failed Prerequisites\):/);
      assert.match(
        formatted,
        /Skip Reason:\s+Prerequisite persona 'se_member_test' does not exist/,
      );
    });
  });
});
