import ApiSearch from "@lib/ApiSearch";
import { IPost } from "@typesApp/IPost";
import BaixarPostsDoBlogger from "@utils/BaixarPostsDoBlogger";
import DateUtils from "@utils/DateUtils";
import GenericUtils from "@utils/GenericUtils";
import axios from "axios";

export default class ApiPost {
  static async getPostsRecentes(
    diasDeDif = 15,
    pageSize = 5
  ): Promise<IPost[]> {
    await ApiPost.setAllPosts();
    const todosPostsSearch = ApiSearch.search({ pageSize });

    const todosPosts = todosPostsSearch.results.filter((post) => {
      return (
        DateUtils.getdiffInCalendarDays({
          fim: new Date(post.updated),
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

  private static async getUltimosPosts(): Promise<IPost[] | []> {
    const response = await axios(
      `${GenericUtils.getUrlBase()}api/ultimos-posts?catId=4`
    );
    if (response.status === 200) {
      const posts = response.data.posts.map((p: IPost) => ({
        ...p,
        isNovo: true,
      }));
      return posts;
    } else {
      return [];
    }
  }

  private static async setAllPosts(): Promise<void> {
    const posts = ApiSearch.getPostsJsonEstatico();
    const ultimosPosts = await ApiPost.getUltimosPosts();

    const allPosts = BaixarPostsDoBlogger.unirPostsComIdsIguais([
      ...posts,
      ...ultimosPosts,
    ]);

    ApiSearch.setAllPosts(allPosts);
  }
}
