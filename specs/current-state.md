# Jamro Tools Current State

> **Document status:** Approved
> **Approved:** September 5, 2026
> **Snapshot date:** September 5, 2026
> **Baseline:** `e52e2bd` on `main`, matching `origin/main` at inspection time
> **Evidence rule:** Executable code and configuration take precedence over old Markdown

Related specifications: [Mission](./mission.md) · [Tech Stack](./tech-stack.md) · [Roadmap](./roadmap.md)

## Status Legend

- **Current** — verified in code, configuration, build output, or a public spot check.
- **Intentional** — approved direction.
- **Legacy/Debt** — existing behavior or code that is not the target.
- **Future** — approved direction not yet delivered.

## Snapshot

**Current:** Jamro Tools is a live Next.js utility site at `jamrotools.com`. Its implemented product is primarily browser-side financial and math calculators, supported by company/legal pages, a Sanity-backed blog and Studio, contact capture, search, theme switching, SEO metadata, and analytics.

There are exactly 20 implemented configs and 20 registered React tool components:

| Category | Implemented |
|---|---:|
| Financial | 10 |
| Math | 6 |
| Educational | 2 |
| Date & Time | 1 |
| Text Tools | 1 |
| **Total** | **20** |

**Legacy/Debt:** The visible directory advertises hundreds or more than 1,000 tools in unimplemented categories. “2M+ users,” sub-100ms performance, zero latency, and broad catalog counts were classified during the baseline interview as legacy or aspirational, not verified facts.

## Product Surface

**Current:** Public routes cover the homepage; tools and calculator directories; text tools; dynamic calculator categories and tools; blog index/posts; about, contact, write-for-us, privacy, and terms pages; robots, sitemap, generated social images, and a custom not-found experience.

**Current:** `/admin/[[...index]]` embeds Sanity Studio. `POST /api/contact` is the only application HTTP endpoint.

**Current:** Implemented tools are:

- Financial: mortgage, loan, rent versus buy, home affordability, net worth, ROI, 401(k), student loan, credit card payoff, and US federal income tax.
- Math: basic, scientific, cylinder volume, percentage, percentage decrease, and triple integral.
- Other: age difference, middle-school GPA, APUSH score, and word counter.

Calculators use local React state and browser math. Basic and scientific calculator histories use `localStorage`; there is no cloud user storage.

## Discovery and Navigation

**Current:** Header search indexes the 20 implemented `ToolConfig` records. Calculator category pages instead render the larger hardcoded directory.

**Legacy/Debt:** Availability has no canonical source. Generic route validation treats arbitrary calculator paths as navigable, so unimplemented directory items can reach not-found pages. The main directory also contains category links without routes and a search input that does not perform directory search.

## Content and Contact

**Current:** Sanity supplies blog posts and categories. The client-rendered blog index supports category filtering, date/read-time sorting, and nine-item pagination. Blog details and related posts are fetched server-side. Tool pages can show randomized recent blog teasers, and the sitemap includes published blog slugs.

**Legacy/Debt:** Newsletter submission is placeholder behavior. Editorial sourcing, review, corrections, freshness, and retirement are not documented.

**Current:** The contact form posts four fields to the API, which checks truthiness and creates a Sanity `contactQuery`.

**Legacy/Debt:** Contact handling lacks schema validation, field limits, rate limiting, bot defense, delivery notification, retention rules, and structured monitoring. Several social links are `#` placeholders.

**Legacy/Debt:** Mongoose, MongoDB models, JWT helpers, bcrypt/Cloudinary dependencies, and an incomplete seed script exist but are not used by active routes. Accounts, MongoDB, and cloud-saved data are not approved roadmap capabilities.

## Frontend, SEO, and Operations

**Current:** The responsive UI uses Tailwind, CSS variables, shared layout primitives, light/dark themes, Lucide, and Material Symbols. Theme preference uses `localStorage` or the system preference.

**Legacy/Debt:** Calculator and static-page composition is inconsistent. Some pages duplicate font loading, and several components use externally hosted placeholder imagery.

**Current:** The app provides route metadata, canonical URLs, root/per-tool social images, robots rules, and a sitemap covering static pages, implemented tools, categories, and published posts. Structured tool data is produced only when structured `pageContent` exists; one tool has that model populated.

**Current:** Vercel Analytics, Speed Insights, and Google Analytics are integrated. Vercel is the intentional low-cost target. Public spot checks showed the same broad claims on the deployed [homepage](https://jamrotools.com/) and the inspected experience on the deployed [mortgage calculator](https://jamrotools.com/tools/calculators/financial/mortgage-calculator).

**Legacy/Debt:** The site origin and analytics identifiers are hardcoded. There is no CI, deployment manifest, committed runtime, runbook, error tracking, or availability objective.

## Verified Health

| Check | Result |
|---|---|
| `npx tsc --noEmit --incremental false` | **Pass** |
| `npm run build` | **Pass** |
| `npm run lint` | **Fail: 32 errors, 33 warnings** |
| Automated tests | **Absent** |
| CI pipeline | **Absent** |

The build also warns about the deprecated default export of `@sanity/image-url` and edge runtime disabling static generation for the affected page. Lint failures include explicit `any`, React hook/ref issues, synchronous state changes in effects, unescaped JSX characters, and unused imports.

## Debt and Risk Register

| Area | Classification | Risk |
|---|---|---|
| Catalog | **Legacy/Debt** | Sources disagree about availability, slugs, and counts |
| Claims | **Legacy/Debt** | Traffic, catalog, performance, privacy, and accuracy claims lack evidence |
| Navigation | **Legacy/Debt** | Planned links are inert, placeholders, or lead to not-found pages |
| Accuracy | **Legacy/Debt** | No regression tests or maintained source records |
| Regional rules | **Legacy/Debt** | US-specific assumptions are not consistently labeled/versioned |
| Contact | **Legacy/Debt** | Minimal validation and no abuse controls |
| Code quality | **Legacy/Debt** | Lint fails and deprecated patterns remain |
| Backend remnants | **Legacy/Debt** | Unused MongoDB/auth code obscures the active architecture |
| Operations | **Legacy/Debt** | No CI, deployment configuration, monitoring policy, or runbook |
| Maintenance | **Intentional constraint** | One maintainer requires small, low-overhead increments |

## Intended Direction

- **Current:** A live calculator-centered site with 20 tools and active Sanity content/contact flows.
- **Intentional:** Evolve the existing Next.js, React, Tailwind, and Sanity architecture.
- **Legacy/Debt:** Correct unsupported claims, nonfunctional catalog entries, duplicate data, and unused backend/auth scaffolding.
- **Future:** Establish measurement and quality gates, then expand across categories according to demand while preserving free, accountless, client-first use.
