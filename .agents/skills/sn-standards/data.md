# data

Data-model design decisions that generated code routinely gets wrong.

## Scope

- **Covers:** choice & state field design (value-not-label, the active/inactive
threshold), the **field-value strategy** (default vs calculated vs derived/dot-walked
and which to reach for), **Database Views** (read-only join semantics, when a view beats
a reference + dot-walk, view ACL precedence), and **large-table performance** (indexes /
Slow Queries, filter selectivity, chunking long jobs).
- **Does NOT cover (and the boundary):**
- **Security** of the data path (ACL *design*, row-level visibility, `GlideRecordSecure`
bypass) belongs to **`→ security.md`**, not here — this file touches view ACLs only as a
data-modelling consequence.

## Rules

### Rule 1 — Choice/state fields: store the value, never renumber it, respect the active/inactive threshold

Three rules govern a choice/state field:

- **Store the value, not the label.** A choice/state field stores its integer **value**, not
its display label, so code and queries must test the value.
- **Never renumber an existing value.** Repurposing or renumbering a value silently rewrites
the meaning of every stored record and every script that filters on it — add a *new* value
instead.
- **Respect the active/inactive threshold.** On Task-derived (and Task-convention custom)
tables the value also decides active/inactive: values at/above the table's threshold are
inactive, so a new **active** state uses a **negative** value and a new **inactive** state
uses a value above the threshold.

Across all three: name the values once (a frozen-constants Script Include) and reference
those — never a literal number or label — and drive close/deactivate behaviour through the
`close_states` / `default_close_state` dictionary attributes (consumed by `TaskStateUtil`),
not a hardcoded state number.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/platform-administration/c_BPForStateFieldChoiceValues.md`

```javascript
// DON'T — filter on the label, and hardcode a magic close-state number.
grTask.addQuery('state', 'Closed'); // 'state' stores 7, not the text 'Closed'
if (grTask.state == 7) { /* ... */ } // breaks the moment the state model changes

// DON'T — reuse value 3 for a new meaning. Every old record that stored 3, and every
// script testing == 3, now means something different. Add a NEW value instead.

// DO — name the values once (a frozen-constants Script Include / UPPER_SNAKE_CASE map),
// so no literal state number or label is ever scattered through scripts:
var TASK_STATE = { RESOLVED: '6', AWAITING_VENDOR: '-1', ARCHIVED: '8' };
// new ACTIVE state -> negative value (stays active)
// new INACTIVE state -> value at/above the inactive threshold
// and let TaskStateUtil close via the close_states dictionary attribute (set on the
// dictionary, not as a literal in code).
if (grTask.state.toString() === TASK_STATE.RESOLVED) { /* specifically Resolved */ }
```

### Rule 2 — Put a value where its lifecycle says it belongs: default = seeded once, calculated = always recomputed, derived = never stored

Three mechanisms fill a field and they are **not** interchangeable. A **default value** is
applied once for a new record and is *not* recomputed on update — so a default is for a
seed value the user may then edit, never for deriving from other fields (on a new-record
form `current` is mostly empty, so a default that reads another field saves a blank that
sticks). A **calculated** field (dictionary *Calculated* flag) recomputes on every insert
and update and renders read-only — use it for a value that is always a pure function of
this record's own fields. A **derived / dot-walked** field reads live through a reference
and stores nothing — prefer it over a custom field that just copies a referenced value.

*Decision shortcut (Model judgment, low confidence): value computed from this record's own
fields, always current → Calculated; value that lives on a referenced record → derived /
dot-walked (don't create a column); seed value the user can change → Default.*

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/platform-administration/table-administration-and-data-management/r_DictionaryEntryForm.md`

```javascript
// DON'T — use a Default Value to derive from another field.
// Default value (javascript:): current.caller_id.email
// On the new-record form current.caller_id is empty -> saves '' -> never recomputed.

// DON'T — script a Business Rule to copy a referenced value into a stored column
// just to display it (storage + sync logic for something always available live).
(function executeRule(current) {
current.setValue('u_caller_email', current.caller_id.email); // mirror field, drifts
})(current);

// DO — pick the mechanism by lifecycle:
// * always a function of THIS record's fields -> Calculated field (auto-recomputed)
// * value lives on the REFERENCED record -> dot-walked field on the form layout
// (caller_id.email — zero storage)
// * editable seed value -> Default value
```

### Rule 3 — Build a Database View only when a reference + dot-walk won't do; it is read-only, gets heavier per joined table, and its ACLs override the source tables'

A Database View joins tables for **reporting** and its output is **read-only** — you cannot
insert or update through it. Before building one, check whether a reference field + a
dot-walked column already answers the question; it usually does and is far cheaper. When a
view is genuinely warranted, keep its `where` clauses on **indexed** fields (performance
degrades as joined tables and row counts grow) and remember its **ACL precedence**: if the
view has its own ACLs they take precedence; with none, the underlying table ACLs apply by
default — so a view can change who sees the joined data.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/platform-administration/table-administration-and-data-management/c_DatabaseViews.md`

```javascript
// DON'T — build a Database View to read one field off a referenced record,
// then try to write through it.
var grView = new GlideRecord('dv_incident_caller');
grView.get(someId);
grView.setValue('caller_name', 'x');
grView.update(); // no-op: a database view is read-only, nothing is written

// DO — for a single referenced value, just dot-walk (no view, no storage):
var callerName = grIncident.caller_id.name.toString();
// Reserve a Database View for genuine cross-table REPORTING that dot-walking can't do,
// join/where on indexed fields, and give it explicit read ACLs so view access is deliberate.
```

### Rule 4 — On a large table, make queries index-friendly and chunk long jobs

Apply the universal query hygiene in `core.md`; once a table is large, also make queries
index-friendly and chunk long jobs. If a
query filters or sorts a large table on an **unindexed** field (especially one showing up
in *Slow Queries*), request a database index — and **schedule** its creation, because
indexing a large table is itself impactful and can run an hour or more. Order a query's
conditions **most-selective / indexed first** so an expensive `CONTAINS`/`LIKE` runs on a
smaller candidate set. And never process tens of thousands of rows in one unbounded
transaction — **window** the work into bounded batches so a failure loses one window, not
the whole run.

*Filter ordering and job-chunking are practitioner judgment (Model judgment, low
confidence); the index-on-large-table cost and the Slow Queries / Index Suggestion path
are grounded below.*

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/platform-administration/table-administration-and-data-management/t_CreateCustomIndex.md`, `repos/ServiceNowDocs/markdown/platform-administration/platform-performance/create-index-slowquery.md`

```javascript
// DON'T — run an unindexed CONTAINS across a huge table in one unbounded pass.
var grInc = new GlideRecord('incident');
grInc.addQuery('short_description', 'CONTAINS', 'vpn'); // unindexed text scan
grInc.addQuery('active', true); // selective filter buried after
grInc.query();
while (grInc.next()) { /* ... 200k rows in one transaction ... */ }

// DO — selective/indexed condition first, and window the work into bounded batches:
var BATCH = 1000;
var lastId = '';
var more = true;
while (more) {
var grIncident = new GlideRecord('incident');
grIncident.addQuery('active', true); // indexed/selective first
grIncident.addQuery('short_description', 'CONTAINS', 'vpn'); // costly filter on fewer rows
grIncident.addQuery('sys_id', '>', lastId); // cursor = last processed sys_id
grIncident.orderBy('sys_id');
grIncident.setLimit(BATCH);
grIncident.query();
more = false;
while (grIncident.next()) {
more = true;
lastId = grIncident.getUniqueValue();
// ... process one row ...
}
}
// For a query that's chronically slow on an unindexed field, request a scheduled index
// (System Diagnostics > Index Suggestions) rather than living with the table scan.
```