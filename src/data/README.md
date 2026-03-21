# Data Folder

Static domain data used by pages and components.

## Files
- `careers.ts`: primary career catalog and FAQ sections.
- `dashboardSections.ts`: dashboard card sections used on the home page.
- `careerTree.ts`: hierarchical path tree used by `CareerTree` page.
- `keywordRoadmaps.ts`: keyword/pathfinder quick-route mapping.
- `faqResponses.json`: predefined Q/A map used by the floating FAQ chat widget.

## Notes
- Keep IDs stable (career IDs and FAQ IDs) because routes and sitemap generation depend on them.
- `scripts/generate-seo.mjs` reads `careers.ts` to build sitemap URLs.
