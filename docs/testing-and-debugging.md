# Testing & Debugging Runbook (Fast Feedback Loop)

Operational runbook for testing strategies and the terminal-first debug-and-fix feedback loop for Now SDK Fluent applications, independent of instance web UIs or full CI pipelines.

---

## 1. Two-Tier Testing Strategy

| Tier | Scope | Command | Duration | When to use |
|---|---|---|---|---|
| **Tier 1: Local Unit Test** | Pure business logic, policies, validations, state transitions (`src/server/*.ts`) | `pnpm test` | ~120ms | Continuous local execution during business logic development; no network or instance required. |
| **Tier 2: Instance ATF Suite** | End-to-end integration, ACLs, Business Rules, database constraints on ServiceNow | `pnpm test:atf` | 30s – 2m | Run after deploying code to an instance or before opening a PR/merging. |
| **Tier 2b: Single ATF Test** | Run a single test case on the instance to isolate failures | `npx now-sdk cicd test run -a pdi-kl-o2 --test-name "<name>"` | 10s – 30s | Targeted debug/fix loops for an isolated failure without re-running the entire suite. |

---

## 2. Test Selection Criteria

1. **Use Unit Tests (`pnpm test`) when**:
   - Authoring or modifying score calculation (`recalculate-submission-score.ts`), approval state transitions (`submission-policy.ts`), or gate conditions (`take-pm-gate.ts`, `take-coe-gate.ts`).
   - Testing pure functions with zero `GlideRecord` or HTTP session dependencies.

2. **Use ATF Suite (`pnpm test:atf`) when**:
   - Verifying table access control (ACL query isolation, role checks).
   - Verifying Business Rules across database insert/update/delete operations (cascade delete, lock immutability).
   - Performing full application verification after `pnpm deploy` (or `now-sdk install`).

3. **Use Single ATF Test (`now-sdk cicd test run`) when**:
   - A specific test in the suite fails (e.g. `"Submission - Gate Progression"`).
   - Isolating and rapidly iterating on that single test until green.

4. **ATF Implementation Standards**:
   - When implementing or modifying ATF tests, always consult and follow the Now SDK `atf-guide` (`npx @servicenow/sdk explain atf-guide --format=raw`).
   - Use the appropriate category namespaces (`atf.server`, `atf.form`, `atf.rest`, `atf.uiTestScript`, `atf.list`, etc.).
   - Reconcile test cases with business logic changes: add tests for new logic, update tests when behavior changes, and delete obsolete tests when logic is removed.

---

## 3. Fast Feedback Loop (Local Debug & Fix)

The Fast Feedback Loop shortens failure triage cycles from minutes (waiting on full CI pipelines or navigating instance web forms) to tens of seconds by isolating errors and driving the entire loop from the terminal.

```
[1. pnpm test:atf]
        │
   (Failed?) ──► [2. Extract result-id from output]
                            │
                            ▼
                 [3. Inspect failure logs via CLI]
                     now-sdk cicd testsuite result --result-id <id> -a pdi-kl-o2
                     now-sdk cicd test logs --result-id <test_res_id> -a pdi-kl-o2
                            │
                            ▼
                 [4. Fix code in src/server/*.ts or src/fluent/*.now.ts]
                            │
                            ▼
                 [5. Verify local unit tests: pnpm test]
                            │
                            ▼
                 [6. Deploy patch to instance: pnpm deploy]
                            │
                            ▼
                 [7. Re-run isolated failing test: now-sdk cicd test run]
                            │
                      (Passed?)
                       ├── No  ──► Return to step 4
                       └── Yes ──► [8. Re-run full suite: pnpm test:atf]
```

### 8-Step Execution Procedure:

1. **Run full suite**:
   ```bash
   pnpm test:atf
   ```
   If the suite fails, the command exits with non-zero status and outputs `result-id` (sys_id of the test suite result).

2. **Extract `result-id`**:
   Copy the `result-id` value from the terminal output of step 1.

3. **Inspect failure details and logs**:
   ```bash
   # List test cases in the suite and get the sys_id of the failed test:
   npx now-sdk cicd testsuite result --result-id <result-id> -a pdi-kl-o2

   # Retrieve detailed logs for the failing test (replace <test-result-id> from above):
   npx now-sdk cicd test logs --result-id <test-result-id> -a pdi-kl-o2
   ```

4. **Fix code locally**:
   - Server logic errors: fix in `src/server/*.ts`.
   - Metadata / ACL / Business Rule configuration issues: fix in `src/fluent/*.now.ts`.

5. **Verify local unit tests**:
   ```bash
   pnpm test
   ```
   Ensure pure logic unit tests pass (~120ms).

6. **Deploy patch to instance**:
   ```bash
   pnpm deploy
   ```
   Build and install the patch directly to the target instance (`now-sdk install -a pdi-kl-o2`).

7. **Re-run the isolated failing test (fast iteration)**:
   Avoid re-running the entire suite; execute only the test under active debugging:
   ```bash
   npx now-sdk cicd test run -a pdi-kl-o2 --test-name "Submission - Gate Progression"
   ```
   If it still fails, repeat steps 4–7.

8. **Validate full suite**:
   Once the single test passes, run the full suite to verify no regressions:
   ```bash
   pnpm test:atf
   ```
