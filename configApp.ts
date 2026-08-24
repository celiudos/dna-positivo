const configApp = {
  url: "https://dna-positivo.vercel.app/",
  site: "DNA Positivo",
  titulo: "DNA Positivo App",
  subtitulo: "Tratamento de Doenças através da Inteligência Virtual Positiva",
  email: "quintoelementoamor@hotmail.com",
  isMock: false,
  nextJs: {
    revalidate: 1 * 60 * 60 * 24, // 1 dia
  },
  idsPostsAntesDeQualquerDialogo: ["61a542c5-499a-59fc-aaee-95796d2eab9f"],
  introducao: {
    title: "Introdução",
    contentSanitized:
      "A nossa proposta é usar a Internet e toda sua tecnologia. Hoje, essa mesma Internet vem sendo utilizada como principal meio de disseminação de diversas informações e manipulações que têm agravado as situações de desequilíbrio planetárias. Porém, também através da Internet podemos produzir uma energia que se espalhará pelo planeta. \n Aqui você encontrará técnicas que vão te ajudar no tratamento dos seus problemas e suas doenças, lembrando sempre que quem cura é a MEDICINA, portanto, não deixe de ir ao médico!",
  },
  // Cada categoria espelha um dos blogs de origem. `icone` é a chave mapeada
  // para um ícone do @iconify/icons-mdi em components/CategoriaGrid.tsx.
  categorias: [
    {
      cat: 3,
      title: "Inteligência Virtual Positiva",
      href: "/cat/3",
      icone: "brain",
      cor: "#5D6BC4",
      corFundo: "#EDEFFA",
    },
    {
      cat: 4,
      title: "DNA Holográfico e Quântico",
      href: "/cat/4",
      icone: "atom",
      cor: "#8E7BD4",
      corFundo: "#F2EEFC",
    },
    {
      cat: 1,
      title: "DNA físico e Quântico",
      href: "/cat/1",
      icone: "dna",
      cor: "#3F9E8F",
      corFundo: "#E8F5F2",
    },
    {
      cat: 2,
      title: "DNA Positivo",
      href: "/cat/2",
      icone: "shimmer",
      cor: "#C98F3C",
      corFundo: "#FBF3E5",
    },
    {
      cat: 5,
      title: "DNA do Metaverso",
      href: "/cat/5",
      icone: "metaverso",
      cor: "#5C8FD6",
      corFundo: "#EAF1FB",
    },
  ],
  postsDestaques: [
    {
      title: "Playlist no Youtube com todos os diálogos",
      href: "https://www.youtube.com/playlist?list=PLYaNwggFWE1wa-eWirUAGRsK2LKRXX_4L",
    },
    {
      title: "Diálogo com o DNA (1º versão)",
      href: "/cat/1/2aac317b-87cb-5f56-9a79-a79babcdf27b",
    },
    {
      title: "Controladores",
      href: "https://drive.google.com/drive/folders/1PfTaKsvQZLtEqZog53bt-DqdPwkzsMNS",
    },
    {
      title: "O Livro do Futuro - Planeta Terra",
      href: "http://dnapositivo.blogspot.com.br/p/publicamos-abaixo-7-capitulos-o-livro.html",
    },
    {
      title: "Artigos Científicos Publicado",
      href: "https://dnaholograficoequantico.blogspot.com/p/artigos-cientificos-publicados.html",
    },
    // {
    //   title:
    //     "Reconhecimento da homeopatia pelo DNA para a prevenção ou tratamento dos sintomas do COVID-19",
    //   href: "/cat/1/d7c3a590-af6b-5268-9b9f-363320dd8140",
    // },
  ],
  muralDeAvisos: [],
};

export default configApp;
