# Project Structure Notes

This file explains the project structure in simple presentation-ready terms.

## Root Files
- `index.html`: Browser entry file and root mounting point for React.
- `package.json`: Defines scripts (`dev`, `build`, `preview`) and dependencies.
- `vite.config.ts`: Build and dev server configuration.
- `tailwind.config.ts`: Design tokens and Tailwind setup.
- `tsconfig*.json`: TypeScript project settings.
- `postcss.config.js`: CSS processing pipeline.
- `eslint.config.js`: Code quality/lint setup.

## `src/` Folder
- `main.tsx`: Starts the React app.
- `App.tsx`: Defines page routes.
- `index.css`: Global visual theme, utilities, and shared effects.

### `src/pages/`
Route-level pages users navigate to (home, detail pages, FAQ, tree, etc.).

### `src/components/`
Reusable sections such as:
- UI panels
- AI recommender
- quiz
- keyword/pathfinder tools
- chat widget

### `src/data/`
Static datasets and content used by the pages/components.

### `src/utils/`
Shared helper logic (data loading, parsing, storage utilities).

## Cleanup Applied
- Removed `dist/` build artifact folder.
- Removed unused large backup data files not imported anywhere:
  - `src/data/mhtcet_merged_with_cutoffs.json`
  - `src/data/mhtcet_extracted_admin_dataset.json`

This keeps the project lighter while preserving current runtime behavior.
