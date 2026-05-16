# Changelog

## [0.7.1] — 2026-05-16

### Added
- `LICENSE` (MIT, © 2026 Erik Yuntantyo)
- `NOTICE.md` — shadcn/ui attribution (Copyright © 2023 shadcn, MIT) covering the verbatim-derived files: `button.tsx`, `badge.tsx`, `input.tsx`, `label.tsx`, `card.tsx`, `skeleton.tsx`, `avatar.tsx` (Avatar/AvatarImage/AvatarFallback structure), `table.tsx`, and `cn()` helper in `utils.ts`
- `license: "MIT"` and `author: "Erik Yuntantyo"` fields in `package.json`
- `README.md` — License link to `./LICENSE` and Third-Party Attributions section linking `./NOTICE.md`

## [0.7.0] — 2026-05-16

### Added
- Multi-stage Dockerfile (`deps → builder → runner`) with Next.js standalone output, non-root `nextjs:nodejs` (UID/GID 1001), Node 24 Alpine base, `/api/health` healthcheck
- `.dockerignore` to keep image lean
- `output: "standalone"` in `next.config.ts`
- Global `cursor: pointer` base layer rule in `globals.css` (covers `button`, `[role=button]`, `a[href]`, `label[for]`, `summary`, `[type=button|submit|reset]`) — restores Tailwind v3 default that v4 dropped
- `resolutions.postcss ^8.5.10` to evict vulnerable transitive

### Changed
- Bumped `next ^16.0.10 → ^16.2.6`
- Dropped per-component `cursor-pointer` class from `button.tsx`, `theme-toggle.tsx`, `login-content.tsx`, `forms-content.tsx`, `sidebar.tsx` — global rule now covers
- CI workflow: removed `pull_request` trigger (template repo, push-driven publish flow)

### Fixed
- Mobile breadcrumb truncation in `shared/layout/header.tsx` — `min-w-0` on nav, `shrink-0` on chevron/home icon, `truncate` on last crumb (sync w/ website v0.3.1)

## [0.6.0] — 2026-04-25

### Added
- Dashboard admin page with collapsible sidebar, sticky breadcrumb header, and mobile bottom nav
- Overview page with stat cards, area charts (Users & Sessions, Revenue via recharts), and recent activity list
- Users page with data table (Avatar, Badge, delete with modal confirmation and toast)
- Forms page with Login and Register form previews (tab switcher, loading states, Google OAuth button)
- Settings page with form inputs and save-triggers-toast interaction
- Sidebar CSS tokens (`--sidebar-*`) for semantic sidebar styling
- "Dashboard" link in public header navigation
- Timeline component (UI count → 15)

### Changed
- Light mode theme: warm cream background (hue 80), stronger text contrast, visible borders, no blue tint
- Reduced animations: kept only on hero elements, removed cascade from cards/sections
- Removed dead CSS: fade-in, subtle-float, slide-in-left keyframes and delay-400/500/600
- Removed unused CardFooter export from card.tsx
- Home page hero badge and subtitle synced with website color style
- Tech Stack tag corrected from "Geist Font" to "Inter + JetBrains Mono"
- siteConfig description updated to match home page content
- Login divider text: "Or continue with" → "OR"
- ESLint config: ignore packages/ directory
- Proxy simplified to single `/dashboard/:path*` matcher (no auth gate for demo)

### Fixed
- Theme toggle: `cursor-pointer` on both button and icon variants
- Mobile floating navigation home icon: outlined `faHouse` from `free-regular-svg-icons` (matches public header)
- Dashboard breadcrumb home icon: outlined `faHouse` matching public header
- Dashboard mobile floating nav: include About + Dashboard text labels matching public floating nav
- Sidebar header logo: matches public header style (`text-xl font-bold tracking-tight`, `text-primary` icon, `siteConfig.name`)
- Mobile sidebar header: uses `text-sidebar-foreground` instead of `text-foreground`
- Footer copyright year: hardcoded to 2025

## [0.5.0] — 2026-03-23

### Added
- `create-turmerrific-starter-kit` CLI package (`npx create-turmerrific-starter-kit my-app`)
- Monorepo structure with `packages/` directory

### Changed
- Theme updated to warm gold primary with pure neutral backgrounds
- README updated with `npx create-turmerrific-starter-kit` quick start
- Repository URL normalized for npm publishing

### Fixed
- Include `dist/` in published npm package via `files` field (v1.0.1)

## [0.4.0] — 2026-03-02

### Changed
- Tag colors updated to 6 pastel variants (yellow, orange, lime, cyan, violet, rose)
- Experience tags color-mapped to skill categories
- OpportunityCard highlighted with warm yellow tint
- About page uses Erik Yun demo data

## [0.3.0] — 2026-03-02

### Added
- Login page with email/password form
- Auth API routes (login, logout, NextAuth.js)
- JWT validation with Zod schemas
- Cookie security with __Host- prefix
- Sliding window rate limiter
- Route protection via proxy.ts
- Environment validation (fail-fast)

## [0.2.0] — 2026-03-02

### Added
- MDX-driven About page
- Profile section components (Hero, Skills, Experience, Education, Opportunity)
- Editable content via about.mdx

## [0.1.0] — 2026-03-02

### Added
- Next.js 16 App Router with React Compiler
- Tailwind CSS v4 with oklch Turmerrific theme
- 15 shadcn-style UI components
- Header and Footer layout
- Dark/light theme toggle
- Structured logging
- SEO metadata generation
- GitHub Actions CI pipeline
- Health check API endpoint
