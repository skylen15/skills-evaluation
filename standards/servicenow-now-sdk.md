# ServiceNow Now SDK, Fluent & Modern Architecture Standards

Specific engineering standards for working with the ServiceNow Now SDK (`@servicenow/sdk`), Fluent metadata-as-code, TypeScript server modules, Scripted REST APIs (BFF), and platform-hosted Single Page Applications (SPAs).

For standard platform scripting, GlideRecord bounds, Business Rules, Client Scripts, ACLs, and Catalog design, consult the installed **`skill://sn-standards`** (`core.md`, `scripting.md`, `data.md`, `security.md`).

## 1. Module resolution and import mechanics

ServiceNow executes server modules via the `sys_module` runtime, while Now SDK builds compile in Node.js ESM:

- **Server-to-server relative imports**: Relative imports inside `src/server/*.ts` MUST specify the `.ts` extension:
  ```ts
  import { calculateVisibility } from "./plan-visibility.ts";
  ```
  This is required for runtime resolution in ServiceNow's `sys_module` table.
- **Fluent-to-server imports**: Fluent metadata files (`src/fluent/*.now.ts`) importing server handlers MUST use the `.js` extension:
  ```ts
  import { getPlans, getSummary } from "../server/plan-rest.js";
  ```
  This satisfies the Node.js module loader during `now-sdk build`.
- **Global API declarations**: Import platform types and APIs from `@servicenow/glide` (e.g. `import { GlideRecord, gs } from "@servicenow/glide"`).

## 2. Now SDK Fluent metadata conventions

Declare platform metadata declaratively via `@servicenow/sdk/core`:

- **Entity separation**: Split Fluent files by domain entity (e.g. `plan.now.ts`, `plan-api.now.ts`).
- **Scope prefixing**: Prefix all custom tables and fields with the application scope name (`x_<vendor>_<app>_*`).
- **Generated keys**: Treat `src/fluent/generated/` as read-only build artifacts managed by `now-sdk dependencies`; never edit generated keys by hand.
- **Explicit relationships**: Always specify target tables when defining reference columns (`ReferenceColumn({ target: "sys_user", ... })`).

## 3. Scripted REST APIs (BFF) & Envelope Contracts

Scripted REST APIs act as a Backend-For-Frontend (BFF) connecting web clients to ServiceNow records:

### Architecture: Thin controller, functional core
- **Protocol controller (`src/server/*-rest.ts`)**: Extracts parameters, calls domain functions, and sets HTTP status codes on the response object.
- **Domain core (`src/server/*.ts`)**: Pure business logic, query construction, and data calculations. Zero HTTP dependencies.

### Platform response envelope: `{ "result": T }`
- **Server serialization**: Pass domain data directly to `response.setBody(data)`. The ServiceNow platform injects the outer `{ "result": data }` envelope automatically.
- **Client boundary unwrapping**: Per [typescript.md](./typescript.md#boundary-envelopes-and-platform-responses), client network adapters must parse and unwrap `{ result: T }` immediately at the network edge before passing data to application state or UI components. Never leak the platform envelope into views.
- **HTTP status mapping**:
  - `200 OK`: Successful read or idempotent update.
  - `201 Created`: Successful resource creation.
  - `400 Bad Request`: Parameter or schema validation failure.
  - `401 Unauthorized`: Unauthenticated session.
  - `403 Forbidden`: Authenticated user lacks required role/ownership.
  - `404 Not Found`: Target record does not exist.
  - `422 Unprocessable Entity`: Business domain invariant violation.

## 4. Single Page Application (SPA) Hosting & Platform Constraints

Deploying modern web frontends (React, Vite) directly into ServiceNow involves three system tables and strict XML/Jelly constraints:

### Platform storage tables

| Asset Type | Platform Table | Identity Key | URL Endpoint | Constraint |
|---|---|---|---|---|
| JavaScript Bundles | `sys_ui_script` | `name` | `/{name}.jsdbx` | **Max 40 chars** for `name`. `ui_type=0`, `global=false`. |
| CSS Stylesheets | `content_css` | `name` | `/{sys_id}.cssdbx` | Must link via **32-character sys_id**. `/{name}.cssdbx` returns 404. |
| Root HTML Shell | `sys_ui_page` | `name` | `/{name}.do` | `direct="true"`. Must be valid XML/Jelly. |

### Strict XML / XHTML compliance
ServiceNow UI Pages parse markup through a server-side XML/Jelly engine:
- **Self-close void elements**: Void tags must end with `/>` (`<meta ... />`, `<link ... />`, `<img ... />`, `<br />`).
- **Lowercase attribute names**: Use standard lowercase HTML attributes.
- **Escape XML entities**: Replace raw `&` with `&amp;`, `<` with `&lt;`, `>` with `&gt;`.

### Jelly syntax conflict: `${...}` template literals
The platform Jelly engine interprets `${...}` syntax as a server-side variable expression.
- **The hazard**: If a UI Page HTML shell contains a JavaScript ES6 template literal `${foo}`, Jelly silently resolves and strips it, breaking frontend execution.
- **Mandatory rules**:
  1. Extract all application JavaScript into external bundles uploaded to `sys_ui_script` (`.jsdbx`). External scripts are not evaluated by Jelly.
  2. For inline scripts, escape dollar signs (`\${foo}`) or construct dynamically (`"$" + "{foo}"`).
  3. Validate client builds with an automated Jelly sanitization step before deployment.

## 5. Testing & Live Instance Safety Gates

- **Local-first verification**: Test server logic and transformations in Node using dependency injection or lightweight query doubles before deploying to an instance.
- **Read-only live inspection**: Commands like `sn table query` or `sn script search` are safe to run for grounding.
- **Mutation gate**: Any state-mutating command (`sn script run`, `sn record create|update|delete`, `now-sdk install`, or deployer runs) requires explicit user approval and a preview of the script or payload.
