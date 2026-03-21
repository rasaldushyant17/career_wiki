# Project Structure Notes

This document reflects the current repository layout and ownership.

## Root-Level Files
- `index.html`: hosts intro-screen HTML/CSS/JS and mounts React at `#root`.
- `package.json`: scripts and dependency definitions.
- `vite.config.ts`: Vite config and `@` path alias setup.
- `tailwind.config.ts`: Tailwind theme tokens and plugin config.
- `tsconfig*.json`: TypeScript compiler settings.
- `eslint.config.js`: ESLint config for TS + React hooks.
- `.env.example`: template for required environment variables.

## Main Folders
- `docs/`: project documentation and structure notes.
- `public/`: static files served as-is (icons, video, sitemap, robots).
- `scripts/`: utility scripts (SEO generation).
- `src/`: application code.

## `src/` Breakdown
- `main.tsx`: React bootstrap.
- `App.tsx`: route registry and shared lazy loading boundaries.
- `index.css`: global styles, tokens, and HUD utilities.

### `src/pages/`
Route-level screens:
- `Index.tsx`
- `CareerDetail.tsx`
- `CareerTree.tsx`
- `FAQPage.tsx`
- `NotFound.tsx`

### `src/components/`
Reusable feature/UI modules:
- SEO component
- FAQ chat widget
- quiz and AI recommender
- pathfinder/keyword explorer
- branded UI helpers

### `src/data/`
Static content and typed datasets:
- careers and FAQ data
- tree structure data
- keyword roadmaps
- fallback FAQ response map

### `src/utils/`
Shared site metadata helpers:
- canonical URL construction
- SEO base constants

## SEO and Deployment Notes
- `scripts/generate-seo.mjs` regenerates `public/sitemap.xml` and `public/robots.txt`.
- Sitemap generation reads career and FAQ IDs directly from `src/data/careers.ts`.
- Base domain defaults to `https://careerwiki-site.vercel.app` and can be overridden by `SITE_URL`.
