# Percentage Calculator Family — Requirements

> **Document status:** Approved for implementation planning
>
> **Approved:** September 6, 2026
>
> **Implementation status:** Not started
>
> **Roadmap owner:** Phase 5 — Demand-Led Catalog Expansion, with Phase 3 trust and catalog integration requirements applied

Related constitution files: [Mission](../mission.md) · [Tech Stack](../tech-stack.md) · [Roadmap](../roadmap.md) · [Current State](../current-state.md)

## 1. Purpose

Jamro Tools will deliver a coherent family of five browser-local percentage comparison calculators. The package updates the existing Percentage Decrease Calculator and adds Percentage Difference, Percentage Change, Percentage Error, and Percentage Increase. Each tool must be accurate, task-first, accessible, responsive, discoverable, and explicit about the reference value used in its formula.

The supplied `Tasks.csv`, Markdown content, meta tags, and schema files are editorial source material. They are not executable or verbatim requirements. Implementation must retain sound subject matter while correcting unsupported claims, duplication, formula ambiguity, tone, metadata, and structured data.

### 1.1 Approved decisions

| Decision | Approved choice |
|---|---|
| Feature identity | `2026-09-06-percentage-calculator-family`; branch `codex/percentage-calculator-family`. |
| Tool scope | Add/update the five CSV tools and integrate them with existing discovery. Do not change the general Percentage Calculator's calculation behavior. |
| Source material | Audit and adapt supplied copy and schema; do not reproduce them blindly. |
| Interaction | Empty initial fields; calculate on form submit or Enter; editing an input clears stale results. |
| Input domain | Non-negative finite inputs for increase, decrease, change, and difference; signed finite measured/reference inputs for error. |
| Opposite direction | Explain the actual direction and show/link the matching counterpart calculator; never label a negative increase or decrease. |
| Difference `0` vs `0` | Return 0% as an explicit no-difference convention and explain the denominator exception. |
| Family UI | One reusable, responsive, accessible two-input/result pattern with calculator-specific semantics. |
| Result depth | Headline result, relevant intermediate metrics, interpretation, and substituted formula steps. |
| Precision | Full `number` precision during calculation; compact locale-aware display with no early rounding. Headline: at most 4 decimals. Detailed working: at most 6. |
| Visuals | No charts or remote images. Remove the existing Percentage Decrease donut and third-party image. |
| Editorial depth | Task-first edited content; retain useful explanations and remove repetition and keyword stuffing. |
| Formula evidence | Record reviewed sources here and expose a concise Sources note on every public tool page. |
| Processing | Browser-local only; no storage, uploads, external calculation service, or new permissions. |

## 2. Scope

### 2.1 Tool routes

The following canonical routes are fixed:

| Tool | Slug and canonical path | Delivery |
|---|---|---|
| Percentage Decrease Calculator | `/tools/calculators/math/percentage-decrease-calculator` | Update existing tool. |
| Percentage Difference Calculator | `/tools/calculators/math/percentage-difference-calculator` | Add. |
| Percentage Change Calculator | `/tools/calculators/math/percentage-change-calculator` | Add. |
| Percentage Error Calculator | `/tools/calculators/math/percentage-error-calculator` | Add. |
| Percentage Increase Calculator | `/tools/calculators/math/percentage-increase-calculator` | Add. |

Implementation must add the five tools to the implemented `ToolConfig` set and component registry. That registration must make each route available to header search, category discovery, sitemap generation, social-image lookup, metadata generation, and related-tool selection through the existing application-owned paths.

The general Percentage Calculator remains functionally unchanged. Its configured related tools may be expanded to link to the family.

### 2.2 Included work

1. Pure deterministic calculation and validation logic for all five tools.
2. A shared family workspace component or narrowly shared primitives for form, validation, result, metric, interpretation, and formula-step rendering.
3. Five calculator-specific wrappers/configurations with correct labels and result semantics.
4. Reviewed task-first content derived from the supplied Markdown files.
5. Reviewed metadata and shared structured data derived from visible `ToolConfig` content.
6. Catalog, search, sitemap, social-image, and related-link integration.
7. Unit, component, inventory, metadata/schema, and focused browser validation.

### 2.3 Explicit exclusions

- Do not redesign the wider site or the existing general Percentage Calculator.
- Do not create accounts, saved histories, exports, public APIs, server processing, Sanity documents, or analytics events.
- Do not add charts, remote images, dependencies, or a user-selectable precision setting.
- Do not undertake the Phase 3 canonical-catalog migration or clear unrelated catalog, lint, content, or component debt.
- Do not change project constitution files as part of this feature.
- Do not treat `Tasks.csv` or `content/` as runtime data sources.

## 3. Formula and Result Contract

### 3.1 Source baseline

Sources were reviewed on September 6, 2026. Public Sources notes may use concise labels, but their links must resolve to these records or an equally authoritative replacement approved during implementation.

| Subject | Source | Requirement supported |
|---|---|---|
| Percentage increase and decrease | [OpenStax Prealgebra 2e, §6.2](https://openstax.org/books/prealgebra-2e/pages/6-2-solve-general-applications-of-percent) | Increase/decrease is the amount of change expressed as a percentage of the original amount. |
| Percentage change | [OpenStax Principles of Financial Accounting, Appendix A](https://openstax.org/books/principles-financial-accounting/pages/a-financial-statement-analysis) | Percentage change uses the change divided by the base/original amount, multiplied by 100. |
| Percentage difference | [NIST Dataplot `PERCDIF`](https://www.itl.nist.gov/div898/software/dataplot/refman2/auxillar/percdif.htm) | Documents the absolute difference divided by the average of the two values as an accepted percent-difference variant. |
| Percentage/relative error | [NIST DLMF §3.1(v), Error Measures](https://dlmf.nist.gov/3.1) | Absolute relative error is `|observed-reference| / |reference|`, with a nonzero reference. Percentage error multiplies this ratio by 100. |

The pages must explain that terms can have context-specific conventions. This family intentionally uses the contracts below; it must not claim that one convention is universal in every discipline.

### 3.2 Shared numeric rules

1. Inputs are trimmed strings and must be non-empty values that convert to finite JavaScript numbers.
2. Calculations use the unrounded numeric values. Rounding is display-only.
3. A non-finite intermediate or final result produces an actionable calculation error rather than rendering `NaN` or infinity.
4. `-0` is normalized to `0` in all visible output.
5. Headline percentages display with locale separators and at most four fractional digits. Secondary metrics and substituted steps may display at most six fractional digits. Trailing zeros are removed.
6. Values must be announced with text; color or an icon may reinforce direction but cannot be the only indicator.
7. Inputs are dimensionless. The UI must not imply a currency or physical unit and must state that compared values should use the same unit.

### 3.3 Percentage Increase

- Inputs: `original` and `new`, both finite and non-negative.
- Valid denominator: `original > 0`.
- Formula when `new > original`: `((new - original) / original) × 100`.
- Metrics: amount of increase (`new - original`) and new value as a percentage of original (`new / original × 100`).
- `new === original`: valid `0%`, state `no-change`.
- `new < original`: state `direction-mismatch`; show the actual percentage decrease `((original - new) / original) × 100` and link to Percentage Decrease.

### 3.4 Percentage Decrease

- Inputs: `original` and `new`, both finite and non-negative.
- Valid denominator: `original > 0`.
- Formula when `new < original`: `((original - new) / original) × 100`.
- Metrics: amount of decrease (`original - new`) and retained percentage (`new / original × 100`).
- `new === original`: valid `0%`, state `no-change`.
- `new > original`: state `direction-mismatch`; show the actual percentage increase `((new - original) / original) × 100` and link to Percentage Increase.

### 3.5 Percentage Change

- Inputs: `original` and `new`, both finite and non-negative.
- Valid denominator: `original > 0`.
- Formula: `((new - original) / original) × 100`.
- Metrics: signed change (`new - original`) and absolute change (`|new - original|`).
- Positive result: `increase`; negative result: `decrease`; zero result: `no-change`.
- The signed percentage must be preserved. The interpretation supplies the word increase or decrease and must not depend on sign alone.

### 3.6 Percentage Difference

- Inputs: `value1` and `value2`, both finite and non-negative.
- General formula: `|value1 - value2| / ((value1 + value2) / 2) × 100`.
- Metrics: absolute difference and arithmetic mean.
- Input order must not affect the result.
- If exactly one value is zero, the result is `200%`.
- If both values are zero, return `0%`, absolute difference `0`, mean `0`, and state `no-difference-convention`. The explanation must say both inputs are identical and that this explicit product convention avoids evaluating `0 / 0`.

### 3.7 Percentage Error

- Inputs: `measured` and `reference`, both finite; signed values are allowed.
- Valid denominator: `reference !== 0`.
- Formula: `|measured - reference| / |reference| × 100`.
- Metrics: signed error (`measured - reference`) and absolute error (`|measured - reference|`).
- The headline percentage is non-negative. The interpretation states whether the measured value is above, below, or equal to the reference.
- The page must describe the reference as an accepted, expected, theoretical, or otherwise designated comparison value; it must not imply that the tool determines whether a reference is trustworthy.

## 4. Interfaces and Data Flow

No public HTTP API, persisted schema, or exported consumer API is introduced. The implementation may add internal shared types equivalent to:

```ts
type PercentageFamilyTool =
  | "increase"
  | "decrease"
  | "change"
  | "difference"
  | "error";

type PercentageResultState =
  | "success"
  | "no-change"
  | "direction-mismatch"
  | "no-difference-convention";

interface PercentageFamilyResult {
  state: PercentageResultState;
  percentage: number;
  headline: string;
  interpretation: string;
  formula: string;
  steps: string[];
  metrics: Array<{ label: string; value: number; suffix?: string }>;
  direction?: "increase" | "decrease" | "equal" | "above" | "below";
  counterpartHref?: string;
}

interface PercentageFamilyCalculation {
  result: PercentageFamilyResult | null;
  errors: { first?: string; second?: string; calculation?: string };
}
```

Equivalent narrower types are acceptable if they preserve the discriminated states and observable behavior. Calculation functions must be pure and independent of React. Components own string input state, form submission, focus behavior, and rendering.

Data flow is strictly: user input → local React form state → pure local calculation → local rendered result. No entered or calculated value is stored or transmitted by this feature.

## 5. User Experience, Accessibility, and States

### 5.1 Shared workspace

- Render a single responsive workspace with an input form and result panel: stacked on narrow screens and side-by-side only when space permits.
- Use the established semantic color variables and existing typography; do not introduce a parallel visual system.
- Each field has a persistent visible label, an appropriate input mode, and an associated error message.
- A submit button labeled `Calculate` is always present. Enter submits from either input.
- Provide a secondary `Clear` action that restores both fields, errors, and result to the empty state.
- Results use an `aria-live="polite"` region with an atomic headline/interpretation update. Validation errors must not be announced twice.
- Focus remains predictable after submission. On invalid submit, focus the first invalid input; on valid submit, keep focus unless normal browser behavior requires otherwise.

### 5.2 Required states

1. **Empty:** blank inputs, guidance in the result panel, no fabricated example result.
2. **Editing:** entered strings remain intact; any prior result and calculation-level message are cleared.
3. **Invalid:** field-level message for blank, nonnumeric/non-finite, negative where disallowed, or zero denominator. No result is shown.
4. **Success:** headline, interpretation, metrics, formula, and substituted steps are shown.
5. **No change:** valid 0% result for equal original/new values.
6. **Direction mismatch:** valid explanatory result for Increase/Decrease with the correctly named counterpart and canonical link.
7. **Zero-difference convention:** valid 0% result for Difference `0` and `0`, with the required explanation.
8. **Calculation overflow:** no result; show a calculation-level message asking for smaller finite values.

Generic error wording must be concise and actionable, for example: `Enter an original value greater than zero.` and `Enter a non-negative new value.` Exact field nouns change by tool.

## 6. Content, Metadata, and Structured Data

### 6.1 Editorial contract

Each page must include, in this order after the workspace where the shared page layout permits:

1. A concise definition and statement of when to use the tool.
2. Formula and explanation of the denominator/reference.
3. How-to steps and one substituted representative example.
4. A small set of materially different real-world examples.
5. A comparison with the easily confused sibling tools.
6. Common mistakes and relevant zero/direction limitations.
7. Related family links.
8. Concise FAQs whose answers are also visible on the page.
9. A Sources note using the reviewed baseline in Section 3.1.

Remove repeated sections, keyword variants that add no information, unsupported superlatives such as “universally accepted,” unsupported accuracy/performance claims, and language implying that an internet connection performs the calculation. Use `Jamro Tools`, not `JamroTools`, in prose.

### 6.2 Metadata contract

| Tool | Metadata title | Metadata description |
|---|---|---|
| Decrease | `Percentage Decrease Calculator - Calculate Percent Decrease \| Jamro Tools` | `Use our free Percentage Decrease Calculator to calculate the percent decrease from an original value to a new value, with the formula and steps.` |
| Difference | `Percentage Difference Calculator - Compare Two Values \| Jamro Tools` | `Use our free Percentage Difference Calculator to compare two values relative to their average, with instant results, the formula, and steps.` |
| Change | `Percentage Change Calculator - Calculate Percent Change \| Jamro Tools` | `Use our free Percentage Change Calculator to calculate a signed percentage change from an original value to a new value, with the formula and steps.` |
| Error | `Percentage Error Calculator - Calculate Percent Error \| Jamro Tools` | `Use our free Percentage Error Calculator to compare a measured value with a reference value and see the percent error, formula, and steps.` |
| Increase | `Percentage Increase Calculator - Calculate Percent Increase \| Jamro Tools` | `Use our free Percentage Increase Calculator to calculate the percent increase from an original value to a new value, with the formula and steps.` |

Each page uses its fixed canonical URL from Section 2.1. Open Graph and Twitter metadata must derive from the same title and description.

### 6.3 Structured data

- Use the shared tool JSON-LD generator; do not embed the supplied schema files as page-specific blobs.
- Generate WebPage, WebApplication, BreadcrumbList, and FAQPage only from actual route/config/visible content.
- FAQ structured-data questions and answers must exactly match FAQs rendered to users.
- Do not add the supplied `SearchAction` because the referenced query interface is not a verified site capability.
- Do not duplicate global Organization/WebSite identity nodes solely because they appear in supplied files.
- IDs, URLs, names, descriptions, breadcrumb order, free offer, language, and browser requirements must match the shipped page.
- Safely serialize JSON-LD using the existing less-than escaping convention.

## 7. Discovery and Integration

1. The five configs and five registered components must remain one-to-one and be covered by the implemented-tool inventory check.
2. Header search must return each tool by its title and navigate to its canonical route.
3. The math category's directory labels must include all five tools without introducing new broken links or claiming an unsupported count.
4. Sitemap output must contain each canonical tool URL exactly once after its component is registered.
5. Related-tool presentation must favor the sibling percentage family while respecting the existing maximum number of related cards.
6. The general Percentage Calculator may link to these five siblings, but its inputs, modes, formulas, results, tests, and public metadata remain unchanged.
7. The existing Percentage Decrease URL must not redirect or change slug.

## 8. Permissions, Privacy, and Safety

- The feature requests no browser permissions and accepts no files or personal profile data.
- Inputs and outputs remain in transient component memory and disappear on reload/navigation.
- No value is written to local or session storage, cookies, Sanity, analytics payloads, logs, or another service by feature code.
- Existing site-wide analytics may record an ordinary page view; this feature adds no input-bearing event or URL parameter.
- Source links are normal outbound navigation and must not receive calculator values.
- No new dependency, environment variable, API route, backend, or recurring operating cost is permitted.

## 9. Acceptance Criteria

- **AC-01:** All five fixed routes render the correct accessible calculator and canonical metadata; Decrease remains at its current URL.
- **AC-02:** Each pure calculation implements the exact formulas, input domains, states, zero rules, and direction behavior in Section 3.
- **AC-03:** Empty, editing, invalid, success, no-change, direction-mismatch, zero-difference-convention, and overflow states behave as specified without stale or non-finite output.
- **AC-04:** The shared workspace is keyboard operable, labeled, screen-reader understandable, responsive without horizontal page scrolling at 320 CSS pixels, and supports 200% zoom without loss of function.
- **AC-05:** Headline, metrics, interpretation, and substituted steps agree numerically and follow the approved display precision.
- **AC-06:** No chart or remote image remains in Percentage Decrease or is introduced for the other family tools.
- **AC-07:** Public content is task-first, fact-checked, non-repetitive, uses the approved conventions, and exposes appropriate reviewed sources.
- **AC-08:** Metadata matches Section 6.2; shared JSON-LD is valid, route-correct, and contains no invisible or unsupported capability claims.
- **AC-09:** Search, math-category discovery, sitemap, social-image lookup, related links, configs, and registry include all five tools with no duplicate or broken family URL.
- **AC-10:** The general Percentage Calculator's calculation behavior and existing regression vectors remain unchanged.
- **AC-11:** The feature performs all calculations locally, adds no persistence/network processing/permissions/dependencies, and transmits no inputs.
- **AC-12:** Required unit and component suites, focused Chromium journeys, typecheck, and production build pass; changed files add no lint findings.
- **AC-13:** No project constitution file or unrelated working-tree item is changed by the implementation.
