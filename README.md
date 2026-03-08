# Career Wiki

Designed and Developed by **Dushyant Rasal**

## Project Purpose
Career Wiki is a modern career guidance website for students.  
It helps users explore streams, search career paths, use AI-based recommendations, review roadmaps, and take a career quiz.

## Tech Stack
- React + TypeScript
- Vite
- Tailwind CSS
- Framer Motion

## Folder Structure
```text
project-root/
├── index.html                       # Main HTML entry point (ownership comments included)
├── package.json                     # Scripts and dependency definitions
├── package-lock.json                # Locked dependency versions
├── vite.config.ts                   # Vite bundler configuration
├── tailwind.config.ts               # Tailwind theme and utility configuration
├── tsconfig*.json                   # TypeScript compiler configurations
├── postcss.config.js                # PostCSS/Tailwind processing
├── eslint.config.js                 # Linting rules
├── LICENSE                          # Project license
├── README.md                        # Project documentation
├── public/
│   ├── README.md                    # Static-assets folder notes
│   └── assets/
│       └── icons/
│           └── favicon.svg          # Site favicon (tab icon)
├── docs/
│   └── PROJECT_STRUCTURE.md         # Presentation-friendly structure explanation
└── src/
    ├── main.tsx                     # App bootstrap
    ├── App.tsx                      # Route setup
    ├── index.css                    # Global styles/theme tokens
    ├── components/                  # Reusable UI and feature components
    │   └── README.md                # Components folder notes
    ├── pages/                       # Route-level pages/screens
    │   └── README.md                # Pages folder notes
    ├── data/                        # Static project datasets/content
    │   └── README.md                # Data folder notes
    └── utils/                       # Helper utilities and data loaders
        └── README.md                # Utils folder notes
```

## How to Run
1. Install dependencies:
   - `npm install`
2. Start development server:
   - `npm run dev`
3. Build for production:
   - `npm run build`
4. Preview production build:
   - `npm run preview`

## Notes
- `node_modules/` and `dist/` are intentionally excluded from repository tracking.
- Cleanup removed only non-essential artifacts and unused backup datasets, without changing website behavior.
- This project uses a professional React/Vite structure (instead of plain `css/js` root folders) for reliability and maintainability.
