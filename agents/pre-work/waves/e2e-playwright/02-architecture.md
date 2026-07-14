# 02 — Architecture: E2E suite

**Stack:** `@playwright/test`  
**Layout:**

```
e2e/
  fixtures/devices.ts     # load SoT sizes (inline mirror of PRIMARY.json)
  reader.spec.ts          # shared scenarios, parameterized by project
playwright.config.ts      # three projects: realme / tablet / desktop
```

**Server:** Playwright `webServer` → `npm run start` (or `dev`) on **3330**. Prefer `build` + `start` for stable HTML.

**Stability:** Prefer `getByRole` / accessible names; wait for network idle lightly; tolerate seeded chapter slug variance by clicking first chapter link from pack page.

**SoT mirror:** Viewport numbers copied from `E:\MyAgent\workflow\devices\PRIMARY.json` with a comment pointing back — do not scrape the web.
