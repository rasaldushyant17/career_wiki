# Career Wiki

Designed and developed by **Dushyant Rasal**.

## Overview
Career Wiki is a React + TypeScript career guidance platform for students and parents. It provides:
- Stream and career exploration after 10th/12th
- Detailed career pages with degrees, exams, colleges, and prospects
- Career tree view and keyword roadmap explorer
- FAQ pages and a floating FAQ + AI chat widget
- SEO metadata, sitemap, and robots generation support

## Tech Stack
- React 18 + TypeScript
- Vite 5
- Tailwind CSS
- Framer Motion
- React Router DOM

## Routes
- `/` intro entry screen (redirect flow to dashboard)
- `/dashboard` main dashboard (`Index` page)
- `/career/:id` career detail page
- `/career-tree` interactive tree page
- `/faq/:id` FAQ detail page
- `*` 404 page

## Scripts
- `npm run dev` start local dev server
- `npm run build` create production build in `dist/`
- `npm run preview` preview production build locally
- `npm run seo:generate` regenerate `public/sitemap.xml` and `public/robots.txt`

## Environment Variables
Create `.env` using `.env.example`.

- `VITE_SITE_URL`: canonical base URL used by client-side SEO component
- `VITE_GEMINI_API_KEY`: API key for Gemini-powered FAQ assistant features
- `SITE_URL`: optional domain override for `seo:generate` script

## Project Structure
```text
project-root/
├── docs/
│   └── PROJECT_STRUCTURE.md
├── public/
│   ├── assets/
│   │   ├── icons/
│   │   └── video/
│   ├── robots.txt
│   ├── sitemap.xml
│   └── README.md
├── scripts/
│   └── generate-seo.mjs
├── src/
│   ├── components/
│   ├── data/
│   ├── pages/
│   ├── utils/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .env.example
├── index.html
├── package.json
└── README.md
```

## Notes
- The root `index.html` includes the cinematic intro shell and bootstraps the React app.
- Structured folder READMEs are available inside `public/`, `src/components/`, `src/pages/`, `src/data/`, and `src/utils/`.
- Keep generated files (`dist/`, build caches, local env files) out of version control via `.gitignore`.
