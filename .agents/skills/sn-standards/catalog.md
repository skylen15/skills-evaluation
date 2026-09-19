# catalog

Portable Service Catalog / Request defaults for which artifact creates what, where variable
logic belongs, and how a catalog form differs from an ordinary form. Universal
executable-artifact rules live in `core.md`.

## Scope

- **Covers:** the item-vs-record-producer choice and the request data shape
(`sc_request` → `sc_req_item` → `sc_task`), variables (types, order, mandatory,
reference qualifiers, Read/Write/Create roles), variable sets and MRVS (including set-level
role override), catalog client scripts / UI policies (the seam against ordinary form scripts),
server-side variable access, and the fulfilment-engine choice. Order guides are a Note.
- **Hands off:** the shared browser-client discipline — `g_form`, UI-policy-over-script,
async GlideAjax, unsupported globals, `g_scratchpad` — → `client.md` (this file owns only
the catalog-specific *divergences*); the generic Flow-vs-BR-vs-script call and the
thin-wrapper Script Include principle → `automation.md`; table- and record-level ACLs
→ `security.md`; variable / variable-set **naming** convention → `naming.md`.
- **Orientation:** a catalog **item** is ordered from a catalog and produces a **requested
item** (RITM) under a **request** (REQ), fulfilled through **catalog tasks** (`sc_task`); a
**record producer** is a catalog item that instead creates a task-based record directly on a
target table. That shape frames the rules below.

## Rules

**ES assumption for the examples below:** catalog **client** scripts are browser JS (match
`client.md`'s classic-UI target); record-producer / server-side variable scripts are ES5-safe
Rhino. Never mix ES styles in one artifact.

### Rule 1 — Choose by what gets created: catalog item for a requested-item + fulfilment process, record producer for a task-based record

Use a **catalog item** when the request needs the standard request / approval / fulfilment
process — it creates an `sc_req_item` (RITM) under a parent `sc_request` (REQ). Use a **record
producer** when the user should directly create a **task-based** record (incident, change,
custom task table) from the catalog. Do **not** use a record producer to create requested-item
records — that skips the standard catalog processes (workflows don't initiate as expected).

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/servicenow-platform/service-catalog/c_RecordProducer.md` ("A record producer is a specific type of catalog item that allows end users to create task-based records… do not create requested item records from record producers. Instead, create requested item using catalog items… Use a record producer to create task-based records only."), `repos/ServiceNowDocs/markdown/application-development/app-engine-studio/record-producer-vs-catalog-item.md` (catalog item = "predefined approval and qualification process exists")

```javascript
// DON'T — a record producer that creates a requested item: bypasses the REQ/RITM/approval
// process the catalog is built to run
// record producer → target table sc_req_item // wrong tool for this job

// DO — pick by the record you need:
// needs approval / fulfilment / a RITM → Catalog Item (creates sc_req_item under sc_request)
// user creates an incident/change/task → Record Producer (writes that task-based table)
```

### Rule 2 — Populate a record producer by variable-name match, template, or script — and never call `update()`, `setAbortAction`, or set `sys_class_name` on `current`

Map data onto the produced record by (a) naming a variable the same as the target field,
(b) a template for static values, or (c) a script using `current.<field>` and
`producer.<variable>`. A **Post insert script** runs after the record is inserted and
overrides both the target-record values and the template. In any record-producer script,
do **not** call `current.update()`, `current.setAbortAction()`, or set `current.sys_class_name`
— the platform already handles the insert, and these cause unexpected behaviour.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/servicenow-platform/service-catalog/c_PopulatingRecordData.md` ("Create a variable on the record producer with the same name as the field in the target record… Use current.FIELD_NAME to reference fields on the record being created. Use producer.VARIABLE_NAME to reference values entered by the end user."), `repos/ServiceNowDocs/markdown/servicenow-platform/service-catalog/record-producer-form.md` (Post insert script "operates on the submitted record, after the record is inserted… overrides the target record values and record producer template values"), `repos/ServiceNowDocs/markdown/servicenow-platform/service-catalog/c_RecordProducer.md` ("Do not call the update, setAbortAction method, or set the sys_class_name on current record")

```javascript
// DON'T — re-insert or abort from a record-producer script
current.short_description = producer.summary;
current.update(); // platform already inserts; this double-writes
current.sys_class_name = 'incident'; // reclassing current here breaks the produced record

// DO — set fields on current from producer variables and let the platform insert
current.short_description = producer.summary;
current.category = producer.category;
// (static defaults → a template; anything after insert → a Post insert script)
```

### Rule 3 — Know the request shape (REQ → RITM → `sc_task`) and never attach business rules to the internal option tables

One checkout creates one **request** (`sc_request`, REQ); each ordered item becomes a discrete
**requested item** (`sc_req_item`, RITM); fulfilment work is tracked as **catalog tasks**
(`sc_task`), and the Catalog Task workflow activity only exists for workflows running on
`sc_req_item`. Catalog-item variable values live in the internal **`sc_item_option`** table and
record-producer answers in **`question_answer`** — both are internal; do **not** add business
rules to them.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/servicenow-platform/service-catalog/c_RequestingAServiceCatalogItem.md` ("Each individual catalog item that is part of a request creates a discrete request item"), `repos/ServiceNowDocs/markdown/servicenow-platform/workflow-activities/r_CatalogTask.md` ("This activity is available only for workflows running on the Catalog Request Item [sc_req_item] table."), `repos/ServiceNowDocs/markdown/servicenow-platform/service-catalog/service-catalog-variable-editor.md` (option / question_answer tables "internal… you should not add any business rules to this table")

```javascript
// DON'T — hang logic on the internal option table (unsupported, brittle)
// Business Rule on sc_item_option { ... } // internal table — do not touch

// DO — put logic where the shape puts it:
// per requested-item logic → Business Rule / workflow on sc_req_item
// fulfilment work → catalog tasks (sc_task) from the workflow (Rule 8)
```

### Rule 4 — Variables: pick the most specific type, set an explicit Order, and make fields mandatory declaratively — not from a client script

Choose the most specific variable type (Reference, Date, Check box, Select box, …) over Single
Line Text — the platform ships ~25 types. Set an explicit **Order** on every variable (they
render least-to-greatest). Mark a truly required field **Mandatory** on the variable itself (or
a catalog UI policy), never via a catalog client script — the Mandatory flag is enforced only
on page load and can be changed by client APIs, so declarative control is both simpler and more
predictable. Restrict a reference variable with a reference qualifier (Simple or Dynamic);
**scripted (advanced) reference qualifiers are admin-only** (restricted to system
administrators). Secure sensitive variables with declarative **Read roles**, **Write roles**,
and **Create roles** on the variable definition rather than relying on client-side hiding.
Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/servicenow-platform/service-catalog/r_VariableTypes.md` ("Several types of service catalog variables are provided."), `repos/ServiceNowDocs/markdown/servicenow-platform/service-catalog/t_CreateAVariableForACatalogItem.md` (Mandatory "applicable only on page load, and can be changed via client APIs"; Order "least to greatest order value"; Reference qual scripts "restricted to system administrators")

```javascript
// DON'T — a generic text field made mandatory from a catalog client script
// variable: single_line_text "start_date"; catalog client script g_form.setMandatory(...)

// DO — the right type, an explicit order, declarative mandatory
// variable: Date "start_date", Order 100, Mandatory = true (or a catalog UI policy)
// reference variable → set a Simple/Dynamic reference qualifier (scripted = admin-only)
// sensitive variable → configure declarative Read / Write / Create roles
```

### Rule 5 — Reuse variables through a variable set; know the MRVS restrictions before reaching for a grid

Group reusable variables into a **variable set** shared across items and order guides (edit
once, propagates) instead of duplicating variables by hand. A **multi-row variable set (MRVS)**
captures a grid of N entities — but it is fenced off: **no onSubmit catalog client scripts**,
item-level catalog client scripts / UI policies **do not reach** its variables, **Map to
field** is unsupported, and a variable in an MRVS **cannot be Global** (so it is unavailable in
catalog tasks). Set-level Read/Write/Create roles override individual variables' roles:
defining roles on the variable set supersedes the access settings of any variables within it.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/servicenow-platform/service-catalog/c_ServiceCatalogVariableSets.md` ("Variable sets allow you to create a collection of variables that can be reused across multiple catalog items and order guides… Roles of an individual variable are overridden by the roles of the variable set… onSubmit catalog client scripts are not supported for an MRVS… Catalog UI policies and catalog client scripts defined at the item level are not applicable for variables in an MRVS… Map to field functionality is not supported… You cannot set Global as True for any variable that belongs to an MRVS."), `repos/ServiceNowDocs/markdown/servicenow-platform/service-catalog/t_CreateAVariableSet.md` (scripts "should refer to the internal name of a variable set")

```javascript
// DON'T — copy the same five address variables onto three items, and expect an
// item-level onSubmit script to validate an MRVS grid
// (duplication drifts; MRVS ignores item-level onSubmit)

// DO — extract shared variables into a variable set; validate MRVS rows inside the set
// (onLoad/onChange), reference variables by internal name, and remember an MRVS
// set-level Read/Write/Create roles override variable roles; MRVS variable can't be Global
```

### Rule 6 — A catalog client script is not a form client script: it binds to an item/set, has no record (so no Display BR / `g_scratchpad`), and reaches the parent only via `g_service_catalog`

A catalog client script runs in the browser and follows the same discipline as an ordinary
Client Script — `g_form`, async GlideAjax, UI-policy-over-script — all owned by **`client.md`**;
do not restate them here. What diverges:

1. **Binding + surfaces.** It is bound to **one catalog item or one variable set** (not a
table/view), with explicit "applies on" surfaces — item view, RITM, catalog task, or the
record-producer target record. Set those checkboxes deliberately.
2. **No record pre-submit → no Display BR / `g_scratchpad`.** The item form has no backing
record before submission, so the onLoad-via-Display-Business-Rule optimisation from
`client.md` does not apply — supply data through GlideAjax instead.
3. **MRVS reaches its parent only through `g_service_catalog.parent`.** Inside an MRVS row the
parent item form is reachable only via `g_service_catalog.parent.getValue(name)`; there is
no equivalent on ordinary forms, and **onSubmit is unsupported in an MRVS** (Rule 5).

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/servicenow-platform/service-catalog/t_CreateACatalogClientScript.md` ("Catalog client scripts can be applied to a catalog item or a variable set… Applies on Requested Items… Applies on the Target Record"), `repos/ServiceNowDocs/markdown/api-reference/g_service_catalogClientAPI.md` ("This method can only be called from the parent object, such as g_service_catalog.parent.getValue()")

```javascript
// DON'T — treat it like a form client script: bind to a table, or lean on g_scratchpad
function onLoad() {
var pref = g_scratchpad.userPref; // undefined on a catalog form (no record behind it)
}

// DO — bound to the item/set with the right "applies on" surface; fetch via async GlideAjax;
// reach the parent form from an MRVS row through g_service_catalog
function onLoad() {
var owner = g_service_catalog.parent.getValue('requested_for'); // MRVS → parent item form
// ...async GlideAjax for anything the form can't already supply (see client.md)
}
```

- **Model judgment, low confidence:** under **two-step checkout**, GlideGrail says an onSubmit
catalog client script fires on the first (review) submit rather than the final one. Not found
in local `sn-docs` — treat as a strong default and verify on the instance before relying on
onSubmit timing.

### Rule 7 — Read and write RITM variables server-side through `current.variables.<name>` — and write them only in a *before* business rule

Access variables server-side as `current.variables.<name>` (or
`current.variables.<set>.<name>` for a set member). Variables can only be **set in a before
business rule** — writes from an after rule are not persisted to the database. MRVS rows are
iterated with `getRowCount()` / `getRow(i)` / `row.<var>`. Two variables sharing a name collide
(only one survives), so keep variable names unique across an item.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/servicenow-platform/service-catalog/c_ScriptableServiceCatalogVariables.md` ("current.variables.<variable_name>… You can only set a variable in a before business rule. Variables set in an after rule are not written to the database… Creating two variables named computer_speed would result in only one of them showing up.")

```javascript
// DON'T — set a variable from an after rule (silently not persisted)
// when: after, update
current.variables.approved_by = gs.getUserID(); // lost — after rules don't write variables

// DO — write variables in a before rule; read them anywhere
// when: before, update
(function executeRule(current, previous) {
current.variables.approved_by = gs.getUserID();
var speed = current.variables.computer_speed + ''; // read via current.variables.<name>
})(current, previous);
```

### Rule 8 — Fulfil through a Workflow Studio flow or workflow (over an execution plan), wired on `sc_req_item` — not after-insert business rules

Define a catalog item's fulfilment with a **Workflow Studio flow, a workflow, or an execution
plan**; execution plans are linear and least flexible, so ServiceNow recommends workflows over
them and Workflow Studio (Flow Designer) is the modern path. Prefer Flow for fulfilment; this
rule adds the catalog-specific wiring: run the workflow on `sc_req_item`, and if catalog tasks
must read variables, create those tasks from the **parent** workflow (a subflow's tasks can't
reach the variables). Don't generate child tasks from after-insert business rules on
`sc_req_item`.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/servicenow-platform/service-catalog/request-fulfillment.md` ("Workflow Studio flows, workflows, or execution plans are used to define fulfillment processes… Workflows provide greater flexibility than execution plans, which are linear."), `repos/ServiceNowDocs/markdown/servicenow-platform/service-catalog/c_ExecutionPlans.md` ("ServiceNow recommends using workflows for request fulfillment processes."), `repos/ServiceNowDocs/markdown/servicenow-platform/service-catalog/c_ServiceCatalogWorkflowDefinition.md` ("If your catalog workflow requires catalog tasks to access catalog variables, create the catalog tasks from a parent workflow.")

```javascript
// DON'T — spin up catalog tasks from an after-insert BR on sc_req_item
// when: after, insert on sc_req_item → new GlideRecord('sc_task')… // fights the engine

// DO — fulfilment is a flow/workflow on sc_req_item (Flow preferred);
// create variable-reading catalog tasks in the PARENT workflow, not a subflow
```

## Notes

- **Order guides — one request, many items.** Use an order guide when a user requests a bundle
of related items as a single submission: it evaluates order-guide **rules** to pick items,
and the **Script** field adds/removes them with `guide.add(sysId)` / `guide.remove(sysId)`.
Enable **Cascade variables** so identically-named guide variables flow into the ordered
items, and an order guide can be run automatically from a workflow or server script.
Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/servicenow-platform/service-catalog/c_ServiceCatalogOrderGuides.md` ("Order guide submits a single service catalog request that generates several items… guide.add(\"<sys_id_of_cat_item>\")… guide.remove"), `repos/ServiceNowDocs/markdown/servicenow-platform/service-catalog/c_CascadeTheOrderGuideVariables.md` ("select the Cascade variables check box… create variables on the catalog items that match the names of the corresponding variables in the order guide"), `repos/ServiceNowDocs/markdown/servicenow-platform/service-catalog/c_RunOrderGuidesAutomatically.md` ("run an order guide automatically from within a workflow or a server script").
- **Catalog UI policy over a scripted client script.** For declarative mandatory / read-only /
visible on a catalog form, prefer a **catalog UI policy** (same principle as `client.md`'s
UI-policy-over-script rule). Item-level UI policy takes precedence over variable-set UI
policy, and a variable used in a UI-policy **condition** must be visible on the form.
Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/servicenow-platform/service-catalog/c_ServiceCatalogUIPolicy.md` ("The UI policy for catalog items always takes precedence over UI policy for variable sets… the variables in a service catalog UI policy condition must be visible… on the form for the condition to be tested.").
- **Variable attributes** fine-tune a variable via the comma-separated **Variable attributes**
field (e.g. `max_length`, `allowed_extensions`, `glide_list`) — reach for it before scripting
behaviour the platform already exposes as an attribute.
Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/servicenow-platform/service-catalog/variable-attributes.md` ("You can enter multiple attributes for a variable type by separating each with a comma.").