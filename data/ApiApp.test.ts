/**
 * @jest-environment node
 */
import { IPost } from "@typesApp/IPost";
import ApiApp from "./ApiApp";

describe("ApiApp", () => {
  test("deve retornar os posts mais recentes", async () => {
    let responseData;
    try {
      responseData = await ApiApp.getPostsNovos();
    } catch (error) {}
    const post = responseData as IPost[];

    expect(post.length).toEqual(3);
    expect(post[0].title).toEqual("Diálogo Dirigido ao Acordar");
    expect(post[0].catName).toEqual("DNA Holográfico e Quântico");
    expect(post[1].title).toEqual(
      "Antes de fazer qualquer técnica, leia esse texto!"
    );
    expect(post[1].catName).toEqual("DNA Holográfico e Quântico");
    expect(post[2].title).toEqual(
      "Diálogo Dirigido para a Inversão da Polaridade Negativa"
    );
    expect(post[2].catName).toEqual("DNA Holográfico e Quântico");
  });
});
