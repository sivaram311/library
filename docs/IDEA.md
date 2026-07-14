# Library — product idea

**Updated:** 2026-07-15  
**Origin:** Grok 4.5 consult via Cursor CLI + builder brief  
**Codename (internal):** DocShelf — **ship name:** Library

## North star

One portable content graph for every workspace app — authored once, read beautifully on phone, later inhabited as a 3D library — never a second wiki.

## What it is

A phone-first **reader + soft CMS** for *app knowledge packs*:

- **Technical** — architecture, APIs, ops, ports, promote
- **Functional** — what the product does / journeys
- **Usage** — how humans and agents operate it day to day

Structured as **Shelf (app) → Pack → Chapter → typed Blocks**, with draft/publish status and stable IDs/slugs so AgentVerse (and a future 3D Library) can deep-link without rewriting docs.

## What it is NOT

- Not Notion / Confluence
- Not a raw Markdown file browser
- Not a dashboard of “all docs”
- Not AgentVerse itself (AgentVerse remains the 3D office / crew plane)
- Not a general personal knowledge base
- Not a pretty static site that dies when shelves and rooms arrive

## Why now

Repo markdown (OPS, vision, contracts) is hard to maintain and unpleasant to read on phone. The builder’s primary device is Realme P2 Pro. Reading must feel good; updating must be possible on the same phone. Later, the same content becomes walkable books in a game-like library — same path AgentVerse took for the office metaphor.

## Content contract (survives 3D)

| Web metaphor | 3D metaphor | Entity |
|--------------|-------------|--------|
| Shelf | Wing / bookshelf bay | App |
| Pack (T/F/U) | Book (spine by kind) | Pack |
| Chapter | Page / framed panel | Chapter |
| Block | Layout primitives | Block |
| Deep-link URL | Plaque / portal | same `id` / `slug` |

Authoring stays 2D. 3D is a **skin**: optional `shelfLayout` overlay — prose never inlined into the scene graph.

## Success feeling

On Realme P2 Pro, opening a Usage chapter for AgentVerse feels calm and readable — not like fighting a wiki. Editing a draft and publishing is deliberate, under two minutes for a small chapter. Months later, walking into a 3D wing opens the **same** published chapter.
