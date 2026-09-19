# portal

Portable Service Portal defaults for where logic lives, how the client talks to the server,
and which browser globals a widget controller has. Universal executable-artifact rules live
in `core.md`.

## Scope

- **Covers:** widget anatomy and the load-time `data`/`options` contract, the client
controller (`spUtil`/`spModal`, the `g_form`-absent DOM boundary), the client→server
**anchor** (Scripted REST for all post-load work), the option schema, widget query
performance, page and widget **visibility** (roles, User Criteria, `$sp.canReadRecord`),
and Angular providers for cross-widget reuse.
- **Hands off:** the Scripted REST **endpoint** itself (verbs, status, versioning, `sn_ws_err`,
streaming) → `integrations.md`; the business-logic **Script Include** it delegates to (thin
wrapper) → `automation.md`; universal query and logging defaults → `core.md`; table/record ACLs
behind the endpoint and `GlideRecordSecure` query enforcement → `security.md`.
- **Orientation:** a portal is a themed group of **pages** (addressed by page ID via `?id=`);
a page holds containers/rows that hold widget **instances**; the server script reads URL
params through `$sp.getParameter`. That structure is portal setup, not a coding rule — it
frames the rules below.
- **Runtime note:** the **controller** runs in the browser as a full AngularJS controller, not
Rhino. Apply the current project's browser conventions to the controller. A widget
**server** script is Rhino (ES5 by default; ES2021 only when the app is confirmed on it)
and follows `core.md`; never apply server-only globals or conventions to the controller.

## Logging

Choose the sink by audience. Use `$sp.log()` for admin/staff-facing widgets when the
portal-native **Service Portal Log Entries [sp_log]** sink is useful. Use `gs.*` with the
`[Source]` parameter-array form for anything that must be captured regardless of the running
user's role: `$sp.log()` records only when the logged-in user has `sp_admin` or `admin`.

## Rules

**ES assumption for the examples below:** widget **server** scripts are ES5-safe Rhino; widget
**client controllers** are browser AngularJS. Never mix ES styles in one artifact.

### Rule 1 — Know the load contract: the server script runs first and seeds `data`; the client reads `c.data`; `input` is undefined until the client posts

A widget's mandatory parts are the HTML template, the client script (controller), and the
server script. When the widget first renders, the **server script runs first** and populates
the `data` object; the controller then reads it as `c.data`. The `input` object is `undefined`
on first load — it only exists after the client posts back. Don't write onLoad logic that reads
`input`, and don't try to fetch initial state from the controller: seed it server-side into
`data`.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/platform-user-interface/service-portal/widget-dev-guide.md` (server script runs first, "Send record data to the widget client script using the **data** variable"; `input` "is undefined when first initialized"), `repos/ServiceNowDocs/markdown/platform-user-interface/service-portal/widget-api-reference.md` (`input` "value is `undefined` until the client controller calls `c.server.update()`")

```javascript
// DON'T — read input on initial load (it's undefined) or fetch initial state client-side
// server script
if (input.filter) { data.rows = load(input.filter); } // input is undefined on first render

// DO — server script seeds initial state into data; controller consumes c.data
// server script
(function () {
data.rows = new global.MyWidgetApi().initialRows(); // logic in a Script Include (Rule 2)
})();
// client controller
function ($scope) {
var c = this;
c.rows = c.data.rows; // read the server-seeded state
}
```

### Rule 2 — Anchor: the server script sets initial state only; do all post-load work through a Scripted REST API that delegates to a Script Include — never the in-widget round trip

Use the widget server script to set up the **initial state** only. For every subsequent
client→server interaction, call a **Scripted REST API** that delegates to a **Script Include** —
do **not** use the in-widget `c.server.update()` / `c.server.get()` round trip. `server.update()`
returns the *entire* widget on every call and buries the logic where only that widget can reach
it; a Scripted REST endpoint over a Script Include is independently verb-testable and reusable
from other widgets, jobs, and integrations. The endpoint's own rules (verb, status, versioning,
`GlideRecordSecure`, the `REST_Endpoint` ACL) live in → `integrations.md`; the Script Include's
rules (thin wrapper, `GlideQuery`, logging) live in → `automation.md`. This file owns only the
widget-side contract: seed on load, and call the endpoint for everything after.

**Global default, stricter than `sn-docs`:** `sn-docs` presents the in-widget round trip as the
normal default and Scripted REST as the escalation for divergent code paths or cross-widget
needs. Use Scripted REST for all post-load calls for testability and scalability. The one narrow
exception is a trivial refresh of already-loaded data with no logic and no reuse potential,
where `c.server.refresh()` is acceptable; when in doubt, use the endpoint.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/platform-user-interface/service-portal/general-guidelines-developing-widgets.md` ("use your server script to set up the initial state of your widget. For subsequent updates, use scripted REST APIs that call script includes… Separates business logic from UI elements. Centralizes your code"), `repos/ServiceNowDocs/markdown/api-reference/rest-api-explorer/scripted-rest-good-practices.md` ("Build tests that verify your scripted REST web services functionality as part of your development process")

```javascript
// DON'T — post-load work via the in-widget round trip: returns the whole widget, and the
// logic is trapped in this one widget (untestable, unreusable)
// client controller
c.approve = function (id) {
c.data.action = 'approve';
c.data.id = id;
c.server.update(); // re-runs the entire server script; logic hidden in the widget
};

// DO — call a Scripted REST API that delegates to a Script Include
// client controller
c.approve = function (id) {
return $http.post('/api/x_acme/widget_approvals/v1/' + id) // endpoint rules → integrations.md
.then(function (res) { c.data.status = res.data.status; });
};
// the endpoint is a thin resource that calls new global.ApprovalApi().approve(id) — SI → automation.md
```

- **Logging note.** In the widget **server** script, log with `$sp.log()` for
admin/staff-facing widgets (the portal-native `sp_log` sink), but use `gs.*` with the
`[Source]` array for anything that must be captured for **end-users** — `$sp.log` records
nothing unless the running user has `sp_admin`/`admin`.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/api-reference/server-api-reference/c_GlideSPScriptableScopedAPI.md` (`$sp.log` "Logs output to the Service Portal Log Entries [sp_log] table. The logged in user must have the sp_admin or admin role")

### Rule 3 — Controller APIs: use `spUtil`/`spModal`; `g_form` is NOT available; jQuery/Angular ARE — but keep DOM work in the link function

A widget client controller is a **full AngularJS controller**, so — unlike a classic Client
Script — jQuery and Angular **are** available to it (the unsupported-globals ban does not apply
here). But `g_form` is **not** a widget-controller global, and DOM *manipulation* still belongs
in the widget's **link function**, not the controller (keep the controller logic-only). Use the
Service Portal client classes: `spUtil` (messages, `recordWatch`, embedding a widget) and
`spModal` (alerts/prompts/confirms). Note the split from `client.md` **Rule 1**: classic and
catalog Client Scripts *running inside the portal* still get no DOM globals — that ban is about
Client Scripts, not widget controllers.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/platform-user-interface/service-portal/unsupported_client_scripts.md` ("Widget client controllers are full Angular controllers and are not subject to the unsupported client script globals listed here. Use jQuery and Angular as needed"), `repos/ServiceNowDocs/markdown/platform-user-interface/service-portal/widget-api-reference.md` ("g_form as a global object cannot be used in a widget client controller"), `repos/ServiceNowDocs/markdown/platform-user-interface/service-portal/widget-dev-guide.md` ("Use a link function to directly manipulate the DOM"), `repos/ServiceNowDocs/markdown/api-reference/spUtilAPI.md` (utility methods for a widget client script), `repos/ServiceNowDocs/markdown/api-reference/SPModal-API.md` (alerts/prompts/confirms in widgets)

```javascript
// DON'T — reach for g_form (undefined here), or mutate the DOM from the controller
function () {
var c = this;
g_form.setValue('state', 2); // g_form is not available in a controller
$('#note').html(c.data.note); // DOM mutation belongs in the link function
}

// DO — use the SP client APIs; keep the controller logic-only, DOM work in the link function
function () {
var c = this;
spUtil.addInfoMessage('Saved'); // portal client API
spModal.confirm('Delete this record?').then(function (ok) { if (ok) { c.remove(); } });
}
```

### Rule 4 — Define widget parameters in the option schema; read them via `options.*`, default them in the server script, and use a table-backed schema only when complex

Configurable widget parameters belong in the **option schema**, read through the `options`
global on **both** the client and server sides (`options.optionName`). Set defaults in the
server script (`options.color = options.color || 'blue';`) rather than hardcoding them in
markup. The default JSON-in-instance schema is enough for almost everything — only store options
in a dedicated table when they are genuinely complex or searchable, because a table adds server
calls.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/platform-user-interface/service-portal/c_WidgetInstanceOptions.md` ("access any option value in your widget client script or server script using `options.optionName`"; "Use the widget server script to specify default values for your options"; "Store options in a table only when complex or searchable options are required")

```javascript
// DON'T — hardcode a value in markup that should be a configurable option
// HTML template
<div style="color: blue">{{c.data.title}}</div> // every instance is stuck on blue

// DO — declare the option, default it server-side, read options.* on both sides
// server script
options.color = options.color || 'blue';
data.title = options.title || gs.getMessage('Untitled');
// HTML template
<div ng-style="{color: c.options.color}">{{c.data.title}}</div>
```

### Rule 5 — Keep widget queries bounded: `setLimit`, filter every `recordWatch`, and avoid auto-refresh, large data sets, and `<script>` in templates

Query hygiene applies with extra force in a widget, where a heavy server script blocks the
page render. Bound every server-side `GlideRecord` query with
`setLimit` (`gr.setLimit(options.limit || 100)`), filter every `recordWatch` so it doesn't
stream the whole table, and avoid auto-refreshing widgets and large data sets. Don't put
`<script>` tags in the HTML template — use an Angular `ng-template` record instead.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/platform-user-interface/service-portal/general-guidelines-developing-widgets.md` ("Avoid implementing the following items that use large data sets: … Auto-refreshing widgets… Unfiltered record watchers… Server-side scripts with GlideRecord queries without the `setLimit` function"; "Avoid using <script> tags in HTML templates… create a related Angular ng-template record")

```javascript
// DON'T — unbounded query in the server script and an unfiltered record watch
// server script
var gr = new GlideRecord('incident');
gr.query(); // pulls the whole table into the render
// client controller
spUtil.recordWatch($scope, 'incident', ''); // watches every row

// DO — bound the query and filter the watch
// server script
var gr = new GlideRecord('incident');
gr.setLimit(options.limit || 100);
gr.query();
// client controller
spUtil.recordWatch($scope, 'incident', 'assigned_to=' + g_user.userID);
```

### Rule 6 — Reach for an Angular Provider to share behaviour or state across widgets; prefer services over factories

When two widgets need the same behaviour, or must stay in sync / share state, extract it into an
**Angular Provider** record and inject it by name into each controller — don't copy logic
between widgets or bounce state through the server. Providers come as Directive / Factory /
Service; **prefer services over factories** (they migrate to modern ECMAScript more cleanly).

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/platform-user-interface/service-portal/angular-providers.md` ("Angular Providers are reusable components that can be injected into multiple widgets… Keep widgets in sync… Share context between widgets. Maintain and persist state"; "To facilitate migration to ECMAScript 6 or later, consider using services over factories")

```javascript
// DON'T — duplicate the same formatting logic in every widget's controller
function () { var c = this; c.money = function (n) { return '$' + n.toFixed(2); }; }

// DO — inject a shared provider (a service) by name
function (currencyService) { // provider record injected by name
var c = this;
c.money = currencyService.format; // one implementation, reused + kept in sync
}
```

### Rule 7 — Gate page and widget visibility declaratively with Roles and User Criteria; verify record access with `$sp.canReadRecord`

Control access to pages and widgets declaratively using the **Roles** field or **User Criteria**
(Who Can View / Who Cannot View related lists) on the page or widget record — do not implement
custom visibility logic inside client controllers. Marking a page or widget **Public** bypasses
role checks and allows unauthenticated access. In server scripts, before returning a queried
record or its fields to the client, verify that the current session can read the record using
`$sp.canReadRecord(gr)`.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/platform-user-interface/service-portal/configure-page-security.md` (page security by role, public check box), `repos/ServiceNowDocs/markdown/platform-user-interface/service-portal/configure-widget-security.md` (widget security, roles, public table allow list), `repos/ServiceNowDocs/markdown/platform-user-interface/service-portal/widget-user-criteria.md` (User criteria for page, widget, widget instance), `repos/ServiceNowDocs/markdown/api-reference/server-api-reference/c_GlideSPScriptableScopedAPI.md` (`$sp.canReadRecord` "Returns true if the user can read the specified GlideRecord")

```javascript
// DON'T — fetch records without verifying read access, or hide widgets client-side
// server script
var gr = new GlideRecord('incident');
gr.addQuery('active', true);
gr.query();
while (gr.next()) {
data.items.push({ number: gr.getValue('number'), short_description: gr.getValue('short_description') });
}

// DO — configure Roles / User Criteria on the widget record, and check $sp.canReadRecord
// server script
var gr = new GlideRecord('incident');
gr.addQuery('active', true);
gr.query();
while (gr.next()) {
if ($sp.canReadRecord(gr)) {
data.items.push({ number: gr.getValue('number'), short_description: gr.getValue('short_description') });
}
}
```

## Notes

- **Localization.** Tag user-facing strings for translation with `${...}` or
`gs.getMessage()` in the HTML template, client script, or server script.
Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/platform-user-interface/service-portal/widget-dev-guide.md` ("Use the `${}` or `gs.getMessage()` syntax… to tag strings for translation").
- **Service Portal diverges from classic UI.** Formatters, UI macros, embedded lists, and
Client-type UI Actions don't run in the portal; and `g_scratchpad` (from a Display Business
Rule) is unavailable — seed that data into `data` in the server script instead. `client.md`
**Rule 2** already flags the `g_scratchpad` gap from the Client-Script side.
Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/platform-user-interface/service-portal/unsupported-features-sp.md` ("No plans to support: @ Mentions… UI macros… Formatters… UI actions marked as **Client**").