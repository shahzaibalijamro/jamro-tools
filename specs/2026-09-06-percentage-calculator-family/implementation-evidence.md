# Percentage Calculator Family — Implementation Evidence

> **Recorded:** September 6, 2026
>
> **Implementation status:** Complete
>
> **Baseline:** `codex/percentage-calculator-family` at `17250e6240260057709edf771a4d2c27ccbcf52d`
>
> **Toolchain:** Node.js `v22.23.0`, npm `10.9.8`

## Scope and source record

- The implemented inventory moves from 20 to 24 tools: Percentage Decrease is updated and Percentage Increase, Change, Difference, and Error are added at the approved fixed math routes.
- Formula conventions were checked against the reviewed OpenStax and NIST sources named in `requirements.md`. The application exposes those source links without calculator inputs.
- The general Percentage Calculator retains its component and calculation logic; only its approved related-family links changed.
- No dependency, environment variable, API route, persistence path, analytics event, chart, or remote workspace image was added.
- `Tasks.csv` and the supplied source content were removed after the completed source audit. No constitution file was changed.

## Automated results

| Check | Result |
|---|---|
| `npm test` | Pass: 10 files, 170 tests |
| `npm run test:coverage` | Pass: 170 tests; 91.08% statements, 84.36% branches, 92.68% functions, 92.55% lines |
| Percentage-family pure logic coverage | 97.24% statements, 95.08% branches, 100% functions, 100% lines |
| `npm run test:e2e` | Pass: 17 Chromium tests |
| Two consecutive focused family runs | Pass: 8/8 twice; the final complete run also passed |
| Required viewport/theme matrix | Pass: 320×568, 390×844, 768×1024, and 1440×900 in light and dark |
| Automated accessibility scan | Pass: no serious or critical axe violations on all five routes |
| `npx tsc --noEmit --incremental false` | Pass |
| `npm run build` | Pass; only existing Edge-runtime and Sanity image-URL warnings |
| Changed-file ESLint run | Pass: zero findings |
| `npm run lint` | Existing repository baseline remains: 30 errors and 28 warnings; no changed file appears in that output |
| `git diff --check` | Pass |

The responsive matrix exercises the same effective CSS-width reflow used by browser zoom, including a stricter 320-pixel case. Keyboard submit, Clear reachability, focus ownership, live-region states, long-value wrapping, source visibility, and horizontal overflow are covered by component and browser tests.

## Acceptance-criteria map

| Criterion | Evidence |
|---|---|
| AC-01 | Route/config/registry integration tests and all-family Chromium route checks |
| AC-02 | Table-driven pure-logic vectors and invariants in `percentage-family.test.ts` |
| AC-03 | Pure-logic and shared-workspace state tests, including overflow and stale-result clearing |
| AC-04 | Workspace role/name/focus tests, keyboard journey, viewport/theme matrix, and axe scan |
| AC-05 | Formatter, metric, interpretation, and substituted-step assertions |
| AC-06 | Component and Chromium assertions that the workspace contains no image, SVG, or canvas |
| AC-07 | Tool configs/content-builder review plus integration checks for sources and prohibited claims |
| AC-08 | Exact metadata assertions and rendered JSON-LD graph/FAQ checks |
| AC-09 | Inventory, registry, search, directory, related-link, sitemap, and route tests |
| AC-10 | Existing general Percentage Calculator regressions remain in the passing unit/browser suites |
| AC-11 | No-persistence reload journey and network URL/payload sentinel test |
| AC-12 | Command results above; all changed TypeScript/TSX files lint clean |
| AC-13 | Final status/diff review contains only approved feature implementation, tests, and this evidence record |
