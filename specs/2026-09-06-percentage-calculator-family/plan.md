# Percentage Calculator Family — Implementation Plan

> **Document status:** Approved
>
> **Approved:** September 6, 2026
>
> **Implementation status:** Not started

This plan implements [requirements.md](./requirements.md) under the project constitution. Task groups are ordered; later groups may rely on earlier groups. This specification package does not itself authorize application-code changes.

## 1. Establish the baseline and source record

1. Record the current branch/commit, Node/npm versions, implemented config and registry inventories, and the existing Percentage Decrease behavior and tests.
2. Run the pre-change unit tests, focused percentage workflow tests, typecheck, build, and lint baseline. Preserve existing unrelated failures and working-tree changes as explicit exclusions.
3. Inventory every relevant `Tasks.csv` row and supplied Markdown/schema file. Map sound definitions, formulas, examples, FAQs, metadata, and links to the five canonical slugs.
4. Verify the sources recorded in `requirements.md`, their access dates, and the chosen formula convention for each tool. Replace a source only with an equally authoritative record and document the reason.
5. Capture the general Percentage Calculator regression vectors so related-link integration cannot accidentally alter its behavior.

## 2. Build shared calculation and presentation contracts

1. Define discriminated internal types for the five tool modes, successful/no-change/direction-mismatch/zero-convention results, metrics, steps, direction, counterpart links, and validation errors.
2. Implement pure string-to-number validation with per-tool non-negative/signed rules, nonzero denominators, finite-result protection, and no coercion of blank input to zero.
3. Implement the five formulas as pure functions. Keep all intermediate values unrounded and normalize visible negative zero only in the formatter.
4. Add a shared locale-aware formatter with separate headline (maximum four decimals) and detailed (maximum six decimals) profiles and trimmed trailing zeros.
5. Create a reusable workspace interface for two labeled inputs, submit, clear, field errors, empty guidance, result headline, metrics, interpretation, formula steps, and optional counterpart link.
6. Keep shared logic free of React and keep tool-specific words/formulas in typed configuration or narrow wrappers so unrelated tools cannot enter impossible states.

## 3. Deliver the five accessible calculator workspaces

1. Replace the existing Percentage Decrease component's live defaults, clamped donut, remote image, duplicated editorial/FAQ content, and inert-looking recalculate behavior with the shared workspace and pure logic.
2. Add Percentage Increase with no-change and opposite-direction-to-Decrease behavior.
3. Add Percentage Change with signed results and explicit increase/decrease/no-change interpretation.
4. Add Percentage Difference with order independence, arithmetic-mean metrics, `200%` for one zero, and the documented `0`/`0` convention state.
5. Add Percentage Error with signed measured/reference inputs, absolute relative-error percentage, and above/below/equal interpretation.
6. For every workspace, implement blank initial state, submit/Enter calculation, first-invalid-field focus, stale-result clearing on edit, Clear reset, polite live result announcements, semantic headings, touch-sized controls, and stacked mobile layout.
7. Verify that long finite inputs and four-decimal headlines wrap or scale inside their containers without causing horizontal page overflow.

## 4. Integrate content, SEO, schema, and discovery

1. Create or update one `ToolConfig` per canonical slug with approved title, description, metadata, workspace layout, edited content blocks, related tools, concise visible FAQs, and visible Sources notes.
2. Adapt the supplied articles into the task-first content sequence in requirements; reconcile every formula/example with unit vectors and remove repetition, unsupported superlatives, inconsistent brand spelling, and network-processing claims.
3. Register all five configs and components one-to-one. Update the math directory labels and the general Percentage Calculator's family links without changing general-calculator behavior or undertaking the canonical-catalog migration.
4. Keep metadata, canonical, Open Graph, Twitter, social image, and sitemap behavior on existing shared paths. Remove the old hardcoded Decrease metadata fallback once its config owns the approved metadata.
5. Use the shared JSON-LD generator for WebPage, WebApplication, BreadcrumbList, and visible FAQ content. Do not copy supplied schema blobs or unsupported SearchAction/identity nodes.
6. Ensure related-tool selection favors useful percentage siblings within the existing four-card limit and every emitted family link resolves.
7. Confirm no runtime import reads `Tasks.csv` or `content/`, and no new dependency, environment variable, endpoint, persistence, permission, or analytics event was added.

## 5. Prove behavior and merge readiness

1. Add table-driven unit tests for every vector and invariant in [validation.md](./validation.md), including non-finite intermediate protection and formatting.
2. Add component tests for all five workspaces covering empty, submit, Enter, valid, invalid, edit-clears-result, Clear, equality, direction mismatch, `0`/`0`, signed error, counterpart navigation, and accessible announcements/focus.
3. Extend inventory, route, search/discovery, sitemap, metadata, and JSON-LD tests so missing, duplicate, mismatched, or invisible family records fail clearly.
4. Add focused Chromium journeys for a newly added tool, the updated Decrease tool, mobile layout, keyboard operation, route health, and no external calculator-value traffic.
5. Re-run the general Percentage Calculator unit/component/browser vectors and prove its calculations and metadata remain unchanged except for approved related links.
6. Run the complete commands and manual checks listed in validation. Compare lint output for changed files with the baseline; do not expand into repository-wide lint cleanup.
7. Review the final diff for feature-only scope, source accuracy, absence of remote imagery/input persistence, and no constitution or unrelated-file changes. Record validation evidence before requesting merge.
