import { TODOS_OS_POSTS } from "@lib/ApiJsonImport";
import { IPost } from "@typesApp/IPost";
import ISearch, { TSearch } from "@typesApp/ISearch";
import TextUtils from "@utils/TextUtils";
import * as JsSearch from "js-search";
import lodash from "lodash";

const DEFAULT_PARAMS_VALUES: ISearch = {
  searchBy: "",
  searchFields: ["id"],
  filterBy: "",
  order: "desc",
  orderBy: "updated",
  limit: 300,
  jsonIds: [],
  page: 1,
  pageSize: 300,
};

const DEFAULT_RESPONSE_VALUES: TSearch = {
  ...DEFAULT_PARAMS_VALUES,
  error: {},
  total: 0,
  results: [],
};

export default class ApiSearch {
  static objJsSearch: JsSearch.Search;
  static fieldsJsSearchPost: string[] | undefined = [];
  static todosOsPosts = TODOS_OS_POSTS;

  static search(params_values: ISearch): TSearch {
    let {
      searchBy,
      searchFields,
      order,
      orderBy,
      filterBy,
      limit,
      page,
      pageSize,
      jsonIds,
    } = { ...DEFAULT_PARAMS_VALUES, ...params_values };

    let total = 0;
    let results: any = [];
    let error = {};

    if (!ApiSearch.objJsSearch) {
      ApiSearch.loadJsSearch(searchFields);
    }

    results = searchBy
      ? ApiSearch.objJsSearch.search(searchBy)
      : ApiSearch.getAllPosts();

    if (jsonIds && jsonIds.length)
      results = results.filter((r: any) => jsonIds?.indexOf(r.id) !== -1);

    if (filterBy) results = lodash.filter(results, filterBy);

    if (limit) {
      results = results.slice(0, limit);
    }

    results = lodash.orderBy(results, orderBy, order);
    total = results.length;

    if (page && pageSize) {
      if (page > pageSize) {
        error = ApiSearch.getError("erro-paginacao");
      } else {
        results = ApiSearch.paginarResultados(results, page, pageSize);
      }
    }

    return {
      searchBy,
      searchFields,
      order,
      orderBy,
      filterBy,
      limit,
      total,
      page,
      pageSize,
      jsonIds,
      results,
      error,
    };
  }

  private static loadJsSearch(searchFields: ISearch["searchFields"]): void {
    let search = new JsSearch.Search("id");
    search.indexStrategy = new JsSearch.AllSubstringsIndexStrategy();
    search.tokenizer = {
      tokenize(text) {
        return TextUtils.stringToSlugSemHifen(text).split(" ");
      },
    };

    let objJson: {}[] = [];
    let fields: string[] = [];

    objJson = ApiSearch.getAllPosts();

    if (searchFields?.length) fields = searchFields;
    ApiSearch.fieldsJsSearchPost = searchFields;

    fields.forEach((campo) => {
      search.addIndex(campo.split("."));
    });
    search.addDocuments(objJson);

    ApiSearch.objJsSearch = search;
  }

  static getDefaultParamValues(): ISearch {
    return DEFAULT_PARAMS_VALUES;
  }

  static getDefaultResponseValues(): TSearch {
    return DEFAULT_RESPONSE_VALUES;
  }

  private static paginarResultados(
    results: TSearch["results"],
    page: TSearch["page"],
    pageSize: TSearch["pageSize"]
  ): any {
    if (page) {
      const resultsEmPaginas = lodash.chunk(results, pageSize);
      if (resultsEmPaginas.length > 0) {
        return resultsEmPaginas[page - 1];
      }
    }
    return results || [];
  }

  static getAllPosts(): IPost[] {
    return ApiSearch.todosOsPosts;
  }

  static getPostsJsonEstatico(): IPost[] {
    return TODOS_OS_POSTS;
  }

  static setAllPosts(posts: IPost[]): void {
    ApiSearch.todosOsPosts = posts;
  }

  private static getError(id: string) {
    switch (id) {
      case "erro-parametro-pesquisar":
        return {
          id,
          msg: "Está faltando o parâmetro de 'text' na pesquisa",
        };
      case "erro-paginacao":
        return {
          id,
          msg: "A página atual é maior que o total de páginas",
        };
      case "erro-libs-nao-iniciadas-post":
        return {
          id,
          msg: "O objeto json POST não foi iniciado",
        };
      case "erro-libs-nao-iniciadas-postAgrupado":
        return {
          id,
          msg: "O objeto json POST-AGRUPADO não foi iniciado",
        };

      default:
        return {
          id: "erro",
          msg: "Ocorreu um erro",
        };
    }
  }
}
