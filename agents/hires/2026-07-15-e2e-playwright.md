# Hire — Library Playwright E2E (multi-viewport)

| When | Hire | Kind | Why |
|------|------|------|-----|
| 2026-07-15 | **Kabilan** (Device Lab QA) | Playwright / DevTools | Realme P2 Pro SoT viewport **360×780**; curved/safe-area smoke |
| 2026-07-15 | **QA-Tester** | E2E scenarios | Shelf → pack → chapter → TOC → search; assert no fatal console |
| 2026-07-15 | **Design System Keeper** (consult) | Viewport matrix | Confirm tablet + desktop presets match machine devices SoT |
| 2026-07-15 | **Docs-Keeper** | OPS | Document `npm run e2e` + CI-local recipe |

## Scope

Add a **Playwright** suite under `e2e/` that runs against Library DEV (`:3330`) for three viewports from machine SoT:

| Preset | Viewport | Role |
|--------|----------|------|
| `realme-p2-pro` | **360 × 780** | Primary phone (must pass) |
| `tablet-pad2-approx` | **800 × 1280** | Tablet |
| `desktop-1280` | **1280 × 800** | Computer |

Scenarios (read-only Phase 1):

1. Home lists AgentVerse shelf  
2. Open Usage pack → open a chapter → reader title visible  
3. TOC FAB opens bottom sheet with chapters  
4. Search finds a known term (e.g. `desk`) and navigates to a hit  
5. No `pageerror` / uncaught exception during the journey  

## Out of scope

- Auth / CSS  
- Edit/publish (Phase 2)  
- 3D Library skin  
- Visual golden screenshots (optional later)  
- F:/G: deploy  

## Device SoT (do not web-search)

`E:\MyAgent\workflow\devices\PRIMARY.json` · `REALME-P2-PRO.md`

## Exit

`npm run e2e` green on all three projects; OPS + ROADMAP updated; push public repo.
