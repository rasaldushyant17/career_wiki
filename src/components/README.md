# Components Folder

Reusable UI and feature modules shared across pages.

## Files
- `HUDPanel.tsx`: reusable framed panel container.
- `CareerLogo.tsx`: app logo/brand mark component.
- `Seo.tsx`: runtime meta/canonical/JSON-LD updater.
- `FAQChatWidget.tsx`: global floating FAQ + Gemini chat widget.
- `CareerRecommendationQuiz.tsx`: interactive career quiz experience.
- `CareerKeywordExplorer.tsx`: keyword-to-path roadmaps and quick links.
- `AICareerRecommender.tsx`: profile-based AI recommendation block.

## Usage Notes
- Route-level pages compose these components.
- `FAQChatWidget` is mounted globally in `src/App.tsx` so it appears on all routes.
