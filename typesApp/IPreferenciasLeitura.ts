/**
 * Formato salvo no localStorage pelo PreferenciasLeituraStorageUtils: as
 * preferências da experiência de leitura que valem para o app inteiro. Hoje
 * guarda só o nível de ampliação da fonte (0 = padrão do tema ... 5 = máximo),
 * escolhido na barra de leitura do post e reaproveitado nas demais telas como
 * ajuste global. O campo `version` existe para permitir migração/reset de
 * formato no futuro, como nos outros *StorageUtils.
 */
export interface IPreferenciasLeitura {
  version: string;
  tamanhoFonte: number;
}
