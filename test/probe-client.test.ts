import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  classifyHttpError,
  fetchWithRetry,
  parseTablePayload,
  probeInstanceAvailability,
} from "../e2e/utils/probe-client.ts";

describe("Probe Client - Classification, Retry & Payload Parsing", () => {
  describe("classifyHttpError", () => {
    it("classifies timeout (AbortError) as retryable AVAILABILITY", () => {
      const abortErr = new Error("The operation was aborted");
      abortErr.name = "AbortError";

      const classified = classifyHttpError(0, "", abortErr);

      assert.equal(classified.classification, "AVAILABILITY");
      assert.equal(classified.isRetryable, true);
      assert.match(classified.message, /timed out/i);
    });
    it("classifies TimeoutError as retryable AVAILABILITY", () => {
      const timeoutErr = new Error("The operation timed out");
      timeoutErr.name = "TimeoutError";

      const classified = classifyHttpError(0, "", timeoutErr);

      assert.equal(classified.classification, "AVAILABILITY");
      assert.equal(classified.isRetryable, true);
      assert.match(classified.message, /timed out/i);
    });

    it("classifies thrown message containing 'timed out' as retryable AVAILABILITY", () => {
      const genericErr = new Error("request to gateway timed out after 30000ms");

      const classified = classifyHttpError(0, "", genericErr);

      assert.equal(classified.classification, "AVAILABILITY");
      assert.equal(classified.isRetryable, true);
      assert.match(classified.message, /timed out/i);
    });

    it("classifies network connection failure (ECONNREFUSED) as retryable AVAILABILITY", () => {
      const netErr = new Error("connect ECONNREFUSED 127.0.0.1:443");

      const classified = classifyHttpError(0, "", netErr);

      assert.equal(classified.classification, "AVAILABILITY");
      assert.equal(classified.isRetryable, true);
      assert.match(classified.message, /network or connection/i);
    });

    it("classifies hibernation notice in response as retryable AVAILABILITY", () => {
      const classified = classifyHttpError(200, "Your instance is hibernating. Please wake it up.");

      assert.equal(classified.classification, "AVAILABILITY");
      assert.equal(classified.isRetryable, true);
      assert.match(classified.message, /hibernating/i);
    });
    it("classifies hibernation redirect URL as retryable AVAILABILITY", () => {
      const classified = classifyHttpError(
        302,
        "",
        undefined,
        "https://signon.service-now.com/ssologin.do?relayState=hibernation",
      );

      assert.equal(classified.classification, "AVAILABILITY");
      assert.equal(classified.isRetryable, true);
      assert.match(classified.message, /hibernating/i);
    });

    it("classifies wakeup redirect URL as retryable AVAILABILITY", () => {
      const classified = classifyHttpError(
        302,
        "",
        undefined,
        "https://dev308764.service-now.com/wakeup",
      );

      assert.equal(classified.classification, "AVAILABILITY");
      assert.equal(classified.isRetryable, true);
      assert.match(classified.message, /hibernating/i);
    });

    it("classifies generic HTTP 302 / 3xx redirect as retryable AVAILABILITY", () => {
      const classified = classifyHttpError(
        302,
        "Moved Temporarily",
        undefined,
        "https://example.service-now.com/navpage.do",
      );

      assert.equal(classified.classification, "AVAILABILITY");
      assert.equal(classified.isRetryable, true);
      assert.equal(classified.status, 302);
      assert.match(classified.message, /redirect response \(http 302\)/i);
    });

    it("classifies 401 Unauthorized as non-retryable AUTH", () => {
      const classified = classifyHttpError(401, '{"error":{"message":"User Not Authenticated"}}');

      assert.equal(classified.classification, "AUTH");
      assert.equal(classified.isRetryable, false);
      assert.equal(classified.status, 401);
    });

    it("classifies 403 Forbidden as non-retryable AUTH", () => {
      const classified = classifyHttpError(403, '{"error":{"message":"User Not Authorized"}}');

      assert.equal(classified.classification, "AUTH");
      assert.equal(classified.isRetryable, false);
      assert.equal(classified.status, 403);
    });

    it("classifies 404 Not Found as non-retryable CONFIGURATION", () => {
      const classified = classifyHttpError(
        404,
        '{"error":{"message":"Table sys_app_foo not found"}}',
      );

      assert.equal(classified.classification, "CONFIGURATION");
      assert.equal(classified.isRetryable, false);
      assert.equal(classified.status, 404);
    });

    it("classifies 400 Bad Request as non-retryable CONFIGURATION", () => {
      const classified = classifyHttpError(400, '{"error":{"message":"Invalid sysparm_query"}}');

      assert.equal(classified.classification, "CONFIGURATION");
      assert.equal(classified.isRetryable, false);
      assert.equal(classified.status, 400);
    });

    it("classifies 502, 503, 504 and 5xx as retryable AVAILABILITY", () => {
      for (const code of [500, 502, 503, 504]) {
        const classified = classifyHttpError(code, "Service Unavailable");

        assert.equal(classified.classification, "AVAILABILITY");
        assert.equal(classified.isRetryable, true);
        assert.equal(classified.status, code);
      }
    });
  });

  describe("parseTablePayload", () => {
    it("successfully extracts result envelope from valid Table API JSON", () => {
      const raw = JSON.stringify({
        result: [{ sys_id: "123", user_name: "test" }],
      });

      const res = parseTablePayload<Array<{ sys_id: string }>>(raw, true);

      assert.equal(res.ok, true);

      if (res.ok) {
        assert.equal(res.data.length, 1);
        assert.equal(res.data[0]?.sys_id, "123");
      }
    });

    it("classifies empty payload as MALFORMED_PAYLOAD", () => {
      const res = parseTablePayload("", true);

      assert.equal(res.ok, false);

      if (!res.ok) {
        assert.equal(res.error.classification, "MALFORMED_PAYLOAD");
        assert.match(res.error.message, /empty response/i);
      }
    });

    it("classifies invalid non-JSON body as MALFORMED_PAYLOAD", () => {
      const res = parseTablePayload("<html><head><title>502 Gateway</title></head></html>", true);

      assert.equal(res.ok, false);

      if (!res.ok) {
        assert.equal(res.error.classification, "MALFORMED_PAYLOAD");
        assert.match(res.error.message, /failed to parse response as json/i);
      }
    });

    it("classifies Table API JSON missing 'result' wrapper as MALFORMED_PAYLOAD", () => {
      const res = parseTablePayload('{"status": "ok", "items": []}', true);

      assert.equal(res.ok, false);

      if (!res.ok) {
        assert.equal(res.error.classification, "MALFORMED_PAYLOAD");
        assert.match(res.error.message, /missing expected top-level 'result'/i);
      }
    });

    it("allows un-enveloped payload when expectEnvelope is false", () => {
      const res = parseTablePayload<{ hello: string }>('{"hello": "world"}', false);

      assert.equal(res.ok, true);

      if (res.ok) {
        assert.equal(res.data.hello, "world");
      }
    });
  });

  describe("fetchWithRetry backoff behavior", () => {
    it("does not retry 401 or 404 errors", async () => {
      let fetchCalls = 0;
      const originalFetch = globalThis.fetch;

      // SAFETY: mocking global fetch signature for test execution
      globalThis.fetch = (async () => {
        fetchCalls++;

        return new Response('{"error": "Unauthorized"}', { status: 401 });
      }) as typeof fetch;

      try {
        const result = await fetchWithRetry("https://example.service-now.com/api/test", {
          maxRetries: 3,
        });

        assert.equal(fetchCalls, 1, "Should not retry 401 Unauthorized");
        assert.equal(result.ok, false);
        assert.equal(result.error?.classification, "AUTH");
        assert.equal(result.attempts, 1);
      } finally {
        globalThis.fetch = originalFetch;
      }
    });

    it("retries transient 503 errors and respects backoff sleep", async () => {
      let fetchCalls = 0;
      const sleepDelays: number[] = [];
      const originalFetch = globalThis.fetch;

      // SAFETY: mocking global fetch signature for test execution
      globalThis.fetch = (async () => {
        fetchCalls++;

        if (fetchCalls < 3) {
          return new Response("Service Unavailable", { status: 503 });
        }

        return new Response(JSON.stringify({ result: [{ id: "ok" }] }), { status: 200 });
      }) as typeof fetch;

      try {
        const result = await fetchWithRetry<Array<{ id: string }>>(
          "https://example.service-now.com/api/test",
          {
            maxRetries: 3,
            initialBackoffMs: 100,
            backoffFactor: 2,
            sleepFn: async (ms) => {
              sleepDelays.push(ms);
            },
          },
        );

        assert.equal(fetchCalls, 3);
        assert.equal(result.ok, true);
        assert.equal(result.attempts, 3);
        assert.deepEqual(sleepDelays, [100, 200]);

        if (result.ok && result.data) {
          assert.equal(result.data[0]?.id, "ok");
        }
      } finally {
        globalThis.fetch = originalFetch;
      }
    });
    it("retries request timeouts and respects backoff sleep", async () => {
      let fetchCalls = 0;
      const sleepDelays: number[] = [];
      const originalFetch = globalThis.fetch;

      // SAFETY: mocking global fetch signature for test execution
      globalThis.fetch = (async () => {
        fetchCalls++;

        if (fetchCalls < 3) {
          const err = new Error("The operation was aborted");
          err.name = "AbortError";
          throw err;
        }

        return new Response("OK", { status: 200 });
      }) as typeof fetch;

      try {
        const result = await fetchWithRetry<string>(
          "https://example.service-now.com/login.do",
          {
            maxRetries: 3,
            initialBackoffMs: 50,
            backoffFactor: 2,
            sleepFn: async (ms) => {
              sleepDelays.push(ms);
            },
          },
          false,
        );

        assert.equal(fetchCalls, 3);
        assert.equal(result.ok, true);
        assert.equal(result.attempts, 3);
        assert.deepEqual(sleepDelays, [50, 100]);
      } finally {
        globalThis.fetch = originalFetch;
      }
    });

    it("retries responses with hibernation notice and classifies as AVAILABILITY", async () => {
      let fetchCalls = 0;
      const sleepDelays: number[] = [];
      const originalFetch = globalThis.fetch;

      // SAFETY: mocking global fetch signature for test execution
      globalThis.fetch = (async () => {
        fetchCalls++;

        if (fetchCalls < 2) {
          return new Response("Instance is hibernating", { status: 200 });
        }

        return new Response("<html><body>Login Page</body></html>", { status: 200 });
      }) as typeof fetch;

      try {
        const result = await fetchWithRetry<string>(
          "https://example.service-now.com/login.do",
          {
            maxRetries: 2,
            initialBackoffMs: 50,
            backoffFactor: 2,
            sleepFn: async (ms) => {
              sleepDelays.push(ms);
            },
          },
          false,
        );

        assert.equal(fetchCalls, 2);
        assert.equal(result.ok, true);
        assert.equal(result.attempts, 2);
        assert.deepEqual(sleepDelays, [50]);
      } finally {
        globalThis.fetch = originalFetch;
      }
    });
  });

  describe("probeInstanceAvailability", () => {
    it("successfully probes responsive instance via unauthenticated GET /login.do without auth headers", async () => {
      let capturedUrl = "";
      let capturedHeaders: Record<string, string> = {};
      const originalFetch = globalThis.fetch;

      // SAFETY: mocking global fetch signature for test execution
      globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
        capturedUrl = String(input);
        // SAFETY: the test passes a plain Record-shaped header object to the mocked fetch.
        capturedHeaders = (init?.headers as Record<string, string>) || {};

        return new Response("<html><body>Welcome to ServiceNow</body></html>", {
          status: 200,
          headers: { "Content-Type": "text/html;charset=UTF-8" },
        });
      }) as typeof fetch;

      try {
        const result = await probeInstanceAvailability("https://dev12345.service-now.com");

        assert.equal(result.ok, true);
        assert.equal(result.status, 200);
        assert.equal(capturedUrl, "https://dev12345.service-now.com/login.do");
        assert.equal(
          capturedHeaders.Authorization,
          undefined,
          "No Authorization header should be sent",
        );
        assert.match(capturedHeaders.Accept || "", /text\/html/);
      } finally {
        globalThis.fetch = originalFetch;
      }
    });

    it("detects hibernating instance and classifies as AVAILABILITY error", async () => {
      const originalFetch = globalThis.fetch;

      // SAFETY: mocking global fetch signature for test execution
      globalThis.fetch = (async () => {
        return new Response(
          "Your instance is hibernating. Please wake it up from developer portal.",
          {
            status: 200,
          },
        );
      }) as typeof fetch;

      try {
        const result = await probeInstanceAvailability("https://dev12345.service-now.com", {
          maxRetries: 1,
          initialBackoffMs: 10,
          sleepFn: async () => {},
        });

        assert.equal(result.ok, false);
        assert.equal(result.error?.classification, "AVAILABILITY");
        assert.match(result.error.message, /hibernating/i);
      } finally {
        globalThis.fetch = originalFetch;
      }
    });

    it("classifies 401 on login surface as non-retryable AUTH error", async () => {
      let fetchCalls = 0;
      const originalFetch = globalThis.fetch;

      // SAFETY: mocking global fetch signature for test execution
      globalThis.fetch = (async () => {
        fetchCalls++;

        return new Response("Unauthorized", { status: 401 });
      }) as typeof fetch;

      try {
        const result = await probeInstanceAvailability("https://dev12345.service-now.com", {
          maxRetries: 3,
        });

        assert.equal(fetchCalls, 1, "Should not retry 401");
        assert.equal(result.ok, false);
        assert.equal(result.error?.classification, "AUTH");
        assert.equal(result.error.status, 401);
      } finally {
        globalThis.fetch = originalFetch;
      }
    });
  });
});
