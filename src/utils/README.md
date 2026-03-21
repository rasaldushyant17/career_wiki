# Utils Folder

Shared helper logic used across the app.

## Files
- `site.ts`: SEO/site constants and absolute URL helper.

## Notes
- `SITE.baseUrl` is sourced from `VITE_SITE_URL` with a production-safe fallback.
- Keep utility modules framework-agnostic where possible so they remain reusable.
