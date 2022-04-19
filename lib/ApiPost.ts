import ApiSearch from "@lib/ApiSearch";
import { IPost } from "@typesApp/IPost";
import DateUtils from "@utils/DateUtils";

export default class ApiPost {
  static getPostsRecentes(diasDeDif = 15, pageSize = 5): IPost[] {
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
}
