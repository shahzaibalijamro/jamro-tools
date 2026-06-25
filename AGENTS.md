# Repository Guidelines

Contributor guide for **Jamro Tools** — a Next.js 16 web platform offering free online utility tools (calculators, converters, generators, and more).

## Project Structure

```
app/                  # Next.js App Router — pages, layouts, API routes
  api/contact/route.ts
  blog/[slug]/page.tsx
  tools/calculators/[type]/[tool]/page.tsx
components/            # Feature-grouped UI components
  ui/                 # Shared primitives (button-link, container, safe-link)
  tools/calculators/custom/  # Individual calculator implementations
  tools/calculators/registry.ts  # Maps customComponent names to React components
data/tools/           # Tool metadata configs (ToolConfig objects)
lib/                  # Shared utilities (auth, mongoose, sanity, search-index)
models/               # Mongoose models (BlogPost, ContactQuery)
hooks/                # Custom React hooks (use-toast)
public/               # Static assets
sanity/               # Sanity CMS configuration
```

## Build, Test, and Development Commands

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server with Turbopack (http://localhost:3000) |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint (Next.js + TypeScript rules) |

No test framework is currently configured.

## Coding Style and Naming Conventions

- **Language**: TypeScript with `strict: true` — no `any` types.
- **Path alias**: Use `@/*` to import from the project root (e.g., `@/lib/auth`).
- **Files**: `kebab-case` (e.g., `mortgage-calculator.ts`, `site-header.tsx`).
- **Components**: `PascalCase` for names and exports (e.g., `MortgageCalculator`).
- **Variables/functions**: `camelCase` (e.g., `getToolBySlug`).
- **Styling**: Tailwind CSS v4. Use CSS custom properties defined in `app/globals.css` for theming. Dark mode toggled via the `.dark` class on `<html>`.
- **Linting**: ESLint with `eslint-config-next`. Run `npm run lint` before submitting.

## Adding a New Tool

1. Create a `ToolConfig` in `data/tools/[slug].ts`.
2. If the tool needs a custom UI, create a component in `components/tools/calculators/custom/` and register it in `registry.ts`.
3. Add the config export to `data/tools/index.ts`.

## Commit and Pull Request Guidelines

- Commit messages are lowercase and descriptive (e.g., `dark theme added`, `sanity configured`).
- Keep commits focused — one feature or fix per commit.
- PRs should include a clear description of what changed and why.

## Security and Configuration

- Never commit `.env*` files — they are gitignored. Copy `.env` to `.env.local` and fill in secrets locally.
- Environment variables include MongoDB URI, JWT secret, Sanity tokens, and Cloudinary credentials.
- Auth uses `bcryptjs` for hashing and `jsonwebtoken` for JWTs.
