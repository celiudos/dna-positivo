interface DnafisicoequanticoType {
  version: string;
  encoding: string;
  feed: Feed;
}

interface Feed {
  xmlns: string;
  xmlns$openSearch: string;
  xmlns$gd: string;
  xmlns$georss: string;
  xmlns$thr: string;
  xmlns$blogger: string;
  id: Id;
  updated: Id;
  title: Title;
  subtitle: Title;
  link: Link[];
  author: Author[];
  generator: Generator;
  openSearch$totalResults: Id;
  openSearch$startIndex: Id;
  openSearch$itemsPerPage: Id;
  entry: Entry[];
}

interface Entry {
  id: Id;
  published: Id;
  updated: Id;
  title: Title;
  content: Title;
  link: Link2[];
  author: Author[];
}

interface Link2 {
  rel: string;
  type: string;
  href: string;
  title?: string;
}

interface Generator {
  version: string;
  uri: string;
  $t: string;
}

interface Author {
  name: Id;
  uri: Id;
  email: Id;
  gd$image: Gdimage;
}

interface Gdimage {
  rel: string;
  width: string;
  height: string;
  src: string;
}

interface Link {
  rel: string;
  type?: string;
  href: string;
}

interface Title {
  type: string;
  $t: string;
}

interface Id {
  $t: string;
}

export default DnafisicoequanticoType;
