# Jamro Tools Tech Stack

> **Document status:** Approved
> **Approved:** September 5, 2026
> **Baseline date:** September 5, 2026
> **Baseline commit:** `e52e2bd`

Related specifications: [Mission](./mission.md) · [Roadmap](./roadmap.md) · [Current State](./current-state.md)

## Status Legend

- **Current** — verified in executable code or configuration.
- **Intentional** — approved as the default for future work.
- **Legacy/Debt** — present but not endorsed as target architecture.
- **Future** — approved but not implemented.

## Runtime and Framework

| Area | Status | Baseline |
|---|---|---|
| Framework | **Current / Intentional** | Next.js `16.2.6`, App Router |
| UI | **Current / Intentional** | React and React DOM `19.2.4` |
| Language | **Current / Intentional** | TypeScript 5, `strict: true`, `@/*` root imports |
| Styling | **Current / Intentional** | Tailwind CSS 4 and semantic CSS variables |
| UI libraries | **Current** | Lucide, bundled Material Symbols, Recharts |
| Packages | **Current** | npm, lockfile version 3 |
| Observed toolchain | **Current** | Node `22.23.0`, npm `10.9.8` |

**Legacy/Debt:** No `engines`, `.nvmrc`, or equivalent file enforces the runtime. The observed versions are verified context, not yet a deployment contract.

## Application Architecture

**Current / Intentional:** App Router server components compose routes and metadata. Client components handle theme controls, search, forms, filters, calculators, charts, and browser state. The existing responsive brand and component direction should evolve in place; this baseline does not authorize a redesign or framework rewrite.

Key layers are:

- `app/` — routes, layouts, metadata, API handler, sitemap, robots, and social images;
- `components/` — shared UI, page sections, navigation, and calculator implementations;
- `data/tools/` — the 20 implemented `ToolConfig` records;
- `data/calculator-tools.ts` — the larger aspirational category directory;
- `components/tools/calculators/registry.ts` — component-name-to-React-component mapping;
- `lib/` and `sanity/schemas/` — integrations, shared helpers, and content schemas.

**Current:** `ToolConfig` defines slug, title, description, category, optional component name, metadata, editorial blocks, related links, FAQs, generic sections, and workspace layout. Dynamic routes validate both slug and category.

**Legacy/Debt:** Tool configs and the directory are competing sources of truth. A future canonical catalog must drive availability, navigation, search, sitemap entries, metadata, and published counts.

## Rendering and State

**Current:** The verified production build statically generates core marketing, company/legal, contact, directory, blog-index, robots, and sitemap routes. Dynamic category, tool, blog-post, admin, and contact API routes render on demand. Social images use the edge runtime. Calculator work runs in client components; basic and scientific calculator histories use `localStorage`.

**Current:** The blog index reads Sanity in a client component. Blog posts, tool-page teasers, and sitemap slugs are read server-side. Teasers request one-hour revalidation.

## Backend and Interfaces

**Current / Intentional:** Sanity is the sole active backend for this roadmap horizon:

- `blogPost` stores scheduled editorial content and metadata;
- `category` stores blog categories;
- `contactQuery` stores contact submissions and is read-only in Studio;
- `/admin` embeds Sanity Studio;
- public reads use the CDN client;
- contact writes use a server-side token through `POST /api/contact`.

**Current:** `POST /api/contact` accepts JSON `name`, `email`, `subject`, and `message`; it returns `201` after creating a Sanity document, `400` for missing fields, and `500` for unhandled failures.

**Legacy/Debt:** It lacks schema validation, normalized length limits, rate limiting, bot protection, structured logging, and a retention policy.

### Environment contract

| Variable | Status | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | **Current / Intentional** | Sanity project; code has a public fallback ID |
| `NEXT_PUBLIC_SANITY_DATASET` | **Current / Intentional** | Sanity dataset; defaults to `production` |
| `SANITY_API_WRITE_TOKEN` | **Current / Intentional** | Server-only contact-write authorization |
| `NODE_ENV` | **Current** | Enables production-only analytics |

Secret values must not appear in specifications or source control.

## Hosting and Operations

**Intentional:** Vercel is the target host, optimized for free or very low recurring cost until measured traffic or reliability requirements justify spending.

**Current:** Vercel Analytics, Speed Insights, and Google Analytics load in production. The canonical `https://jamrotools.com` origin and analytics identifiers are embedded in code.

**Legacy/Debt:** There is no committed deployment manifest, CI workflow, preview validation workflow, runtime policy, error tracking, or operational runbook.

## Quality

| Capability | Status | Baseline |
|---|---|---|
| Typecheck | **Current** | Passes with `npx tsc --noEmit --incremental false` |
| Production build | **Current** | `npm run build` passes |
| Lint | **Current / Debt** | Fails with 30 errors and 29 warnings; Phase 2 introduced no new findings |
| Tests | **Current** | Vitest 4.0.15 with React Testing Library and Playwright 1.55.0 Chromium; 108 Vitest tests and 7 critical browser journeys pass |
| CI | **Future** | No pipeline is committed |

**Current:** Vitest covers calculation units and representative component workflows, while a focused Playwright Chromium suite covers critical journeys using deterministic fixtures. The commands and dated coverage baseline are maintained in [`specs/testing.md`](./testing.md).

**Future / Intentional:** Typecheck, zero-error lint, tests, and production build will become CI gates after the Phase 3 lint backlog is cleared.

## Legacy Scaffolding

The following are **Legacy/Debt**, not planned architecture:

- Mongoose connection code and MongoDB models;
- JWT helpers, including fallback-secret behavior;
- unused bcrypt, Cloudinary, Mongoose, and auth-related dependency surface;
- the incomplete Mongoose seed script;
- one-off Python repair scripts tied to an earlier absolute path.

Remove or quarantine them only after verifying no production dependency.

## Constraints

- **Intentional:** Optimize for a solo maintainer and low operational overhead.
- **Intentional:** Support current evergreen desktop and mobile browsers accessibly.
- **Intentional:** Prefer browser-local tool processing and document exceptions.
- **Intentional:** Preserve Next.js, React, TypeScript, Tailwind, and Sanity unless a later project decision establishes a migration.
- **Intentional:** Do not add accounts, subscriptions, cloud-saved user data, public APIs, or native apps in the current horizon.
