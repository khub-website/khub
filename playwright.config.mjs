import { defineConfig, devices } from '@playwright/test';

const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 3,
  timeout: 30000,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  use: {
    baseURL: BASE_URL,
    actionTimeout: 10000,
    navigationTimeout: 15000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  /* Run local production server before starting tests if BASE_URL is localhost */
  ...(BASE_URL.includes('localhost') || BASE_URL.includes('127.0.0.1')
    ? {
        webServer: {
          command: 'npm run start',
          url: BASE_URL,
          reuseExistingServer: !process.env.CI,
          timeout: 120000,
        },
      }
    : {}),
});
