# Automated Testing Foundation — Implementation Plan

> **Document status:** Approved  
> **Approved:** September 5, 2026  
> **Implementation status:** Complete — validated September 6, 2026

This plan implements [requirements.md](./requirements.md) under the constraints in the project constitution. Task groups are ordered; later groups may assume earlier groups are complete. Application code must not be changed as part of this specification-only branch until implementation is separately authorized.

## 1. Establish the baseline and change guards

1. Record the Node/npm versions, the 20 config slugs, the 20 registered components, current typecheck/build results, and current lint baseline before implementation.
2. Verify the tool config and registry sets match one-to-one. If not, stop and record the mismatch as catalog debt; do not expand the feature to fix unrelated availability.
3. Capture representative current UI outputs for the validation vectors before extracting logic, including current rounding, clamping, date, and error behavior.
4. Add ignore rules for coverage, Playwright reports/results, traces, screenshots, videos, and temporary browser state without disturbing existing ignore policy.

## 2. Install and configure the test foundations

1. Add mutually compatible, lockfile-pinned development dependencies for Vitest, its coverage provider, jsdom, React Testing Library, DOM matchers, `user-event`, and Playwright.
2. Configure Vitest for strict TypeScript, `@/*` resolution, jsdom component tests, shared cleanup, DOM matchers, deterministic timezone, and coverage over owned application logic while excluding generated/framework/config files.
3. Keep Playwright tests outside Vitest discovery. Configure one Chromium project, retries only outside local development if later CI requires them, trace-on-first-retry, and a managed localhost Next.js development server using fixture mode.
4. Add the exact npm interfaces: `test`, `test:watch`, `test:coverage`, and `test:e2e`.
5. Add a small configuration self-test proving aliases, jsdom, cleanup, and environment setup operate as expected before broad suites are added.

## 3. Create deterministic application boundaries

1. Introduce narrow content-read operations for blog index/posts, categories, teasers, and sitemap data, backed by Sanity in normal operation and invented deterministic fixtures in test mode.
2. Introduce a narrow contact-write operation backed by the existing Sanity client normally and a no-network deterministic result in fixture mode.
3. Enable the browser fixture adapter only for the exact `NEXT_PUBLIC_JAMRO_TEST_MODE=fixtures` value, and add a Vercel production guard that rejects or ignores the mode.
4. Unit-test normal-versus-fixture selection, production guarding, stable fixture contents, and the rule that fixture contact submission never constructs/calls the Sanity writer.
5. Centralize reusable fixtures for blog content, categories, timestamps, contact responses, storage, and system time. Keep all fixture identities fictional.
6. Configure tests to fail on Sanity-host requests and to stub or block analytics/other nonessential third-party traffic.

## 4. Extract calculation logic and cover all 20 tools

1. Move embedded calculation/transformation logic into kebab-case pure TypeScript modules colocated with, or in a clearly named logic directory beside, their owning components. Keep components responsible for input state, presentation, and events.
2. Preserve the captured pre-extraction outputs exactly. Do not normalize inconsistent formulas or error handling during extraction.
3. Add table-driven unit suites for the 10 financial tools: mortgage, loan, rent versus buy, home affordability, net worth, ROI, 401(k), student loan, credit-card payoff, and US federal income tax.
4. Add table-driven unit suites for the 6 math tools: basic, scientific, cylinder volume, percentage, percentage decrease, and triple integral.
5. Add unit suites for age difference, middle-school GPA, APUSH score, and word counter.
6. For each tool, implement the happy-path, branch/boundary, and invalid/coercion cases assigned in `validation.md`, using explicit floating-point tolerances and fixed time/locale where needed.
7. Add an inventory test or equivalent manifest check mapping every implemented tool slug/component to its regression suite so a missing tool fails visibly.
8. Record any suspected defect instead of changing the tested behavior. A defect that prevents safe extraction blocks only that tool’s extraction and must be escalated as a separate remediation specification.

## 5. Add representative component workflow tests

1. Test desktop and mobile header search using the implemented 20-tool dataset: query matching, empty/no-result behavior, keyboard selection where currently supported, navigation target, and menu open/close behavior.
2. Test the percentage calculator as the simple explicit-validation workflow, covering all three modes, accessible tab keyboard behavior, recalculation, and zero-denominator messages.
3. Test the mortgage calculator as the complex financial workflow, covering synchronized down-payment inputs, ordinary and zero-interest results, and amortization visibility.
4. Test either income tax or APUSH at component level for a threshold/version-sensitive workflow, using the exact current displayed version/assumptions.
5. Test basic and scientific calculators for keyboard/button entry plus history restore, append, malformed-storage fallback, and clear behavior using isolated `localStorage`.
6. Test theme initialization, toggle, persistence, and system-preference fallback with storage and `matchMedia` mocks.
7. Use accessible queries first. Add only behavior-preserving accessible names needed for stable interaction tests and record broader accessibility findings for Phase 3.

## 6. Add the Chromium critical-journey suite

1. Start the app through Playwright with deterministic fixture mode and without Sanity write credentials.
2. Add route-health checks for `/`, `/tools`, `/tools/calculators`, the percentage tool, the mortgage tool, `/blog`, and `/contact`; assert meaningful page landmarks/content rather than status alone.
3. Search for an implemented mortgage tool from the header and verify navigation reaches its canonical route without a not-found state.
4. Complete `25% of 200` in the percentage calculator and assert the visible result `50`, then exercise a denominator-zero validation state.
5. Enter the captured mortgage vector (`450000` price, `90000` down, `6.5%`, `30` years), assert its recorded visible payment/breakdown, and open the amortization schedule.
6. Toggle the theme, reload/navigate, and verify the preference persists in an isolated browser context.
7. Load the fixture-backed blog index, verify stable post/category content, and open one fixture post if that route is included in the fixture boundary.
8. Submit a valid fictional contact message and assert the fixture-backed success state; submit missing data and assert the real route’s `400` validation behavior; intercept `/api/contact` with a `500` response and assert the existing error state.
9. Fail the suite if any request targets Sanity API/CDN hosts. Block/stub analytics and other nonessential external requests.
10. Prove isolation by running the suite twice in succession with identical results and no retained storage or fixture mutations.

## 7. Document operation and the initial baseline

1. Create `specs/testing.md` as the durable maintainer guide required by the roadmap.
2. Document prerequisites, browser installation, every npm command, suite locations/ownership, fixture-mode safeguards, common failure diagnosis, and how to update intentional characterization results.
3. Run coverage and record the date, command, aggregate statement/branch/function/line metrics, per-tool inclusion status, and critical untested paths. Do not commit generated reports.
4. Record discovered behavior defects and testing gaps separately from coverage metrics, with enough reproduction detail to seed future remediation specs.

## 8. Complete merge validation

1. Execute every mandatory command in `validation.md` from a clean checkout with fixture variables controlled as documented.
2. Confirm tests pass independently, in randomized/repeated order where supported, and without network access after dependencies and Chromium are installed.
3. Confirm no automated test reads a production secret or sends Sanity/analytics traffic.
4. Confirm typecheck and production build pass with fixture mode unset and that fixture data is absent from the normal production path.
5. Run the repository lint command, compare it with the recorded baseline, and require no new findings attributable to changed files while preserving Phase 3 ownership of existing debt.
6. Review the diff for accidental product changes, generated artifacts, secrets, real personal data, or unrelated cleanup.
7. Update the feature documents with validation evidence and implementation status only after every acceptance criterion is satisfied.
