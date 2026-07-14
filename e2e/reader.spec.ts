import { expect, test, type Page } from "@playwright/test";

async function openFirstUsageChapter(page: Page) {
  await page.goto("/agentverse/usage");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  const first = page.locator('a[href^="/agentverse/usage/"]').first();
  await expect(first).toBeVisible();
  await first.click();
  await expect(page).toHaveURL(/\/agentverse\/usage\/.+/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
}

test.describe("Library reader journey", () => {
  test("home lists AgentVerse shelf", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Library", level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "AgentVerse", level: 2 })).toBeVisible();
    await expect(page.getByRole("link", { name: /Usage/i }).first()).toBeVisible();

    expect(errors, errors.join("\n")).toEqual([]);
  });

  test("usage pack → chapter reader", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto("/agentverse");
    await expect(page.getByRole("heading", { name: "AgentVerse", level: 1 })).toBeVisible();
    await page.getByRole("link", { name: /Usage/i }).first().click();
    await expect(page).toHaveURL(/\/agentverse\/usage$/);
    await openFirstUsageChapter(page);
    await expect(page.getByRole("button", { name: /table of contents/i })).toBeVisible();

    expect(errors, errors.join("\n")).toEqual([]);
  });

  test("TOC bottom sheet lists chapters", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    await openFirstUsageChapter(page);
    await page.getByRole("button", { name: /table of contents/i }).click();
    const dialog = page.getByRole("dialog", { name: /table of contents/i });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading", { name: "Chapters" })).toBeVisible();
    await expect(dialog.getByRole("link").first()).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();

    expect(errors, errors.join("\n")).toEqual([]);
  });

  test("search finds prose and opens a hit", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto("/search");
    await expect(page.getByRole("heading", { name: "Search", level: 1 })).toBeVisible();
    await page.getByPlaceholder(/try desk/i).fill("desk");
    const hit = page.locator('a[href*="/agentverse/"]').first();
    await expect(hit).toBeVisible({ timeout: 10_000 });
    await hit.click();
    await expect(page).toHaveURL(/\/agentverse\/.+/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    expect(errors, errors.join("\n")).toEqual([]);
  });
});
