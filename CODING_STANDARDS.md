# Coding Standards Router

A centralized standards router and decision baseline for engineering work in this repository.

**How to use:** Read every document matching your work in the router table below, and no others.

## Master Router

| When you're… | Read | Source |
|---|---|---|
| writing, modifying, or reviewing TypeScript code, domain models, error handling, schemas, or testing | [`standards/typescript.md`](./standards/typescript.md) | In-repo standard |
| working with ServiceNow Now SDK, Fluent metadata, TypeScript server modules, SPA hosting, Jelly safety, or BFF endpoints | [`standards/servicenow-now-sdk.md`](./standards/servicenow-now-sdk.md) | In-repo standard |
| authoring platform-native Business Rules, Client Scripts, Flow actions, ACLs, Script Includes, Catalog, or database queries | `skill://sn-standards` (`core.md`, `scripting.md`, `data.md`, `security.md`, `automation.md`, `client.md`) | Global agent skill |

## Shared decision priority

When rules or guidelines pull in different directions, resolve them in this order:

1. **Instance integrity & platform safety**: Prevent unbounded queries, data corruption, ACL bypasses, and unreviewed live instance mutations.
2. **Runtime boundary correctness**: Enforce strict module import extensions, platform envelope unwrapping (`{ "result": T }`), and Jelly/XHTML syntax compliance.
3. **Core engineering & TypeScript principles**:
   - Prefer **errors as values** over `throw` / rejected promises for expected failures.
   - **Parse early**, don't merely validate and discard information.
   - Make illegal states unrepresentable using branded types and tagged unions.
   - Design deep, cohesive modules with low caller burden.
   - Test behavior through real seams; avoid module mocking and spy-driven tests.
4. **Project architecture & idiom consistency**: Follow established project conventions before introducing new abstractions.
5. **Simplicity over speculative frameworks**: Prefer focused functions and single-purpose modules over broad migrations or premature configurability.
