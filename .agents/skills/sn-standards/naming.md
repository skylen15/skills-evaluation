# naming

Portable naming defaults for artifacts that live in the instance — tables, fields, choice
values, roles, events, aliases, and catalog variables — where names become expensive to
change once other records key on them. Universal executable-artifact naming lives in
`core.md`.

## Scope

- **Covers:** the scoped-app prefix; custom table/column names; choice/state *values*; role
names; event names; Connection & Credential alias + integration-user names; catalog
variable / variable-set internal names.
- **Hands off:** **script identifiers** (`gr` prefix, `UPPER_SNAKE_CASE`, `camelCase`,
`PascalCase`, the `global.` prefix) → `core.md`;
choice/state value *semantics* (active/inactive threshold, naming values once as constants)
→ `data.md`; the role/ACL access *model* → `security.md`; event *dispatch/registration* →
`automation.md`; alias *wiring* + auth profiles → `integrations.md`; variable *behavior* and
server-side access → `catalog.md`.

## Rules

### Rule 1 — Let the platform prefix scoped artifacts; name the bare artifact, never hand-prefix the scope

Every artifact in a scoped application (tables, fields, scripts, config records) is
auto-prefixed with the namespace identifier `x_<company>_<app>`, and that prefix can't be
changed or removed. So name the **bare** artifact — `customer`, not
`x_acme_myapp_customer` — and let the platform qualify it. Hand-prefixing the scope yourself
double-stamps it and reads as a global-scope name (Rule 2) sitting in a scope it doesn't
belong to.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/application-development/c_NamespaceIdentifier.md` ("Scoped applications always start with an x\_ prefix"; the example values "generate a namespace identifier of x\_acme\_book\_rooms"; the identifier "cannot be changed or removed from application artifacts")

```
// DON'T — hand-stamp the scope onto a table in the x_acme_myapp scope
x_acme_myapp_customer // stored as x_acme_myapp_x_acme_myapp_customer — doubled

// DO — name the bare artifact; the platform prepends the namespace
customer // stored as x_acme_myapp_customer
```

### Rule 2 — In global scope, prefix custom tables and fields with `u_`; column internal names are lowercase snake and effectively immutable

A **global-scope** custom table or field carries no automatic namespace, so mark it
user-created with the `u_` prefix — it separates your columns from the out-of-box ones and
keeps upgrades from colliding with a future OOTB field of the same bare name. The internal
(column) name is lowercase `snake_case` and is effectively **immutable** once a script, ACL,
report, or integration references it — pick it once and relabel (not re-key) later. In a
**scoped** app you don't add `u_`: the `x_` namespace of Rule 1 already qualifies the field.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/application-development/building-a-data-model.md` ("Use clear, consistent prefixes for custom fields \(like u\_ for user-created fields\) and descriptive names"; "Custom tables are prefixed with your scope \(like `x_12345_myapp_customer`\)")

```
// DON'T — a global-scope custom field with no marker: collides with / masquerades as OOTB
caller_email

// DO — mark it user-created; lowercase snake; name chosen once
u_caller_email
```

### Rule 3 — A choice/state field's stored value is a stable machine token, distinct from its label — relabel freely, never re-value

The value written to the database is **not** the display label. Choose a stable token — a
lowercase `snake_case` string for a string choice, or a deliberate integer for a state field
(respecting the platform's active/inactive threshold) — and never rename it once records store
it, because business rules, encoded queries, and integrations key on the **value**, not the
label. Changing the label is free; changing the value silently breaks everything that filtered
on the old one. (The value *semantics* — thresholds, naming the set once as frozen constants —
live in `data.md`; this rule owns only the stored string.)

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/platform-administration/c_BPForStateFieldChoiceValues.md` (state values are integers with fixed meaning — "Any state greater than or equal to **7** is assumed to be inactive… Use a negative value like **-1**… to add a new active-type of state"), `repos/ServiceNowDocs/markdown/application-development/building-a-data-model.md` ("Define standardized dropdown options to help ensure data consistency rather than allowing free text")

```
// DON'T — re-value an in-use choice to "tidy" it: every BR/query/integration keyed on the
// old value breaks silently
value: in_progress → value: active

// DO — keep the value stable; change only the label
value: in_progress (label "In Progress" → "Being Worked") // value untouched
```

### Rule 4 — Name roles `x_<scope>.<entity>.<action>`

A scoped role carries the `x_<scope>` namespace prefix (same identifier as Rule 1); past that,
name it for the **thing** it guards and the **capability** it grants — `x_acme.invoice.reader`,
`x_acme.invoice.editor`, `x_acme.invoice.admin` — matching the roles used in `security.md`. The
role/ACL access *model* (which role gates which operation) is `security.md`'s; this rule is
only the name.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/application-development/c_NamespaceIdentifier.md` (the namespace identifier is added to "configuration records", which includes roles)

```
// DON'T — an unscoped, capability-free role name
invoice_user

// DO — scope prefix + entity + action
x_acme.invoice.reader / x_acme.invoice.editor / x_acme.invoice.admin
```

- **Model judgment, low confidence:** the `.<entity>.<action>` shape and the
reader/editor/admin verb set are a global default, not a documented ServiceNow
naming standard — a strong default; the scope prefix is the only platform-enforced part.

### Rule 5 — Name events `x_<scope>.<table>.<past-tense-verb>`

An event name must match a row registered in the Event Registry before `gs.eventQueue` can
fire it (→ `automation.md`). Name it for **what happened**, past tense, dotted and
scope-qualified: `x_acme.incident.escalated`, `x_acme.request.submitted` (the names
`automation.md` already uses). The dotted segments read as *scope → source table → the thing
that occurred*.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/build-workflows/system-events/t_RegisterAnEvent.md` (an event must be registered before it can be queued)

```
// DON'T — present-tense, unscoped, table ambiguous
escalate

// DO — scope . table . past-tense verb (and register it first)
x_acme.incident.escalated
```

- **Model judgment, low confidence:** the `x_<scope>.<table>.<verb>` dotted shape is a global
default; the platform only requires that the queued name matches a registered event.

### Rule 6 — Name a Connection & Credential alias `x_<scope>.<target_system>`; run integrations as a dedicated `svc_<system>` user

Name the alias record for the **system it reaches**, scope-qualified — `x_acme.example_tickets`
(the alias `integrations.md` uses). Authenticate every inbound/outbound integration as a
**dedicated, non-human service account** named `svc_<system>` (e.g. `svc_workday`), never a
person's login — so its grants, sign-ins, and audit trail are attributable to the interface and
revocable without touching a real user. (Alias *wiring* + auth profiles → `integrations.md`;
the least-privilege table/field grants on that user → `security.md`.)

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/platform-security/connections-and-credentials/credentials-connections-alias.md` (an alias holds the connection + credential and resolves at runtime)

```
// DON'T — an alias named for the environment, integration running as a person
qa_alias + authenticates as jsmith

// DO — alias named for the target system; a dedicated service account
x_acme.example_tickets + authenticates as svc_example_tickets
```

- **Model judgment, low confidence:** the `x_<scope>.<target_system>` and `svc_<system>`
patterns are global defaults, not a documented naming standard.

### Rule 7 — Give a catalog variable a lowercase-snake internal name, unique within its item; reference variables and variable sets by internal name

A variable's **internal name** is distinct from its question label — make it lowercase
`snake_case` and **unique across the whole item** (including its variable sets), because two
variables sharing a name collide and only one survives. Client and server scripts, and variable
sets, reference the **internal name**, not the label. (Variable *behavior* and server-side
access — `current.variables.<name>`, before-rule-only writes — are `catalog.md`'s.)

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/servicenow-platform/service-catalog/c_ScriptableServiceCatalogVariables.md` ("Creating two variables named computer\_speed would result in only one of them showing up"), `repos/ServiceNowDocs/markdown/servicenow-platform/service-catalog/t_CreateAVariableSet.md` (scripts "should refer to the internal name of a variable set")

```
// DON'T — two variables sharing a name (one silently wins), label used as the key
name: "cost_center" (twice, in the item and its variable set)

// DO — one unique lowercase-snake internal name per variable, referenced by that name
name: cost_center // current.variables.cost_center
```