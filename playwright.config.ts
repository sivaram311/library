import { defineConfig, devices as pwDevices } from "@playwright/test";
import { devices } from "./e2e/fixtures/devices";

const port = 3330;
const baseURL = process.env.LIBRARY_URL || `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["list"], ["html", { open: "never", outputFolder: "playwright-report" }]],
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npm run start",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: "realme-p2-pro",
      use: {
        ...pwDevices["Desktop Chrome"],
        ...devices["realme-p2-pro"],
        userAgent:
          "Mozilla/5.0 (Linux; Android 14; Realme P2 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
      },
    },
    {
      name: "tablet-pad2-approx",
      use: {
        ...pwDevices["Desktop Chrome"],
        ...devices["tablet-pad2-approx"],
      },
    },
    {
      name: "desktop-1280",
      use: {
        ...pwDevices["Desktop Chrome"],
        ...devices["desktop-1280"],
      },
    },
  ],
});
