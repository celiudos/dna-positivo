import { expect, test } from "@playwright/test";
import configApp from "../../configApp";

/**
 * Tela inicial (pages/index.tsx): hero, grade de categorias, destaques e as
 * seções de "Novas publicações"/"Publicações atualizadas" (quando existem
 * posts recentes o bastante para aparecer — ver ApiPost.getPostsRecentes).
 */
test.describe("Home", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("mostra a marca no hero e a barra de navegação", async ({ page }) => {
    await expect(
      page.getByRole("heading", { level: 1, name: configApp.site })
    ).toBeVisible();
    await expect(page.getByRole("banner")).toContainText(configApp.site);
  });

  test("lista todas as categorias configuradas, cada uma linkando para /cat/{id}", async ({
    page,
  }) => {
    await expect(
      page.getByRole("heading", { level: 2, name: "Explorar" })
    ).toBeVisible();

    for (const categoria of configApp.categorias) {
      const card = page.locator(`#CategoriaGrid-${categoria.cat}`);
      await expect(card).toBeVisible();
      await expect(card).toContainText(categoria.title);
      await expect(card).toHaveAttribute("href", categoria.href);
    }
  });

  test("navega para a categoria ao tocar em um card", async ({ page }) => {
    const categoria = configApp.categorias[0];
    await page.locator(`#CategoriaGrid-${categoria.cat}`).click();

    await expect(page).toHaveURL(new RegExp(`/cat/${categoria.cat}$`));
    await expect(page.getByRole("banner")).toContainText(categoria.title);
  });

  test("lista os destaques configurados", async ({ page }) => {
    await expect(
      page.getByRole("heading", { level: 2, name: "Destaques" })
    ).toBeVisible();

    const destaques = page.getByRole("navigation", { name: "Destaques" });
    for (const item of configApp.postsDestaques) {
      await expect(destaques.getByText(item.title)).toBeVisible();
    }
  });

  test("nenhum post aparece ao mesmo tempo em 'Novas publicações' e 'Publicações atualizadas'", async ({
    page,
  }) => {
    const secaoNovas = page.locator("section", {
      has: page.getByRole("heading", { name: "Novas publicações" }),
    });
    const secaoAlteradas = page.locator("section", {
      has: page.getByRole("heading", { name: "Publicações atualizadas" }),
    });

    // As seções são condicionais (só aparecem quando há posts recentes o
    // bastante); o teste só faz sentido quando ambas estão presentes.
    if ((await secaoNovas.count()) === 0 || (await secaoAlteradas.count()) === 0) {
      test.skip(
        true,
        "Sem posts recentes o bastante para as duas seções aparecerem juntas"
      );
    }

    const hrefsNovas = await secaoNovas.locator("a[href*='/cat/']").evaluateAll(
      (links) => links.map((a) => (a as HTMLAnchorElement).getAttribute("href"))
    );
    const hrefsAlteradas = await secaoAlteradas
      .locator("a[href*='/cat/']")
      .evaluateAll((links) =>
        links.map((a) => (a as HTMLAnchorElement).getAttribute("href"))
      );

    expect(hrefsNovas.length).toBeGreaterThan(0);
    expect(hrefsAlteradas.length).toBeGreaterThan(0);

    const repetidos = hrefsNovas.filter((href) => hrefsAlteradas.includes(href));
    expect(repetidos).toEqual([]);
  });
});
