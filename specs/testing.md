# Automated Testing Guide

This guide owns Jamro Tools' deterministic Vitest and Chromium testing foundation. The initial baseline was validated on September 6, 2026 with Node `v22.23.0` and npm `10.9.8`.

## Prerequisites and commands

Install the locked npm dependencies, then install the pinned Playwright Chromium build once:

```powershell
npm ci
npx playwright install chromium
```

The supported test interfaces are:

| Command | Purpose |
|---|---|
| `npm test` | Run all Vitest unit and component tests once. |
| `npm run test:watch` | Run Vitest interactively and rerun owning suites after edits. |
| `npm run test:coverage` | Run the Vitest suites with V8 coverage. |
| `npm run test:e2e` | Start a managed fixture-mode Next.js server and run Chromium journeys. |

Type and production-build validation use `npx tsc --noEmit --incremental false` and `npm run build`. The production build must be run with `NEXT_PUBLIC_JAMRO_TEST_MODE` and `VERCEL_ENV` unset.

Generated coverage, Playwright report/result, trace, screenshot, video, browser-state, and Vitest files are ignored. Do not commit them.

## Suite ownership

- `components/tools/calculators/logic/tool-regressions.test.ts` owns the characterization vectors and material branches for all 20 implemented tools.
- `test/tool-regression-manifest.ts` and `test/tool-inventory.test.ts` enforce the one-to-one relationship among tool configs, registered components, and regression-suite ownership.
- `components/tools/calculators/custom/calculator-workflows.test.tsx` owns the percentage, mortgage, income-tax, basic-calculator, and scientific-calculator rendered workflows.
- `components/layout/site-header.test.tsx` owns search/navigation, mobile-menu, and theme/storage behavior.
- `lib/content/boundaries.test.ts` owns fixture selection, production guarding, stable invented content, and proof that fixture contact writes do not call the Sanity client.
- `test/configuration.test.tsx` proves alias, jsdom, matcher, and shared test setup behavior.
- `e2e/critical-journeys.spec.ts` owns public route health, discovery, percentage, mortgage, theme, fixture-blog, and contact journeys in Chromium.

Pure calculation logic lives in `components/tools/calculators/logic/`; rendered components retain input state, presentation, and event wiring.

## Fixture mode and production-data safety

Playwright alone starts the app with `NEXT_PUBLIC_JAMRO_TEST_MODE=fixtures` and `VERCEL_ENV=development`. The exact string `fixtures` is required. `VERCEL_ENV=production` or a production Node build disables fixture mode even if that public variable is present, including in client-side code.

Fixture reads return the invented posts in `test/fixtures/content.ts`. Fixture contact writes always return `_id: fixture-contact-0001` and `createdAt: 2026-09-05T12:00:00.000Z`; they do not persist data and do not construct or call the production writer. No suite requires `SANITY_API_WRITE_TOKEN`.

The Playwright suite fails on any Sanity hostname, blocks analytics and nonessential third-party requests, uses fresh browser contexts, and scopes the expected console error from its deliberately intercepted contact `500`. Any other console error or page error fails its owning test. Unit setup fixes the timezone to UTC and clears the DOM, mocks, timers, and browser storage between tests.

Never reuse fixture mode as a public demo mode, put secrets in a `NEXT_PUBLIC_*` variable, or point automated tests at a live Sanity dataset.

## Updating characterization results

Current behavior is the oracle for this foundation. When an intentional behavior change has its own approved specification:

1. Reproduce the old vector and record why the expected result is changing.
2. Update the owning pure-logic assertion with an explicit exact value or display-precision tolerance.
3. Update a representative component or browser assertion if the visible contract changed.
4. Keep the inventory manifest at exactly one owning suite per implemented tool.
5. Run the complete validation set and update the dated baseline below if coverage materially changes.

Do not loosen tolerances, replace behavior assertions with broad snapshots, or silently normalize a suspected defect.

## Diagnosing failures

- A tool-inventory diff means a config, registry entry, or manifest row is missing or extra. Reconcile only implemented tools; do not add aspirational catalog entries.
- A fixture test that imports/calls Sanity usually means a read or write bypassed `lib/content/blog.ts`, `lib/blog-teasers.ts`, or `lib/contact/create-contact-query.ts`.
- A Playwright `Forbidden Sanity request` includes the offending URL. Treat it as a data-safety failure, not a request to permit network access.
- A local-server `EACCES` means the configured port is reserved or occupied. Port `4173` was selected because this Windows host reserves `2865-3564`.
- A production build font-fetch failure is environmental: Next.js downloads configured Google Fonts during compilation. Retry with ordinary network access; do not enable fixture mode.
- Storage-sensitive failures should first check the shared cleanup and whether the test created a fresh render/browser context.

## Initial coverage and validation baseline — September 6, 2026

`npm run test:coverage` on Node `v22.23.0` / npm `10.9.8` passed 108 tests in 7 files and reported:

| Metric | Baseline |
|---|---:|
| Statements | 89.42% |
| Branches | 79.44% |
| Functions | 90.76% |
| Lines | 90.47% |

All 20 tool logic modules are present in the checked-in inventory and coverage report. This is an observation baseline, not a global percentage gate.

The same 108-test suite passed in normal order and with seed `20260905` using `--sequence.shuffle`. Watch mode reran the touched configuration suite and exited cleanly. The final Chromium suite passed all 7 test cases twice consecutively (38.9 seconds and 43.1 seconds), with no Sanity or analytics application requests. TypeScript and a normal fixture-disabled production build passed. Repository lint improved from the captured 65 findings (32 errors, 33 warnings) to 59 source findings (30 errors, 29 warnings); the remaining findings are the pre-existing Phase 3 backlog.

### Critical untested paths

- Firefox, WebKit, visual regression, performance, and broad accessibility testing are excluded by the approved Phase 2 scope. Cross-browser or presentation regressions remain medium risk and belong to a future testing specification.
- All 20 tools have pure-logic regression coverage, but only representative calculators have full rendered DOM workflows. Tool-specific event/accessibility wiring outside those representatives remains medium risk and belongs to Phase 3 or later tool work.
- Normal Sanity selection is unit-tested with mocked clients, while live query schemas, credentials, latency, and service availability are deliberately not exercised. Integration drift is medium risk and should be owned by a future non-production contract-test specification.
- Contact abuse controls, retention, server-side validation hardening, and monitoring remain intentionally untested because they are separate roadmap work.

### Characterized behavior defects (not corrected here)

- **Loan calculator:** `principal=1000`, `annualRate=0`, `termYears=0` returns an infinite monthly payment because the current zero-interest branch divides by zero. The rendered term control does not offer zero, but the transformation accepts it. A separate input-contract remediation should decide whether to reject or clamp the term.
- **Basic calculator:** `8 ÷ 0 =` produces and stores `Infinity` instead of a user-facing error. A separate calculator error-policy specification should define divide-by-zero behavior.
- **Triple integral calculator:** an unsupported expression such as `not valid` yields `0`; invalid sample values are skipped until the zero accumulator is returned. The evaluator also uses `new Function` on a text expression. A separate validation/security remediation should define a supported grammar and explicit invalid-result state.
- **Age difference calculator:** `1990-01-01` to `1995-06-15` displays `5 years, 5 months, 12 days`, derived from `365.25`- and `30.44`-day approximations rather than calendar components. A date-semantics remediation should define the desired calendar behavior before changing it.
- **APUSH score calculator:** the implemented composite uses multipliers `1`, `3.11`, `4.5`, and `4.25` with a 140-point percentage denominator, while its FAQ describes `1.09`, `3.33`, `5.35`, and `3.75` out of 150. A versioned content/formula remediation should select an authoritative scoring model and update calculation and copy together.
