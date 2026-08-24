import { expect, Page, test } from "@playwright/test";
import configApp from "../../configApp";

const categoria = configApp.categorias[0];
const linhasSelector = '[id^="ListSection-ListItemButton-"]';

/** Abre a categoria configurada e entra no primeiro post da lista alfabética. */
async function irParaPrimeiroPost(page: Page) {
  await page.goto(categoria.href);
  await page.locator(linhasSelector).first().click();
  await expect(page).toHaveURL(new RegExp(`/cat/${categoria.cat}/.+`));
}

/**
 * Tela de post (pages/cat/[catId]/[id].tsx): conteúdo do diálogo, favoritar,
 * ajuste de tamanho de fonte e link para a publicação original no Blogger.
 */
test.describe("Post", () => {
  test("mostra título, categoria e conteúdo do post", async ({ page }) => {
    await irParaPrimeiroPost(page);

    await expect(page.getByRole("heading", { level: 1 })).not.toBeEmpty();
    await expect(page.getByText(/^Publicado em /)).toBeVisible();
    await expect(page.locator(".conteudo-post")).not.toBeEmpty();
  });

  test("favoritar alterna o botão entre 'Favoritar' e 'Favoritado'", async ({
    page,
  }) => {
    await irParaPrimeiroPost(page);

    const botaoFavoritar = page.getByRole("button", { name: "Favoritar" });
    await expect(botaoFavoritar).toBeVisible();

    await botaoFavoritar.click();
    const botaoFavoritado = page.getByRole("button", { name: "Favoritado" });
    await expect(botaoFavoritado).toBeVisible();

    await botaoFavoritado.click();
    await expect(page.getByRole("button", { name: "Favoritar" })).toBeVisible();
  });

  test("os botões de tamanho de fonte respeitam os limites min/max", async ({
    page,
  }) => {
    await irParaPrimeiroPost(page);

    const diminuir = page.getByRole("button", { name: "diminuir fonte" });
    const aumentar = page.getByRole("button", { name: "aumentar fonte" });

    // Começa no tamanho mínimo: só dá para aumentar.
    await expect(diminuir).toBeDisabled();
    await expect(aumentar).toBeEnabled();

    for (let i = 0; i < 5; i++) await aumentar.click();
    await expect(aumentar).toBeDisabled();
    await expect(diminuir).toBeEnabled();

    await diminuir.click();
    await expect(aumentar).toBeEnabled();
  });

  test("o link 'Ver publicação original' abre o post no Blogger em nova aba", async ({
    page,
  }) => {
    await irParaPrimeiroPost(page);

    const link = page.getByRole("link", { name: "Ver publicação original" });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("href", /^https?:\/\//);
  });

  test("o botão de voltar do cabeçalho leva de volta para a categoria", async ({
    page,
  }) => {
    await irParaPrimeiroPost(page);

    await page.locator("#btn-header-voltar").click();
    await expect(page).toHaveURL(new RegExp(`/cat/${categoria.cat}$`));
  });
});
