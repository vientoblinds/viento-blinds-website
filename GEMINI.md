# Viento Blinds - Project Context & Guidelines

## Project Overview
Viento Blinds is a premium window blinds website built with **Next.js 16 (App Router)**, deployed on **Vercel**. The site currently functions as a client-side SPA where all pages live in the DOM and `window.navigate()` toggles visibility via `public/js/main.js`. The project is planned for a backend migration (Postgres + Drizzle + Better Auth + custom CMS).

- **Current State**: Dynamic Next.js app (no `output: 'export'`) deployed on Vercel. The entire site operates as a single-page application — "navigation" toggles `.page.active` visibility on DOM elements controlled by `public/js/main.js`.
- **Primary Objective**: Migrate to a Vercel-hosted full-stack app with Postgres (Drizzle ORM), Better Auth (Google OAuth), and a custom CMS for blog and media management.
- **Core Documentation**: See `docs/backend-prd.md` for the comprehensive technical and product requirements for the backend migration.

## Technical Stack
- **Framework**: Next.js 16.1.6 (App Router)
- **React**: 19.0.0
- **Language**: JavaScript (TypeScript planned per PRD)
- **Styling**: Vanilla CSS (`app/globals.css`, ~1779 lines) with custom CSS variables and typography (Cormorant Garamond, Jost, Playfair Display).
- **Content Management**:
  - Current: `content/home-body.html` (~1180 lines) injected into `app/page.jsx` via `fs.readFileSync` + `dangerouslySetInnerHTML`.
  - Target: Postgres-backed CMS with Vercel Blob for media.
- **Database (Target)**: Managed Postgres via Drizzle ORM.
- **Authentication (Target)**: Better Auth (Admin-only RBAC with Google OAuth).

## Project Structure
```
├── app/
│   ├── layout.jsx          # Root layout — metadata, Google Fonts
│   ├── page.jsx            # Single entry — reads content/home-body.html and injects it
│   └── globals.css         # Full design system (~1779 lines) — nav, hero, products, features,
│                           #   marquee, partners, blogs, footer, about, product detail,
│                           #   blog detail, contact, catalogue tabs, swatches, animations
├── content/
│   └── home-body.html      # All page markup (~1180 lines):
│                           #   Home, About, All Products, Product Detail,
│                           #   Blogs, Blog Detail, Contact, shared footer per page
├── public/
│   ├── js/main.js          # SPA router, product/blog data, feature tabs,
│                           #   custom cursor, scroll progress, mobile menu
│   └── assets/
│       ├── viento-logo.jpg # Brand logo
│       └── video.mp4       # Factory tour video
├── docs/
│   └── backend-prd.md      # PRD — backend migration source of truth
├── context/
│   └── Website details .pdf  # Supplemental business context
├── next.config.mjs         # trailingSlash: true (no static export)
└── package.json            # next 16.1.6, react 19, react-dom 19
```

## Pages / Views (all rendered in one DOM, toggled by JS)
| Page | DOM ID | Description |
|---|---|---|
| **Home** | `page-home` | Hero (3 panels), Products grid (8), Features (5 tabs), Factory video, Marquee, Partners, Blogs preview, Footer |
| **About** | `page-about` | Hero, story grid, stats row, values (6 cards), process (4 steps) |
| **All Products** | `page-allproducts` | Full 8-product grid |
| **Product Detail** | `page-product` | Dynamic per-product view — features list, catalogue swatches (Zebra/Roller have multi-tab catalogues; others show flat swatches), technical specs, gallery, related products |
| **Blogs** | `page-blogs` | Blog listing with featured article layout |
| **Blog Detail** | `page-blogdetail` | Single post view with hero, article body, related posts |
| **Contact** | `page-contact` | Split layout — info panel + contact form |

## Data Model (Current — Hardcoded)
- **`window.productData`** in `public/js/main.js` — 8 products with subtitles, features, and optional nested `catalogues` (Zebra Blinds: 5 catalogues; Roller Blinds: 5 catalogues).
- **`window.blogData`** in `public/js/main.js` — 6 blog entries with titles and dates.

## Development Workflow

### Building and Running
- **Development**: `npm run dev` — clears `.next` cache then starts Next.js dev server.
- **Build**: `npm run build` — standard Next.js build (dynamic runtime, no static export).
- **Start**: `npm run start` — runs Next.js production server.

### Key Conventions
- **SPA Logic**: Navigation is handled by `window.navigate(pageName, data)` in `public/js/main.js`. Do not add new Next.js page routes unless migrating away from the current SPA architecture.
- **Styling**: Adhere to the established CSS variable system in `globals.css`. Avoid adding utility-first frameworks like Tailwind unless explicitly instructed — the project uses high-precision Vanilla CSS.
- **Content Updates**: For UI markup changes, modify `content/home-body.html`. For logic or data changes, modify `public/js/main.js`. For global styles, modify `app/globals.css`.

## Design System
- **Color tokens**: `--cream`, `--warm-white`, `--charcoal`, `--deep-brown`, `--mid-brown`, `--tan`, `--gold`, `--gold-light`, `--muted`, `--border`
- **Typography**: Cormorant Garamond (headings/display), Jost (body/UI), Playfair Display (loaded, minimal use)
- **Key components**: Custom cursor, scroll progress bar, dropdown nav with product grid, product cards with hover effects, feature tabs, infinite marquee, swatch color pickers, catalogue tabs, contact form

## Backend Migration Roadmap (from PRD)
1. **Phase 0**: Already on Vercel dynamic runtime (no `output: 'export'`).
2. **Phase 1**: Auth (Better Auth + Google OAuth allowlisting) + RBAC + admin bootstrap + audit foundation.
3. **Phase 2**: Lead capture API (`POST /api/v1/leads`) + admin leads dashboard APIs + email notifications (Resend).
4. **Phase 3**: Blog CMS APIs + media management (Vercel Blob) + scheduling worker.
5. **Phase 4**: Observability hardening (OpenTelemetry, alerts, SLOs).
6. **Phase 5**: Production launch with staged monitoring and rollback readiness.

Target stack: **Next.js App Router + TypeScript + Drizzle ORM + Postgres + Better Auth + Vercel Blob + Resend email + Zod validation**.

## Important Notes
- **Security**: The target backend requires strict audit logging and RBAC. Never expose admin endpoints or DB secrets.
- **Performance**: Maintain high visual fidelity and smooth animations (scroll progress, custom cursor) during any refactoring.
- **Deployment**: Already on Vercel. No GitHub Pages or static export configuration.
- **Image placeholders**: Product/blog images are currently CSS `.img-placeholder` elements — real images will be managed via Vercel Blob in the CMS phase.
