# Playwright for UI acceptance tests and 3-tier verification

UI acceptance testing migrates from ServiceNow Automated Test Framework (ATF) client test steps to Playwright 1.61.1, establishing a 3-tier testing model:
- **Tier 1 (Local Node)**: Unit tests (`pnpm test`) verify pure business logic, calculations, and state machine policies (~120ms, zero network dependency).
- **Tier 2 (Instance ATF Server)**: Fluent ATF tests on the instance verify database constraints, Business Rules, cascade deletes, and query isolation ACLs (`atf.server.*`), leveraging native JVM rollback (`sys_atf_rollback`).
- **Tier 3 (Playwright E2E UI)**: Playwright 1.61.1 (`pnpm test:e2e`) drives real browser sessions against the Classic/Polaris UI (`#gsft_main` iframe) for complete user acceptance journeys (Member submit, PM gate review, CoE gate review, and UI action controls).

Playwright manages Member, PM, and CoE Head personas under a single Admin credential using ServiceNow's native impersonation endpoint (`POST /api/now/ui/impersonate/{sys_id}`) with session CSRF token (`X-UserToken: window.g_ck`), exporting isolated session states to `.auth/{member,pm,coe}.json`. Test data lifecycle uses explicit API teardown hooks via ServiceNow Table API. The legacy Fluent UI ATF tests (`submission-member-journey-atf.now.ts` and `submission-reviewer-journeys-atf.now.ts`) are decommissioned.
