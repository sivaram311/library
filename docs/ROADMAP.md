# Library — roadmap

**Product:** Library (`app-id: library`)  
**Primary device:** Realme P2 Pro — SoT `E:\MyAgent\workflow\devices\`  
**Ports:** DEV **3330** · PREPROD **4330** · PROD **5330**

Hard rule: **content API + IDs freeze by end of Phase 1.** UI may churn; schema may not.

---

## Phase 0 — Vision / IA *(current)*

**Window:** 3–5 days · **Status:** in-repo baseline

- [x] Product name + north star (`docs/IDEA.md`)
- [x] Content graph + block types (`docs/CONTENT-SCHEMA.md`, `schema/content.schema.json`)
- [x] URL scheme: `/[app]/[pack]/[chapter]`
- [x] Port reservation + sandbox registry
- [ ] Inventory AgentVerse markdown → proposed packs/chapters (next)

**Exit:** EM/builder agree “this survives 3D.”

---

## Phase 1 — Read-only viewer (seeded)

**Window:** 1.5–2.5 weeks

- [ ] Next.js PWA shell; light soft reader theme
- [ ] Shelf → pack → chapter on Realme (360×780)
- [ ] Seed AgentVerse docs (MD → structured JSON; imperfect OK)
- [ ] TOC bottom sheet; search (title + prose); deep-linkable URLs
- [ ] Optional: offline cache of last-read chapter

**Exit:** Enjoy reading AgentVerse usage/tech on P2 Pro without wanting the repo tree. Snappy LCP.

**Risks:** Import quality; wrong type scale / line length.

---

## Phase 2 — Edit + version

**Window:** 2–3 weeks

- [ ] Markdown-first editor; **toggle** edit/preview (no phone side-by-side)
- [ ] Soft publish: draft → publish; keep previous published version
- [ ] Block insert toolbar (not raw-only)

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
| M1 | `v0.1.x` | Reader + AgentVerse seed |
| M2 | `v0.2.x` | Edit + publish |
| M3 | `v0.3.x` | Multi-app + API freeze for consumers |
| M4 | `v1.x` 3D skin | Spatial Library client |

---

## Explicit non-goals early

- No MDX custom component zoo in MVP (closed block set)
- No Postgres/CSS in Phase 0–1 unless forced
- No 3D authoring before phone reader feels good
- No VitePress-only dead-end if 3D is the destination
