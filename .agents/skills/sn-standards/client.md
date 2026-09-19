# client

Browser-side design judgment for form scripts and the client end of the client→server
seam.

## Scope

- **Covers:** Client Scripts (`onLoad`/`onChange`/`onSubmit`/`onCellEdit`), UI Policies,
UI Actions, the **client half** of GlideAjax, and the `g_form` form API.
- **Runtime note:** examples here are **browser JavaScript**, not Rhino. Apply the
universal naming/style baseline from `core.md`; server-only conventions such as the
`gr` prefix and `gs.*` logging do not apply client-side. Name the actual runtime in the
artifact header: `ES mode: ES5 (browser, classic UI)` or
`ES mode: modern (UI Builder)`. Never mix ES styles within one artifact.
- **Does NOT cover (and the boundary):**
- The **server** Script Include a GlideAjax/UI Action calls is governed by
`→ automation.md`, `→ security.md`, and `core.md`. This file owns only the
**client-side contract** of that call.
- **ACL/role design** and `GlideRecordSecure` *bypass* analysis are **`→ security.md`**;
Rules 7–9 touch the client seam (the GlideAjax contract, the UI Action client/server
split, and the client/UI **injection** items `→ security.md` explicitly handed
here) only as **client** concerns — the server SI's own rules stay in
`→ security.md` / `→ automation.md`.
- **Service Portal widget client controllers** are covered in **`→ portal.md`** — this
file notes only where SP behaves differently (no `g_scratchpad`, DOM globals banned),
it does not build widgets.

## Rules

**ES assumption for every example below:** classic-UI client scripts — ES5-era **browser**
JavaScript (no Rhino). UI Builder client scripts may use modern JS; never mix styles in one
artifact.

### Rule 1 — Never touch the DOM from a Client Script; use the `g_form` API

Reaching into the DOM (`document.*`, jQuery/`$`/`$$`, `gel()`, `g_form.getControl()` /
`getElement()`) couples your script to markup that changes on upgrade — and breaks
outright in Service Portal, which does not expose those globals at all. Read and mutate the
form through the `g_form` value/state API instead, and never write unescaped user input
into markup.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/api-reference/scripts/client-script-best-practices.md` ("Avoid Document Object Model (DOM) manipulation if possible. It can cause a maintainability issue when browsers are updated"), `repos/ServiceNowDocs/markdown/platform-user-interface/service-portal/unsupported_client_scripts.md` ("The following globals and APIs are unavailable… $ … document … jQuery … window")

```javascript
// DON'T — DOM access: breaks on upgrade, and is undefined in Service Portal
function onChange(control, oldValue, newValue, isLoading) {
document.getElementById('incident.priority').style.color = 'red'; // fragile + SP-fatal
}

// DO — go through the g_form API
function onChange(control, oldValue, newValue, isLoading) {
if (isLoading) { return; }
g_form.showFieldMsg('priority', getMessage('Review this priority'), 'error');
}
```

### Rule 2 — Get server data with asynchronous GlideAjax; never a synchronous round-trip

`getReference()`, a client-side `GlideRecord`, and `getXMLWait()` all block the browser
until the server answers — on a slow link the form just hangs. Every server trip from a
Client Script must be asynchronous: GlideAjax with a callback. Route by event — `onChange`
fetches via GlideAjax; data known at load time is cheaper pushed once via a Display Business
Rule into `g_scratchpad` (note: `g_scratchpad` is **not** available in Service Portal /
Catalog item forms — use GlideAjax there).

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/api-reference/c_GlideAjaxAPI.md` ("getXML() is the preferred method… because it is asynchronous… getXMLWait()… can cause the application to seem unresponsive, significantly degrading the user experience"), `repos/ServiceNowDocs/markdown/api-reference/scripts/client-script-best-practices.md` ("GlideRecord and g_form.getReference() … are no longer recommended due to their performance impact")

```javascript
// DON'T — synchronous reference fetch blocks the UI thread on every change
function onChange(control, oldValue, newValue, isLoading) {
var group = g_form.getReference('cmdb_ci').support_group; // synchronous round-trip
g_form.setValue('assignment_group', group);
}

// DO — asynchronous GlideAjax with a callback (and exit early on load)
function onChange(control, oldValue, newValue, isLoading) {
if (isLoading || !newValue) { return; }
var ga = new GlideAjax('CiCheck');
ga.addParam('sysparm_name', 'getSupportGroup');
ga.addParam('sysparm_ci', g_form.getValue('cmdb_ci'));
ga.getXMLAnswer(function (answer) {
g_form.setValue('assignment_group', answer);
});
}

// DO — data known at load time: a Display Business Rule pushes it once via g_scratchpad,
// so onLoad needs no server trip at all (NOT available in Service Portal — use GlideAjax there)
function onLoad() {
if (g_scratchpad.managerName) {
g_form.showFieldMsg('assigned_to', g_scratchpad.managerName, 'info');
}
}
```

### Rule 3 — Read the answer with `getXMLAnswer()` + JSON; keep calls minimal

Prefer `getXMLAnswer()`, which hands the callback the answer string directly, over
`getXML()`, which forces you to walk `response.responseXML.documentElement.getAttribute('answer')`.
When the server must return more than one value, return a JSON string from the Script
Include and `JSON.parse()` it client-side — one trip, one structured payload.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/api-reference/c_GlideAjaxAPI.md` ("getXMLAnswer… gets the answer element of the response", server example returns `JSON.stringify(result)`)

```javascript
// DON'T — getXML forces manual XML DOM walking for a single answer
ga.getXML(function (response) {
var answer = response.responseXML.documentElement.getAttribute('answer');
});

// DO — getXMLAnswer hands you the answer; parse a JSON payload for multiple values
ga.getXMLAnswer(function (answer) {
var data = JSON.parse(answer); // SI returned JSON.stringify({ manager: ..., email: ... })
g_form.setValue('manager', data.manager);
});
```

- **Model judgment, low confidence:** cap a Client Script at **one** AJAX call
— consolidate multiple lookups into a single SI method returning one JSON payload. Sound
practice (each call is a full round trip), but not stated as a hard limit in local
`sn-docs`; treat as a strong default, not a platform rule.

### Rule 4 — On a reference field, pass the display value as the 3rd `setValue` argument

`g_form.setValue('ref_field', sysId)` without the display value forces a **synchronous**
server call to look the label up — the exact blocking trip Rule 2 bans. Pass the display
value as the third argument when you have it; when you don't, fetch both in one GlideAjax
call and set them together in the callback.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/api-reference/scripts/client-script-best-practices.md` ("If you set the value without the displayValue, the instance does a synchronous call to retrieve the display value… This extra round trip… can impact performance")

```javascript
// DON'T — sys_id only: instance makes a synchronous call to fetch the label
g_form.setValue('assigned_to', userSysId);

// DO — supply the display value, no server call
g_form.setValue('assigned_to', userSysId, userDisplayName);
```

### Rule 5 — Reach for a UI Policy before a scripted Client Script; if you script, exit early

To make a field mandatory, read-only, or visible, a **UI Policy** does it declaratively —
no script to maintain, an `Order` field for sequencing, and it is upgrade-safe and readable
without execution. Script a Client Script only for what a policy can't express (validation,
server lookups, computed values). When you do script an `onChange`, exit early
(`isLoading`, blank/unchanged `newValue`) so it does no work it doesn't have to, and keep
the body in a function so vars don't leak across scripts.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/api-reference/scripts/client-script-best-practices.md` ("When possible, consider using a UI policy instead of a client script… UI policies do not require scripting to make a field mandatory, read-only, or visible"; "Enclose the code in a client script inside a function")

```javascript
// DON'T — script a static show/hide a UI Policy could do declaratively, no early exit
function onChange(control, oldValue, newValue, isLoading) {
if (g_form.getValue('category') === 'hardware') {
g_form.setMandatory('cmdb_ci', true); // a UI Policy expresses this with no code
} else {
g_form.setMandatory('cmdb_ci', false);
}
}

// DO — keep the Client Script for real logic, and bail before doing work you needn't
function onChange(control, oldValue, newValue, isLoading) {
if (isLoading || !newValue || newValue === oldValue) { return; }
validatePriorityAgainstImpact();
}
```

### Rule 6 — Choose `setDisplay` vs `setVisible` by what should happen to the gap

Both hide a field; they differ in layout. `setDisplay(field, false)` removes the field
**and collapses** the space so the rest of the form closes up (the usual choice).
`setVisible(field, false)` hides it but **leaves the blank gap**. Pick deliberately — reach
for `setDisplay` unless you specifically need the layout position preserved.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/api-reference/c_GlideFormAPI.md` (setDisplay: "If the field is hidden, the space is used to display other items")

- **Model judgment, low confidence:** the *contrast* — that `setVisible`
instead **leaves** the gap — is not stated for `setVisible` in local `sn-docs` (its entry
only says "Displays or hides the specified field"); treat the gap-preserving behaviour as
practitioner knowledge, verify on the instance if it matters.

```javascript
// DON'T — setVisible when you wanted the form to close up; leaves an empty gap
g_form.setVisible('priority', false);

// DO — setDisplay collapses the space (default choice for hide)
g_form.setDisplay('priority', false);
```

### Rule 7 — From the client, treat the GlideAjax seam as untrusted: `sysparm_`-name params and never assume the server enforced nothing

The client half of the seam is what this file owns. Name every GlideAjax parameter with
the `sysparm_` prefix (the platform requires it), and write the call as if the input will
be tampered with — because it can be. The **server end is a boundary**: the client-callable
Script Include must coerce each parameter and query with security enforced
(`GlideRecordSecure` / AJAXGlideRecord ACL checking) so a forged call can't read rows the
user's roles forbid; those server rules live in **`→ security.md`** (ACL/`GlideRecordSecure`)
and **`→ automation.md`** (thin client-callable SI → server SI). Don't push trust decisions
into the client.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/api-reference/c_GlideAjaxAPI.md` ("The name must begin with the `sysparm_`"), `repos/ServiceNowDocs/markdown/platform-security/access-control/r_ApplyACLsToAJAXGlideRecord.md` ("If the ServiceNow AI Platform is running without GlideAjax ACL call checking, an API can return information that the currently logged in user could not otherwise access"; "Use GlideRecordSecure when querying data")

```javascript
// DON'T — unprefixed param, and the client "decides" access then trusts the answer
function showSalary() {
var ga = new GlideAjax('UserInfo');
ga.addParam('sysparm_name', 'getSalary');
ga.addParam('userId', g_form.getValue('assigned_to')); // missing sysparm_ prefix
ga.getXMLAnswer(function (answer) {
g_form.setValue('u_salary', answer); // assumes the server let anyone read it
});
}

// DO — sysparm_-named params; the SI (security.md/automation.md) coerces + GlideRecordSecure
function showSalary() {
var ga = new GlideAjax('UserInfo');
ga.addParam('sysparm_name', 'getSalary');
ga.addParam('sysparm_user_id', g_form.getValue('assigned_to'));
ga.getXMLAnswer(function (answer) {
g_form.setValue('u_salary', answer); // '' when the server's ACL check denies access
});
}
```

### Rule 8 — A UI Action's Client script runs in the browser; its Condition always runs on the server

Selecting **Client** makes the UI Action's script execute in the user's browser (the
`Onclick` function), not on the server — so a client UI Action is a Client Script and obeys
Rules 1–7 (no DOM, async server calls, wrap in a function). The **Condition** field,
however, *always* runs on the server, so it — not the client script — is the security gate
for whether the action shows. Keep `glide.security.strict.actions = true` so that condition
is re-checked before execution; a client-only guard is bypassable.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/platform-administration/t_EditingAUIAction.md` (Client: "execute its script in the user's browser, not on the server. When enabled, the Onclick field appears"; Condition: "Conditions always run on the server"; "If the UI action is enabled to run on the client side, wrap it in a function"), `repos/ServiceNowDocs/markdown/platform-security/instance-security-hardening-settings/sc-check-ui-action-conditions-before-execution.md` ("If the glide.security.strict.actions system property isn't set to… true, then there is no validation on the table UI before execution")

```javascript
// DON'T — gate visibility in the client Onclick script (bypassable), and leave it unwrapped
// Onclick: validateAndGo (Client checked)
if (!g_user.hasRole('itil')) { return false; } // a determined user can still POST the action
g_form.submit();

// DO — put the access gate in the server-side Condition (e.g. gs.hasRole('itil') in the
// Condition field), and keep the client Onclick wrapped in a named function
function validateAndGo() {
if (!g_form.getValue('assignment_group')) {
g_form.addErrorMessage(getMessage('Pick an assignment group first'));
return false;
}
g_form.submit();
}
```

### Rule 9 — Never render unescaped data client-side, and don't disable the platform's injection guards

Client/UI injection is the client-side security item handed here from `→ security.md`. Set
field values and messages through the `g_form` API (which escapes), never by writing raw
user/server data into markup — that is the XSS path. In Jelly (UI Pages/macros), keep the
JS-interpolation protection on and never build a `${...}` expression from untrusted input
(this is the *output-interpolation / injection* guard; the separate *server-side* trap of a
*dynamic* JEXL `${...}` inside a `<g:evaluate>` — a PermGen leak, not injection — is
`→ scripting.md` Rule 3); and leave AJAXEvaluate disabled so a client can't ship arbitrary
script to the server to run.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/platform-security/instance-security-hardening-settings/validation-sanitization-encoding.md` ("addresses input validation to prevent against vulnerabilities like Cross-Site Scripting (XSS)"; "Enable Jelly JS Interpolation Protection… glide.ui.jelly.js_interpolation.protect"; "Disable AJAXEvaluate… glide.script.allow.ajaxevaluate to protect the system API from vulnerabilities of Client script execution through AJAX calls")

```javascript
// DON'T — inject untrusted text into markup; an attacker-controlled value runs as script
var note = g_form.getValue('comments');
someElement.innerHTML = '<b>' + note + '</b>'; // XSS, and a DOM write (Rule 1)

// DO — let the g_form API place the (escaped) text; no raw markup assembly
g_form.showFieldMsg('comments', g_form.getValue('comments'), 'info');
```