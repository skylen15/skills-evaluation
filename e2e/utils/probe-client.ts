/**
 * Robust HTTP client with classified error categorization and backoff/retry
 * for ServiceNow preflight probes and Table API requests.
 */

export type ErrorClassification =
  | "AVAILABILITY" // 502, 503, 504, connection reset, ECONNREFUSED, timeout, hibernation
  | "AUTH" // 401 Unauthorized, 403 Forbidden, session expired
  | "CONFIGURATION" // 404 Not Found, 400 Bad Request, missing record/schema
  | "MALFORMED_PAYLOAD"; // Invalid JSON body or missing expected result envelope

export interface ClassifiedProbeError {
  classification: ErrorClassification;
  message: string;
  status: number;
  isRetryable: boolean;
  rawError?: unknown;
}

export interface ClassifiedProbeResult<T = unknown> {
  ok: boolean;
  status: number;
  data?: T;
  rawText?: string;
  error?: ClassifiedProbeError;
  attempts: number;
}

export interface ProbeOptions {
  headers?: Record<string, string>;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: string;
  timeoutMs?: number;
  maxRetries?: number;
  initialBackoffMs?: number;
  maxBackoffMs?: number;
  backoffFactor?: number;
  sleepFn?: (ms: number) => Promise<void>;
  redirect?: RequestRedirect;
}

const defaultSleep = (ms: number): Promise<void> => {
  const { promise, resolve } = Promise.withResolvers<void>();
  setTimeout(resolve, ms);
  return promise;
};

/**
 * Classifies an HTTP response status, body text, or fetch exception into an ErrorClassification.
 */
export function classifyHttpError(
  status: number,
  bodyText: string = "",
  thrownError?: unknown,
  responseUrl?: string,
): ClassifiedProbeError {
  const lowerBody = bodyText.toLowerCase();

  const lowerUrl = (responseUrl ?? "").toLowerCase();

  // 1. Check thrown errors (e.g. AbortError, fetch network failures)
  if (thrownError) {
    const err = thrownError instanceof Error ? thrownError : new Error(String(thrownError));
    const isTimeout =
      err.name === "AbortError" ||
      err.name === "TimeoutError" ||
      /timeout|timed out/i.test(err.message);
    const isNetwork = /ECONNREFUSED|ENOTFOUND|ECONNRESET|fetch failed|network|socket/i.test(
      err.message,
    );

    if (isTimeout || isNetwork) {
      return {
        classification: "AVAILABILITY",
        status: status || 0,
        message: isTimeout
          ? `Instance request timed out: ${err.message}`
          : `Network or connection failure: ${err.message}`,
        isRetryable: true,
        rawError: thrownError,
      };
    }
  }

  // 2. Hibernation or maintenance patterns in body or redirect targets
  if (
    lowerBody.includes("instance is hibernating") ||
    lowerBody.includes("signon.service-now.com") ||
    lowerBody.includes("/wakeup") ||
    lowerBody.includes("hibernat") ||
    lowerUrl.includes("signon.service-now.com") ||
    lowerUrl.includes("/wakeup") ||
    lowerUrl.includes("hibernat")
  ) {
    return {
      classification: "AVAILABILITY",
      status: status || 503,
      message: "Instance is currently hibernating or waking up.",
      isRetryable: true,
    };
  }

  // 3. Status code classification
  if (status === 401) {
    return {
      classification: "AUTH",
      status,
      message: `Authentication failed (HTTP 401 Unauthorized): ${bodyText || "Invalid credentials or session"}`,
      isRetryable: false,
    };
  }

  if (status === 403) {
    return {
      classification: "AUTH",
      status,
      message: `Access denied (HTTP 403 Forbidden): ${bodyText || "Insufficient privileges or CSRF token missing"}`,
      isRetryable: false,
    };
  }

  if (status === 404) {
    return {
      classification: "CONFIGURATION",
      status,
      message: `Resource or table endpoint not found (HTTP 404): ${bodyText || "Missing metadata or schema"}`,
      isRetryable: false,
    };
  }

  if (status === 400) {
    return {
      classification: "CONFIGURATION",
      status,
      message: `Bad request or invalid query (HTTP 400): ${bodyText}`,
      isRetryable: false,
    };
  }

  if (status === 301 || status === 302 || status === 303 || status === 307 || status === 308) {
    return {
      classification: "AVAILABILITY",
      status,
      message: `Redirect response (HTTP ${status}) to ${responseUrl || bodyText || "unspecified location"}`,
      isRetryable: true,
    };
  }

  if (status === 502 || status === 503 || status === 504 || status === 521 || status === 522) {
    return {
      classification: "AVAILABILITY",
      status,
      message: `Instance gateway / service unavailable (HTTP ${status}): ${bodyText || "Transient outage or restart"}`,
      isRetryable: true,
    };
  }

  if (status >= 500) {
    return {
      classification: "AVAILABILITY",
      status,
      message: `Internal server error (HTTP ${status}): ${bodyText || "Server error"}`,
      isRetryable: true,
    };
  }

  // Fallback for unclassified status
  return {
    classification: status === 0 ? "AVAILABILITY" : "CONFIGURATION",
    status,
    message: `HTTP ${status}: ${bodyText || "Unknown error"}`,
    isRetryable: status === 0,
  };
}

/**
 * Safely parses JSON and extracts the ServiceNow Table API `{ result }` envelope or raw payload.
 * Classifies malformed payloads.
 */
export function parseTablePayload<T>(
  rawText: string,
  expectEnvelope: boolean = true,
): { ok: true; data: T } | { ok: false; error: ClassifiedProbeError } {
  if (!rawText || !rawText.trim()) {
    return {
      ok: false,
      error: {
        classification: "MALFORMED_PAYLOAD",
        status: 200,
        message: "Empty response payload received when JSON body was expected.",
        isRetryable: false,
      },
    };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawText);
  } catch (err: unknown) {
    return {
      ok: false,
      error: {
        classification: "MALFORMED_PAYLOAD",
        status: 200,
        message: `Failed to parse response as JSON: ${err instanceof Error ? err.message : String(err)}`,
        isRetryable: false,
        rawError: err,
      },
    };
  }

  if (expectEnvelope) {
    if (parsed && typeof parsed === "object" && "result" in parsed) {
      const record = parsed as Record<string, unknown>;
      return { ok: true, data: record.result as T };
    }
    // If not wrapped in result, classify as malformed payload for Table API
    return {
      ok: false,
      error: {
        classification: "MALFORMED_PAYLOAD",
        status: 200,
        message: "ServiceNow Table API payload missing expected top-level 'result' property.",
        isRetryable: false,
      },
    };
  }

  return { ok: true, data: parsed as T };
}

/**
 * Executes an HTTP probe with classified backoff/retries for AVAILABILITY errors.
 * Never retries non-retryable AUTH or CONFIGURATION errors.
 */
export async function fetchWithRetry<T = unknown>(
  url: string,
  options: ProbeOptions = {},
  expectJsonEnvelope: boolean = true,
): Promise<ClassifiedProbeResult<T>> {
  const maxRetries = options.maxRetries ?? 2;
  const initialBackoffMs = options.initialBackoffMs ?? 500;
  const maxBackoffMs = options.maxBackoffMs ?? 4000;
  const backoffFactor = options.backoffFactor ?? 2;
  const timeoutMs = options.timeoutMs ?? 30000;
  const sleep = options.sleepFn ?? defaultSleep;

  let attempt = 0;
  let currentBackoff = initialBackoffMs;

  while (true) {
    attempt++;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(url, {
        method: options.method || "GET",
        headers: {
          Accept: "application/json",
          ...options.headers,
        },
        body: options.body,
        signal: controller.signal,
        redirect: options.redirect,
      });
      clearTimeout(timer);

      const rawText = await res.text().catch(() => "");
      const resUrl = res.url || "";

      // Check for hibernation indicators in body or final redirected URL even if HTTP status is 200
      const hibernationCheck = classifyHttpError(res.status, rawText, undefined, resUrl);
      if (
        hibernationCheck.classification === "AVAILABILITY" &&
        (rawText.toLowerCase().includes("instance is hibernating") ||
          rawText.toLowerCase().includes("signon.service-now.com") ||
          rawText.toLowerCase().includes("/wakeup") ||
          rawText.toLowerCase().includes("hibernat") ||
          resUrl.toLowerCase().includes("signon.service-now.com") ||
          resUrl.toLowerCase().includes("/wakeup") ||
          resUrl.toLowerCase().includes("hibernat"))
      ) {
        if (hibernationCheck.isRetryable && attempt <= maxRetries) {
          await sleep(currentBackoff);
          currentBackoff = Math.min(currentBackoff * backoffFactor, maxBackoffMs);
          continue;
        }

        return {
          ok: false,
          status: res.status,
          rawText,
          error: hibernationCheck,
          attempts: attempt,
        };
      }

      if (!res.ok) {
        const error = classifyHttpError(res.status, rawText, undefined, resUrl);

        if (error.isRetryable && attempt <= maxRetries) {
          await sleep(currentBackoff);
          currentBackoff = Math.min(currentBackoff * backoffFactor, maxBackoffMs);
          continue;
        }

        return {
          ok: false,
          status: res.status,
          rawText,
          error,
          attempts: attempt,
        };
      }

      // Successful HTTP status (2xx)
      if (expectJsonEnvelope) {
        const parseResult = parseTablePayload<T>(rawText, true);
        if (!parseResult.ok) {
          return {
            ok: false,
            status: res.status,
            rawText,
            error: parseResult.error,
            attempts: attempt,
          };
        }
        return {
          ok: true,
          status: res.status,
          data: parseResult.data,
          rawText,
          attempts: attempt,
        };
      } else {
        // Return raw text or un-enveloped parsed JSON if possible
        let data: unknown = rawText;
        try {
          data = JSON.parse(rawText);
        } catch {
          // Keep raw text
        }
        return {
          ok: true,
          status: res.status,
          data: data as T,
          rawText,
          attempts: attempt,
        };
      }
    } catch (thrown: unknown) {
      clearTimeout(timer);
      const error = classifyHttpError(0, "", thrown);

      if (error.isRetryable && attempt <= maxRetries) {
        await sleep(currentBackoff);
        currentBackoff = Math.min(currentBackoff * backoffFactor, maxBackoffMs);
        continue;
      }

      return {
        ok: false,
        status: 0,
        error,
        attempts: attempt,
      };
    }
  }
}

/**
 * Unauthenticated instance availability probe & hibernation guard with classified retry.
 * Probes a stable public unauthenticated endpoint (GET /login.do) to verify the instance
 * is online, awake, and responsive before browser authentication attempts.
 */
export async function probeInstanceAvailability(
  instanceUrl: string,
  options: ProbeOptions = {},
): Promise<ClassifiedProbeResult<string>> {
  const probeUrl = `${instanceUrl.replace(/\/+$/, "")}/login.do`;
  return fetchWithRetry<string>(
    probeUrl,
    {
      headers: {
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        ...options.headers,
      },
      timeoutMs: options.timeoutMs ?? 60000,
      maxRetries: options.maxRetries ?? 2,
      ...options,
    },
    false,
  );
}
