# Automated Testing Foundation — Validation

> **Document status:** Approved  
> **Approved:** September 5, 2026  
> **Validation status:** Not run — implementation has not started

This document defines the evidence required to prove the feature described by [requirements.md](./requirements.md) works, remains deterministic, cannot affect production Sanity data, and is safe to merge.

## 1. Required command evidence

Run from a clean checkout using the documented Node/npm versions. Save concise command results and coverage metrics in `specs/testing.md`; do not commit generated reports.

| Command | Pass condition |
|---|---|
| `npm test` | All Vitest unit and component tests pass once with no leaked handles or unexpected console errors. |
| `npm run test:coverage` | The same suites pass and generate statement, branch, function, and line metrics; every implemented tool appears in the coverage inventory. |
| `npm run test:e2e` | All Chromium critical journeys pass against the managed fixture-mode server. |
| `npm run test:e2e` (second consecutive run) | Results are identical and do not depend on prior server, storage, or fixture state. |
| `npx tsc --noEmit --incremental false` | Strict TypeScript checking passes. |
| `npm run build` | A normal production build with test mode unset passes and does not use fixture data. |
| `npm run lint` | Results introduce no new errors or warnings attributable to changed files; the pre-existing repository backlog remains Phase 3 debt. |

`npm run test:watch` is validated interactively: start it, change a test, observe the owning suite rerun, restore the edit, and exit cleanly. It is not a merge gate that stays running.

## 2. Tool regression matrix

Before extraction, record the exact displayed/returned result for each ordinary vector. After extraction, tests must reproduce it. Each row also requires the listed branch cases and at least one invalid/coercion case that matches current behavior.

| Tool | Ordinary characterization vector | Required branch and failure coverage |
|---|---|---|
| Mortgage | `$450,000` price, `$90,000` down, `6.5%`, `30` years | Zero interest; full/no financed principal; synchronized amount/percent down payment; first/final amortization rows. |
| Loan | Current default principal/rate/term | Zero interest; zero principal/term; additional-payment or alternate-term branch if exposed; totals reconcile with schedule. |
| Rent versus buy | Current default rent, purchase, growth, and analysis period | Equal/near break-even result; zero appreciation; zero financing cost; ownership/rent inflation branches. |
| Home affordability | `$120,000` income, `$450` monthly debt, `$60,000` down, `6.5%`, `30` years | Below/at 20% down PMI branch; zero interest; high-debt clamp; advanced tax/insurance/HOA inputs. |
| Net worth | Current default asset and liability groups | Positive, zero, and negative net worth; empty/zero rows; add/remove/update row behavior at logic level. |
| ROI | `$8,000` investment, `$8,800` return, `1` year | Gain, loss, break-even, zero investment, multi-year annualization, business revenue/cost breakdown. |
| 401(k) | `$50,000` balance, `$75,000` salary, `10%` contribution, `4%` match, `7%` return, `30` years | Zero years; zero contribution/match/return; employer match included; contribution and growth totals reconcile. |
| Student loan | `$45,000` balance, `6.5%`, `$55,000` income, family size `1` | Zero interest; tiny/zero balance; fixed versus income-derived projections; family/dependent branch and payoff totals. |
| Credit-card payoff | Current three-card data and `$500` monthly payment | Avalanche versus snowball ordering; zero APR; zero balance; payment insufficient to amortize; interest/time totals. |
| US federal income tax | `$75,000` gross, single, `$6,000` retirement, standard deduction, `$9,000` withholding | Zero taxable income; every filing status; exact bracket edges; itemized toggle; credits; refund and balance-due states. |
| Basic calculator | Representative `+`, `-`, `×`, and `÷` expressions | Chained operations/current evaluation order; decimals; divide by zero/error; keyboard equals/clear; history serialization behavior. |
| Scientific calculator | Power/root plus a trigonometric expression | Degree/radian branches; constants; exponent/root; invalid expression; keyboard path; history serialization behavior. |
| Cylinder volume | Radius `5`, height `10`, inches | Zero radius/height; decimal dimensions; each unit label/conversion behavior currently exposed; non-finite/coerced input. |
| Percentage | `25%` of `200` equals `50` | All three modes; decimal/negative values as currently allowed; blank/non-finite input; zero denominator in “percent” and “whole.” |
| Percentage decrease | Current default original/new values | Decrease, no change, increase/negative decrease, zero original value, invalid/coerced input. |
| Triple integral | `x^2 + y^2 + z^2` over `[0,1]` for all axes | Constant function; reversed/equal bounds; unsupported/invalid expression; deterministic numerical tolerance. |
| Age difference | `1990-01-01` and `1995-06-15` | Reversed order; same date; leap-day/month-end span; invalid/missing date; fixed timezone. |
| Middle-school GPA | Current default subject/grade set | All-high/all-low grades; mixed grades; empty/removed subjects; accepted grade/weight bounds and coercion. |
| APUSH score | MCQ `40`, SAQs `2/2/2`, DBQ `5`, LEQ `4` | Minimum and maximum scores; every displayed score-band boundary; clamping/invalid inputs; current version label. |
| Word counter | `Hello world.` plus a second paragraph | Empty/whitespace-only; punctuation; repeated spaces/newlines; Unicode text; word/character/sentence/paragraph/read-time outputs. |

### 2.1 Inventory proof

An automated inventory assertion must compare the implemented tool configs and registered component names against a checked-in regression-suite manifest. It passes only when:

- both implementation sources contain the same 20 tools;
- every tool has one owning unit suite in the manifest;
- no manifest entry names an unimplemented tool; and
- adding or removing a config/registry entry makes the assertion fail with the missing or extra slug/component.

## 3. Component scenarios

### 3.1 Header and discovery

- Render with all 20 implemented configs and verify a known query returns the correct result and canonical link.
- Verify case-insensitive/partial matching according to current search behavior.
- Verify empty-query and no-result behavior.
- Exercise keyboard activation and desktop/mobile menu behavior where currently supported.
- Assert only implemented tools are offered; do not use the aspirational directory as test data.

### 3.2 Percentage workflow

- Calculate `25% of 200` and assert the visible result `50` and current explanatory steps.
- Switch among all three tabs and verify each mode preserves or clears state exactly as the current component does.
- Use Arrow Left/Right and Home/End on the tablist and assert selection/focus.
- Submit blank, non-finite, and denominator-zero values and assert the current field messages and absence of stale results.

### 3.3 Mortgage workflow

- Enter the ordinary mortgage vector and assert the recorded payment, tax/insurance breakdown, total interest/cost, and synchronized down-payment percentage/amount.
- Verify the zero-interest branch and a nonpositive financed amount.
- Open the amortization schedule and verify its first and final rows reconcile with the unit result.

### 3.4 Version-sensitive representative

- Exercise the income-tax bracket edge/deduction toggle or APUSH score-band edge in the rendered component.
- Assert the current version/year label and assumptions presented by the UI; do not validate them as authoritative in this feature.

### 3.5 Storage-backed behavior

- Basic and scientific calculators: absent storage, valid saved history, malformed JSON fallback, append after calculation, clear history, and no cross-test leakage.
- Theme: absent preference with light/dark `matchMedia`, stored light/dark preference, toggle persistence, and restoration after remount.

## 4. Playwright critical journeys

Use a fresh browser context per test unless a test intentionally proves persistence across reload/navigation.

1. **Route health:** `/`, `/tools`, `/tools/calculators`, percentage, mortgage, `/blog`, and `/contact` render their expected main landmark/heading without not-found content or uncaught page errors.
2. **Discovery:** search for “mortgage,” select the implemented result, and arrive at its canonical tool route.
3. **Simple tool:** calculate `25% of 200`, see `50`, then provoke and see a zero-denominator validation message.
4. **Complex tool:** enter the mortgage characterization vector, verify its recorded visible result/breakdown, and open the schedule.
5. **Theme:** toggle theme, reload or navigate, and verify both the root theme state and stored preference persist.
6. **Blog:** render stable invented fixture posts/categories and open one fixture-backed post when supported by the repository boundary.
7. **Contact success:** submit invented valid values; receive fixture-backed `201`; see the existing success state; prove no remote request occurred.
8. **Contact validation:** submit missing required data directly to the actual local API route and assert `400` plus the established error contract, then prove the UI prevents or reports invalid submission as currently implemented.
9. **Contact failure:** intercept the browser request with a `500` response and verify the existing user-visible failure state without introducing a production error trigger.

## 5. Production-data safety checks

All checks below are mandatory:

1. Run unit, component, and browser suites with `SANITY_API_WRITE_TOKEN` absent.
2. Spy on the normal Sanity client factories in fixture-boundary tests and assert they are not constructed/called for fixture reads or writes.
3. In Playwright, fail immediately on requests whose hostname matches Sanity API/CDN endpoints; attach the offending URL to the failure.
4. Assert fixture contact success returns a deterministic invented document identifier/timestamp and does not persist between tests.
5. Assert fixture mode activates only for the exact `fixtures` value and is rejected or ignored when `VERCEL_ENV=production`.
6. Build once with all test-mode variables unset and verify normal Sanity wiring remains selected.
7. Search committed test/spec/fixture content for tokens, `.env` values, real contact records, and production credentials before merge.
8. Run the complete suite with outbound network disabled after dependency/browser installation; it must still pass.

## 6. Determinism and isolation checks

- Fix system time for date-sensitive tests and restore real timers afterward.
- Set an explicit test timezone and control locale-dependent formatting.
- Clear DOM, mocks, timers, `localStorage`, `sessionStorage`, and fixture repositories after each owning test.
- Run Vitest in its normal parallel mode, then in a supported randomized/repeated mode; results must not depend on order.
- Run Playwright twice consecutively; no test may rely on a prior browser context or submission.
- Unexpected `console.error`, unhandled rejection, page error, or failed local resource is a failure. Explicitly asserted error paths are scoped and restored.
- Floating-point tolerances must match algorithm/display precision and be stated next to the assertion; arbitrary broad tolerances fail review.

## 7. Coverage and gap record

After all required suites pass, add a dated section to `specs/testing.md` containing:

- the exact coverage command and Node/npm versions;
- aggregate statements, branches, functions, and lines;
- confirmation that all 20 tool logic modules are included;
- component and end-to-end scenarios represented;
- critical untested paths, why they remain, their risk, and intended future owner;
- discovered behavior defects with reproduction inputs and separate-remediation recommendation.

The numbers are a baseline for detecting major regressions, not an arbitrary repository-wide threshold. Raw HTML, JSON, LCOV, Playwright, screenshot, trace, and video outputs must remain untracked.

## 8. Merge-readiness checklist

- [ ] All acceptance criteria AC-01 through AC-12 are evidenced.
- [ ] All 20 tools satisfy the regression matrix and inventory proof.
- [ ] Component and Chromium critical journeys pass.
- [ ] Two consecutive end-to-end runs pass identically.
- [ ] No suite needs a production secret or external network after installation.
- [ ] No Sanity or analytics request occurred during automated validation.
- [ ] Typecheck and normal production build pass.
- [ ] Changed TypeScript/TSX files add no lint findings; existing lint debt is recorded, not expanded.
- [ ] Coverage summary and known gaps are recorded in `specs/testing.md`; generated artifacts are untracked.
- [ ] No formula, claim, redesign, catalog change, contact hardening, CI work, or unrelated cleanup entered the diff.
- [ ] No secrets, real personal data, or unrelated working-tree changes are included.

