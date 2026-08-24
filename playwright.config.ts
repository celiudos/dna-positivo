import { defineConfig, devices } from "@playwright/test";

const configsDefault = {
  workers: 1,
  repeatEach: 1,
  timeout: Number(15 * 1000),
};

export default defineConfig({
  testDir: "./tests/e2e", // Pasta dos testes e2e
  // outputDir: './tests/test-results/',
  expect: {
    timeout: Number(15 * 1000), // Default timeout for expect()
  },
  /* Maximum time one test can run for. */
  timeout: configsDefault.timeout,
  use: {
    screenshot: "only-on-failure", //
    // locale: 'pt-BR', // Define o idioma padrão
    baseURL: "http://localhost:3000",
    // baseURL: 'https://www.docsec.com.br',
    headless: true,
    // headless: false,

    // Slow down Playwright actions by X ms (increase to slow more)
    launchOptions: {
      slowMo: 100, // e.g. 100ms delay between actions
    },
  },

  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : configsDefault.workers,

  repeatEach: process.env.CI ? 1 : configsDefault.repeatEach,

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],
});
