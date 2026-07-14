# Library

Phone-first **reader** for technical, functional, and usage docs of apps built in this workspace.

Authored as a portable content graph → read beautifully on **Realme P2 Pro** → later a **3D game library** skin on the same API.

| Env | Path / URL | Port |
|-----|------------|------|
| DEV | `E:\MyWorkspace\sandbox\library` | **3330** |
| PREPROD | planned | **4330** |
| PROD | planned | **5330** |

- **Version:** `0.1.0` (Phase 1 read-only viewer)
- **app-id:** `library`
- **Repo:** https://github.com/sivaram311/library
- **Primary device SoT:** `E:\MyAgent\workflow\devices\REALME-P2-PRO.md` (viewport **360×780**)

## Run

```powershell
cd E:\MyWorkspace\sandbox\library
npm install
npm run seed    # recompile AgentVerse markdown → content/library.json
npm run dev     # http://127.0.0.1:3330
```

```powershell
npm run build
npm start
npm run smoke
npm run e2e      # Playwright: Realme + tablet + desktop
```

## Docs

| Doc | Topic |
|-----|--------|
| [docs/IDEA.md](docs/IDEA.md) | Product north star |
| [docs/ROADMAP.md](docs/ROADMAP.md) | Phases 0→4 |
| [docs/CONTENT-SCHEMA.md](docs/CONTENT-SCHEMA.md) | App → Pack → Chapter → Block |
| [docs/MOBILE.md](docs/MOBILE.md) | Realme UX |
| [docs/OPS.md](docs/OPS.md) | Ports / smoke |

## Phase 1 features

- Shelf → pack → chapter routes (`/[app]/[pack]/[chapter]`)
- Soft light reader theme (Fraunces + Source Sans 3)
- TOC bottom sheet · global search · continue last-read
- AgentVerse seeded into Usage / Functional / Technical packs
- PWA manifest (installable shell)
- Playwright e2e — Realme P2 Pro `360×780`, tablet `800×1280`, desktop `1280×800`

## Next

Phase 2 — markdown editor + draft/publish (see roadmap).
