interface ISearch {
  searchBy?: string;
  searchFields?: string[];
  filterBy?: string | {} | [string, any]; //https://lodash.com/docs/4.17.15#filter
  order?: "asc" | "desc";
  orderBy?: string;
  limit?: number;
  jsonName?: "TODOS_OS_POSTS";
  jsonIds?: string[];
  page?: number;
  pageSize?: number;
}

interface TSearch extends ISearch {
  total: number;
  results: any[];
  error?: {
    id?: string;
    msg?: string;
  };
}

export default ISearch;
export type { TSearch };
