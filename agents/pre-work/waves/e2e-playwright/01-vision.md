# 01 — Vision: Library E2E Playwright

**Wave:** e2e-playwright  
**Date:** 2026-07-15  
**SME + Lead:** Crew Lead

## Goal

Operators and agents can trust Library Phase 1 UI on the primary phone and secondary screens via an automated browser suite — not HTTP smoke alone.

## Journeys under test

1. Open Library → see AgentVerse shelf.  
2. Enter Usage → open chapter → read title.  
3. Open TOC sheet → see chapter list.  
4. Search → type query → open a result.  

## Success metrics

- Realme P2 Pro project **must** pass (blocking).  
- Tablet + desktop projects pass (blocking for this wave).  
- Specs use SoT viewports — no inventing sizes.  
- Suite runnable via `npm run e2e` with webServer on `:3330`.  

## Non-goals

Edit flows, 3D, auth, screenshot baselines (defer).
