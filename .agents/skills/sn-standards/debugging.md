# debugging

How to debug server/client scripts and keep an instance's logs and queues healthy. Use
the logging baseline in `core.md`. This file owns the workflow around that baseline:
turning debug on/off safely and reading the logs and queues that reveal a script
misbehaving.

## Source & trust

Distilled from the **Debugging Best Practices** and **Logs and Queues Best Practices**
sections of the ServiceNow Technical Best Practices (TPB) guide —
[developer.servicenow.com](https://developer.servicenow.com/dev.do#!/guides/australia/now-platform/tpb-guide/scripting_technical_best_practices).
**Trust: Official guidance** (Tier 1, developer-portal remote, not local `sn-docs`).
Universal logging conventions belong in `core.md` and are not repeated here.

## Debugging

### Gate debug output behind a property, not commented-out lines

The maintainable way to debug server script is `gs.debug()` calls guarded by a per-artifact
system property, so you flip debugging on/off **without editing code in production** and each
Script Include debugs independently. A Script Include reads its property once in
`initialize()` and a private `_debug()` helper checks the flag before emitting:

```javascript
initialize: function () {
this.debug = gs.getProperty('debug.MyUtil') === 'true';
},
_debug: function (msg) {
if (this.debug) { gs.debug('{0} {1}', ['[MyUtil]', msg]); } // core.md [Source] array
}
```

`gs.isDebugging()` also reports whether session debugging (or the scoped debug property) is
on. Note `gs.print()` / `gs.log()` don't exist in scoped apps anyway — `gs.debug/info/warn/
error` work in both scopes; follow the `core.md` logging baseline in either scope.

### Use the platform debug modules, not `addInfoMessage` spray

Search `debug` in the nav filter for the debugging modules. The load-bearing ones:

- **System Diagnostics > Debug Log** — shows `gs.debug()` / `gs.info()` output inline with
the record you're debugging.
- **System Diagnostics > Debug Business Rule** — which BRs ran (`==>` started, `<==`
finished, `===` skipped, with the failed condition).
- **System Security > Debug Security Rules** — per-field ACL read/write debug icons; the
tool for ACL work (`→ security.md`).

Avoid `gs.addInfoMessage()` / `gs.addErrorMessage()` for debugging — they surface to *other*
users on unrelated records and confuse code reviews/demos.

### Client-side: `jslog()`, never `alert()`

Turn on **JavaScript Log and Field Watcher** (banner settings → Developer). `jslog()` writes
to that log, consumes no disk, and is safe to leave enabled; `alert()` interrupts the user
and tends to get left in. Check the browser console too — Chrome/Firefox surface errors that
appear nowhere else. (Client scripting rules → `client.md`.)

### Service Portal / external-user ACL debugging

The Debug Output panel doesn't render in Service Portal. To debug ACLs as an external user:
grab the target page URL from the internal UI first, then impersonate the external user and
open that URL in a new browser — the graphical ACL Debug Output shows at the bottom (it still
never bypasses real ACLs / before-query BRs).

### Turn debugging OFF before you ship

Server-side debugging persists until Stop Debugging, logout, session timeout, or browser
close — so before completing a release or production test, set every
`debug*` system property to `false` (**System Security > Stop Debugging** kills active
sessions). This is the other half of why debug is property-gated: disabling is one edit, not
a code change. Remove temporary debug lines before release according to `core.md`.

## Logs and queues

Goal: **zero error/warning log entries** — each is either fixed or documented as a known
issue. Review as you build, not at the end.

### Warnings, errors, and the log file

- **System Logs > System Log > Warnings / Errors** (or **All**, filtered `Level is Warning
OR Error`). Sort by Created desc, add the *Created by* and *Source* columns to trace who/
what produced each.
- **System Logs > Node Log File Download / Browser** — a sudden size jump means excess
errors, debug left on, or a new plugin. Scan downloaded logs for the red-flag phrases:
`Slow evaluate`, `Slow Business Rule`, `Recursive Business Rule` (often a `current.update()`
in a before/after BR → `automation.md` Rule 2), `Compiler exception`,
`Warning - large table limit`, `Extremely large result` (usually a query returning too
many rows → `data.md`).

### Slow SQL

**System Diagnostics > Slow Queries** logs statements over ~1s; use *Total Execution Time* +
*Example* to find the offending script, then fix the query (index / selectivity /
chunking → `data.md` Rule 4). Execution time for events, mutex locks, scripts, and
transactions is visible here too.

### Queues

- **Email:** inspect **System Mailboxes** (Inbox/Outbox/Junk) to confirm notifications flow.
- **ECC Queue** (**ECC > Queue**, filter `Queue is output` + `State is ready`): records
older than ~4 minutes in `ready` mean the MID Server isn't picking up — check it's running/
communicating, restart and read its logs if needed. (MID Server behaviour →
`integrations.md` Rule 4.)

### Event log hygiene

**System Logs > Events** (or **System Policy > Events > Events Log**): sort *Processing
duration* desc to find slow handlers (an email notification taking multiple seconds is
wrong; a script action taking ~1s may be fine). Watch the unprocessed count (filter
`Processed is Empty`) — a steadily *rising* backlog means events aren't processing.
**Remove unused events:** group the list by Name; an event fired en masse (e.g. from a
100k-row import) with no notification/script action responding to it is pure overhead —
disable the BR or drop the `gs.eventQueue()` call that logs it (event decoupling →
`automation.md` Rule 6).