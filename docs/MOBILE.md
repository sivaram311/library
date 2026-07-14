# Mobile UX — Library

**Do not search the web for device numbers.**

Machine source of truth:

| File | Role |
|------|------|
| `E:\MyAgent\workflow\devices\REALME-P2-PRO.md` | Human SoT |
| `E:\MyAgent\workflow\devices\PRIMARY.json` | Playwright / agents |
| `E:\MyAgent\workflow\devices\VIEWPORTS.md` | Named presets |

**Primary QA viewport:** `360 × 780` (`realme-p2-pro`)

## Product-specific reader rules

1. Reader is the product — after shelf/pack pick, land in prose.
2. Light soft theme; TOC as bottom sheet; Search global; edit via FAB.
3. Bottom bar max 3 items: Library · Search · Edit/Me.
4. Chapter = one scroll unit (not infinite whole-pack scroll).
5. Code blocks scroll horizontally inside the block; never widen the page.
6. Safe-area + punch-hole: no sticky chrome in top-center.
