# Jamro Tools Roadmap

> **Document status:** Approved
> **Approved:** September 5, 2026
> **Last updated:** September 5, 2026
> **Baseline date:** September 5, 2026
> **Baseline commit:** `e52e2bd`
> **Model:** Ordered, outcome-based phases without speculative dates

Related specifications: [Mission](./mission.md) · [Tech Stack](./tech-stack.md) · [Current State](./current-state.md)

## Status Legend

- **Completed** — verified at the baseline.
- **Current** — active work that precedes scaled feature delivery.
- **Future** — approved direction requiring feature-level specifications.
- **Legacy/Debt** — behavior a roadmap phase must correct or retire.

## SDD Rules

1. Project specs define mission, constraints, architecture, current truth, and sequencing.
2. Every material feature or remediation initiative requires an approved feature spec before code changes.
3. A feature spec defines behavior, evidence, interfaces/data flow, edge and failure cases, privacy/security implications, acceptance tests, and rollout or migration needs.
4. Roadmap order follows prerequisites and outcomes, not promised dates.
5. Catalog entries and public claims describe shipped, verified behavior unless visibly labeled as planned.

## Phase 0 — Existing Foundation

**Status: Completed**

Delivered capabilities are a live responsive site and theme system; company/legal and directory pages; 20 browser-side tools; search and category filtering; Sanity blog, categories, Studio, and contact storage; initial metadata, sitemap, robots, social images, structured data, and analytics; and a passing TypeScript check and production build.

This phase does not validate the advertised larger catalog, audience figures, performance claims, or calculator accuracy.

## Phase 1 — SDD Baseline and Stabilization

**Status: Completed**

### Completed outcomes

- Approved the four project-level specs.
- Established the approved specs as the source of truth for future development.
- Defined a lightweight propose-review-implement-verify-update lifecycle.
- Classified discovered contradictions as explicit decisions or debt.
- Removed the superseded root-level Markdown after explicit approval.

### Completion evidence

- All four specs are approved and internally consistent.
- Each records its approval status, date, and baseline commit.
- Superseded root documentation was deleted only after approval.
- Phase 2 now owns specification and integration of automated testing.

## Phase 2 — Automated Testing Foundation

**Status: Current**

### Outcomes

- Create and approve `specs/testing.md` before changing application code.
- Add Vitest for deterministic unit tests and calculation regression tests.
- Add React Testing Library with a browser-like test environment for component behavior and user workflows.
- Add Playwright for a focused end-to-end smoke suite in Chromium, with room to add other browsers when evidence justifies the maintenance cost.
- Add documented npm scripts for one-shot unit tests, watch mode, coverage reporting, and end-to-end tests.
- Extract embedded calculator logic into pure, testable modules where necessary without intentionally changing production behavior.
- Cover every existing calculator with representative happy-path, boundary, invalid-input, and region/version-sensitive tests appropriate to that tool.
- Add component tests for shared navigation/search behavior and representative calculator input/result interactions.
- Add end-to-end tests for critical public routes, tool discovery, representative tools, theme behavior, blog availability, and contact-form success/error handling.
- Provide deterministic fixtures and mocks for Sanity, time, browser storage, and other external boundaries; automated tests must not write to the production Sanity dataset.
- Record an initial coverage baseline and identify critical untested paths instead of adopting an arbitrary global percentage target.
- Document how a solo maintainer runs and diagnoses the test suites locally.

### Boundaries

- Do not redesign pages, change formulas, fix unrelated lint findings, or alter public behavior merely to introduce tests.
- Any behavior defect discovered while adding tests must be documented and handled through a separate remediation spec.
- Keep the suite reliable and proportionate: fast unit/component feedback by default and a small end-to-end layer.

### Exit criteria

- `specs/testing.md` is approved and matches the project-level tech-stack and mission constraints.
- Vitest, React Testing Library, and Playwright are installed and configured.
- Documented npm commands run unit/component tests, watch mode, coverage, and end-to-end tests.
- All 20 implemented tools have regression coverage for their critical calculation or transformation behavior.
- Shared search/navigation and representative calculator components have interaction coverage.
- The critical end-to-end smoke suite passes without contacting production write services.
- Test fixtures are deterministic and tests do not depend on execution order.
- Typecheck and production build continue to pass after test integration.
- Coverage output and known testing gaps are documented for the next roadmap phase.

## Phase 3 — Trust and Engineering Foundation

**Status: Future**

### Outcomes

- Replace unsupported catalog, audience, performance, privacy, and accuracy claims.
- Create one canonical catalog for routes, navigation, search, sitemap, metadata, availability, and counts.
- Make every visible link resolve or show an explicit planned state.
- Clear lint debt and require lint, typecheck, the Phase 2 test suites, and build in CI.
- Extract calculation logic and add sources, regional/version metadata, disclaimers, and regression vectors.
- Harden contact validation, abuse controls, retention guidance, errors, and monitoring.
- Remove or quarantine unused database/auth/dependency and repair-script scaffolding.
- Audit accessibility, responsive behavior, Core Web Vitals, external assets, Sanity deprecations, metadata, and rendering.
- Centralize deploy values and document the supported Node/Vercel runtime.

### Exit criteria

- Published availability and counts agree with the canonical catalog.
- No known navigation path presents an unavailable tool as implemented.
- CI passes zero-error lint, typecheck, automated tests, and build.
- Sensitive tools have current sources, disclaimers, and regional/version metadata aligned with their Phase 2 regression tests.
- Contact controls are deployed and documented.
- Active dependencies match the architecture spec.
- Accessibility, performance, and production-check baselines are recorded.

## Phase 4 — Measurement and Content Engine

**Status: Future**

### Outcomes

- Define qualified organic use, successful engagement, repeat use, content-to-tool progression, request demand, and ad readiness with privacy-conscious analytics.
- Establish evidence-based tool-request triage and prioritization.
- Define Sanity sourcing, review, scheduling, correction, freshness, and retirement workflows.
- Improve blog rendering where measurement shows client-only loading limits acquisition or performance.
- Build intentional internal links between authoritative content and working tools.
- Define ad placement, consent, privacy, performance, and quality requirements without prematurely selecting a provider.

### Exit criteria

- Prioritization uses trusted measurements rather than unsupported traffic claims.
- A ranked, evidence-backed demand backlog exists.
- High-impact content has sources, review ownership, and freshness requirements.
- Tool/content progression is measurable without unnecessary personal data.
- Advertising readiness criteria are approved before integration.

## Phase 5 — Demand-Led Catalog Expansion

**Status: Future**

Add the highest-value calculators, converters, text/developer utilities, image/PDF workflows, and security tools. Select work by search demand, requests, usefulness, accuracy feasibility, maintenance cost, and infrastructure impact—not a target count. Keep processing local by default and pair tools with authoritative content where useful.

Every feature exits only when it has an approved spec, accurate catalog state, deterministic tests, required sources and disclaimers, responsive/accessibility/privacy/security/performance validation, and complete metadata and internal links.

## Phase 6 — Sustainable Monetization

**Status: Future**

Introduce non-intrusive, privacy-conscious advertising only after trust, measurement, and performance foundations are proven. Keep core tools free and accountless, retain a low-cost Vercel/Sanity model until measured scale justifies spending, and monitor effects on performance, accessibility, task completion, privacy, and trust.

### Exit criteria

- The advertising approach meets approved privacy, consent, content, and placement requirements.
- Performance remains inside the established budget.
- Ads do not obstruct inputs, results, navigation, or accessibility flows.
- Revenue and cost reporting demonstrates sustainability without invented audience figures.

## Outside the Current Horizon

Unless the project-level specs are revised, the following remain **Intentionally out of scope**:

- accounts and authentication;
- subscriptions or paid plans;
- cloud-saved calculations, histories, files, or profiles;
- a public developer API;
- native mobile or desktop applications.
