import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  buildContentUrl,
  buildNavpageUrl,
  buildNavToUrl,
  buildPolarisClassicUrl,
  extractTargetFromPolarisUrl,
  isPolarisUrl,
  normalizeInstanceUrl,
  resolveNavigatorPath,
  resolveNavigatorUrl,
} from "../e2e/utils/url-helper.ts";

describe("URL Helper - Instance Normalization and Routing", () => {
  describe("Root URL normalization", () => {
    it("handles plain root HTTPS domain without changes", () => {
      assert.equal(
        normalizeInstanceUrl("https://dev308764.service-now.com"),
        "https://dev308764.service-now.com",
      );
    });

    it("handles HTTP and localhost with custom port", () => {
      assert.equal(normalizeInstanceUrl("http://localhost:8080"), "http://localhost:8080");
    });

    it("trims surrounding whitespace", () => {
      assert.equal(
        normalizeInstanceUrl("   https://dev12345.service-now.com   "),
        "https://dev12345.service-now.com",
      );
    });

    it("returns empty string for nullish or empty inputs", () => {
      assert.equal(normalizeInstanceUrl(""), "");
      // @ts-expect-error test invalid runtime inputs
      assert.equal(normalizeInstanceUrl(null), "");
      // @ts-expect-error test invalid runtime inputs
      assert.equal(normalizeInstanceUrl(undefined), "");
    });
  });

  describe("Trailing slash handling", () => {
    it("strips single trailing slash", () => {
      assert.equal(
        normalizeInstanceUrl("https://dev308764.service-now.com/"),
        "https://dev308764.service-now.com",
      );
    });

    it("strips multiple trailing slashes", () => {
      assert.equal(
        normalizeInstanceUrl("https://dev308764.service-now.com///"),
        "https://dev308764.service-now.com",
      );
    });

    it("strips trailing slash on context-path", () => {
      assert.equal(
        normalizeInstanceUrl("https://gateway.company.com/sn/"),
        "https://gateway.company.com/sn",
      );
    });
  });

  describe("Context-path handling", () => {
    it("preserves single-level context-path prefix", () => {
      assert.equal(
        normalizeInstanceUrl("https://proxy.example.com/servicenow/"),
        "https://proxy.example.com/servicenow",
      );
    });

    it("preserves nested context-path prefix", () => {
      assert.equal(
        normalizeInstanceUrl("https://proxy.example.com/gateway/sn/instance1"),
        "https://proxy.example.com/gateway/sn/instance1",
      );
    });

    it("joins content URLs correctly onto context-paths without duplicate slashes", () => {
      assert.equal(
        buildContentUrl("https://proxy.example.com/sn/", "/api/now/table/sys_user"),
        "https://proxy.example.com/sn/api/now/table/sys_user",
      );
      assert.equal(
        buildContentUrl("https://proxy.example.com/sn", "api/now/table/sys_user"),
        "https://proxy.example.com/sn/api/now/table/sys_user",
      );
    });

    it("returns absolute URLs unchanged when passed to buildContentUrl", () => {
      assert.equal(
        buildContentUrl("https://ignored.com", "https://other.com/resource.do"),
        "https://other.com/resource.do",
      );
    });
  });

  describe("Navpage handling", () => {
    it("strips /navpage.do from base instance URL", () => {
      assert.equal(
        normalizeInstanceUrl("https://dev308764.service-now.com/navpage.do"),
        "https://dev308764.service-now.com",
      );
    });

    it("strips /nav_to.do and its query params from base instance URL", () => {
      assert.equal(
        normalizeInstanceUrl("https://dev308764.service-now.com/nav_to.do?uri=incident.do"),
        "https://dev308764.service-now.com",
      );
    });

    it("strips navpage from a context-path URL", () => {
      assert.equal(
        normalizeInstanceUrl("https://gateway.corp.com/sn/navpage.do"),
        "https://gateway.corp.com/sn",
      );
    });

    it("constructs navpage URL correctly from raw or normalized instance URL", () => {
      assert.equal(
        buildNavpageUrl("https://dev308764.service-now.com/"),
        "https://dev308764.service-now.com/navpage.do",
      );
      assert.equal(
        buildNavpageUrl("https://dev308764.service-now.com/navpage.do"),
        "https://dev308764.service-now.com/navpage.do",
      );
      assert.equal(buildNavpageUrl("https://proxy.com/sn/"), "https://proxy.com/sn/navpage.do");
    });

    it("builds classic nav_to.do with percent-encoded target", () => {
      assert.equal(
        buildNavToUrl("https://dev308764.service-now.com", "x_711398_se_submission.do?sys_id=-1"),
        "https://dev308764.service-now.com/nav_to.do?uri=x_711398_se_submission.do%3Fsys_id%3D-1",
      );
    });
  });

  describe("Polaris classic and target URLs", () => {
    it("strips bare Polaris classic target prefix from base instance URL", () => {
      assert.equal(
        normalizeInstanceUrl("https://dev308764.service-now.com/now/nav/ui/classic/params/target"),
        "https://dev308764.service-now.com",
      );
      assert.equal(
        normalizeInstanceUrl("https://dev308764.service-now.com/now/nav/ui/classic/params/target/"),
        "https://dev308764.service-now.com",
      );
    });

    it("strips full Polaris classic target URL with encoded destination", () => {
      assert.equal(
        normalizeInstanceUrl(
          "https://dev308764.service-now.com/now/nav/ui/classic/params/target/ui_page.do",
        ),
        "https://dev308764.service-now.com",
      );
      assert.equal(
        normalizeInstanceUrl(
          "https://dev308764.service-now.com/now/nav/ui/classic/params/target/x_711398_se_submission.do%3Fsys_id%3D-1",
        ),
        "https://dev308764.service-now.com",
      );
    });

    it("correctly identifies Polaris URLs via isPolarisUrl", () => {
      assert.equal(
        isPolarisUrl(
          "https://dev308764.service-now.com/now/nav/ui/classic/params/target/ui_page.do",
        ),
        true,
      );
      assert.equal(isPolarisUrl("/now/nav/ui/classic/params/target"), true);
      assert.equal(isPolarisUrl("https://dev308764.service-now.com/navpage.do"), false);
      assert.equal(isPolarisUrl("https://dev308764.service-now.com"), false);
    });

    it("builds Polaris classic target URL with encoded target", () => {
      assert.equal(
        buildPolarisClassicUrl(
          "https://dev308764.service-now.com/",
          "x_711398_se_submission.do?sys_id=-1",
        ),
        "https://dev308764.service-now.com/now/nav/ui/classic/params/target/x_711398_se_submission.do%3Fsys_id%3D-1",
      );

      assert.equal(
        buildPolarisClassicUrl("https://proxy.corp.com/sn", "ui_page.do"),
        "https://proxy.corp.com/sn/now/nav/ui/classic/params/target/ui_page.do",
      );

      assert.equal(
        buildPolarisClassicUrl("https://dev308764.service-now.com"),
        "https://dev308764.service-now.com/now/nav/ui/classic/params/target",
      );
    });

    it("extracts and decodes target parameter from Polaris URL or path", () => {
      assert.equal(
        extractTargetFromPolarisUrl(
          "https://dev308764.service-now.com/now/nav/ui/classic/params/target/x_711398_se_submission.do%3Fsys_id%3D-1",
        ),
        "x_711398_se_submission.do?sys_id=-1",
      );

      assert.equal(
        extractTargetFromPolarisUrl(
          "/now/nav/ui/classic/params/target/incident.do%3Fsys_id%3Dabc12345",
        ),
        "incident.do?sys_id=abc12345",
      );

      assert.equal(extractTargetFromPolarisUrl("https://dev.com/navpage.do"), null);
      assert.equal(extractTargetFromPolarisUrl(""), null);
    });
  });

  describe("resolveNavigatorPath and resolveNavigatorUrl", () => {
    it("resolves classic path when polaris is false", () => {
      const path = resolveNavigatorPath("x_test.do?sys_id=-1", { isPolaris: false });
      assert.equal(path, "/nav_to.do?uri=x_test.do%3Fsys_id%3D-1");
    });

    it("resolves polaris path when polaris is true", () => {
      const path = resolveNavigatorPath("x_test.do?sys_id=-1", { isPolaris: true });
      assert.equal(path, "/now/nav/ui/classic/params/target/x_test.do%3Fsys_id%3D-1");
    });

    it("resolves full navigator URL in polaris mode with context-path", () => {
      const url = resolveNavigatorUrl("https://gateway.corp.com/sn/", "x_test.do?sys_id=-1", {
        mode: "polaris",
      });

      assert.equal(
        url,
        "https://gateway.corp.com/sn/now/nav/ui/classic/params/target/x_test.do%3Fsys_id%3D-1",
      );
    });

    it("resolves full navigator URL in classic mode", () => {
      const url = resolveNavigatorUrl("https://dev123.service-now.com", "x_test.do?sys_id=-1", {
        mode: "classic",
      });

      assert.equal(url, "https://dev123.service-now.com/nav_to.do?uri=x_test.do%3Fsys_id%3D-1");
    });
  });
});
