# Turmerrific

A modern Next.js 16 starter kit with Tailwind CSS v4, shadcn-style UI components, MDX content, and JWT authentication.

## Features

- **Next.js 16** App Router with React Compiler and TypeScript strict mode
- **Tailwind CSS v4** with oklch color palette and dark mode
- **22 UI Components** — Button, Card, Input, Badge, Table, Toast, Modal, Tag, Dropdown, Tabs, Accordion, Calendar, DatePicker, TimePicker, SearchInput, and more
- **MDX Content** — Editable About page via `src/content/about.mdx`
- **Authentication** — JWT + NextAuth.js with Google OAuth, rate limiting, route protection
- **SEO** — Centralized metadata generation, dynamic robots.txt
- **Responsive Layout** — Header, footer, and section components
- **Developer Experience** — ESLint, Prettier, Turbopack, GitHub Actions CI
- **Tested** — Jest + jsdom unit suites covering security-critical auth, env validation, rate limiting, JWT, route handlers, and proxy middleware (50 cases, 70% coverage gate)

## Quick Start

```bash
npx create-turmerrific-starter-kit my-app
cd my-app
yarn install
yarn dev
```

Open [http://localhost:3001](http://localhost:3001).

## Scripts

```bash
yarn dev            # Start dev server
yarn build          # Production build
yarn start          # Start production server
yarn lint           # Run ESLint
yarn format         # Format with Prettier
yarn format:check   # Check formatting
yarn test           # Run Jest test suite (jsdom + node env split)
yarn test:watch     # Watch mode
yarn test:coverage  # Generate coverage report (HTML + lcov)
```

## Project Structure

```
src/
├── app/                    # Routes (layout, pages, API)
├── features/
│   ├── auth/services/      # Authentication service
│   └── profile/components/ # ProfileHero, SkillsGrid, ExperienceList, EducationGrid, OpportunityCard
├── shared/
│   ├── ui/                 # Button, Card, Modal, Badge, Input, Label, Table, Tag, Toast, Dropdown, Tabs, Accordion, Calendar, DatePicker, TimePicker, SearchInput, etc.
│   ├── layout/             # Header, Footer
│   ├── hooks/              # use-theme.ts, use-debounced.ts
│   ├── config/             # site.config.ts
│   └── utils/              # cn() helper
├── server/
│   ├── auth/               # JWT, cookies, rate limiting, route guards
│   ├── seo/                # Metadata generation
│   └── logging/            # Structured logger
├── content/
│   └── about.mdx           # About page content (edit this)
└── proxy.ts                # Route protection (Next.js 16 convention)

tests/                      # Jest unit tests mirroring src/ tree
├── shared/
├── server/
├── features/
└── app/api/                # Route handler tests
```

## Testing

Jest 30 with `next/jest` integration. Tests live in root `tests/` mirroring `src/`. Adopters who don't want test infra can `rm -rf tests/` plus the test devDeps.

```bash
yarn test                # Run all suites
yarn test:watch          # Watch mode for TDD
yarn test:coverage       # Coverage report (70% global threshold)
```

**What's covered (50 cases across 13 suites)**:

- **Utils + Hooks** — `cn()` class merger, `useDebounced`, `useTheme`
- **Env validation** — fail-fast at startup, JWT_SECRET length, BACKEND_URL parse
- **Auth boundary** — cookie config (`__Host-` prefix in prod), JWT verify (valid / expired / malformed / wrong-sig / schema-fail / role-enum), `getAuthenticatedUser` + `requireRole` guards, sliding-window rate limiter (per-IP isolation, window reset, retry-after)
- **Auth service** — login (200 / 401 / 500 / bad-schema), `verifySession`, logout (success + network failure tolerance)
- **API routes** — `/api/health`, `/api/auth/login` (rate-limit, content-type, validation, success path), `/api/auth/logout` (cookie present / absent / deletion)
- **Proxy middleware** — default no-op behavior, `/api/*` bypass, matcher config

**What's not covered (intentional)**:

- UI primitives (Dropdown, Tabs, Modal, etc.) — render correctness verified via E2E later; interaction tests deferred to keep test runtime fast.
- Dashboard, profile, and content pages — presentational layer; E2E catches regressions.

**Test environment split**: tests touching `jose` (JWT) use `@jest-environment node` docblock. UI hook tests use the default jsdom env from `jest.config.ts`. The async wrapper around `next/jest` overrides `transformIgnorePatterns` to let SWC compile `jose`'s ESM-only build.

## Customization

- **Theme** — Edit `src/app/globals.css` to change colors (oklch format)
- **Content** — Edit `src/content/about.mdx` to update the About page
- **Config** — Edit `src/shared/config/site.config.ts` for site identity, social links, SEO

## Tech Stack

Next.js 16 | React 19 | TypeScript | Tailwind CSS v4 | MDX | NextAuth.js | Zod | Font Awesome 7

## License

MIT — see [LICENSE](./LICENSE).

## Third-Party Attributions

Several UI components are derived from [shadcn/ui](https://github.com/shadcn-ui/ui) (MIT, © 2023 shadcn). See [NOTICE.md](./NOTICE.md) for the full list of files and the original license text.
