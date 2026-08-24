import { defineConfig, devices } from "@playwright/test";

/**
 * O app é mobile-first (ver components/ContainerApp.tsx, que trava o layout
 * em `maxWidth="sm"`/600px) — por isso o projeto padrão roda numa viewport de
 * celular. Um projeto "Desktop" cobre o caso em que a mesma moldura fica
 * centralizada sobre o fundo, sem duplicar a suíte inteira.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  // `next dev` compila cada rota sob demanda: com muitos workers em paralelo
  // a primeira visita a uma página pode competir por CPU e estourar o timeout
  // padrão de asserção. Menos workers e um timeout maior deixam o teste
  // realista sem mascarar falhas de verdade.
  workers: process.env.CI ? 2 : 4,
  reporter: process.env.CI ? "line" : "html",
  expect: {
    timeout: 10_000,
  },
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },
  projects: [
    {
      name: "Mobile",
      use: { ...devices["Pixel 7"] },
    },
    {
      name: "Desktop",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
