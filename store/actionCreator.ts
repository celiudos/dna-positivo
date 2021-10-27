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
