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
