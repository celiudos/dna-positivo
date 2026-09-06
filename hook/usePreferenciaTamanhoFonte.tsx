import PreferenciasLeituraStorageUtils from "@utils/PreferenciasLeituraStorageUtils";
import { useCallback, useEffect, useState } from "react";

/**
 * Preferência de tamanho da fonte de leitura, compartilhada por todo o app: o
 * nível escolhido em qualquer tela (hoje só a de post) é gravado no
 * localStorage por PreferenciasLeituraStorageUtils e relido pelas demais, então
 * aumentar a fonte num post passa a valer para os próximos. Um pub/sub em
 * memória mantém em sincronia os componentes montados na mesma aba, e o evento
 * `storage` propaga a mudança entre abas abertas.
 *
 * Começa sempre no nível padrão para o HTML do servidor bater com o primeiro
 * render do cliente (evita hydration mismatch); o valor salvo entra logo depois,
 * no efeito de montagem.
 */
const ouvintes = new Set<(valor: number) => void>();

function notificar(valor: number) {
  ouvintes.forEach((ouvinte) => ouvinte(valor));
}

export default function usePreferenciaTamanhoFonte() {
  const [tamanhoFonte, setTamanhoFonte] = useState(
    PreferenciasLeituraStorageUtils.LIMITE_MIN,
  );

  useEffect(() => {
    setTamanhoFonte(PreferenciasLeituraStorageUtils.getTamanhoFonte());

    const ouvinte = (valor: number) => setTamanhoFonte(valor);
    ouvintes.add(ouvinte);

    const aoMudarStorage = (evento: StorageEvent) => {
      if (evento.key !== PreferenciasLeituraStorageUtils.nomeKey) return;
      setTamanhoFonte(PreferenciasLeituraStorageUtils.getTamanhoFonte());
    };
    window.addEventListener("storage", aoMudarStorage);

    return () => {
      ouvintes.delete(ouvinte);
      window.removeEventListener("storage", aoMudarStorage);
    };
  }, []);

  const alterar = useCallback((proximo: number) => {
    const salvo = PreferenciasLeituraStorageUtils.setTamanhoFonte(proximo);
    notificar(salvo);
  }, []);

  const aumentar = useCallback(
    () => alterar(tamanhoFonte + 1),
    [alterar, tamanhoFonte],
  );

  const diminuir = useCallback(
    () => alterar(tamanhoFonte - 1),
    [alterar, tamanhoFonte],
  );

  return {
    tamanhoFonte,
    aumentar,
    diminuir,
    podeAumentar: tamanhoFonte < PreferenciasLeituraStorageUtils.LIMITE_MAX,
    podeDiminuir: tamanhoFonte > PreferenciasLeituraStorageUtils.LIMITE_MIN,
  };
}
