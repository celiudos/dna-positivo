import { expect, Locator, Page, test } from "@playwright/test";
import configApp from "../../configApp";

const categoria = configApp.categorias[0];

const linhasSelector = '[id^="ListSection-ListItemButton-"]';

/** Título de uma linha da lista, sem o Chip "Novo!" que pode vir junto. */
async function tituloDaLinha(linha: Locator): Promise<string> {
  const texto = await linha.innerText();
  return texto.replace(/\s*Novo!\s*$/, "").trim();
}

async function irParaCategoria(page: Page) {
  await page.goto(categoria.href);
  await expect(page.locator(linhasSelector).first()).toBeVisible();
}

/**
 * Tela de categoria (pages/cat/[catId]/index.tsx → components/ListSection):
 * lista alfabética de posts de um blog de origem, com busca por título e
 * trilha de letras A-Z.
 */
test.describe("Categoria", () => {
  test("mostra o nome da categoria e a lista de posts em ordem alfabética", async ({
    page,
  }) => {
    await irParaCategoria(page);

    await expect(page.getByRole("banner")).toContainText(categoria.title);

    const total = await page.locator(linhasSelector).count();
    expect(total).toBeGreaterThan(0);

    await expect(
      page.getByRole("navigation", { name: "Ir para a letra" })
    ).toBeVisible();
  });

  test("filtra a lista pelo título ao digitar na busca", async ({ page }) => {
    await irParaCategoria(page);

    const totalAntes = await page.locator(linhasSelector).count();
    const primeiraLinha = page.locator(linhasSelector).first();
    const titulo = await tituloDaLinha(primeiraLinha);
    const termo = titulo.slice(0, Math.min(8, titulo.length));

    const campoBusca = page.locator("#ListSection-InputBase-filtro");
    await campoBusca.fill(termo);

    await expect(page.getByText(titulo, { exact: false })).toBeVisible();
    const totalFiltrado = await page.locator(linhasSelector).count();
    expect(totalFiltrado).toBeGreaterThan(0);
    expect(totalFiltrado).toBeLessThanOrEqual(totalAntes);

    await page.locator("#ListSection-IconButton-limpar_filtro").click();
    await expect(campoBusca).toHaveValue("");
    await expect(page.locator(linhasSelector)).toHaveCount(totalAntes);
  });

  test("mostra estado vazio quando a busca não encontra nada", async ({
    page,
  }) => {
    await irParaCategoria(page);

    await page
      .locator("#ListSection-InputBase-filtro")
      .fill("termo-que-nao-deve-existir-em-nenhum-post-zzzz");

    await expect(page.getByText("Nada encontrado por aqui")).toBeVisible();
    await expect(page.locator(linhasSelector)).toHaveCount(0);
  });

  test("abre um post ao tocar numa linha e volta para a categoria", async ({
    page,
  }) => {
    await irParaCategoria(page);

    const primeiraLinha = page.locator(linhasSelector).first();
    const titulo = await tituloDaLinha(primeiraLinha);
    // A linha na lista pode truncar títulos longos (TextUtils.limitarTexto,
    // 60 chars + "..."); um prefixo curto continua sendo um trecho literal
    // do título completo mostrado no post.
    const prefixoTitulo = titulo.slice(0, 30).trim();
    await primeiraLinha.click();

    await expect(page).toHaveURL(new RegExp(`/cat/${categoria.cat}/.+`));
    await expect(
      page.getByRole("heading", { level: 1, name: prefixoTitulo, exact: false })
    ).toBeVisible();

    await page.locator("#btn-header-voltar").click();
    await expect(page).toHaveURL(new RegExp(`/cat/${categoria.cat}$`));
  });

  test("o botão de voltar do cabeçalho leva para a Home", async ({ page }) => {
    await irParaCategoria(page);

    await page.locator("#btn-header-voltar").click();
    await expect(page).toHaveURL(/\/$/);
  });
});
