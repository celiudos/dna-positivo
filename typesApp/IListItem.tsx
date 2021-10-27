import { IPost } from "@typesApp/IPost";

export interface IListItem {
  itens: IPost[];
  hasStar?: boolean;
  hasData?: boolean;
}
