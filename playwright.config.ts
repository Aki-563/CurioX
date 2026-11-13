import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  workers: 3,
  retries: 0,
  reporter: [
    ['list'],
    ['json', { outputFile: 'test-artifacts/e2e-results.json' }],
  ],
  use: { baseURL: 'http://127.0.0.1:4321', trace: 'retain-on-failure' },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  webServer: [
    {
      command:
        'node node_modules/astro/bin/astro.mjs preview --host 127.0.0.1 --port 4321 --outDir dist-review',
      url: 'http://127.0.0.1:4321',
      reuseExistingServer: true,
    },
    {
      command: 'node scripts/serve-release.mjs',
      url: 'http://127.0.0.1:4322',
      reuseExistingServer: true,
    },
  ],
});
