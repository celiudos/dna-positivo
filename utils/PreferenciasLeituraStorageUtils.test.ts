import PreferenciasLeituraStorageUtils from "./PreferenciasLeituraStorageUtils";

/**
 * `testEnvironment` do Jest é "node" (ver package.json), então não existe
 * `localStorage` global como no navegador. Um mock em memória bem simples já
 * basta para exercitar o utilitário.
 */
function criarLocalStorageMock() {
  let store: { [key: string]: string } = {};

  return {
    getItem: (key: string) => (key in store ? store[key] : null),
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
}

// @ts-ignore -- mock mínimo só com o que PreferenciasLeituraStorageUtils usa
global.localStorage = criarLocalStorageMock();

beforeEach(() => {
  localStorage.clear();
});

describe("getTamanhoFonte", () => {
  it("retorna o nível padrão quando não há nada salvo", () => {
    expect(PreferenciasLeituraStorageUtils.getTamanhoFonte()).toBe(
      PreferenciasLeituraStorageUtils.LIMITE_MIN,
    );
  });

  it("lê o nível salvo anteriormente", () => {
    PreferenciasLeituraStorageUtils.setTamanhoFonte(3);
    expect(PreferenciasLeituraStorageUtils.getTamanhoFonte()).toBe(3);
  });

  it("volta ao padrão se o conteúdo salvo estiver corrompido", () => {
    localStorage.setItem(PreferenciasLeituraStorageUtils.nomeKey, "{quebrado");
    expect(PreferenciasLeituraStorageUtils.getTamanhoFonte()).toBe(
      PreferenciasLeituraStorageUtils.LIMITE_MIN,
    );
  });
});

describe("setTamanhoFonte", () => {
  it("grava o valor e devolve o que foi efetivamente salvo", () => {
    const salvo = PreferenciasLeituraStorageUtils.setTamanhoFonte(2);

    expect(salvo).toBe(2);
    expect(PreferenciasLeituraStorageUtils.get()).toEqual({
      version: "1",
      tamanhoFonte: 2,
    });
  });

  it("limita o valor à faixa aceita (min e max)", () => {
    expect(PreferenciasLeituraStorageUtils.setTamanhoFonte(99)).toBe(
      PreferenciasLeituraStorageUtils.LIMITE_MAX,
    );
    expect(PreferenciasLeituraStorageUtils.setTamanhoFonte(-5)).toBe(
      PreferenciasLeituraStorageUtils.LIMITE_MIN,
    );
  });

  it("arredonda e ignora valores inválidos", () => {
    expect(PreferenciasLeituraStorageUtils.setTamanhoFonte(2.7)).toBe(3);
    expect(PreferenciasLeituraStorageUtils.setTamanhoFonte(NaN)).toBe(
      PreferenciasLeituraStorageUtils.LIMITE_MIN,
    );
  });

  it("mantém o valor persistido entre leituras (ajuste global)", () => {
    PreferenciasLeituraStorageUtils.setTamanhoFonte(4);

    // Uma nova "tela" lendo o mesmo storage enxerga o mesmo nível.
    expect(PreferenciasLeituraStorageUtils.getTamanhoFonte()).toBe(4);
  });
});

export {};
