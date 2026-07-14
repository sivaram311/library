# Library — ops

| Env | Port | Public host | Upstream path | Status |
|-----|------|-------------|---------------|--------|
| DEV | 3330 | https://library-dev.delena.buzz | `E:\MyWorkspace\sandbox\library` | DNS + nginx live |
| PREPROD | 4330 | https://library-staging.delena.buzz | `F:\apps\library` (planned) | DNS + nginx live; app not deployed yet |
| PROD | 5330 | https://library.delena.buzz | `G:\apps\library` (planned) | DNS + nginx live; app not deployed yet |

Nginx: `E:\Source\Deployment\conf\apps\library*.delena.buzz.conf`  
CF A records (proxied) → machine `PUBLIC_HOST`  
Reservations: `E:\MyAgent\workflow\ports/` · hub `PORT-REGISTRY.md`.

## Run (DEV)

```powershell
cd E:\MyWorkspace\sandbox\library
npm install
npm run seed
npm run dev
# http://127.0.0.1:3330
```

Production-mode local:

```powershell
npm run build
npm start
npm run smoke
```

## Smoke (HTTP)

```powershell
npm run build
npm start
npm run smoke
```

1. Home lists AgentVerse shelf + three pack chips
2. Open Usage → chapter; TOC FAB opens bottom sheet
3. Search finds prose (e.g. `desk`)
4. Chrome DevTools: `--viewport 360x780` (Realme SoT)
5. Safe-area: no chrome in punch-hole center

## E2E (Playwright)

Crew: `agents/hires/2026-07-15-e2e-playwright.md` · viewports from machine SoT.

| Project | Viewport |
|---------|----------|
| `realme-p2-pro` | 360×780 (primary) |
| `tablet-pad2-approx` | 800×1280 |
| `desktop-1280` | 1280×800 |

```powershell
npm run e2e           # build + all three projects (12 tests)
npm run e2e:realme    # Realme only
npx playwright test --project=desktop-1280
```

WebServer reuses `:3330` if already up (`reuseExistingServer`). Prefer a fresh build after UI changes.

## Ask / Listen (v0.2.0)

| Surface | How |
|---------|-----|
| Ask UI | https://library-dev.delena.buzz/ask |
| Ask API | `POST/GET /api/ask?q=` — extractive; citations only from published chapters |
| Retrieve API | `POST/GET /api/retrieve?q=` |
| Listen | Chapter reader FAB (Web Speech); schema unchanged |

Schema (`schema/content.schema.json`) stays frozen — no embeddings/audio fields on blocks.

## Auth

Deferred. When required: CSS only, `clientId: library`.

## Promote

Standard MyAgent Q1/Q2 when F:/G: exist. No deploy yet.
