export interface IPost {
  id: string;
  title: string;
  published: string;
  updated: string;
  resumo: string;
  content: string;
  contentSanitized: string;
  cat: number;
  catName: string;
  href: string;
  hrefOriginal: string;
  isSubheader: boolean;
  isPage: boolean;
  isNovo: boolean;
  youtubeUrl?: string;
  youtubeUrlEmbed?: string;
  youtubeLink?: string;
  youtubeImg?: string;
}

export interface IPostYoutube extends IPost {
  score: number;
  youtubeUrl: string;
  youtubeUrlEmbed: string;
  youtubeLink: string;
  youtubeImg: string;
}
