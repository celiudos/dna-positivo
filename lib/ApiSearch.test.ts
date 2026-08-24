import ApiSearch from "./ApiSearch";
import { IPost } from "@typesApp/IPost";

function criarPost(id: string, published: string, updated: string): IPost {
  return {
    id,
    title: `Post ${id}`,
    published,
    updated,
    resumo: "",
    content: "",
    contentSanitized: "",
    cat: 1,
    catName: "Categoria",
    href: `/cat/1/${id}`,
    hrefOriginal: "",
    isSubheader: false,
    isPage: false,
    isNovo: false,
  };
}

describe("Busca com excluirIds", () => {
  // A Home usa `excluirIds` para nao repetir, em "Publicacoes atualizadas",
  // os posts que ja aparecem em "Novas publicacoes".
  const posts = [
    criarPost("a", "2026-08-20T10:00:00", "2026-08-23T10:00:00"),
    criarPost("b", "2026-08-19T10:00:00", "2026-08-22T10:00:00"),
    criarPost("c", "2026-08-01T10:00:00", "2026-08-21T10:00:00"),
    criarPost("d", "2026-07-01T10:00:00", "2026-08-20T10:00:00"),
  ];

  beforeEach(() => {
    ApiSearch.setAllPosts(posts);
  });

  it("deve remover os ids informados do resultado", () => {
    const res = ApiSearch.search({ orderBy: "updated", excluirIds: ["a", "b"] });

    expect(res.results.map((p: IPost) => p.id)).toEqual(["c", "d"]);
    expect(res.total).toBe(2);
  });

  it("deve excluir antes de paginar, mantendo pageSize itens", () => {
    const res = ApiSearch.search({
      orderBy: "updated",
      pageSize: 2,
      excluirIds: ["a"],
    });

    expect(res.results.map((p: IPost) => p.id)).toEqual(["b", "c"]);
  });

  it("deve devolver todos os posts quando excluirIds estiver vazio", () => {
    const res = ApiSearch.search({ orderBy: "updated" });

    expect(res.results.map((p: IPost) => p.id)).toEqual(["a", "b", "c", "d"]);
  });
});

export {};
