# anti-slop plugin provenance

Source repository: unknown. This copy was installed from the local `install-anti-slop` skill bundle at `~/.agents/skills/install-anti-slop/assets/anti-slop`. That skill directory is not a git checkout, so no source commit is available.

Installed snapshot identity:

- File count: 38 files under `tools/oxlint/anti-slop/` at install time, including this record.
- Content digest (SHA-256 of sorted relative paths and file bytes, excluding this file at copy time): `a4a6c446f6087467be6f519d4f0299d8789f2428f5c504cc5486efa896da2395`

Installed plugin paths:

- Generic: `./tools/oxlint/anti-slop/index.ts`
- Effect (copied, not registered): `./tools/oxlint/anti-slop/effect/index.ts`

Intentional deviations from the skill bundle:

- None in the copied plugin source.
- Effect rules are not enabled: this repository has no direct `effect` package-manifest dependency.

Nested vendor provenance for `require-readable-spacing` remains in `vendor/eslint-stylistic/UPSTREAM.md` (ESLint Stylistic commit `435c3ea0fd26a5fef9042c4b36b6e165fbbf8d08`).
