# Maintaining the sn-standards skill

Read this file only when changing the skill itself.

## Authoring convention

- Keep `SKILL.md` as a compact router. Its description carries distinct invocation branches;
its table sends each branch to every matching file and no others.
- Put universal executable-artifact rules in `core.md`. Put area-specific judgment in the
corresponding area file without repeating the baseline.
- Keep each rule in one authoritative location. Prefer direct, positive instructions and
examples that pair `// DON'T` with `// DO` in one fence.
- Preserve portability: runtime prose describes ServiceNow behavior and override semantics,
not repository paths, people, package commands, ticket workflow, or project history.
- Treat explicit project instructions and ADRs as higher precedence than global defaults,
and require unresolved conflicts to be surfaced.

## Sources and credit

The area's structure and practitioner judgment were mined from
`bikemeardsley/GlideGrail.md` (CC-BY-4.0) as a judgment-layer reference. Rules are written
in this skill's own voice and grounded in ServiceNow documentation; no source text is copied
verbatim.

## Citation maintenance

- Ground product and API facts in `sn-docs`; use live `sn` CLI reads only for
instance-specific facts.
- Keep each rule-bearing area's `Docs checked: sn-docs — <source>` proof line aligned with
the facts it supports. Update or remove the proof when those facts change.
- After changing files with local citations, verify that every cited
`repos/ServiceNowDocs/markdown/...` path exists in the local `sn-docs` corpus
(at `<sn-docs-skill-directory>/repos/ServiceNowDocs/markdown/` or
`../sn-docs/repos/ServiceNowDocs/markdown/`). Check each cited markdown path directly on the
filesystem; all cited paths must resolve to valid files in the corpus.
- Procedural guidance need not carry a forced proof line when it makes no product/API claim;
cite the governing source when one exists.
- Preserve attribution and license information when reorganizing or rewriting derived
judgment.
- Keep maintenance rationale, migration notes, and source history here rather than in
runtime files.