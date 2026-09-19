# integration-patterns

**Which integration pattern to choose** — the selection layer *above* `integrations.md`.
This file answers "given the need, which pattern?"; `integrations.md` answers "now build
the chosen REST / Scripted REST / import call correctly."

**How to use:** walk the decision points top-down, land on a pattern, then cross to
`integrations.md` for the build rules (aliases, `RESTMessageV2` guards, thin Scripted REST,
staging-first imports). Colour intuition: the further down the fallback list you go, the
worse the pattern — if you land on a fallback, revisit earlier branches first.

## Source & trust

Distilled from Jochen Geist's **ServiceNow Integration Pattern Decision Tree** —
[ServiceNow Community, Architect blog](https://www.servicenow.com/community/architect-blog/integration-design-how-to-choose-the-best-pattern-to-integrate/ba-p/2874114).
**Trust: Community signal** (Tier 2) — authored by a ServiceNow employee but not official
`sn-docs`; several patterns are new/subscription-gated (Data Fabric, RaptorDB Pro, Stream
Connect, AI-agent tooling). **Confirm licensing/availability on the target instance
with the live `sn` CLI before designing around any of them**, and prefer the
`sn-docs`-grounded build
rules in `integrations.md` for the mechanics.

## The one guardrail that overrides the tree

**Prefer direct integration; prefer out-of-the-box; prefer persisting data locally.** Three
defaults sit under every branch below:

- **Direct over middleware.** An ESB / API Gateway adds governance but also failure points,
latency, TCO, and breaks native connectors (spokes/ITOM need direct API / a MID Server,
not middleware). Add middleware only when 3+ systems need the same transformation or a
regulator mandates one control point.
- **OOTB over custom**, in order: native connector (Plugin / Store app) → IntegrationHub
spoke → extend an existing spoke (Spoke Generator / OpenAPI import) → Technology-Partner
Store app → only then hand-built. (This is the same laddder as `integrations.md` Rule 1.)
- **Persist locally over copyless** unless volume/velocity, data-residency law, or
duplication/staleness cost forces querying at the source.

## [A] Web-service integration (the default branch)

REST + JSON is the default protocol. GraphQL rarely pays off on ServiceNow; SOAP only for a
legacy peer that demands it; ODBC read-only last resort.

- **Two ServiceNow instances** — pick by intent: provider/consumer workflows →
**Service Exchange** (HR variant: HR MII); bulk bi-directional sync → **Instance Data
Replication (IDR)**; real-time task/process sync → **Remote Process Sync (RPS)**; quick ad
hoc → **Remote Instance Spoke**; read-only cross-instance reporting → **Zero Copy
Connector**.
- **Initiating system & pull/push** — decide who triggers (ServiceNow vs third party) and
whether data is pulled or pushed; set a platform-wide guideline so every integration is
consistent. ServiceNow-initiated pull (scheduled import of foundation data) gives you
control over timing vs waiting to be pushed to.
- **Process (REST) APIs** (Service Catalog, Change, CMDB Identification/Reconciliation) —
use only when you want their built-in business logic. Limits: **no transformation**, data
must arrive ready; **reference fields need the `sys_id`**, not a display value; Transform
Map / ETL-style logic (conditional population, cross-table validation, dedup) does **not**
run. If you need those, use the Import Set API + Transform Map instead.
- **Read (outbound-to-ServiceNow) — Table API vs Scripted REST:** default is the consumer
reads ServiceNow's native structure and transforms on their side (keeps the API surface
simple). When they can't, or many consumers need the same shape, prefer a **Scripted REST
API calling a Subflow** (low-code transform) over a fully scripted API.
- **Write (inbound) — choose by operation:** importing data → **Import Set API + Transform
Map** (traceable, absorbs schema drift; Robust Import Set Transformer for multi-target).
Interacting with a process → Table API only if the caller sends ServiceNow's structure;
else **Scripted REST** (sync) or a **Flow with REST Trigger** (async). **Never write a
target table directly for a data import** — no transform, no import log, no reprocess;
breaks silently on payload change.

## [B] Copyless data access

Only when local persistence is wrong (volume/velocity, residency law, staleness). Cannot
populate an **existing** baseline table (`incident`, `cmdb_ci`, …) — zero-copy creates its
own virtual tables.

- Data in a **ServiceNow** instance, for analytics/BI → **SQL API** (needs RaptorDB Pro on
the source).
- Data in a **third-party** system → **Zero Copy Connector** into Data Fabric tables
(ServiceNow primary connectors > community connectors).
- System unsupported by Zero Copy but exposes a web service → **Remote Tables** (also allow
write-back, but complex and realistically only a few hundred rows — a lesser choice).

## [C] Event-driven architecture (Kafka only)

ServiceNow's EDA connector is **Stream Connect for Apache Kafka** — purpose-built for Kafka,
not a general broker. Different messaging system → route through Kafka or use a web-service
pattern.

- **Consume** (ServiceNow reacts to a topic): trigger a workflow → **Flow with Kafka Message
trigger** (low-code); stage/transform into one table → **Transform Map Consumer**;
multiple tables → **ETL Consumer**; anything else → **Script Consumer** (fallback).
- **Produce** (ServiceNow publishes): logs/audit → **Log Export Service**; other data →
**Kafka Producer Action Step** (Flow, low-code default) or **Scriptable ProducerV2 from a
BR** (high-volume/latency-sensitive, harder to maintain — move here only on hitting limits).

## [D] AI-agent integration (emerging — start deterministic)

Evaluate AI readiness (LLM governance, prompt mgmt, testing) first; start with
REST/spokes, introduce agentic patterns only where flexibility beats predictability.
Deterministic/regulated/audited → **REST as a tool** (not MCP). Non-deterministic:

- Single external agent uses ServiceNow → **ServiceNow MCP Server**; peer collaboration
(exchange plans, delegate) → **A2A Service**. ("MCP = agent uses a tool; A2A = agent talks
to another agent.")
- ServiceNow agent calling a third party deterministically, in preference order:
**Agentic Spoke** (Now Assist for Spokes) → **Tool wrapping a Subflow/Flow Action** →
**Scripted tool with `RESTMessageV2`**.
- System with **no API/MCP/A2A** → **Agentic Desktop** (Windows) or **Web Agent** (browser)
— goal-oriented, but slow, non-deterministic, hard to audit; last resort, plan infra early.

## [E] UI-level embedding

- ServiceNow components in an external page → **Web Embeddables** (needs a custom URL + CORS
+ maybe CSP; test cross-origin early). AEM host → **ServiceNow Components for AEM**.
- Native mobile app → **Mobile SDK**.
- Chatbot/assistant on a site: customer-facing → **Engagement Messenger**; employee-facing →
**Portable Virtual Agent widget** (Virtual Agent) or **Embedded AI Assistant**
(EmployeeWorks); quick Employee Center access → **Browser Extension**.
- Nothing else fits and you control the host's response headers → **iFrame** (last resort:
cross-origin, comms, and UX pain).

## [F] Fallbacks (only when A–E don't apply)

First confirm with the vendor there's really no API/webhook/file export. Then, by medium:

- **Database/SQL:** process interaction → **Flow Designer JDBC Action Step**; import →
**JDBC Data Source** (Import Set + Transform Map).
- **File:** image/PDF → **Document Intelligence**; other → file-type Data Source (in) or
**MID Server + Export Set** (out).
- **UI automation:** stable UI → **RPA Hub**; unstable UI → **Agentic Desktop / Web Agent**.
- **Email:** outbound → Notifications / Scheduled Reports; inbound → **Flow Inbound Email
Trigger**.
- **Screenshot/photo** → **AI Lens** (occasional, low-volume only). Else **manual transfer** —
and go back up the tree, you missed something.