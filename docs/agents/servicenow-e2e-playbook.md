# ServiceNow browser E2E playbook

Use this playbook when adding or changing browser-driven acceptance tests against a ServiceNow instance. It defines how to prove a user journey works without confusing instance outages, authentication failures, authorization failures, metadata drift, and locator defects.

This is reusable guidance. Keep project-specific user names, roles, groups, tables, modules, commands, and UI scope in that project's E2E configuration and specification.

## Scope

Playwright proves behavior that requires a browser: navigation, rendered controls, client scripts, form behavior, impersonated persona access, and user-triggered actions.

Use server tests, ATF server tests, or direct API assertions for database constraints, Business Rules, ACL query behavior, deterministic data setup, and cleanup. A browser test may verify server state after a UI action. It must not create the asserted state through the API.

Do not apply Classic-form assumptions to Workspace, Service Portal, or custom UI. Detect the UI surface first and select an adapter for that surface.

## Required project configuration

Before writing a spec, locate or create one E2E configuration module. It must declare:

```ts
export type OwnershipProof = "marker" | "registry" | "parent";

export interface CleanupTablePolicy {
  table: string;
  ownershipProofs: readonly OwnershipProof[];
  ownershipField?: string;
  parentReferences?: readonly {
    parentTable: string;
    foreignKey: string;
  }[];
}

export interface E2EProjectConfig {
  auth: {
    strategy: "browser-login" | "oauth" | "session-cookie" | "basic-auth";
    credentialEnvironment: readonly string[];
  };
  personas: readonly {
    key: string;
    userName: string;
    expectedRoles: readonly string[];
    expectedGroups?: readonly string[];
    entryTarget: string;
  }[];
  navigation: {
    mode: "classic" | "polaris" | "workspace" | "portal" | "custom" | "auto";
    requiredModules?: readonly string[];
  };
  cleanup: {
    tables: readonly CleanupTablePolicy[];
  };
}
```
For each table, `ownershipProofs` must list at least one supported proof. Set `ownershipField` only when the table supports a direct marker. Set `parentReferences` to the parent table and child foreign-key pairs used to prove lineage. Include one pair for each allowed polymorphic parent. A registry-only table leaves both optional fields unset. If a table has no declared safe proof, fail closed and do not create or delete its records.

Illustrative only. Replace these names and fields with the project's actual tables and relationships.

```ts
const cleanup = {
  tables: [
    {
      table: "parent_table",
      ownershipProofs: ["marker", "registry"],
      ownershipField: "ownership_marker_field",
    },
    {
      table: "child_table",
      ownershipProofs: ["registry", "parent"],
      parentReferences: [
        { parentTable: "parent_table", foreignKey: "parent_id" },
      ],
    },
    {
      table: "audit_table",
      ownershipProofs: ["registry", "parent"],
      parentReferences: [
        { parentTable: "parent_table", foreignKey: "record_id" },
        { parentTable: "other_parent_table", foreignKey: "record_id" },
      ],
    },
  ],
} satisfies E2EProjectConfig["cleanup"];
```
Before setup or cleanup mutates the instance, validate every table policy:

```text
require every table name and field name to be a non-empty valid ServiceNow identifier
require table names to be unique
require every ownershipProofs value to be one of "marker", "registry", "parent"
for each policy:
  require ownershipProofs.length > 0
  require ownershipField iff ownershipProofs contains "marker"
  require parentReferences.length > 0 iff ownershipProofs contains "parent"
  reject duplicate parentReferences
  for each parentReference:
    require parentReference.parentTable is declared in cleanup.tables
    require the declared parent policy has at least one ownership proof
    require parentReference.foreignKey is non-empty
if any requirement fails:
  fail closed before the first mutation
```

This validation is part of the E2E setup contract, not a reviewer suggestion. It prevents a type-correct but unsafe policy such as `ownershipProofs: ["marker"]` without `ownershipField`, a parent reference to a table outside the configured allow-list, an empty foreign key, or an unknown proof value loaded from JSON.
Every validation error must include `cleanup table`, `proof`, `ownershipField`, `parentTable`, and `foreignKey` values that were inspected, using `<unset>` where a value is absent. Use these failure cases:

| Invalid policy | Required result |
|---|---|
| `ownershipProofs` is empty | fail closed with `proof=none` |
| `"marker"` has no `ownershipField` | fail closed with `proof=marker` |
| `ownershipField` is set without `"marker"` | fail closed and report the extra field |
| `"parent"` has no `parentReferences` | fail closed with `proof=parent` |
| parent table is not in the cleanup allow-list | fail closed with `parentTable=<value>` |
| `foreignKey` is empty or invalid | fail closed with `foreignKey=<unset>` or the invalid value |
| proof value is outside the allow-list | fail closed with the unknown proof value |
| table names are duplicated or invalid | fail closed with the conflicting table name |

Do not create, update, or delete any instance record until the complete policy validates.


Use this module in global setup, preflight, storage-state creation, cleanup, diagnostics, and tests. Do not repeat persona, role, group, or module names in those files.

The project specification remains authoritative for application scope. This playbook does not widen it.

## Implementation sequence

Complete each step before starting the next one.

1. Read the project specification, domain terminology, test strategy, existing E2E configuration, and relevant ADRs.
   - Done when the browser UI surface, personas, auth policy, target workflows, and cleanup ownership are known.
2. Select the auth strategy from instance policy.
   - Done when the mechanism is documented in the E2E configuration.
   - Do not use Basic Auth for a probe or API call when the instance rejects it.
3. Add an unauthenticated availability probe.
   - Probe a stable public login or health endpoint. It answers only whether the instance is reachable.
   - Done when timeout and service errors produce an availability diagnostic rather than a missing-configuration diagnostic.
4. Create an authenticated admin or service session.
   - Done when the runner has the required cookies, bearer token, or CSRF token and a read-only authenticated request succeeds.
5. Run read-only preflight.
   - Done when preflight reports application readiness, persona metadata, and access prerequisites independently.
6. Create isolated persona sessions.
   - Done when each persona has its own browser storage state or auth context. Sessions must not share a mutable server session.
7. Run a persona smoke check.
   - Done when each persona can open its declared entry target and the page is neither an access-denied page nor an empty/error shell.
8. Implement one workflow at a time.
   - Done when its targeted spec passes, its created records are registered for cleanup, and its negative authorization behavior is covered where relevant.
9. Run the full suite and inspect teardown output.
   - Done when every spec passes and cleanup reports no records owned by the run.

Stop and surface the blocker instead of writing locators when availability, authentication, authorization, application readiness, or UI-surface discovery fails.

## Readiness model

Report failures at the first layer that fails.

| Layer | Question | Typical evidence |
|---|---|---|
| Availability | Does the instance respond? | public login endpoint, timeout, gateway status |
| Authentication | Can the runner create a valid privileged session? | login completion, token/cookie, authenticated read |
| Authorization | Can this persona access its entry target and action? | persona browser session, page content, HTTP status |
| Application readiness | Are required tables, modules, forms, and metadata deployed? | read-only metadata query, rendered module |
| Workflow behavior | Does a browser action produce the expected result? | UI action plus visible or API-verified result |

Do not infer a lower layer from a higher one. An admin session does not prove that a Member can open a form.

## Preflight contract

Preflight is read-only. Run checks in dependency order:

```text
availability
  -> privileged authentication
  -> persona existence and active state
  -> group and role prerequisites
  -> application/menu/module readiness
  -> persona entry-target smoke checks
```

Classify every failed probe:

| Classification | Examples | Retry |
|---|---|---|
| `AVAILABILITY` | timeout, DNS failure, reset, hibernation, 5xx gateway error | bounded exponential backoff |
| `AUTH` | 401, 403, invalid or expired session, CSRF rejection | no |
| `CONFIGURATION` | missing user, inactive user, missing table/module, 400, 404 | no |
| `MALFORMED_PAYLOAD` | invalid JSON, missing expected result envelope | no |

Only retry `AVAILABILITY`. Do not retry a UI assertion, business-rule rejection, or mutating action.

If a prerequisite cannot be evaluated, mark the dependent check `skipped` and name the prerequisite. Never report it as missing configuration.

Example:

```text
SKIPPED Group membership for reviewer
Reason: persona query was unavailable after 3 attempts
```

## Authentication and persona sessions

Availability and authentication are separate.

- Use an unauthenticated probe to detect hibernation or network failure.
- Use the project's supported login mechanism to create the privileged session.
- Run authenticated preflight with that session.
- Create one isolated context per persona.
- For native ServiceNow impersonation, verify the response identifies the requested persona before saving storage state.

Do not treat an expected unauthenticated `401` as proof of bad credentials. A Basic Auth `401` is expected when the instance blocks Basic Auth. In that case, use browser login, OAuth, or the configured session mechanism instead.

## Navigation and UI adapters

Discover the UI surface before choosing selectors:

```text
Classic form iframe
Polaris Classic shell
Workspace
Service Portal
Custom UI page
```

Create adapters by surface. An adapter owns navigation, readiness checks, field access, actions, and error extraction for that surface. Page specs call adapter methods rather than reaching into iframes or shadow roots directly.

For Classic and Polaris navigation:

- normalize the configured instance URL while preserving a context path;
- keep relative navigator paths separate from absolute URLs;
- encode a navigator target exactly once at the navigator boundary;
- use explicit document/locator readiness, never `networkidle` for ServiceNow because AMB connections stay open;
- include the resolved URL and detected surface in failures.

A helper that returns a path must not sometimes return an absolute URL.

## API and browser boundary

Use APIs for deterministic mechanics. Use the browser for behavior users perform or observe.

| Work | Preferred channel |
|---|---|
| availability and preflight probes | read-only HTTP request |
| immutable configuration lookup | read-only HTTP request |
| setup and cleanup | authenticated API fixture |
| reference sys_id lookup | API or UI autocomplete |
| visible form/module/action behavior | browser |
| submit, approve, reject, or other user action | browser |
| post-action record-state confirmation | browser, optionally followed by read-only API check |
| database invariants and server-only policy | unit or ATF server test |

A valid pattern:

```text
Browser clicks Approve
  -> browser observes completion
  -> API confirms persisted state
```

An invalid acceptance test:

```text
API changes state to Approved
  -> browser reads Approved
```

## Reference fields

A ServiceNow reference field has a display value and an underlying record identity. A reference-field helper succeeds only when it proves both.

1. Fill or select the display value through the actual UI surface.
2. Resolve or observe the underlying sys_id.
3. Submit the form.
4. Confirm no mandatory/reference validation message appears.
5. Confirm the saved record points to the expected record.

`g_form.setValue()` is a Classic-form technique, not a universal ServiceNow strategy. Workspace, Portal, and custom UI adapters must use their own supported interaction path.

## Data ownership and cleanup

Every mutable record created by a run must have at least one durable ownership proof. Use the strongest proof the table supports:

1. **Direct marker.** The record contains the current run identifier in a dedicated field or an allowed, documented business field.
2. **Registered sys_id.** The test registers the record sys_id in the current run's cleanup manifest when the record is created or returned by an API.
3. **Owned parent relation.** The record points to a parent record that has a direct marker or is registered in the current run. This covers automatically created child records and journal rows that cannot carry the marker themselves.

Cleanup may delete a record only when one of those proofs matches the current run. It must never delete by table, user, title, or broad date range alone in a shared instance. Query discovery may combine the current run marker, registered sys_ids, and references to owned parents. Delete in reverse dependency order.

Residual verification must use the same ownership lineage as deletion. For each tracked table, query the union of:

- direct marker or correlation-token matches on that table;
- registered sys_ids for the current run;
- child foreign-key fields pointing to registered parent sys_ids;
- journal or audit reference fields pointing to registered parent sys_ids, plus their current-run token when the platform stores it there.

Treat a record as residual only when the returned row proves one of those relationships. Do not query all rows for a table and infer ownership from the user, title, timestamp, or current state.

Generate a new run identifier for every suite run:

```text
e2e-<timestamp>-<random>
```

Run per-test rollback and a final sweep. Report table-by-table deletion counts and any residual records that still match an ownership proof. If a table has no safe ownership proof, do not mutate it in the browser suite. If records cannot be isolated by run identifier, force serial execution or do not run the suite against shared data.

Cache immutable lookup data only, such as normalized instance URL or persona sys_ids. Do not cache workflow records, approval state, or test-business data across runs.

## Retry, timeout, and concurrency policy

| Operation | Policy |
|---|---|
| availability probe | bounded retry for availability errors |
| authenticated read-only query | bounded retry for availability errors |
| browser navigation | one bounded navigation wait; diagnose URL and surface on failure |
| locator readiness | Playwright locator auto-wait |
| mutating API request | no blind retry; use idempotency/ownership before retrying |
| browser submit/approve/reject | no blind retry |
| assertion | no custom retry |
| cleanup deletion | retry only after confirming ownership and idempotency |

Start with one worker on constrained PDIs. Increase concurrency only after proving isolated data ownership, session isolation, and stable instance capacity.

## Failure diagnostic contract

Every failure emitted by E2E infrastructure must include the facts needed to classify it:

```text
run identifier
persona
instance URL and resolved target URL
UI surface and frame readiness
HTTP status and classification, when applicable
visible outer-shell and inner-form error text
target table/form/module
cleanup status
```

Do not report a selector timeout without reporting whether the correct target page loaded and whether ServiceNow rendered an access-denied or platform error page.

## Verification and handoff

Use the repository's declared commands. Do not impose a package manager or command set that the project does not use.

For a Fluent TypeScript project using pnpm, a normal sequence is:

```bash
pnpm fmt:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e:<targeted-workflow>
pnpm test:e2e
```

The final handoff records:

```text
selected auth strategy
availability/preflight result
persona smoke result
UI surfaces covered
targeted and full-suite result
cleanup totals and residual count
commands executed
instance-side prerequisite or blocker, if any
```

## Do not do this

- Do not use a blocked authentication mechanism as a warm-up probe.
- Do not let admin metadata access stand in for persona authorization.
- Do not hardcode project-specific persona, group, role, table, or module values in multiple files.
- Do not assume `#gsft_main`, `g_form`, `navpage.do`, or Polaris applies to every ServiceNow UI.
- Do not use `networkidle` as ServiceNow page readiness.
- Do not double-encode navigator targets.
- Do not retry submit, approval, rejection, or assertions to make a flaky test pass.
- Do not create workflow state through an API when the browser action is the behavior under test.
- Do not clean shared-instance data without a current-run ownership marker.
- Do not treat a timeout as evidence that metadata or permissions are missing.
