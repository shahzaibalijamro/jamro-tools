# Jamro Tools Mission

> **Document status:** Approved
> **Approved:** September 5, 2026
> **Baseline date:** September 5, 2026
> **Baseline commit:** `e52e2bd`

Related specifications: [Tech Stack](./tech-stack.md) · [Roadmap](./roadmap.md) · [Current State](./current-state.md)

## Status Legend

- **Current** — verified in executable code, configuration, or the deployed product.
- **Intentional** — an approved direction or constraint.
- **Legacy/Debt** — present today but not an endorsed long-term decision.
- **Future** — approved direction that is not implemented yet.

## Mission

**Intentional:** Jamro Tools is a free, ad-supported collection of trustworthy online utilities for people arriving with a specific task to complete. It should help a broad global audience get an accurate result quickly, without installing software, creating an account, or learning a complicated workflow.

The product will grow beyond its calculator-heavy starting point into a demand-led utility hub spanning calculators, converters, text and developer tools, image and PDF utilities, security tools, and other useful categories. Catalog breadth is a direction, not permission to present unimplemented tools as available.

## Users and Product Promises

**Intentional:** The primary audience is search-led and task-oriented: people solving everyday problems, students and educators, and professionals, developers, creators, and marketers using focused utilities. The supported client is a current evergreen desktop or mobile browser. Global tools should be broadly applicable; jurisdiction-specific behavior must be clearly labeled.

Jamro Tools commits to:

- immediate utility without registration or payment;
- responsive, accessible interfaces;
- deterministic, understandable results;
- browser-local processing of tool inputs by default;
- accurate descriptions of availability, privacy, performance, and adoption;
- free core tools supported by non-intrusive advertising.

Server-side or third-party tool processing is allowed only when genuinely required. Its feature specification must define data flow, retention, security, cost, and user disclosure. Contact submissions, analytics, content delivery, and advertising are separate networked site functions and must not be hidden behind claims that everything stays in the browser.

## Accuracy Standard

**Intentional:** Financial, health, educational, legal-adjacent, or otherwise high-impact tools must document:

- authoritative formula or policy sources;
- jurisdiction and effective/version dates;
- material assumptions and exclusions;
- representative input/output test vectors;
- an appropriate informational-use disclaimer.

Terms such as “professional-grade,” “scientifically accurate,” “current,” or “comprehensive” require supporting evidence.

## Growth and Success

**Intentional:** Qualified organic usage is the primary prioritization signal. Supporting signals are task completion, repeat use, search demand, user requests, content engagement, reliability, and sustainable advertising inventory. A useful visit is more valuable than an inflated tool or page count.

**Intentional:** The Sanity-backed blog is a core acquisition and education channel. Content should answer real questions, link to working tools, disclose assumptions, and meet the same evidence standards as the tools it explains.

**Future:** New tools and articles will be chosen by demonstrated demand across categories. Calculator completion is not required before entering another category when evidence supports a higher-value opportunity.

## Explicit Boundaries

The following are **Intentional** exclusions from the current roadmap horizon:

- accounts and authentication;
- subscriptions, paid plans, or paywalled core functionality;
- cloud-saved calculations, files, histories, or profiles;
- a public developer API;
- native mobile or desktop applications.

These boundaries may change only through an explicit project-level decision and updated specifications. Their presence in legacy code or old documentation does not make them approved work.

Jamro Tools succeeds when users discover a real tool, receive an accurate and understandable result, trust its claims and assumptions, return or continue to relevant content, and collectively support a low-overhead product that one maintainer can operate safely.
