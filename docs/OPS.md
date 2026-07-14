# Library — ops

| Env | Port | Status | Notes |
|-----|------|--------|-------|
| DEV | 3330 | reserved | `E:\MyWorkspace\sandbox\library` |
| PREPROD | 4330 | reserved | not deployed |
| PROD | 5330 | reserved | not deployed |

Reservations live in `E:\MyAgent\workflow\ports/` and hub `agent-portal/docs/platform/PORT-REGISTRY.md`.

## Smoke (when Phase 1 exists)

1. `npm run dev` → http://127.0.0.1:3330
2. Chrome DevTools / Playwright: `--viewport 360x780`
3. Open seeded AgentVerse usage chapter; check safe-area, TOC sheet, FAB reach

## Auth

Deferred. When required: CSS only, register `clientId: library` in MyAgent CSS registry.

## Promote

Standard MyAgent promote gates when F:/G: exist. No deploy yet.
