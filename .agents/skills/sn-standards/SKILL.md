---
name: sn-standards
description: ServiceNow standards. Use for automation; server/client scripting; data/query design; security; debugging; testing; integration architecture or implementation; Service Portal; Service Catalog; or naming platform artifacts.
---

# sn-dev ServiceNow coding standards

A self-contained baseline and judgment layer for ServiceNow work across repositories.
Explicit project instructions and ADRs override these global defaults. Surface unresolved
conflicts instead of silently choosing a rule.

**How to use:** read every file matching the work in the router, and no others.

## Router

| When you're… | Read |
|---|---|
| writing or reviewing any executable ServiceNow artifact | `core.md` |
| writing/reviewing a Business Rule, `gs.eventQueue` event, or Scheduled Job, or choosing Flow vs script | `automation.md` |
| writing/reviewing a Client Script, UI Policy, UI Action, the client half of GlideAjax, or `g_form` logic | `client.md` |
| designing tables, fields, or choice/state values, a Database View, or planning a large-table query | `data.md` |
| writing any server-side script and watching for general JS pitfalls (hardcoded values, `eval`, JEXL-in-Jelly, dot-walk-to-`sys_id`, `getDisplayValue`) | `scripting.md` |
| designing/reviewing ACLs or roles, or auditing a server path (GlideAjax / Scripted REST) that returns data | `security.md` |
| debugging server/client script, gating debug output, or reviewing logs / Slow Queries / the ECC queue / event logs | `debugging.md` |
| writing/reviewing a spec, choosing mock vs ATF, building ATF arrange data, or making a file paste-safe | `testing.md` |
| **choosing** an integration pattern (instance-to-instance, Zero Copy, Kafka/EDA, AI-agent, UI-embed, fallback) | `integration-patterns.md` |
| building an outbound REST/SOAP call, an inbound Scripted REST API, a spoke/Flow-vs-script choice, credential aliases, or bulk import | `integrations.md` |
| building/reviewing a Service Portal widget — controller, server script, options, the client→server call, or an Angular provider | `portal.md` |
| building a catalog item or record producer, variables/variable sets/MRVS, a catalog client script or UI policy, catalog fulfilment, or an order guide | `catalog.md` |
| naming a scoped app, a custom table/field/column, a choice/state value, a role, an event, a credential alias, or a catalog variable | `naming.md` |

## Shared rules

Area files carry design judgment beyond the executable baseline and do not restate it.

- **Three-way grounding.** Use `core.md` for portable executable-artifact defaults,
`sn-docs` for generic product/API behavior, and live `sn` CLI reads for instance facts
such as schema, configuration, data, code, choices, roles, and indexes.
- **"Model judgment, low confidence" label.** A rule (or bullet) carrying this label is
practitioner/GlideGrail judgment not grounded in local `sn-docs` — treat it as a strong
default, and verify on the instance before relying on it.
- **Application and completion gate.** Apply every applicable rule from loaded files. Surface
and resolve conflicts rather than silently picking a rule, verify any "Model judgment, low
confidence" rule on the instance before relying on it, and explicitly document intentional
exceptions.

Maintenance conventions, source credit, and citation policy live in `MAINTAINING.md`;
read it only when maintaining this skill.