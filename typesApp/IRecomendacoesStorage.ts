/**
 * Formato salvo no localStorage pelo RecomendacoesStorageUtils: um perfil de
 * interesse (peso acumulado por palavra-chave) mais os posts já vistos, para
 * as "Publicações Recomendadas" da Home não sugerir de novo o que o usuário
 * já leu.
 */
export interface IRecomendacoesStorage {
  version: string;
  palavrasChave: { [palavra: string]: number };
  visualizados: string[];
}
