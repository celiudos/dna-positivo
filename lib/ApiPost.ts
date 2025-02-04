import ApiSearch from "@lib/ApiSearch";
import { IPost } from "@typesApp/IPost";
import BaixarPostsDoBlogger from "@utils/BaixarPostsDoBlogger";
import DateUtils from "@utils/DateUtils";
import GenericUtils from "@utils/GenericUtils";

export default class ApiPost {
  static async getPostsRecentes({
    diasDeDif = 15,
    pageSize = 5,
    orderBy = "published",
  }): Promise<IPost[]> {
    await ApiPost.setAllPosts();
    const todosPostsSearch = ApiSearch.search({
      pageSize,
      orderBy: orderBy,
    });

    const todosPosts = todosPostsSearch.results.filter((post) => {
      return (
        DateUtils.getdiffInCalendarDays({
          fim: new Date(post[orderBy]),
        }) < diasDeDif
      );
    });
    return todosPosts;
  }

  static async getPostsByIds(ids: string[]): Promise<IPost[]> {
    let posts = ApiSearch.search({ jsonIds: ids });

    if (posts.total > 0) return posts.results;

    await ApiPost.setAllPosts();
    posts = ApiSearch.search({ jsonIds: ids });
    return posts.results;
  }

  static async getPostsByCatId(catId: string): Promise<IPost[]> {
    await ApiPost.setAllPosts();
    const posts = ApiSearch.search({
      filterBy: { cat: parseInt(catId) },
    });

    return posts.results;
  }

  private static async getUltimosPosts(catId: number): Promise<IPost[] | []> {
    const response = await fetch(
      `${GenericUtils.getUrlBase()}api/ultimos-posts?catId=${catId}`
    );

    if (response.status === 200) {
      const data = (await response.json()) as any;
      const posts = data.posts.map((p: IPost) => ({
        ...p,
        isNovo: true,
      }));
      return posts;
    } else {
      return [];
    }
  }

  static async getTodosPosts(isForce = false): Promise<IPost[] | []> {
    let url = `${GenericUtils.getUrlBase()}api/atualizar`;
    if (isForce) {
      url += "-force";
    }

    const response = await fetch(url);

    if (response.status === 200) {
      const data = (await response.json()) as any;
      const posts = data.posts.map((p: IPost) => ({
        ...p,
        isNovo: true,
      }));
      return posts;
    } else {
      return [];
    }
  }

  static async setAllPosts(): Promise<IPost[]> {
    const posts = ApiSearch.getPostsJsonEstatico();
    const ultimosPosts_dnaholograficoequantico = await ApiPost.getUltimosPosts(
      4
    );
    const ultimosPosts_dnadometaverso = await ApiPost.getUltimosPosts(5);
    const ultimosPosts_inteligenciavirtualpositiva =
      await ApiPost.getUltimosPosts(3);

    const allPosts = BaixarPostsDoBlogger.unirPostsComIdsIguais([
      ...posts,
      ...ultimosPosts_dnaholograficoequantico,
      ...ultimosPosts_dnadometaverso,
      ...ultimosPosts_inteligenciavirtualpositiva,
    ]);

    ApiSearch.setAllPosts(allPosts);
    return allPosts;
  }
}
