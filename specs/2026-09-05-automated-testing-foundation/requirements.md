# Automated Testing Foundation — Requirements

> **Document status:** Approved for implementation planning  
> **Approved:** September 5, 2026  
> **Implementation status:** Not started  
> **Roadmap owner:** Phase 2 — Automated Testing Foundation

Related constitution files: [Mission](../mission.md) · [Tech Stack](../tech-stack.md) · [Roadmap](../roadmap.md) · [Current State](../current-state.md)

## 1. Purpose

Jamro Tools needs a deterministic automated-testing foundation before trust remediation or catalog expansion. This feature introduces the tools, test seams, regression coverage, browser smoke coverage, commands, and maintainer documentation required by Roadmap Phase 2 without intentionally changing shipped behavior.

The suite is a characterization layer. It records verified current outputs and workflows so later remediation can change behavior deliberately under a separate approved specification.

### 1.1 Approved decisions

| Decision | Approved choice |
|---|---|
| Feature breadth | Deliver the whole Phase 2 testing foundation as one feature. |
| Durable testing guide | Create `specs/testing.md` during implementation in addition to this dated feature package. |
| Result oracle | Characterize verified current behavior; separate formula or policy corrections into remediation specs. |
| Sanity isolation | Use an explicit test-only fixture adapter; never use a live test or production dataset. |
| Browser-test breadth | Keep Playwright to critical journeys in Chromium; cover all 20 tools primarily through unit regression tests. |
| Coverage record | Document dated metrics and important gaps; do not commit generated coverage artifacts or impose an arbitrary global threshold. |

## 2. Scope

The implementation must:

1. Add Vitest for pure TypeScript unit tests and calculation regression tests.
2. Add React Testing Library and `user-event` in a browser-like Vitest environment for component behavior.
3. Add Playwright with Chromium only for a small critical-journey smoke suite.
4. Provide critical calculation or transformation regression coverage for all 20 tools listed in `data/tools/index.ts` and the component registry.
5. Extract embedded calculator logic into pure modules only where required to test it deterministically.
6. Cover shared search/navigation and representative calculator interactions at component level.
7. Cover public route health, discovery, representative tools, theme persistence, fixture-backed blog availability, and contact success/validation/error behavior at browser level.
8. Isolate Sanity, time, locale-sensitive formatting, browser storage, and other unstable boundaries with deterministic fixtures or mocks.
9. Add the commands and maintainer documentation defined below.
10. Record a dated initial coverage baseline and critical untested paths.

### 2.1 Explicit exclusions

This feature must not:

- correct formulas, regional rules, copy, claims, accessibility defects, catalog inconsistencies, or unrelated bugs discovered by tests;
- redesign pages or intentionally change public interactions or rendered results;
- clear the existing lint backlog or add CI, which remain Phase 3 work;
- harden production contact validation, abuse controls, retention, or monitoring;
- add test coverage for aspirational/unimplemented catalog entries;
- add Firefox, WebKit, visual-regression, performance, or live-service test suites;
- use a live or dedicated Sanity dataset for automated tests;
- add accounts, cloud histories, public APIs, or any other capability excluded by the mission.

## 3. Required Interfaces

The implementation must expose these npm commands:

| Command | Required behavior |
|---|---|
| `npm test` | Run Vitest unit and component tests once and exit. |
| `npm run test:watch` | Run Vitest in interactive watch mode. |
| `npm run test:coverage` | Run the same Vitest suites once and emit coverage output. |
| `npm run test:e2e` | Run the Playwright Chromium smoke suite against its managed local web server. |

Configuration must keep unit/component tests separate from Playwright discovery. Coverage output, Playwright reports, traces, screenshots, videos, and other generated test artifacts must be ignored by Git.

### 3.1 Test-only data mode

- Sanity access must be placed behind narrow application-owned read and write boundaries rather than mocking Sanity query strings throughout tests.
- Unit and component tests must inject or mock those boundaries directly.
- Playwright must start the local application with `NEXT_PUBLIC_JAMRO_TEST_MODE=fixtures`; only the exact value `fixtures` enables the deterministic adapter.
- Fixture mode must return stable blog/category/teaser data and a deterministic contact-write success result without constructing or calling the production Sanity write client.
- Fixture mode is test-only. A Vercel production environment (`VERCEL_ENV=production`) must reject or ignore fixture mode so a deployment cannot accidentally serve fixture data.
- The normal application path, including an ordinary production build with the test-mode variable unset, must continue to use the existing Sanity clients.
- No test command may require `SANITY_API_WRITE_TOKEN` or any production secret.

## 4. Business Rules

1. **Current behavior is the oracle.** Before extracting a calculation, record representative results from the existing implementation. The extracted function and UI must reproduce those results, including current rounding and display conventions.
2. **Defects are evidence, not scope expansion.** If current behavior is internally inconsistent, unsafe to encode, or contradicted by an authoritative source, document it as a named gap with reproduction evidence. Do not silently fix it or write a knowingly false “correctness” assertion.
3. **Every implemented tool is covered.** The authoritative set for this feature is the intersection of the 20 `ToolConfig` records and 20 registered React components at implementation start. A mismatch blocks completion and is recorded rather than broadened into catalog remediation.
4. **Test at the lowest useful level.** Mathematical branches and transformations belong in pure unit tests. DOM tests prove user-visible wiring and states. Playwright proves only cross-boundary critical journeys.
5. **Assertions must be observable.** Prefer returned values, accessible names, visible messages, navigation, and stored theme/history behavior. Do not make CSS class names or implementation-private React state the primary contract.
6. **Numeric assertions must be deliberate.** Exact integer/currency results may use equality after the application’s rounding. Floating-point results must use an explicit tolerance justified by the current display precision.
7. **Tests must be independent.** Each test establishes and clears its own fake timers, storage, fixture state, mocks, and DOM state. Execution order, local timezone, machine locale, and network availability must not affect results.
8. **No snapshots as a substitute for behavior.** Focused snapshots are allowed only for stable structured output where field-level assertions would be less readable; broad page or component snapshots are prohibited.
9. **No production writes.** An attempted request to a Sanity API host during automated testing is a failing test, not a fallback.

## 5. Permissions, Privacy, and Safety

- Tests may read repository files, start a localhost server, and create disposable reports, browser profiles, screenshots, traces, and caches under ignored paths.
- Tests may not use production tokens, mutate a remote dataset, call analytics endpoints, send contact submissions externally, or rely on a maintainer’s browser profile or `localStorage`.
- Test fixtures must contain invented content and identities only; no copied contact submissions or personal data.
- Console interception must not suppress unexpected errors. Expected error-path logging may be asserted and restored within the owning test.
- Playwright must fail requests to Sanity write/read hosts and suppress or stub analytics and other nonessential third-party traffic so the smoke suite is offline-capable after dependencies and browsers are installed.
- Test-only switches must not provide a general-purpose public mock API or expose secrets in `NEXT_PUBLIC_*` variables.

## 6. Required States and Failure Behavior

### 6.1 Calculation and component states

Where the current tool supports them, tests must cover:

- initial/default or empty state;
- valid-input result state;
- boundary state such as zero, equal values, a bracket/threshold edge, or date reversal;
- invalid, incomplete, or non-finite input behavior;
- mode/tab/toggle changes and recalculation;
- persistence, restoration, and clearing for the basic/scientific calculator histories and the site theme.

Tests must characterize existing handling if a component currently clamps or coerces invalid input instead of displaying an error.

### 6.2 External-flow states

- Blog: deterministic populated state and deterministic empty/error handling wherever that state already exists in the UI.
- Contact: client-side submission pending, fixture-backed `201` success, actual route `400` missing-field validation, and user-visible `500` failure behavior. The Playwright `500` case may intercept `/api/contact`; it must not add a production-only error trigger.
- Test run: pass, assertion failure, fixture/configuration failure, and local-server startup failure must produce distinct actionable output and a non-zero exit for failures.

## 7. Validation Rules

- Use explicit dates and fake system time for age/date behavior; include a leap-day case and both input orders.
- Stabilize locale/timezone-sensitive formatting or assert normalized underlying values plus intentional visible formatting.
- Cover zero denominators, zero interest, empty collections/text, maximum/minimum score inputs, negative-result scenarios, and non-finite numeric input wherever applicable.
- Financial projections must cover at least one ordinary amortizing case and their material branch conditions, while retaining the current assumptions and version labels.
- Registry/config enumeration must fail if an implemented tool lacks its required unit regression suite.
- Playwright locators must use roles, labels, and visible names wherever the UI exposes them. Missing accessible selectors should be logged as Phase 3 accessibility debt unless a behavior-preserving label is necessary for stable testing.

## 8. Acceptance Criteria

- **AC-01:** Vitest, React Testing Library, `user-event`, coverage support, Playwright, and Chromium are configured compatibly with the approved Next.js/React/TypeScript stack.
- **AC-02:** All four required npm commands exist, are documented, and perform the behaviors in Section 3.
- **AC-03:** Every one of the 20 implemented tools has deterministic happy-path, material boundary, and invalid/coercion regression coverage appropriate to that tool.
- **AC-04:** Shared header search/navigation and representative simple, complex, mode-based, and storage-backed calculator workflows have component coverage.
- **AC-05:** Chromium smoke tests pass for core route health, search/discovery, percentage calculation, mortgage calculation, theme persistence, fixture-backed blog availability, and contact success/validation/error flows.
- **AC-06:** Sanity, analytics, time, locale, and browser storage boundaries are deterministic; automated tests make no production Sanity requests or writes.
- **AC-07:** Pure-logic extraction preserves the pre-extraction characterization vectors and introduces no intentional product behavior change.
- **AC-08:** `specs/testing.md` documents setup, commands, suite ownership, fixture mode, diagnosis, a dated coverage summary, and named critical gaps.
- **AC-09:** Coverage reports are generated but not committed, and no arbitrary global coverage percentage is used as a merge gate.
- **AC-10:** `npm test`, `npm run test:coverage`, `npm run test:e2e`, `npx tsc --noEmit --incremental false`, and `npm run build` pass from a clean checkout with documented prerequisites.
- **AC-11:** The existing global lint debt is not increased by changed TypeScript/TSX files; clearing the repository-wide backlog is not an acceptance condition.
- **AC-12:** Any behavior defect discovered during implementation is recorded with affected tool, inputs, actual result, expected concern/source if known, and recommended separate remediation scope.
