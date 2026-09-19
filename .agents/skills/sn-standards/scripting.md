# scripting

Cross-cutting server-side scripting pitfalls that apply regardless of script type. Follow
the executable baseline in `core.md`.

## Scope

- **Covers:** hardcoded instance-specific values, dynamic script evaluation API choice
(`eval()` vs `GlideEvaluator`), dynamic JEXL in Jelly `<g:evaluate>` (server-side PermGen
prevention), and two reference-field read traps (dot-walking to `.sys_id`,
`getDisplayValue()` over a named display field).
- **Does NOT cover (and the boundary):** Business-Rule timing / recursion / thin-wrapper →
`→ automation.md`; universal string-read and query defaults → `core.md`; large-table
query hygiene and data-model design → `data.md`; untrusted-input boundaries and injection
defense → `security.md` Rule 9 (this file owns only the `eval` vs `GlideEvaluator` API
choice for trusted scripts). Client-side scripting, and the Jelly **output-interpolation /
injection** guard (`glide.ui.jelly.js_interpolation.protect`) → `client.md` Rule 9.

## Source & trust

Distilled from the **Scripting Technical Best Practices** section of the ServiceNow
Technical Best Practices (TPB) guide — [developer.servicenow.com](https://developer.servicenow.com/dev.do#!/guides/australia/now-platform/tpb-guide/scripting_technical_best_practices).
**Trust: Official guidance** (Tier 1, but developer-portal remote, not local `sn-docs`).
Universal conventions belong in `core.md` and are not repeated here. This file keeps the
TPB guidance specific to the pitfalls in scope.

## Rules

### Rule 1 — Never hardcode instance-specific values; read them from a property or look them up

A hardcoded `sys_id`, group name, or user name bakes one instance (and one moment in an
org's structure) into the script: `sys_id`s differ per instance, and a "Service Desk" that
becomes "Help Desk" silently breaks the code. Read configuration from `gs.getProperty()` and
resolve people/groups by *role or group membership*, not by name — this is the server twin
of `integrations.md` Rule 2 (never inline an endpoint/credential — use an alias).

Source: TPB guide — *Do Not Use Hard-Coded Values* [Official guidance]

```javascript
// DON'T — bake a sys_id and a group name into the script
var taskId = '26c811f06075388068d07268c841dcd0';
var groupName = 'Service Desk'; // breaks the day the group is renamed

// DO — read config from a property; approve via a GROUP, not a named person
var taskId = gs.getProperty('x_acme.default_task');
var groupName = gs.getProperty('x_acme.fulfillment_group');
// (and for approvals, use a Group Approval on an "IT Director" group so a role change
// is a membership edit, not a workflow edit)
```

### Rule 2 — Prefer direct logic over dynamic evaluation; use `GlideEvaluator.evaluateString()` over `eval()` for trusted scripts

Avoid native JavaScript `eval()`. It executes arbitrary text without line numbers on syntax or
runtime errors, complicating debugging. Write business logic directly whenever possible. For the
rare legitimate case requiring dynamic execution of a fully trusted generated script, use the
platform API `GlideEvaluator.evaluateString()` rather than native `eval()`. Untrusted-input
boundaries, script-injection defense, and allow-list enforcement are security concerns owned by
`→ security.md` Rule 9.

*The "prefer direct logic; use GlideEvaluator over eval for trusted generated scripts" rule is
Model judgment, low confidence; the GlideEvaluator API choice is grounded.*

Source: TPB guide — *Avoid the eval Function* [Official guidance]

```javascript
// DON'T — native eval() hides line numbers on error and bypasses platform evaluation APIs
eval("gs.info('Hello World');");

// DO — write the code directly; only trusted generated scripts use the platform API
GlideEvaluator.evaluateString("gs.info('Hello World');");
```

### Rule 3 — In Jelly, never build a dynamic JEXL expression inside a `<g:evaluate>`; pass it as a `jelly` variable

A `${...}` / `$[...]` JEXL expression evaluated *inside* a `<g:evaluate>` tag consumes Java
PermGen and can degrade or crash the instance over time. Set `jelly="true"` on the evaluate
and reference the value through the `jelly.` prefix instead. (Static tokens like `${AMP}`,
`${SP}` are the only safe inline exceptions.) This applies only to legacy Jelly (UI Pages
and macros), but it is a real outage risk where Jelly is in play. This rule is the
**server-side `<g:evaluate>` / PermGen** angle only; the Jelly **output-interpolation /
injection** guard (`glide.ui.jelly.js_interpolation.protect`, never building a `${...}` from
untrusted input) is `→ client.md` Rule 9 — not duplicated here.

Source: TPB guide — *Avoid Dynamic JEXL Expressions in an Evaluate* [Official guidance]

```html
<!-- DON'T — dynamic JEXL inside the evaluate leaks PermGen -->
<g:evaluate>
var inc = new GlideRecord('incident');
inc.addQuery('assigned_to', '${jvar_userid}');
inc.query();
</g:evaluate>

<!-- DO — jelly="true", then reference the copy via the jelly. prefix -->
<g:evaluate jelly="true">
var inc = new GlideRecord('incident');
inc.addQuery('assigned_to', jelly.jvar_userid);
inc.query();
</g:evaluate>
```

### Rule 4 — Don't dot-walk to `.sys_id` of a reference field; the value already IS the sys_id

`current.caller_id.sys_id` makes the platform fetch the referenced record just to read the
id it already holds — an extra query per call. A reference field's stored value *is* the
`sys_id`, so read it directly using the `core.md` extractor default:
`current.caller_id.toString()` (`getValue('caller_id')` is the equivalent when you need to
distinguish null from empty). This rule is specifically the `.sys_id` dot-walk trap.

Source: TPB guide — *Avoid Dot-Walking to the sys_id of a Reference Field* [Official guidance]

```javascript
// DON'T — dot-walk to .sys_id: an extra DB fetch of the caller record
var id = current.caller_id.sys_id;

// DO — read the value directly (it IS the sys_id), no lookup
var id = current.caller_id.toString(); // getValue('caller_id') is equivalent
```

### Rule 5 — Read a display value with `getDisplayValue()`, not the hardcoded display field name

Reaching for `.name` / `.number` hardcodes *which* field is the display value; the day an
admin changes the dictionary "display" field (e.g. `cmdb_ci` from `name` to `serial_number`)
the code silently reads the wrong thing. `getDisplayValue()` always tracks the table's
configured display field.

Source: TPB guide — *Use getDisplayValue() Effectively* [Official guidance]

```javascript
// DON'T — hardcode the display field; breaks if the dictionary display field changes
var parent = current.parent.number;
var myCi = current.cmdb_ci.name;

// DO — ask for the display value; follows the dictionary's configured display field
var parent = current.parent.getDisplayValue();
var myCi = current.cmdb_ci.getDisplayValue();
```