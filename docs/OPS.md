# Library — ops

| Env | Port | Status | Notes |
|-----|------|--------|-------|
| DEV | 3330 | reserved / local | `E:\MyWorkspace\sandbox\library` |
| PREPROD | 4330 | reserved | not deployed |
| PROD | 5330 | reserved | not deployed |

Reservations: `E:\MyAgent\workflow\ports/` · hub `agent-portal/docs/platform/PORT-REGISTRY.md`.

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

## Smoke

1. Home lists AgentVerse shelf + three pack chips
2. Open Usage → chapter; TOC FAB opens bottom sheet
3. Search finds prose (e.g. `desk`)
4. Chrome DevTools: `--viewport 360x780` (Realme SoT)
5. Safe-area: no chrome in punch-hole center

## Content refresh

```powershell
npm run seed   # rebuilds content/library.json from AgentVerse markdown
```

## Auth

Deferred. When required: CSS only, `clientId: library`.

## Promote

Standard MyAgent Q1/Q2 when F:/G: exist. No deploy yet.
