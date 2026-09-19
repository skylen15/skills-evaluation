# Run UI Test

Reference for scripts pasted into an ATF **Run UI Test** step. The injected runner is the
contract. Inspect [`references/snTestRunner/index.jsx`](references/snTestRunner/index.jsx)
before using helpers not listed here or changing this reference.

## Paste shape

Use one async IIFE with the injected arguments in this order:

```javascript
(async function executeStep(screen, user, sn_atf, expect, waitFor, within, steps, params) {
// Arrange, act, assert.
})(screen, user, sn_atf, expect, waitFor, within, steps, params);
```

This is modern browser JavaScript, not Rhino. Keep the file self-contained: no imports,
exports, local mocks, or undeclared external helpers.

## Testing Library discipline

`screen` is bound to the current ATF iframe document. Navigation through `sn_atf` rebinds
that container after the page loads.

- Prefer accessible queries in this order: role, label, placeholder, text, display value;
use test id or CSS selector only when the UI exposes no usable semantic locator.
- `getBy*` is synchronous and requires exactly one match. `findBy*` waits for appearance.
`queryBy*` is for asserting absence. Use the corresponding `*AllBy*` form only when
multiplicity is intentional.
- `screen` also supplies shadow-piercing `getBySelector` / `queryBySelector` and their
`All` / `find` forms. State why a semantic query cannot express the target.
- Use `within(element)` to scope repeated controls.
- Await every `user` interaction: `click`, `dblClick`, `tripleClick`, `hover`, `unhover`,
`keyboard`, `tab`, `clear`, `selectOptions`, `deselectOptions`, `upload`, `copy`, `cut`,
`paste`, and `type`.
- Assert observable state with the injected `expect`. Element values support DOM matchers
such as `toBeVisible`, `toBeEnabled`, `toBeChecked`, `toHaveAccessibleName`,
`toHaveTextContent`, and `toHaveValue`.
- Use `waitFor` for a state transition, not as a delay. Put an assertion in its callback.

## Cross-step values

`steps` and `params` are synchronous proxy accessors, not plain data objects:

```javascript
const recordId = String(steps('<source step sys_id>').record_id);
const table = String(params('table'));
const ownerName = String(params('owner').name);
const ownerDisplay = params('owner').getDisplayValue().toString();
```

- Pass the ATF **step sys_id** to `steps`; then access its declared output or dot-walk.
- Pass the parameter name to `params`; then coerce the returned value before comparing,
branching, interpolating, or asserting.
- Missing values resolve to an empty string. Assert required values after coercion.
- Produce IDs in an earlier step and pass them through this channel; never hardcode them.

## `sn_atf` boundary

Navigation and session:

- `await sn_atf.navigate(url)`, `reload()`, `goBack()`, or `goForward()`.
- `await sn_atf.impersonate(sysIdOrUserName)`; it reloads the iframe after success.
- `await sn_atf.delay(ms)` exists for unavoidable platform settling only. Prefer a
condition-based query or `waitFor`.

Page-realm execution:

```javascript
const result = await sn_atf.evaluate(
function (args) {
return document.querySelector(args.selector).textContent;
},
{ selector: '#status' }
);
```

`evaluate(fn, arg)` stringifies `fn`, evaluates it in the current ATF iframe window, and
returns or awaits its result. Therefore the function must be closure-free: pass every input
through `arg`, use APIs available in the page realm, and return serializable evidence for
assertion in the test realm. Use this escape hatch only when `screen`, `within`, and `user`
cannot reach the behavior.

### Behavior-ready, not merely rendered

Classic UI Page controls can exist before the page's client script has defined the functions
their inline handlers call. A readiness gate must wait for all behavior dependencies:

- the target document or overlay iframe;
- the required controls/questions;
- every page function the action will invoke.

Check functions in the page realm, for example
`typeof doc.defaultView.submitAssessment === 'function'`. Waiting only for the submit button
creates a timing-dependent failure where the DOM looks ready but submission code is absent.

### Prepare first, navigate second

Keep evidence serialization independent of navigation. For form journeys that need
page-realm evidence:

1. In one `evaluate`, apply inputs, call the UI Page's validation function, establish hidden
POST fields on the explicit `contentDocument`, and return bounded evidence.
2. Assert that evidence in the test realm.
3. In a second `evaluate`, schedule the form submission with page-realm `setTimeout(..., 0)`
and return immediately.
4. Wait on the resulting URL/DOM transition, then use a following server step to assert the
persisted record state.

When a form control named `submit` shadows `form.submit`, call
`HTMLFormElement.prototype.submit.call(form)` only after the page's own validation function
has succeeded and required hidden fields are set. The native call bypasses submit handlers;
it is the transport step, not a replacement for the UI Page contract.

Shadow-DOM helpers:

- `sn_atf.querySelector(root, selector)` and `querySelectorAll(root, selector)` require the
root argument; use `screen.getBySelector(selector)` when the current document is the root.
- `sn_atf.getActiveElement(root)` accepts an optional root and follows nested shadow roots.
- `await sn_atf.waitForElementToBeRemoved(callbackOrElement)` takes a query callback or an
existing element, not a CSS selector string.

Attachments:

- `upload(element, files)` drives a file input; `upload(attachmentSysId)` copies an existing
attachment to the current classic form.
- `uploadInWS`, `uploadInSP`, `uploadInSCVariable`, and `uploadInSPVariable` cover Workspace,
Service Portal, and catalog-variable targets. Verify their arguments in the vendored
runner before use because target context changes what can be inferred.
- `getAttachmentFile(sysId)` returns a browser `File` for an existing attachment.

## Completion gate

A Run UI Test step is complete only when all of these are true:

1. Every required cross-step value is coerced and asserted non-empty.
2. Every interaction, navigation, and asynchronous query is awaited.
3. Locators express user-visible semantics, or the selector escape hatch states why.
4. `evaluate` functions are closure-free and return evidence asserted in the test realm.
5. The final assertion proves the requested UI outcome, not merely that a click completed.
6. The pasted script runs successfully in the real ATF runner.