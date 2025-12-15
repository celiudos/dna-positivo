const configApp = {
  url: "https://dna-positivo.vercel.app/",
  site: "DNA Positivo",
  titulo: "DNA Positivo App",
  subtitulo: "Tratamento de Doenças através do DNA Físico e Quântico",
  email: "quintoelementoamor@hotmail.com",
  isMock: false,
  nextJs: {
    // revalidate: 1 * 60 * 60 * 24, // 1 dia
    revalidate: 1 * 60 * 60, // 1 hora
    // revalidate: 1 * 60 * 60 * 12, // 12 horas
  },
  idsPostsAntesDeQualquerDialogo: ["61a542c5-499a-59fc-aaee-95796d2eab9f"],
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
    {
      title:
        "Reconhecimento da homeopatia pelo DNA para a prevenção ou tratamento dos sintomas do COVID-19",
      href: "/cat/1/d7c3a590-af6b-5268-9b9f-363320dd8140",
    },
  ],
  muralDeAvisos: [],
};

export default configApp;
