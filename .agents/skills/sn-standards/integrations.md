# integrations

Portable integration defaults for where an endpoint goes, how it is wired, and how it
authenticates. Universal executable-artifact rules live in `core.md`.

**Choosing the pattern first?** This file is the *build-the-call* layer. Which pattern to
pick in the first place — instance-to-instance, copyless/Zero Copy, event-driven (Kafka),
AI-agent, UI-embedding, or a fallback — is `→ integration-patterns.md`. Land on a pattern
there, then come here for the mechanics.

## Scope

- **Covers:** outbound calls (`sn_ws.RESTMessageV2` / `SOAPMessageV2`, auth profiles, MID
Server), inbound Scripted REST APIs (resources, verbs, status, versioning), the
spoke/Flow-vs-script decision, Connection & Credential aliases / OAuth config, and bulk
inbound via Import Set + Transform Map.
- **Hands off:** the ACL/role/least-privilege model behind an endpoint → `security.md`; the
thin-wrapper (endpoint/BR is routing, logic lives in a Script Include) principle →
`automation.md`; alias/integration-user *naming* → `naming.md`.

## Rules

### Rule 1 — Prefer a spoke/Flow when the instance supports it; script the integration only as the documented exception

Reach for an IntegrationHub spoke / Flow action first. IntegrationHub is
subscription-gated, so establish support before designing around it: inspect the target
instance with the live `sn` CLI or obtain explicit confirmation from the project owner. No
IntegrationHub licence is the documented exception that drops to the scripted
`RESTMessageV2` / Scripted REST path; record why it was chosen.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/integrate-applications/integration-hub/request-ih-overview.md`

```javascript
// DON'T — hand-roll RESTMessageV2 for a system a spoke already covers, on an
// IH-licensed instance, without checking (re-implements a supported spoke)
(function () {
var sm = new sn_ws.RESTMessageV2();
sm.setEndpoint('https://slack.com/api/chat.postMessage');
// ...manual auth, payload, retry — all of which the spoke gives you
})();

// DO — confirm IH support first with live instance data or explicit owner confirmation, then use the
// spoke/Flow action. Script it ONLY when IH is unlicensed — and say so:
// IH licensed → Slack spoke "Post Message" action from a Flow.
// No IH licence (documented exception) → thin RESTMessageV2 per Rule 3.
```

### Rule 2 — Never inline an endpoint or credentials; reference a Connection & Credential alias

Hardcoding a URL + username/password bakes one environment into the code and leaks secrets
into scripts. A Connection & Credential alias holds the connection + credential and resolves
at runtime, so DEV/QA/PROD swap without touching any action or script. For OAuth, register a
provider + entity profile + credential record and tie them through the alias — the platform
mints and refreshes tokens; **Client Credentials** is the read-only default grant for
server-to-server.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/platform-security/connections-and-credentials/credentials-connections-alias.md`, `repos/ServiceNowDocs/markdown/platform-security/connections-and-credentials/connection-alias.md`, `repos/ServiceNowDocs/markdown/platform-security/connections-and-credentials/configure-oauth-2-0-authentication.md` (Client Credentials is the default grant)

```javascript
// DON'T — endpoint + credentials inline: env-locked, and the password is in the script
(function () {
var sm = new sn_ws.RESTMessageV2();
sm.setEndpoint('https://api.qa.example.com/v1/tickets');
sm.setBasicAuth('svc_acct', 'S3cr3t!'); // secret in source, wrong on every other env
})();

// DO — resolve connection + credential through an alias (swap envs with no code change)
(function () {
var sm = new sn_ws.RESTMessageV2();
sm.setConnectionAlias('x_acme.example_tickets'); // endpoint + creds from the alias record
})();
```

### Rule 3 — Outbound: use `sn_ws.RESTMessageV2`, wrap in try/catch, check the status, go async when it needn't block

Send outbound REST through the `sn_ws.RESTMessageV2` API. `execute()` can throw (timeouts),
so wrap it and read `getStatusCode()` / `haveError()` before trusting the body. When the call
needn't hold the user's transaction, use `executeAsync()` and process the response in a
separate business rule. Constrain redirects with `setAllowedRedirectURIs([...])` to blunt
URL-redirect (SSRF) attacks. Outbound SOAP mirrors this exactly via `sn_ws.SOAPMessageV2`.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/api-reference/server-api-reference/c_RESTMessageV2API.md`, `repos/ServiceNowDocs/markdown/api-reference/web-services/c_ScriptingOutboundREST.md`, `repos/ServiceNowDocs/markdown/api-reference/server-api-reference/c_SOAPMessageV2API.md` (SOAP mirror)

```javascript
// DON'T — fire and trust: no try/catch, no status check; a timeout throws uncaught and
// a 4xx/5xx is read as success
(function () {
var sm = new sn_ws.RESTMessageV2();
sm.setConnectionAlias('x_acme.example_tickets');
var body = sm.execute().getBody(); // may throw; may be an error page
})();

// DO — guard the call, check the status, restrict redirects
(function () {
try {
var sm = new sn_ws.RESTMessageV2();
sm.setConnectionAlias('x_acme.example_tickets');
sm.setAllowedRedirectURIs(['https://api.example.com']);
var res = sm.execute();
if (res.getStatusCode() >= 300) {
gs.error('{0} outbound tickets call failed: {1}', ['[Integrations]', res.getStatusCode()]);
return;
}
// ...use res.getBody()
} catch (e) {
gs.error('{0} outbound tickets call threw: {1}', ['[Integrations]', e.message]);
}
})();
```

- **Model judgment, low confidence:** GlideGrail advises outbound calls should be
**async by default** (use `executeAsync()`, process the response in a follow-on BR). Not
found in local `sn-docs` (which confirms `executeAsync()` exists but states no
async-default rule) — treat as a strong default; verify on the instance.
- **Logging vs audit.** Log outcomes with `gs.*` and the `[Source]` parameter-array form from
`core.md`; do **not** add a custom logger. Durable **non-repudiation** capture (storing the exact
request/response for evidence) is a per-story *data-model* decision — model it as a record,
not a logger, and only when a story calls for it.

### Rule 4 — Set outbound auth via a profile, and design around the MID-Server limits

Attach auth with `setAuthenticationProfile('oauth2'|'basic', profileSysId)` (or the alias
from Rule 2), never inline `setBasicAuth`. Outbound REST supports basic, OAuth 2.0, and
mutual (protocol-profile) auth — but the MID Server narrows that hard: **OAuth 2.0 and
mutual-TLS both fail through a MID Server** (mutual auth pairs only with basic auth), and
`RESTMessageV2` has **no built-in retry**. If a call must both traverse a MID Server (to
reach a system behind the firewall) and use OAuth/mTLS, or needs automatic retry, use the
**IntegrationHub REST step** with a Retry Policy instead of the script API.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/api-reference/web-services/c_OutboundRESTAuth.md` (auth matrix, MID limits, no built-in retry), `repos/ServiceNowDocs/markdown/api-reference/web-services/c_OutboundWebServicesMutualAuth.md`, `repos/ServiceNowDocs/markdown/servicenow-platform/mid-server/mid-server-landing.md` (MID reaches behind the firewall)

```javascript
// DON'T — OAuth 2.0 through a MID Server: silently unsupported, the auth never applies
(function () {
var sm = new sn_ws.RESTMessageV2();
sm.setMIDServer('acme_mid');
sm.setAuthenticationProfile('oauth2', profileSysId); // not supported via a MID Server
})();

// DO — pick a combination the platform supports: basic auth through the MID (mutual auth
// only pairs with basic), OR OAuth without the MID, OR the IH REST step for
// MID+OAuth / built-in retry.
(function () {
var sm = new sn_ws.RESTMessageV2();
sm.setMIDServer('acme_mid');
sm.setAuthenticationProfile('basic', profileSysId); // supported through a MID Server
})();
```

### Rule 5 — Inbound: keep the Scripted REST resource thin — routing + status only — and delegate logic to a Script Include

A Scripted REST resource script should map the verb, validate, set the HTTP status, and call
a Script Include for the real work — the same thin-wrapper rule as a Business Rule (→
`automation.md`). That keeps the logic reusable and unit-testable as a mock spec while the
endpoint is tested for routing/status/payload. Honour verb semantics (GET never modifies;
POST creates; PUT/PATCH modify; DELETE destroys), return an accurate status, and signal
failures with the framework's `sn_ws_err` error objects rather than hand-rolled codes. For
large or variable non-JSON/XML responses, stream via `response.getStreamWriter()`; for small
consistent objects, return a serializable object.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/api-reference/rest-api-explorer/scripted-rest-good-practices.md` (verb semantics, informative errors), `repos/ServiceNowDocs/markdown/api-reference/rest-api-explorer/r_ScriptedRESTServiceScriptExamples.md` (`sn_ws_err.ServiceError`, wrap the function in parentheses), `repos/ServiceNowDocs/markdown/api-reference/rest-api-explorer/t_CreateAScriptedRESTService.md`, `repos/ServiceNowDocs/markdown/api-reference/rest-api-explorer/r_ScriptedRESTExampleStreamVsLO.md` (stream vs serialize)

```javascript
// DON'T — business logic inlined in the resource script (untestable, unreusable),
// no status handling on the error path
(function process(request, response) {
var gr = new GlideRecord('incident');
gr.get(request.pathParams.sys_id);
gr.setValue('state', 6);
gr.update();
return gr; // no status set; errors fall through as a 500
})(request, response);

// DO — thin resource: validate, delegate to a Script Include, set an accurate status;
// signal a bad request with a framework error object
(function process(request, response) {
var id = request.pathParams.sys_id;
if (!id) {
return new sn_ws_err.BadRequestError('sys_id is required');
}
var closed = new global.IncidentApi().close(id); // logic lives in the SI
response.setStatus(closed ? 200 : 404);
return closed ? { closed: id } : new sn_ws_err.NotFoundError('incident not found');
})(request, response);
```

### Rule 6 — Inbound: enforce access with `GlideRecordSecure` and a required `REST_Endpoint` ACL

A resource script runs with its own access — a plain `GlideRecord` can return rows the caller
could never read, leaking data through the response. Query with `GlideRecordSecure` so the
underlying ACLs apply to the requester, and require a `REST_Endpoint`-type ACL on the API
(stricter for write verbs than for GET). The ACL/role/least-privilege model and the
integration-user hardening (a separate auth profile per interface, least-privilege table/field
grants) live in **`security.md`** — this rule only says the endpoint must enforce them.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/api-reference/rest-api-explorer/scripted-rest-good-practices.md` (use `GlideRecordSecure`; writes need higher access than GET), `repos/ServiceNowDocs/markdown/api-reference/rest-api-explorer/t_WbSvcRqACL.md` (require a `REST_Endpoint` ACL)

```javascript
// DON'T — plain GlideRecord in a resource: returns rows the caller's ACLs would hide
(function process(request, response) {
var gr = new GlideRecord('x_acme_invoice');
gr.query();
var out = [];
while (gr.next()) { out.push(gr.getValue('number')); } // ACL bypass in the response
return out;
})(request, response);

// DO — GlideRecordSecure applies the caller's ACLs to the query (+ require a REST_Endpoint ACL)
(function process(request, response) {
var gr = new GlideRecordSecure('x_acme_invoice');
gr.query();
var out = [];
while (gr.next()) { out.push(gr.getValue('number')); } // only rows this user may read
return out;
})(request, response);
```

### Rule 7 — Version an inbound API from the start; never break a published version

Give the API a version (`/v1/`) from day one. Once a version is published, do not change its
behaviour in a way that breaks existing callers — add a **new version** for breaking changes,
and introduce only *optional* additions (a new optional parameter) in place.

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/api-reference/rest-api-explorer/scripted-rest-good-practices.md` (don't break a published version; add optional params or a new version)

```javascript
// DON'T — change a published /v1 resource so a required field's meaning shifts —
// every existing caller breaks silently on the next call.

// DO — keep /v1 stable; add /v2 for the breaking shape, or add an OPTIONAL param to /v1:
// GET /api/x_acme/tickets/v1/{id} (unchanged, still supported)
// GET /api/x_acme/tickets/v1/{id}?expand=sla (new, optional — safe to add in place)
// GET /api/x_acme/tickets/v2/{id} (new required-field shape lives here)
```

### Rule 8 — Land bulk/external feeds through an Import Set + Transform Map (staging-first), coalesce for insert-vs-update

Bulk, multi-row, or file-based inbound data should land in an import set (staging) table and
a Transform Map should write the target — never transform a large feed straight onto the
target table. Set a **coalesce** field so a matching record updates and a new one inserts, and
index that field on the target. (When one source must feed several target tables, or you want
batched single-read ETL, reach for a Robust Import Set Transformer instead of N maps.)

Docs checked: sn-docs — `repos/ServiceNowDocs/markdown/integrate-applications/system-import-sets/c_ImportSetsKeyConcepts.md` (staging table + transform map + coalesce), `repos/ServiceNowDocs/markdown/integrate-applications/system-import-sets/robust-import-set-transformers.md` (multi-target / batched alternative)

```javascript
// DON'T — parse a bulk file/feed and write the target table row-by-row from script
(function () {
data.forEach(function (row) {
var gr = new GlideRecord('cmdb_ci_server'); // no staging, no coalesce → dupes on re-run
gr.initialize();
gr.setValue('name', row.name);
gr.insert();
});
})();

// DO — load into a staging (import set) table with a Transform Map + coalesce on `name`;
// re-running the feed updates matched rows instead of duplicating them.
```

- **Model judgment, low confidence:** GlideGrail states the absolute *"never write a target
table directly, even from a Scripted REST endpoint."* Local `sn-docs` backs staging-first
for **bulk imports** but not this blanket rule — a **single validated write** from a
Scripted REST resource (Rule 5) is fine. Reach for staging when the feed is **bulk,
multi-row, or file-based**; verify on the instance before treating the absolute as policy.