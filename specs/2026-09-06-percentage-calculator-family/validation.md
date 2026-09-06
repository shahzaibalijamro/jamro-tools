# Percentage Calculator Family — Validation

> **Document status:** Complete
>
> **Approved:** September 6, 2026
>
> **Implementation status:** Complete
>
> **Completed:** September 6, 2026

This document defines the evidence required to prove [requirements.md](./requirements.md). Expected percentages below are mathematical values before display formatting; assertions must use exact equality where safe or an explicit floating-point tolerance of `1e-10` or tighter.

## 1. Automated calculation matrix

### 1.1 Percentage Increase

| Inputs (`original`, `new`) | Expected state and values |
|---|---|
| `100`, `125` | Success; increase `25`; amount `25`; new/original `125`. |
| `2.5`, `3` | Success; increase `20`; amount `0.5`; new/original `120`. |
| `42`, `42` | No change; `0`; amount `0`; new/original `100`. |
| `125`, `100` | Direction mismatch; actual decrease `20`; counterpart is Decrease canonical route. |
| `100`, `250` | Success; increase `150`; proves results are not clamped at 100. |
| `0`, `10` | Invalid original denominator; no result. |
| `-1`, `2` | Invalid non-negative domain; no result. |

### 1.2 Percentage Decrease

| Inputs (`original`, `new`) | Expected state and values |
|---|---|
| `200`, `150` | Success; decrease `25`; amount `50`; retained `75`. |
| `2.5`, `2` | Success; decrease `20`; amount `0.5`; retained `80`. |
| `42`, `42` | No change; `0`; amount `0`; retained `100`. |
| `100`, `125` | Direction mismatch; actual increase `25`; counterpart is Increase canonical route. |
| `100`, `0` | Success; decrease `100`; amount `100`; retained `0`. |
| `0`, `0` | Invalid original denominator; no result. |
| `10`, `-1` | Invalid non-negative domain; no result. |

### 1.3 Percentage Change

| Inputs (`original`, `new`) | Expected state and values |
|---|---|
| `80`, `100` | Success/increase; signed percentage `25`; signed/absolute change `20`. |
| `100`, `80` | Success/decrease; signed percentage `-20`; signed change `-20`; absolute change `20`. |
| `2.5`, `3` | Success/increase; `20`. |
| `42`, `42` | No change; `0`. |
| `1`, `0` | Success/decrease; `-100`. |
| `0`, `1` | Invalid original denominator; no result. |
| `-1`, `1` | Invalid non-negative domain; no result. |

### 1.4 Percentage Difference

| Inputs (`value1`, `value2`) | Expected state and values |
|---|---|
| `80`, `100` | Success; percentage `22.222222222…`; absolute difference `20`; mean `90`. |
| `100`, `80` | Same values as prior row; proves order independence. |
| `50`, `70` | Success; percentage `33.333333333…`; difference `20`; mean `60`. |
| `2.5`, `3` | Success; percentage `18.181818181…`; difference `0.5`; mean `2.75`. |
| `0`, `10` | Success; percentage `200`; difference `10`; mean `5`. |
| `0`, `0` | Zero-difference convention; percentage/difference/mean all `0`; required convention note visible. |
| `-1`, `1` | Invalid non-negative domain; no result. |

### 1.5 Percentage Error

| Inputs (`measured`, `reference`) | Expected state and values |
|---|---|
| `95`, `100` | Success/below; percentage `5`; signed error `-5`; absolute error `5`. |
| `105`, `100` | Success/above; percentage `5`; signed error `5`; absolute error `5`. |
| `100`, `100` | Success/equal; percentage `0`; both error metrics `0`. |
| `-95`, `-100` | Success/above numerically; percentage `5`; signed error `5`; absolute error `5`. |
| `-90`, `100` | Success/below; percentage `190`; signed error `-190`; absolute error `190`. |
| `2.5`, `2` | Success/above; percentage `25`; signed/absolute error `0.5`. |
| `10`, `0` | Invalid reference denominator; no result. |

### 1.6 Shared validation and formatting

For each field position and applicable tool, test:

- empty string and whitespace-only input;
- malformed text, `NaN`, `Infinity`, and `-Infinity` representations;
- negative input in each non-negative-only tool;
- signed input acceptance in Percentage Error;
- leading/trailing whitespace and valid decimal/scientific notation supported by the input control;
- values whose arithmetic would overflow to a non-finite result, producing the calculation-level error;
- no input mutation or rounding before formula evaluation;
- negative zero displayed as `0`;
- headline `22.222222…` displayed as `22.2222%` and detailed working as no more than six decimals;
- integers displayed without forced `.00`, trailing fractional zeros removed, and locale separators produced by the controlled test locale;
- no `NaN`, `Infinity`, `undefined`, or stale values rendered in any state.

## 2. Pure-logic invariants

1. Difference is symmetric: `difference(a, b) === difference(b, a)` for representative non-negative finite pairs.
2. Error percentage is non-negative for every valid signed pair and uses `|reference|` as denominator.
3. Change reversals are not generally equal magnitudes: `100 → 120 = 20%`, `120 → 100 = -16.666666…%`.
4. Increase and Decrease valid-direction results match the absolute magnitude of Percentage Change for the same pair.
5. Increase/Decrease direction-mismatch counterpart values match the owning counterpart calculator.
6. For positive original values, increase/decrease retained or new/original metrics reconcile to the inputs.
7. Formula steps, metrics, headline values, and interpretation are derived from one result object and cannot disagree after display formatting.

## 3. Component scenarios

Run the scenarios against every family component unless a row names a specific tool.

1. Initial render has two blank labeled inputs, Calculate and Clear controls, empty guidance, and no fabricated result.
2. Clicking Calculate with blank inputs shows field-specific errors, shows no result, and focuses the first invalid field.
3. Pressing Enter from either field submits the form and produces the same result as clicking Calculate.
4. A valid submit renders headline, interpretation, relevant metric labels/values, formula, substituted steps, and the visible Sources note.
5. Editing either field after success removes the entire stale result before recalculation.
6. Clear empties inputs and removes errors/results regardless of the current state.
7. Negative input is rejected by the four non-negative tools but accepted and correctly interpreted by Error.
8. Original/reference zero produces the owning accessible error; Difference `0`/`0` produces the approved convention result.
9. Equal inputs produce the specified no-change/equal state.
10. Increase/Decrease opposite-direction inputs name the actual direction, show the counterpart percentage, and expose a working canonical sibling link.
11. Change announces positive/negative direction in words; Difference is not described as change; Error identifies measured versus reference roles.
12. Result updates occur in one polite live region and do not duplicate field-error announcements.
13. All controls have visible focus, at least 44-by-44 CSS-pixel pointer targets where applicable, and accessible role/name queries.
14. No `<img>` or chart graphic exists in the family workspace; source links contain no calculator values.

## 4. Content, metadata, and schema checks

For all five canonical routes:

- H1, config title, metadata title/description, canonical, Open Graph, Twitter, social image identity, sitemap URL, and breadcrumbs refer to the same tool and route.
- Metadata title and description exactly match the table in requirements.
- Page copy states the correct formula, input roles, denominator, zero behavior, and direction behavior.
- Every displayed worked example recalculates to its claimed result under the pure function.
- The content includes definition, formula, steps, distinct examples, sibling comparison, common mistakes, related links, FAQs, and source links without repeated filler.
- No page contains `JamroTools`, “universally accepted,” “lightning-fast,” “zero latency,” unsupported accuracy claims, or claims that inputs are sent over the internet.
- JSON-LD parses after rendering and contains one coherent graph with route-correct WebPage, WebApplication, BreadcrumbList, and FAQPage nodes.
- FAQ JSON-LD exactly equals the visible FAQ questions and plain-text answers in count, order, and wording.
- JSON-LD omits unverified SearchAction and page-local duplicate Organization identity nodes.
- Structured-data descriptions and capabilities do not exceed what the visible working page provides.

## 5. Discovery and route checks

1. Config slugs and component registry names are one-to-one, and the implemented-tool inventory increases from 20 to 24 because one tool is updated and four are added.
2. Header search finds each family title and navigates to its canonical route.
3. The math category page presents all five names as implemented, working links without creating or preserving a misleading family-specific count.
4. Sitemap contains each family URL exactly once and no unregistered family URL.
5. Direct requests to all five correct category/slug pairs render successfully; a wrong category returns not found.
6. Related cards never link to an absent route and prioritize sibling percentage tools within the existing four-card maximum.
7. The general Percentage Calculator links into the family while its three calculation modes, pure results, metadata, and existing component behavior remain unchanged.
8. The old Decrease hardcoded metadata does not override or conflict with its approved config metadata.

## 6. Responsive and accessibility validation

Test at minimum 320×568, 390×844, 768×1024, and 1440×900 CSS pixels in light and dark themes.

- No horizontal page scroll, clipped field label, inaccessible button, overlapping result, or off-screen error occurs.
- At 320 pixels, long input values and the maximum four-decimal headline wrap or truncate accessibly inside their cards rather than widening the page.
- At 200% browser zoom, the input, result, metrics, formula steps, counterpart link, and Sources note remain operable and readable.
- Keyboard order follows page order; Enter submits; Clear is reachable; links and controls have visible focus.
- Automated accessibility scan reports no serious or critical violations introduced by the workspace.
- Color contrast meets WCAG 2.2 AA for normal text, large text, controls, errors, focus indicators, and direction cues.
- Screen-reader spot checks distinguish empty guidance, field errors, success, no-change, direction mismatch, and zero-difference convention without relying on color/icons.

## 7. Focused Chromium journeys

1. **New-tool discovery:** search for Percentage Difference, open its canonical route, calculate `80` and `100`, and see `22.2222%`, mean `90`, and the substituted formula.
2. **Updated Decrease:** open the existing route, confirm blank state and absence of remote image/chart, calculate `200 → 150`, then edit to `200 → 250` and follow the Increase counterpart link.
3. **Change direction:** calculate `100 → 80`, verify `-20%` plus “decrease,” reload, and confirm the inputs/results were not persisted.
4. **Error signed inputs:** calculate measured `-95`, reference `-100`, verify `5%` and the correct above-reference interpretation; then submit reference `0` and see the validation error.
5. **Difference zero convention:** calculate `0` and `0`, verify 0% plus the explicit convention note; calculate `0` and `10`, verify 200%.
6. **Mobile/keyboard:** at 320-pixel width, complete a calculation using keyboard-only interaction and confirm no horizontal page scroll.
7. **Route and schema health:** visit all five routes, capture no uncaught page/console errors, and parse each JSON-LD block.
8. **Privacy boundary:** fail if a request URL or payload contains entered calculator values; source-link requests must contain no inputs.

## 8. Required commands and merge evidence

Run from a clean checkout with documented prerequisites:

```text
npm test
npm run test:coverage
npm run test:e2e
npx tsc --noEmit --incremental false
npm run build
npm run lint
```

Merge readiness requires:

- all new and existing tests pass, including general Percentage Calculator regressions;
- typecheck and production build pass;
- every changed TypeScript/TSX file has zero lint findings, while the known repository-wide baseline is recorded separately;
- two consecutive focused Chromium runs pass without external calculation traffic;
- the final diff includes only approved feature implementation/spec/test changes and no constitution edits;
- `Tasks.csv` and the supplied `content/` files are removed after the completed source audit;
- no secret, personal data, generated report, remote image, new dependency, environment variable, API route, persistence path, or unrelated working-tree item enters the feature diff;
- acceptance criteria AC-01 through AC-13 are mapped to concrete test output or a named manual check.
