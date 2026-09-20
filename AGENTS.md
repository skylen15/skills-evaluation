## Agent skills

### Issue tracker

Issues and specs live as markdown files under `.scratch/<feature>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Canonical roles map 1:1 to tracker strings: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.

### Verify

Verify before calling work done: format, then lint, then typecheck, then test, then build. See `docs/agents/verify.md`.

### Testing & Debugging

For test execution strategy (unit test vs instance ATF), CLI log inspection, and the local fast feedback loop, see `docs/testing-and-debugging.md`. When implementing ATF tests, follow `atf-guide` via Now SDK (`npx @servicenow/sdk explain atf-guide --format=raw`).
