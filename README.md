# Turmerrific

A modern Next.js 16 starter kit with Tailwind CSS v4, shadcn-style UI components, MDX content, and JWT authentication.

## Features

- **Next.js 16** App Router with React Compiler and TypeScript strict mode
- **Tailwind CSS v4** with oklch color palette and dark mode
- **15 UI Components** — Button, Card, Input, Badge, Table, Toast, Modal, Tag, and more
- **MDX Content** — Editable About page via `src/content/about.mdx`
- **Authentication** — JWT + NextAuth.js with Google OAuth, rate limiting, route protection
- **SEO** — Centralized metadata generation, dynamic robots.txt
- **Responsive Layout** — Header, footer, and section components
- **Developer Experience** — ESLint, Prettier, Turbopack, GitHub Actions CI

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
```

## Project Structure

```
src/
├── app/                    # Routes (layout, pages, API)
├── features/
│   ├── auth/services/      # Authentication service
│   └── profile/components/ # ProfileHero, SkillsGrid, ExperienceList, EducationGrid, OpportunityCard
├── shared/
│   ├── ui/                 # Button, Card, Modal, Badge, Input, Label, Table, Tag, Toast, etc.
│   ├── layout/             # Header, Footer
│   ├── hooks/              # use-theme.ts
│   ├── config/             # site.config.ts
│   └── utils/              # cn() helper
├── server/
│   ├── auth/               # JWT, cookies, rate limiting, route guards
│   ├── seo/                # Metadata generation
│   └── logging/            # Structured logger
├── content/
│   └── about.mdx           # About page content (edit this)
└── proxy.ts                # Route protection (Next.js 16 convention)
```

## Customization

- **Theme** — Edit `src/app/globals.css` to change colors (oklch format)
- **Content** — Edit `src/content/about.mdx` to update the About page
- **Config** — Edit `src/shared/config/site.config.ts` for site identity, social links, SEO

## Tech Stack

Next.js 16 | React 19 | TypeScript | Tailwind CSS v4 | MDX | NextAuth.js | Zod | Font Awesome 7

## License

MIT
