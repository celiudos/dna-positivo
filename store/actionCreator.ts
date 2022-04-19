export function favoritoAction(valor: {}) {
  return {
    type: "FAVORITO",
    valor,
  };
}
export function favoritoAlteradoAction(valor: {}) {
  return {
    type: "FAVORITO_ALTERADO",
    valor,
  };
}
export function carregandoPaginaAction(isZerar?: boolean) {
  return {
    type: "CARREGANDO_PAGINA",
    valor: isZerar ? 0 : new Date().getTime(),
  };
}
export function postsNovosAction(valor: {}) {
  return {
    type: "POSTS_NOVOS",
    valor,
  };
}
export function postsAction(valor: {}) {
  return {
    type: "POSTS",
    valor,
  };
}
export function allPostsAction(valor: {}) {
  return {
    type: "ALL_POSTS",
    valor,
  };
}
