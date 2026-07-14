# Library — roadmap

**Product:** Library (`app-id: library`)  
**Primary device:** Realme P2 Pro — SoT `E:\MyAgent\workflow\devices\`  
**Ports:** DEV **3330** · PREPROD **4330** · PROD **5330**

Hard rule: **content API + IDs freeze by end of Phase 1.** UI may churn; schema may not.

---

## Phase 0 — Vision / IA

**Window:** 3–5 days · **Status:** done (`v0.0.1`)

- [x] Product name + north star (`docs/IDEA.md`)
- [x] Content graph + block types (`docs/CONTENT-SCHEMA.md`, `schema/content.schema.json`)
- [x] URL scheme: `/[app]/[pack]/[chapter]`
- [x] Port reservation + sandbox registry
- [x] Inventory AgentVerse markdown → packs/chapters via `npm run seed`

**Exit:** EM/builder agree “this survives 3D.”

---

## Phase 1 — Read-only viewer (seeded)

**Window:** 1.5–2.5 weeks · **Status:** done (`v0.1.x`)

- [x] Next.js PWA shell; light soft reader theme
- [x] Shelf → pack → chapter on Realme (360×780)
- [x] Seed AgentVerse docs (MD → structured JSON; imperfect OK)
- [x] TOC bottom sheet; search (title + prose); deep-linkable URLs
- [x] Last-read continue (localStorage)
- [x] Playwright e2e (Realme + tablet + desktop) — crew hire `agents/hires/2026-07-15-e2e-playwright.md`
- [x] Public hosts library-dev / library-staging / library.delena.buzz

**Exit:** Enjoy reading AgentVerse usage/tech on P2 Pro without wanting the repo tree. Snappy LCP.

---

## Phase 1.5 — Ask (RAG) + Listen (TTS)

**Status:** done (`v0.2.0`) · Hire `agents/hires/2026-07-15-rag-tts.md`

- [x] Content schema **frozen** — no new block types; no vectors/audio on blocks
- [x] `/api/retrieve` + `/api/ask` extractive RAG with chapter citations
- [x] Ask tab + panel (BottomNav)
- [x] Listen FAB — Web Speech TTS on chapter reader
- [x] Smoke + Playwright coverage (18 tests)

**Exit:** Ask returns grounded citations; Listen plays chapter prose on Realme Chrome.

---

## Phase 2 — Edit + version

**Window:** 2–3 weeks

- [ ] Markdown-first editor; **toggle** edit/preview (no phone side-by-side)
- [ ] Soft publish: draft → publish; keep previous published version
- [ ] Block insert toolbar (not raw-only)
- [ ] Reindex / bust TTS cache hooks on publish (for Ask/Listen)

**Exit:** Update a chapter on phone in &lt;2 minutes; no data loss.

---

## Phase 3 — Multi-app catalog

**Window:** 1–2 weeks

- [ ] Second/third shelves; empty-state “add shelf”
- [ ] Cross-app search
- [ ] Postgres schema-per-env when past seed files
- [ ] CSS SSO when auth is required (`clientId: library`)

**Exit:** ≥2 apps live; API stable for AgentVerse deep-links.

---

## Phase 4 — 3D Library skin

**Window:** later (AgentVerse-class effort)

- [ ] New client: shelf room → book (pack) → chapter as page/panel
- [ ] Consumes **same** published content API
- [ ] Spatial layout as optional overlay only

**Exit:** Zero content migration. Contract tests prove API shape.

---

## Milestones (commit-oriented)

| Milestone | Tag / commit theme | Deliverable |
|-----------|-------------------|-------------|
| M0 | `v0.0.1` | Idea + roadmap + schema (this baseline) |
| M1 | `v0.1.x` | Reader + AgentVerse seed + e2e + hosts |
| M1.5 | `v0.2.0` | Ask (extractive RAG) + Listen (TTS) side services |
| M2 | `v0.3.x` | Edit + publish |
| M3 | `v0.4.x` | Multi-app + API freeze for consumers |
| M4 | `v1.x` 3D skin | Spatial Library client |

---

## Explicit non-goals early

- No MDX custom component zoo in MVP (closed block set)
- No Postgres/CSS in Phase 0–1 unless forced
- No 3D authoring before phone reader feels good
- No VitePress-only dead-end if 3D is the destination
