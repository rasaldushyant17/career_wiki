# Pages Folder

Route-level screens rendered by React Router.

## Files
- `Index.tsx`: dashboard home at `/dashboard` (and routed from `/` after intro flow).
- `CareerDetail.tsx`: dynamic career detail route at `/career/:id`.
- `CareerTree.tsx`: interactive tree view at `/career-tree`.
- `FAQPage.tsx`: dynamic FAQ route at `/faq/:id` with optional Gemini assist.
- `NotFound.tsx`: fallback 404 page for unmatched routes.

## Routing Source
- Route declarations live in `src/App.tsx`.
