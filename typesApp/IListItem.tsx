import { IPost } from "@typesApp/IPost";

export interface IListItem extends IPost {
  itens: IPost[];
  hasStar?: boolean;
}
