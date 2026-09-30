/**
 * Reusable URL helper utility for ServiceNow E2E testing.
 *
 * Normalizes instance URLs, handles context-paths and trailing slashes,
 * enforces strict path-vs-URL boundaries, and builds/parses Classic navpage
 * and Polaris classic/target navigation URLs.
 */

/**
 * Normalizes an instance base URL by trimming whitespace, stripping trailing slashes,
 * context paths, classic navpage wrappers, and Polaris classic target wrappers.
 */
export function normalizeInstanceUrl(rawUrl: string): string {
  if (!rawUrl || typeof rawUrl !== "string") {
    return "";
  }

  let cleaned = rawUrl.trim();

  // Strip Polaris classic target parameters and wrappers
  cleaned = cleaned.replace(/\/now\/nav\/ui\/classic\/params\/target(?:\/.*)?$/i, "");

  // Strip classic navpage wrappers and queries
  cleaned = cleaned.replace(/\/(?:navpage|nav_to)\.do(?:\?.*)?$/i, "");

  // Strip trailing slashes
  cleaned = cleaned.replace(/\/+$/, "");

  return cleaned;
}

/**
 * Checks whether a given URL or path represents a Polaris navigation wrapper.
 */
export function isPolarisUrl(urlOrPath: string): boolean {
  if (!urlOrPath || typeof urlOrPath !== "string") {
    return false;
  }
  return /\/now\/nav\/(?:ui\/classic\/params\/target|polaris)/i.test(urlOrPath);
}

/**
 * Builds the URL to the Classic ServiceNow navpage (/navpage.do).
 */
export function buildNavpageUrl(instanceUrl: string): string {
  const base = normalizeInstanceUrl(instanceUrl);
  return `${base}/navpage.do`;
}

/**
 * Builds a Classic nav_to.do URL with the given target URI as an encoded query parameter.
 *
 * Example:
 *   buildNavToUrl("https://dev123.service-now.com", "x_test.do?sys_id=-1")
 *   -> "https://dev123.service-now.com/nav_to.do?uri=x_test.do%3Fsys_id%3D-1"
 */
export function buildNavToUrl(instanceUrl: string, targetUri: string): string {
  const base = normalizeInstanceUrl(instanceUrl);
  const encoded = encodeURIComponent(targetUri);
  return `${base}/nav_to.do?uri=${encoded}`;
}

/**
 * Builds a Polaris Classic navigation URL (/now/nav/ui/classic/params/target/...).
 * If targetUri is provided, it is percent-encoded and appended.
 */
export function buildPolarisClassicUrl(instanceUrl: string, targetUri?: string): string {
  const base = normalizeInstanceUrl(instanceUrl);
  if (!targetUri) {
    return `${base}/now/nav/ui/classic/params/target`;
  }
  const encoded = encodeURIComponent(targetUri);
  return `${base}/now/nav/ui/classic/params/target/${encoded}`;
}

/**
 * Extracts and decodes the embedded target URI from a Polaris classic URL or path.
 *
 * Example:
 *   extractTargetFromPolarisUrl("/now/nav/ui/classic/params/target/x_test.do%3Fsys_id%3D-1")
 *   -> "x_test.do?sys_id=-1"
 */
export function extractTargetFromPolarisUrl(urlOrPath: string): string | null {
  if (!urlOrPath || typeof urlOrPath !== "string") {
    return null;
  }

  const match = urlOrPath.match(/\/now\/nav\/ui\/classic\/params\/target\/(.+?)(?:[?#]|$)/i);
  if (!match || !match[1]) {
    return null;
  }

  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

/**
 * PATH BOUNDARY:
 * Resolves a target URI into a relative navigation pathname (starts with /),
 * suitable for page.goto(path) where baseURL is configured on the BrowserContext.
 *
 * Does NOT return an absolute URL.
 */
export function resolveNavigatorPath(
  targetUri: string,
  options?: { isPolaris?: boolean; baseUrl?: string },
): string {
  // Target URI should be clean relative path without leading slash for encoding
  const cleanTarget = targetUri.replace(/^\/+/, "");
  const encoded = encodeURIComponent(cleanTarget);

  let isPolaris = options?.isPolaris;
  if (isPolaris === undefined) {
    const candidate =
      options?.baseUrl || (typeof process !== "undefined" ? process.env?.SN_INSTANCE_URL : "");
    isPolaris = Boolean(candidate && candidate.includes("/now/nav/ui/classic/params/target"));
  }

  return isPolaris ? `/now/nav/ui/classic/params/target/${encoded}` : `/nav_to.do?uri=${encoded}`;
}

/**
 * URL BOUNDARY:
 * Resolves a full, absolute navigation URL for a given target URI, preserving context-paths.
 * Guarantees a fully qualified URL starting with http:// or https://.
 */
export function resolveNavigatorUrl(
  baseUrl: string,
  targetUri: string,
  options?: { mode?: "polaris" | "classic" | "auto" },
): string {
  const cleanBase = normalizeInstanceUrl(baseUrl);
  const cleanTarget = targetUri.replace(/^\/+/, "");
  const mode = options?.mode ?? "auto";

  let usePolaris = false;
  if (mode === "polaris") {
    usePolaris = true;
  } else if (mode === "classic") {
    usePolaris = false;
  } else {
    const envUrl = typeof process !== "undefined" ? process.env?.SN_INSTANCE_URL : "";
    usePolaris = Boolean(
      baseUrl.includes("/now/nav/ui/classic/params/target") ||
      (envUrl && envUrl.includes("/now/nav/ui/classic/params/target")),
    );
  }

  return usePolaris
    ? buildPolarisClassicUrl(cleanBase, cleanTarget)
    : buildNavToUrl(cleanBase, cleanTarget);
}

/**
 * CONTENT URL BOUNDARY:
 * Builds a direct content URL for #gsft_main or Table API calls,
 * properly joining baseUrl and path without duplicate slashes and preserving context-paths.
 */
export function buildContentUrl(baseUrl: string, targetPath: string): string {
  if (/^https?:\/\//i.test(targetPath)) {
    return targetPath;
  }

  const cleanBase = normalizeInstanceUrl(baseUrl);
  const cleanPath = targetPath.replace(/^\/+/, "");
  return `${cleanBase}/${cleanPath}`;
}
