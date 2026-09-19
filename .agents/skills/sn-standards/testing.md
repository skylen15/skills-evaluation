# testing

Portable testing defaults: **mock proves logic, ATF proves instance.** The universal
executable-artifact baseline lives in `core.md`. Before adding or running tests, inspect the
project's package manifest, test/lint configuration, existing tests, and directory layout.
Use that project's commands, module-loading pattern, and paths.

## Spec dialect

- **`*.atf.spec.js` (pasted into the instance):** Jasmine 3.1 syntax (`describe` / `it` /
`expect`), ES5/Rhino, self-contained. **Never use matchers/features newer than Jasmine
3.1** (e.g. `toHaveSize`, `withContext`, async `it` returning a promise) — they fail on
the instance. No `import`/`export` (ATF parses at ES Level 0 / ES3 — `export` is a parse
error). Must be copy-paste ready for a `Run Server Side Script` step.
- **`*.spec.js` (mock, local-only, never pasted):** full modern Jest — arrow fns, template
literals, destructuring, `async/await`, modern matchers. Node runs them; the instance
never sees them. If the current project uses another local runner, follow its configuration
while keeping local-only specs separate from paste-ready ATF specs.
- **Paste-ready mock-library self-tests:** when a project intentionally keeps one under a
local-spec filename, preserve Jasmine 3.1 / ES5 and paste-clean behavior. Inspect the
project's rules and test configuration before changing its dialect.

## ATF step harnesses — server script vs UI test

ATF pastes your script into one of two step types; each injects its own harness. The dialect
rules above govern the **Run Server Side Script** step.

**Run Server Side Script** (Rhino, server-side — the default story gate). The step wraps the
paste and injects `outputs`, `steps`, `params`, `stepResult`, `assertEqual`. Two ways to
signal pass/fail:

- **jasmine form (default):** `describe`/`it`/
`expect`, then uncomment `jasmine.getEnv().execute();`. `describe` works **only in Global
scope**.
- **plain-script form:** `return true|false` to pass/fail, `assertEqual({ name, shouldbe,
value })` (throws + logs on mismatch), `stepResult.setOutputMessage(msg)` (call once — a
second call overwrites).
- **cross-step channel** (multi-step tests): set `outputs.foo = …` in an earlier step, read
it later via `steps(EARLIER_STEP_SYS_ID).foo`; `params` holds the run's parameter set. This
is how a produced `sys_id` reaches a later step — pass it through, never hardcode it.

**Run UI Test** (browser, client-side — for UI behavior no server script can prove). Use
modern browser JavaScript and the injected
`executeStep(screen, user, sn_atf, expect, waitFor, within, steps, params)` harness. Before
authoring or reviewing this step, read [`ui-testing.md`](ui-testing.md); it defines the
runner contract, query discipline, page-realm boundary, and completion gate. If the project
vendors the runner, inspect that implementation before relying on an undocumented helper.

## Live ATF diagnosis loop

Treat the latest run as the feedback loop; do not diagnose from an older result or from the
top-level message alone.

1. Query the newest `sys_atf_test_result` for the test, then query its
`sys_atf_test_result_step` rows ordered by `order`.
2. When the same script is used by several steps, identify the failure by the result item's
referenced Test Step `sys_id`. A shared `Line N` message does not identify which copy ran.
3. Inspect only the failing summary and bounded evidence. DOM dumps can expose users, roles,
session tokens, and unrelated page data.
4. Change one failing step first. After it passes and the next copy fails, propagate the
proven script to every equivalent step with its own cross-step IDs and inputs.
5. Save through the parent `sys_atf_step`, as Test Designer does, so parent validation,
description/cache Business Rules, timestamps, and Update Sync versioning all run. A direct
`sys_variable_value` write bypasses that lifecycle. For automation, set the parent input
(for example `grStep.inputs.script = value`) and update the parent. If a child write is
unavoidable, repair the parent before running the test. Prefer a constrained parent
update over Background Script: after confirming the test has no active run, toggle the
affected step `active=false` then immediately `active=true`, verify every step was
restored, and accept the extra intermediate version. If toggling is unsuitable,
force-update the parent with `setForceUpdate(true)`. Verify the resulting version either
way.
6. Read each live value back and compare it exactly with the substituted local source. A
successful update response proves the write, not payload equality. Also verify the newest
`sys_update_version` for `sys_atf_step_<sys_id>` was recorded after the change and its
payload contains the same input value.
7. Remove probe-only fields/logs, sync the clean source to every copy, and run the whole test
again. Green before cleanup is not the final gate.

**Contract target.** Assert the behavior named by the defect or requirement, not incidental
record lifecycle state. Business Rules can legitimately move a record between workflow
states while the tested status/output remains correct. Keep independent completion checks
that prove preceding UI actions actually committed.

## Mock vs ATF — which to write

| Script | Mock | ATF / instance run |
|--------|------|--------------------|
| Pure JS, touches no SN global | yes | no (adds nothing) |
| Touches real Glide (incl. early-draft DB code on a story branch) | yes (logic) | **yes (truth)** |
| Trivial one-liner / config-only | no | no — review by eye |

**Mock-green is NOT "done"** for: ACLs / `GlideRecordSecure`, business-rule / workflow
side effects, real field types / choices / dictionary defaults / auto-numbering,
`GlideDateTime` timezone/format, encoded-query **results**, and any rollback-excluded
table. Push these to ATF before ship.

**Scratch DB code:** default to ATF (rollback protects the instance); Background Script
only when data must persist or the target is rollback-excluded.

## ATF rollback

Writes to rollback-**excluded** tables survive the test. Common examples include
`sys_email*`, `syslog*` (including `gs.info`), `sys_number_counter`, and
`sys_schema_change`; verify the target table's rollback behavior on the instance.

- Script writes to an excluded table → **flag it in the test header comment** (e.g.
`// NOTE: writes sys_email — NOT rolled back`), then guard-in-test-mode or
accept-and-document the leak.
- Async side effects (events, scheduled jobs, async business rules) may fire after
rollback — treat as "may leak," verify on instance.

## The ship gate

For an instance-bound artifact, verify every applicable layer selected by its behavior:

1. **Mock (local runner)** — required whenever the decision table calls for Mock (logic
verification for pure JS or Glide-touching scripts using the project's test command).
2. **ATF (instance)** — required whenever the decision table calls for ATF (real Glide
behavior, ACLs, DB/schema truth, rollback verified). Pure JS without SN globals and trivial
one-liners/config-only do not require ATF.
3. **Run UI Test (ATF browser runner)** — required for browser UI behavior no server script can
prove (per [`ui-testing.md`](ui-testing.md)).
4. **Bruno (HTTP client layer)** — mandatory for all Scripted REST endpoints (proves HTTP
status, wire serialization, and error envelopes over HTTP; mock and ATF remain conditional by
behavior).
5. Self-review vs Code Review Priorities — correctness → security → performance. (checklist)
6. Style/lint — ES mode plus the current project's artifact and lint conventions. (checklist)
7. Performance sanity — queries checked against realistic row counts on instance, not just
seeded mock data. (checklist)

## Bruno — the HTTP contract layer (REST endpoints) — mandatory

**Mock proves logic, ATF proves instance, Bruno proves the HTTP contract.** Every Scripted
REST endpoint **must** have a Bruno request in its per-API collection — a **mandatory** layer
alongside whichever mock/ATF layers the endpoint requires per the decision table, never
optional or deferred.

- **Where:** inspect the current project's Bruno configuration and collection layout. Keep
one collection per API and one `.bru` request per endpoint/behavior (happy path plus each
error/edge); follow the project's ordering convention.
- **What to assert:** the **wire contract** a real client sees — HTTP status, `content-type`,
and the response envelope. Unless the current project documents another contract, success
is `{ result: … }` / `{ result: […] }` with no top-level `status`; errors are
`{ error: { message, detail[, errors] }, status: 'failure' }`, with `errors[]` only on
validation 400s. Also assert streamed mid-failure behavior and pagination/ETag headers
where relevant.
- **Why distinct from ATF:** ATF runs *inside* the instance (Rhino, server-side); Bruno hits
the endpoint *over HTTP as a client*, so it is the only layer that proves the actual
serialized wire shape, content negotiation, and status line.
- **Keep it green with the contract:** when an endpoint's response shape changes, update its
`.bru` assertions in the same slice — a contract change with stale Bruno tests is unfinished.

## Spec-file layout

Inspect the current project's package/config/layout first, then co-locate or place specs
according to its established convention. Generic example names:

- `<artifact>.spec.js` — **local mock spec.** Use the project's configured module-loading and
mock setup. Local-only, never pasted.
- `<artifact>.atf.spec.js` — **server ATF spec.** No local imports or mocks; include the code
under test and test data. Jasmine 3.1 / ES5, copy-paste ready for `Run Server Side Script`.
- `<artifact>.ui.atf.spec.js` — **UI ATF spec.** Copy-paste ready for `Run UI Test`; follow
[`ui-testing.md`](ui-testing.md). Ensure the current lint configuration treats UI ATF
separately from server ATF.

### Making a source file importable (paste-safe)

For an artifact that must paste whole into the instance, keep the source free of
`import` / `export` / `module.exports`. Follow `core.md` and the current project's existing
test seam. If that seam is a guarded global attachment, keep it harmless on the instance:

```javascript
// <artifact>.js — test-only exposure, guarded and harmless on instance
if (typeof globalThis !== 'undefined') { globalThis.setAttribute = setAttribute; }
```

When code touches an SN global (`GlideRecord`, `gs`, `GlideDateTime`, `GlideAggregate`,
etc.), load and configure the mock using the current project's installed package and test
setup. Install/reset it around each test according to that API. Pure JS logic that touches no
SN global needs no ServiceNow mock.

## ATF test data

Build the data you assert on; don't lean on existing records.

- **Create everything by default** — each test creates 100% of what it asserts on (existing
data varies per instance / parallel runs → flaky).
- **Don't create in rollback-excluded tables** (leaks) — reference existing/static, or
avoid.
- **Read-only OOB-static data** (e.g. `admin` role, base choices) may be referenced, not
created.
- **Create in-script** in the `Run Server Side Script` step (self-contained paste). Prefer
`GlideQuery`: `new GlideQuery('t').disableWorkflow().insert({...})`. Users via the
`Create a User` step/helper.
- **`disableWorkflow()` on arrange inserts; the act step runs with workflow on.**
- **Minimum real dependency graph** the logic touches — never build a whole CMDB for one
field.
- **Never hardcode a `sys_id`** — create it, use the returned id.
- **Assert by identity** — re-query by created `sys_id`; tag rows with a unique token
(`'ATF-' + <unique>`) + `setLimit`; never assert shared-table counts.
- **Arrange inline per test** (self-contained paste); factories only as a future
paste-time include, never a runtime `require`.