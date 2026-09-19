# Executable artifact baseline

Portable defaults for writing or reviewing executable ServiceNow artifacts.

## Runtime and header

- Match the artifact's actual engine and use one JavaScript style throughout. Server-side
scripts default to ES5 Rhino unless the target is confirmed to support another mode.
Classic UI uses ES5-era browser JavaScript; UI Builder may use modern JavaScript.
- Start each artifact with a header whose values describe the real target:

```javascript
// Type: Fix Script
// Target table: sn_compliance_control
// ES mode: ES5 (Rhino)
// Script context: current, result, target
```

Include `Script context` only when the platform injects globals the artifact uses.
- Wrap standalone scripts in an IIFE.

## Identifiers and platform values

- Name GlideRecord variables `gr*`, constants `UPPER_SNAKE_CASE`, variables and functions
`camelCase`, and constructors `PascalCase`.
- Read string values with `gr.field.toString()`. Use `getValue()` when null and empty must
remain distinct.
- Normalize platform booleans with `value === '1' || value === 'true'`.
- Write field values with `setValue()`.
- Declare Script Include references per file with `/* global Name */`; keep shared global
declarations narrow.

## Queries

- Prefer `GlideQuery` and `Stream`. When `GlideRecord` is necessary, state the reason.
- In scoped applications, prefix global Script Includes such as `global.GlideQuery`,
`global.Stream`, and `global.Optional`; do not prefix platform APIs.
- Bound reads: use `selectOne()` or `setLimit(1)` for one row, `.limit(n)` or `setLimit(n)`
for N rows, and `GlideAggregate` for counts.
- Keep queries out of loops and dot-walk sparingly.

## Logging

- Use the level matching the event: `gs.info`, `gs.warn`, `gs.error`, or `gs.debug`.
- Use one parameter array and place `[Source]` in `{0}`.
- Mark temporary logs `[TMP]` and remove them before completion.

## Grounding and live-instance safety

- Check ServiceNow documentation before changing platform behavior. Record the consulted
topic as `Docs checked: sn-docs (<topic>)` when that convention is available. If the
documentation is unclear, consult another local source or flag a conservative assumption.
- Use live `sn` CLI reads for instance-specific schema, configuration, data, choices, roles,
indexes, and existing code. Read instead of guessing.
- Learn CLI flags from `sn <group> <leaf> --help`.
- Read operations such as `sn table query|schema|config` and `sn script search` may be run
directly. Before `sn record create|update|delete`, `sn batch update|delete`, or
`sn script run`, show the exact payload or script and obtain explicit approval.
- Confirm the current live state immediately before every write.