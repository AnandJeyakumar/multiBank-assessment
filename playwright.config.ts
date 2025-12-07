import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['list'],
    ['allure-playwright', {
      outputFolder: 'allure-results',
      disableHistory: true
    }]
  ],

  use: {
    baseURL: 'https://trade.multibank.io/',
    headless: true,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },

  projects: [
    // ---------- CHROMIUM ----------
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1520, height: 1080 },
        launchOptions: {
          args: [
            '--window-size=1520,1080',
            '--disable-dev-shm-usage',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-gpu'
          ]
        }
      }
    },

    // ---------- FIREFOX ----------
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1520, height: 1080 },
        launchOptions: {
          args: [
            '-width=1520',
            '-height=1080'
          ]
        }
      }
    },

    // ---------- WEBKIT ----------
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1520, height: 1080 },
        launchOptions: {
          args: [
            '--window-size=1520,1080'
          ]
        }
      }
    },
  ]
});
