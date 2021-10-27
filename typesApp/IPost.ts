export interface IPost {
  id?: number;
  title: string;
  content?: string;
  cat?: number;
  catName?: string;
  href: string;
  isSubheader?: boolean;
}
