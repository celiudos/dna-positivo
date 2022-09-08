import BaixarPostsDoBlogger from './BaixarPostsDoBlogger';

describe("JSON fix", () => {
  it("deve remover erros de JSON do Blogger", () => {
    const res = BaixarPostsDoBlogger.fixJson(
      '{ "arr": [{ "id": 1 }, { "id": 2 },, { "id": 3 }] }'
    );
    expect(res).toEqual({ arr: [{ id: 1 }, { id: 2 }, { id: 3 }] });
  });
});

export {};
