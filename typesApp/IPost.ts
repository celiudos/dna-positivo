export interface IPost {
  id: number;
  title: string;
  content: string;
  contentSanitized: string;
  cat: number;
  catName: string;
  href: string;
  hrefOriginal: string;
  isSubheader: boolean;
}
