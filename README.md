# Jamro Tools

> 🚧 **This project is currently under active construction.** Features, pages, and tools are being built out. Expect frequent changes and additions.

A free, all-in-one collection of online utility tools — fast, lightweight, and private. Built with Next.js and Tailwind CSS.

---

## What Is Jamro Tools?

Jamro Tools is a comprehensive web platform offering hundreds of free online utilities across multiple categories. Whether you need to crunch numbers, convert files, generate passwords, format JSON, or compress images, Jamro Tools has you covered — no installs, no sign-ups, just open and use.

### Tool Categories

| Category | Description |
|---|---|
| **Calculators** | 120+ math, finance, health & science calculators |
| **Converters** | 80+ unit, currency, file & data converters |
| **Generators** | 45+ password, QR, UUID & code generators |
| **Dev Tools** | 200+ JSON, Markdown, encoding & debugging tools |
| **PDF Utils** | 32+ merge, split, compress & convert tools |
| **Graphics** | 64+ image resize, crop, compress & filter tools |
| **Text & SEO** | 112+ text manipulation, SEO & content tools |
| **Cybersec** | 25+ hash, encrypt, encode & security tools |
| **Finance** | 58+ loan, tax, budget & investment tools |
| **Others** | 150+ miscellaneous utilities |

### Highlights

- ⚡ **Lightning Fast** — Tools load in under 100ms
- 📱 **Any Device** — Fully responsive; seamless mobile experience
- 🔌 **API Ready** — Developer endpoints available
- 🔒 **Privacy First** — All processing happens client-side where possible

---

## Tech Stack

- **[Next.js](https://nextjs.org/)** (v16) — React framework with App Router
- **[React](https://react.dev/)** (v19) — UI library
- **[Tailwind CSS](https://tailwindcss.com/)** (v4) — Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** — Beautiful, consistent icon set
- **[TypeScript](https://www.typescriptlang.org/)** — Type-safe JavaScript

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/jamro-tools.git
cd jamro-tools

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Create an optimized production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint across the project |

---

## Project Structure

```
jamro-tools/
├── app/                     # Next.js App Router pages
│   ├── about/               # About page
│   ├── privacy-policy/      # Privacy Policy page
│   ├── terms/               # Terms of Service page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   └── not-found.tsx        # Custom 404 page
├── components/
│   ├── about/               # About page components
│   ├── landing/             # Landing page components
│   ├── layout/              # Site header & footer
│   ├── not-found/           # 404 page components
│   ├── privacy/             # Privacy policy components
│   ├── terms/               # Terms of service components
│   └── ui/                  # Shared UI components
├── lib/                     # Shared data & utilities
├── public/                  # Static assets
└── ...config files
```

---

## Status

> 🚧 **Work in Progress**

The landing page, about page, privacy policy, terms of service, and 404 page are built. Individual tool pages and their interactive functionality are currently being developed.

Planned & upcoming:

- [ ] Individual tool pages with interactive functionality
- [ ] Category listing pages
- [ ] Search & filtering
- [ ] Dark mode / theme switching
- [ ] Public API endpoints
- [ ] Tool favoriting & history

---

## License

[License TBD]

---

<p align="center">Made with ❤️ for the community</p>
