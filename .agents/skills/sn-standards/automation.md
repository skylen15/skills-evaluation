# automation

Server-side automation design judgment.

## Scope

- **Covers:** Business Rules (before/after/async/display, `Order`, recursion guards),
System Events (`gs.eventQueue`), Scheduled Jobs, and the Flow-Designer-vs-script
decision — the automation layer that fires server-side logic in response to data
or a schedule.

## Defaults

- Default to **Flow Designer** for new automation; use a Business Rule or script only
for the exceptions in Rule 7.
- Follow `core.md` for logging and query APIs. Add a structured logger only when explicit
current-project requirements call for one.
- The `GlideRecord` examples below mirror platform documentation and the
`current`/`previous` Business Rule globals; they do not override the query defaults in
`core.md`.

## Rules

### Rule 1 — Pick Business Rule timing by intent, not habit

Use **before** to set/validate fields on the record being saved; **after** to touch
*other* records, fire events, or sequence follow-on work; **async** when the work can
finish later off the user's transaction; **display** only to hand server data to the
client via `g_scratchpad`.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/application-development/business-rules-and-script-includes.md`

```javascript
// DON'T — after rule that mutates current; the row is already committed, change is lost
(function executeRule(current, previous) {
current.setValue('priority', 1); // silently discarded in an "after" rule
})(current, previous);

// DO — set fields on the record in a BEFORE rule (saved with the operation)
(function executeRule(current, previous) {
if (current.impact.toString() === '1') {
current.setValue('priority', 1);
}
})(current, previous);
```

### Rule 2 — Never call `current.update()` in a Business Rule; guard recursion

A `current.update()` triggers another insert/update pass on the same table → the rule
calls itself. Before-rule changes are saved automatically; after rules should update
*related* records, not `current`.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/build-workflows/business-rules-classic/c_BusinessRules.md`

```javascript
// DON'T — re-saves current, re-fires this rule → recursion the platform must kill
(function executeRule(current, previous) {
current.setValue('u_count', current.u_count + 1);
current.update(); // never in a BR
})(current, previous);

// DO — let a BEFORE rule's changes save themselves (no update() call at all)
(function executeRule(current, previous) {
current.setValue('u_count', parseInt(current.u_count.toString(), 10) + 1);
})(current, previous);

// DO — when you must write a DIFFERENT record from an AFTER rule
(function executeRule(current, previous) {
var grParent = new GlideRecord('incident');
if (grParent.get(current.parent.toString())) {
grParent.setValue('u_child_changed', 'true');
// setWorkflow(false) is use-case dependent: it suppresses the target's BRs,
// flows and notifications. Use it to avoid an unwanted cascade or recursion;
// LEAVE IT OFF when those side effects are exactly what should fire.
grParent.setWorkflow(false);
grParent.update();
}
})(current, previous);
```

### Rule 3 — Wrap the script in a function so variables don't bleed across `Order`

User-defined `var`s in a Business Rule are globally scoped across every BR in the
transaction. A later-`Order` rule can see (and clobber) an earlier rule's variable.
Wrap the body in a function — which the standard BR `executeRule` shell already does.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/build-workflows/business-rules-classic/c_BusinessRules.md` (variable scoping)

```javascript
// DON'T — bare top-level var leaks to every later-Order BR in this transaction
var grDup = new GlideRecord('incident');
grDup.query();

// DO — wrap so the var is local to this rule
(function executeRule(current, previous) {
var grDup = new GlideRecord('incident');
grDup.query();
})(current, previous);
```

### Rule 4 — Keep the Business Rule thin; put real logic in a Script Include

The BR is a condition check plus a call. Reusable logic lives in a Script Include so it
can be called from a UI Action, Scripted REST, or Scheduled Job — and tested in
isolation.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/application-development/business-rules-and-script-includes.md` (Script Includes for reuse)

```javascript
// DON'T — multi-step logic inlined in the BR, untestable and unreusable
(function executeRule(current, previous) {
var grTask = new GlideRecord('sc_task');
grTask.addQuery('request_item', current.sys_id);
grTask.query();
while (grTask.next()) {
grTask.setValue('state', 3);
grTask.update();
}
})(current, previous);

// DO — thin BR delegating to a Script Include
(function executeRule(current, previous) {
new global.RequestItemTasks().closeOpenTasks(current.sys_id.toString());
})(current, previous);
```

### Rule 5 — Always set a condition and filter to the operations you need

A condition-less Business Rule fires on every operation on the table — wasted work and
a debugging hazard. Constrain *when* (condition) and *what* (insert/update/delete/query).

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/application-development/business-rules-and-script-includes.md` (always use a condition)

```javascript
// DON'T — no condition; body runs on every save then bails (still ran the query)
(function executeRule(current, previous) {
if (current.state.toString() !== '6') { return; }
// ... work
})(current, previous);

// DO — gate in the BR's Condition field (e.g. current.state.changesTo('6')) so the
// script only runs when it should; keep the body to the actual work
(function executeRule(current, previous) {
new global.IncidentClosure().onClose(current.sys_id.toString());
})(current, previous);
```

### Rule 6 — Decouple side effects with `gs.eventQueue`; register the event first

For non-blocking side effects (notifications, integrations, metrics), queue an event and
let a Script Action / notification respond. The Business Rule stays a thin detector.
Register the event in the Event Registry before queuing it.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/api-reference/server-api-reference/c_GlideSystemScopedAPI.md` (`eventQueue`), `repos/ServiceNowDocs/markdown/build-workflows/system-events/t_RegisterAnEvent.md`, `repos/ServiceNowDocs/markdown/build-workflows/system-events/events.md`

```javascript
// DON'T — heavy/outbound work inline in an after rule blocks the user's save
(function executeRule(current, previous) {
new global.SlackNotifier().postIncident(current); // outbound HTTP on the transaction
})(current, previous);

// DO — queue a (registered) event; a Script Action handles it off-transaction
(function executeRule(current, previous) {
gs.eventQueue('x_acme.incident.escalated', current, current.priority.toString(), gs.getUserID());
})(current, previous);
```

### Rule 7 — Default to Flow Designer; write a Business Rule only on a documented exception

Prefer Flow Designer for new automation. Reach for a Business Rule / script **only when**
the logic must run in a
specific sequence with other Business Rules, must run in-thread immediately
before/after the DB write, or only calls a Script Include. When an exception applies,
the rest of this file governs the BR you write; otherwise build the Flow. Record *why*
a Business Rule was chosen over a Flow.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/application-development/flow-designer.md`

```javascript
// DON'T — a multi-step approval+notification orchestration crammed into one BR
// (no sequencing need, no in-thread DB dependency) — that's Flow's job
(function executeRule(current, previous) {
var grApproval = new GlideRecord('sysapproval_approver');
grApproval.initialize();
grApproval.setValue('document_id', current.sys_id.toString());
grApproval.insert();
gs.eventQueue('x_acme.request.submitted', current, current.requested_for.toString());
new global.RequestRouter().assignFulfillmentGroup(current.sys_id.toString());
})(current, previous);

// DO — keep in a Business Rule when an exception applies: here, ordered field
// defaulting that must run in-thread before the insert is committed
(function executeRule(current, previous) {
if (current.short_description.nil()) {
current.setValue('short_description', 'Auto-created: ' + current.number.toString());
}
})(current, previous);
```

### Rule 8 — Keep Scheduled Jobs thin; delegate to a Script Include

A Scheduled Job runs work on a timer or from a script/BR. Keep the job record's script a
thin call into a Script Include (testable from a background script, reusable by a
"run now" action) — the same thin-wrapper rule as Business Rules.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/platform-administration/time-configuration/c_ScheduledJobs.md`

```javascript
// DON'T — full cleanup logic inlined in the job's script field (untestable, unreusable)
var grOld = new GlideRecord('incident');
grOld.addEncodedQuery('active=false^sys_updated_onRELATIVELT@dayofweek@ago@365');
grOld.query();
while (grOld.next()) { grOld.deleteRecord(); }

// DO — thin job delegating to a Script Include
new global.IncidentCleanup().purgeClosedOlderThanDays(365);
```

- **Model judgment, low confidence:** clearing the Scheduled Job's `run_as` field can
avoid coupling execution to a possibly deactivated user, and keeping the job script to
roughly five lines reinforces the thin-wrapper rule. This was not found in local
`sn-docs`; verify the execution-context behavior on the target instance before relying
on it.