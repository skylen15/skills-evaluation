# security

Data-security design judgment that generated code routinely gets wrong.

## Scope

- **Covers:** Access Control List (ACL) design (table + field rules, default-deny,
same-level OR-ing), **row-level** visibility via before-query Business Rules,
`security_admin` elevation for ACL changes, verifying ACLs by impersonating the target
persona, ACLs in scoped applications, and data returned through GlideAjax / server
scripts that can bypass record ACLs.
- **Does NOT cover (and the boundary):**
- Server-side script injection defense (untrusted-input boundaries and allow-list
enforcement for `eval()` / `GlideEvaluator`) is covered here (Rule 9); general scripting
API choice (`eval()` vs `GlideEvaluator.evaluateString()` vs direct logic) belongs to
`→ scripting.md` Rule 2.
- **Client/UI-layer injection** — Jelly output interpolation and XSS — belongs to
`→ client.md`; Service Portal controller and rendering concerns belong to `→ portal.md`.
Server-side dynamic JEXL inside Jelly `<g:evaluate>` is the PermGen concern in
`→ scripting.md` Rule 3.

## Rules

### Rule 1 — Give every custom table explicit table *and* field ACLs; never lean on wildcard fall-through

A record operation is allowed only when **both** the matching table-level and field-level
ACL pass — failing the table rule denies everything. Modern instances are default-deny:
an empty/invalid ACL denies, and with `glide.sm.default_mode` = deny, objects that match
only the wildcard table rule are admin-only. So a new custom table with no explicit rules
is *not* safely open or safely closed by accident — author its CRUD ACLs deliberately.

*Design intent (Model judgment, low confidence — least privilege):* start restrictive and
grant explicitly; prefer a custom app-scoped role over a broad role like `itil`; use
field-level ACLs only for genuinely sensitive fields (they add evaluation overhead on
every form/list render).

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/platform-security/access-control/exploring-access-control-list.md` (table+field both must pass; default-deny)

```javascript
// DON'T — ship a custom table and assume the wildcard rules secure it
// (no x_acme_invoice.* ACLs created) → access falls through to admin-only or
// stays as wide as the inherited wildcard; neither is a deliberate decision.

// DO — author explicit table + field ACLs (created via the ACL UI, security_admin):
// record [x_acme_invoice].[--None--] read Requires role: x_acme.invoice.reader
// record [x_acme_invoice].[--None--] write Requires role: x_acme.invoice.editor
// record [x_acme_invoice].[amount] write Requires role: x_acme.invoice.editor
// Delete intentionally omitted — this table should not allow row deletes.
```

### Rule 2 — To tighten access, edit the matching ACL; adding another at the same level only widens it

ACL rules at the same point in the processing order are OR'd — passing any one grants
access. A second rule beside an existing loose one can only *widen* access, never narrow
it. To restrict, change the rule that already matches.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/platform-security/access-control/exploring-access-control-list.md` (same-level rules are OR'd)

```javascript
// DON'T — try to "tighten" a loose read rule by adding a stricter one beside it.
// Existing: record [problem].[--None--] read Requires role: itil (loose)
// Added: record [problem].[--None--] read Requires role: problem_admin
// → same level, OR'd: anyone with itil still reads. Nothing tightened.

// DO — edit the existing matching rule so it is the one that constrains:
// record [problem].[--None--] read Requires role: problem_admin
```

### Rule 3 — Restrict *which rows* a user sees with a before-query Business Rule, and exempt admin

ACLs gate table/field access; **row visibility** is controlled by a query Business Rule
that runs *before* the database query and appends a `current.addQuery(...)` filter. Use
the `query` operation on a *before* rule. Always let privileged roles through first — a
query BR that hides rows from administrators turns every support session into a phantom
data-loss hunt.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/build-workflows/business-rules-classic/c_BusinessRules.md` (before-query row visibility)

```javascript
// DON'T — enforce row visibility inside each consumer query (every caller must
// remember the filter; miss one and the data leaks):
(function executeRule(current, previous) {
// ... and a Scripted REST / report elsewhere forgets to add the same filter
})(current, previous);

// DO — one before-query Business Rule on the table (When: before, Query),
// privileged roles short-circuit so admins/fulfillers see everything:
(function executeRule(current, previous) {
if (gs.hasRole('admin')) { return; }
if (gs.hasRole('itil') || !gs.isInteractive()) { return; }
var userId = gs.getUserID();
current.addQuery('caller_id', userId).addOrCondition('opened_by', userId);
})(current, previous);
```

### Rule 4 — Changing an ACL requires `security_admin` elevation; make the change on sub-production first

A normal admin can view and debug ACLs but cannot create or modify them — that needs an
explicit elevation to the `security_admin` role for the session. Treat ACL edits as
privileged change: elevate, change on a sub-production instance, verify, then promote
through the current project's approved deployment mechanism.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/platform-security/access-control/exploring-access-control-list.md` (security_admin to edit ACLs), `repos/ServiceNowDocs/markdown/platform-security/t_ElevateToAPrivilegedRole.md`

```javascript
// DON'T — wire ACL creation into a fix/background script and run it straight on prod.
// var grAcl = new GlideRecord('sys_security_acl'); grAcl.initialize(); ... insert();
// Unelevated it fails or, worse, lands an untested rule on production data.

// DO — elevate to security_admin in the UI (banner > Elevate Roles), author/edit the
// ACL on sub-production, verify (Rule 5), then use the approved deployment path.
```

### Rule 5 — Verify ACLs by impersonating the target persona — a test as admin proves nothing

Admin overrides ACLs (the per-rule **Admin Overrides** option, default-on for new
instances), so admin sees and edits everything regardless of the rule. The only honest
test is to impersonate a user who holds exactly the intended role and confirm **both** the
happy path (intended access works) and the negative path (restricted data is hidden).

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/platform-administration/user-administration/c_ImpersonateAUser.md`, `repos/ServiceNowDocs/markdown/platform-security/access-control/t_EvalAdmOverrideAccLevel.md` (admin overrides)

```javascript
// DON'T — "tested it, I can see the record" while logged in as admin.
// Admin Overrides means that proves nothing about the persona's real access.

// DO — impersonate the persona and check both directions:
// 1. Impersonate a user with x_acme.invoice.reader → confirm they READ invoices.
// 2. Impersonate a user WITHOUT it → confirm the invoice list/field is hidden.
// (Optional automated mirror: an ATF "Run Server Side Script" using GlideRecordSecure
// as the persona; but admin-context unit checks never prove an ACL.)
```

### Rule 6 — Don't open ACLs across scopes; expose cross-scope data through a Script Include or Scripted REST

A scoped app can only create/modify ACLs for objects in its own scope (and can't add a
role to an ACL in another scope). Reaching into another scope by loosening that scope's
ACLs is both blocked by design and a security smell. Share data across scopes through a
deliberate interface instead.

*The "expose via Script Include / Scripted REST" recommendation is Model judgment, low
confidence; the scope restriction it works around is grounded.*

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/platform-security/access-control/exploring-access-control-list.md` (cross-scope ACL restriction)

```javascript
// DON'T — from x_acme, try to widen another scope's table by editing its ACLs
// (blocked by the platform, and the wrong design even if it weren't).

// DO — the owning scope exposes a thin, access-checked Script Include API;
// other scopes call it instead of touching the data directly:
var summary = new x_owner.InvoiceApi().getSummaryForUser(gs.getUserID());
```

### Rule 7 — Data returned through GlideAjax / server scripts can bypass record ACLs — query sensitive data with `GlideRecordSecure`

A plain `GlideRecord` runs in the script's context and can return rows the calling user
could not read directly; surfaced through a GlideAjax / Scripted REST response, that
leaks data the ACLs were meant to hide. Keep AJAXGlideRecord ACL checking enabled and use
`GlideRecordSecure` for sensitive reads so ACLs are enforced on the query itself.
This is the reason to use `GlideRecordSecure` for user-facing sensitive reads: it closes
the ACL bypass rather than merely changing query syntax.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/platform-security/access-control/r_ApplyACLsToAJAXGlideRecord.md`

```javascript
// DON'T — client-callable Script Include returns rows via plain GlideRecord;
// the response carries records the caller's ACLs would have hidden.
getInvoices: function () {
var grInv = new GlideRecord('x_acme_invoice');
grInv.query();
// ... serialized straight back to the client = ACL bypass
},

// DO — enforce ACLs on the query with GlideRecordSecure:
getInvoices: function () {
var grInv = new GlideRecordSecure('x_acme_invoice');
grInv.query();
// ... only rows this user may read are returned
},
```

### Rule 8 — Gate access with **Requires role** + condition first; reach for a scripted ACL only as a last resort

An ACL grants access only when the role, the condition, **and** any script all evaluate
to true. The **Script** field is the most powerful and the least transparent lever — it
runs on *every* access check for the object (even when the field isn't on the form), can't
be read at a glance like a role list, and is the thing security teams hunt for when
auditing who can reach what. Express the rule with **Requires role** + a **Data Condition**
whenever they can carry it; reserve a script for a dynamic check roles and conditions
genuinely can't express.

*The "last resort / prefer roles + conditions" ordering is Model judgment, low confidence,
based on least privilege; the platform ships the Scripting Governance
Tool to find and govern scripted ACLs, which corroborates treating them as the exception.
The evaluation mechanics below are grounded.*

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/platform-security/access-control/t_CreateAnACLRule.md`

```javascript
// DON'T — bury a simple role check in the ACL Script field (opaque, runs on every
// access check, invisible to a role audit):
// Script: answer = gs.hasRole('x_acme.invoice.reader');
// A Requires role entry expresses exactly this, declaratively.

// DO — use Requires role + Data Condition; reserve Script for the genuinely dynamic case
// (here: caller may read only their own department's invoices), returning answer:
// Requires role: x_acme.invoice.reader
// Script:
var answer = false;
if (current.department.toString() === gs.getUser().getDepartmentID().toString()) {
answer = true;
}
```

### Rule 9 — Never pass user-controllable input into `eval()` / `GlideEvaluator` — it is a server-side script-injection vector

Evaluating a string built from user input runs that string as server-side code in the
script's context. The platform's own AJAX evaluator is locked down for exactly this reason
— left open, "a user can easily execute scripts as an admin privilege." The same hole
exists in any custom script that evaluates a field, parameter, or request body. Validate
against an allow-list and branch on known values; never evaluate the raw input. For API
choice when executing fully trusted generated code, see `→ scripting.md` Rule 2.

*The "never evaluate untrusted input; map to an allow-list instead" rule is
defensive-coding judgment (Model judgment, low confidence); the "evaluation of attacker
input executes as admin" risk and the allow-list/positive-validation principle are
grounded.*

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/platform-security/instance-security-hardening-settings/sc-disable-ajaxevaluate.md`, `repos/ServiceNowDocs/markdown/platform-security/instance-security-hardening-settings/validation-sanitization-encoding.md`

```javascript
// DON'T — evaluate a string assembled from user input; the caller picks the code that runs:
var sortField = request.queryParams.sort; // attacker-controlled
var result = eval('current.' + sortField + '.toString()'); // server-side code injection

// DO — validate the input against a fixed allow-list and branch on known values:
var ALLOWED_SORT_FIELDS = ['number', 'priority', 'opened_at'];
var sortField = request.queryParams.sort;
if (ALLOWED_SORT_FIELDS.indexOf(sortField) === -1) {
sortField = 'number';
}
var result = current.getValue(sortField);
```