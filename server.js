var express = require("express");
var app = express();

app.get("/", function (req, res) {
  res.send(json);
});

app.listen(6000, function () {
  console.log("Example app listening on port 6000!");
});

const json = {
  version: "1.0",
  encoding: "UTF-8",
  feed: {
    xmlns: "http://www.w3.org/2005/Atom",
    xmlns$openSearch: "http://a9.com/-/spec/opensearchrss/1.0/",
    xmlns$blogger: "http://schemas.google.com/blogger/2008",
    xmlns$georss: "http://www.georss.org/georss",
    xmlns$gd: "http://schemas.google.com/g/2005",
    xmlns$thr: "http://purl.org/syndication/thread/1.0",
    id: { $t: "tag:blogger.com,1999:blog-8122934176709728665" },
    updated: { $t: "2022-04-12T21:18:04.319-03:00" },
    title: { type: "text", $t: "DNA Holográfico e Quântico" },
    subtitle: { type: "html", $t: "E-mail: quintoelementoamor@hotmail.com" },
    link: [
      {
        rel: "http://schemas.google.com/g/2005#feed",
        type: "application/atom+xml",
        href: "https://dnaholograficoequantico.blogspot.com/feeds/posts/default",
      },
      {
        rel: "self",
        type: "application/atom+xml",
        href: "https://www.blogger.com/feeds/8122934176709728665/posts/default?alt=json\u0026max-results=200",
      },
      {
        rel: "alternate",
        type: "text/html",
        href: "https://dnaholograficoequantico.blogspot.com/",
      },
      { rel: "hub", href: "http://pubsubhubbub.appspot.com/" },
    ],
    author: [
      {
        name: { $t: "DNA Positivo" },
        uri: { $t: "http://www.blogger.com/profile/12680980880370164731" },
        email: { $t: "noreply@blogger.com" },
        gd$image: {
          rel: "http://schemas.google.com/g/2005#thumbnail",
          width: "33",
          height: "21",
          src: "http://2.bp.blogspot.com/-Ntnmwx5DA8c/VP-QwEjYqrI/AAAAAAAAAt4/L9wLem4HoPw/s220/marca%2Bnova%2Bblog.jpg",
        },
      },
    ],
    generator: {
      version: "7.00",
      uri: "http://www.blogger.com",
      $t: "Blogger",
    },
    openSearch$totalResults: { $t: "17" },
    openSearch$startIndex: { $t: "1" },
    openSearch$itemsPerPage: { $t: "200" },
    entry: [
      // {
      //   id: {
      //     $t: "tag:blogger.com,1999:blog-8122934176709728665.post-7552142288042583786",
      //   },
      //   published: { $t: "2022-04-12T21:15:00.002-03:00" },
      //   updated: { $t: "2022-04-12T21:17:18.654-03:00" },
      //   title: {
      //     type: "text",
      //     $t: "Diálogo Dirigido com o Inimigo Interior (ou Duplo)",
      //   },
      //   content: {
      //     type: "html",
      //     $t: '\u003Cdiv style="text-align: justify;"\u003E\u003Cspan style="font-family: verdana;"\u003ESomos formados por frações positivas e negativas, e fazemos prevalecer nossas partículas negativas quando damos vazão aos desequilíbrios dos pensamentos e atitudes. Isso desperta em nós o Inimigo Interior, ou Duplo, ativando nossas doenças e sintomas. Este diálogo nos ajuda a restabelecer o equilíbrio dos pensamentos e atitudes, e a neutralizar as doenças e sintomas.\u003C/span\u003E\u003C/div\u003E\u003Cdiv style="text-align: justify;"\u003E\u003Cspan style="font-family: verdana;"\u003E\u003Cbr /\u003E\u003C/span\u003E\u003C/div\u003E\u003Cdiv style="text-align: justify;"\u003E\u003Cdiv class="separator" style="clear: both; text-align: center;"\u003E\u003Ca href="https://dialogos.ml/inimigo_interior_0044" style="margin-left: 1em; margin-right: 1em;" target="_blank"\u003E\u003Cimg border="0" data-original-height="302" data-original-width="539" height="224" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgvPX6TXE-WLkVHl5nGg3CIW25HphVuwEnwtBFQiJ3kruUDN_dvgEKeVmrVqBy-CCDG2Z9go_7oP772_aXzyCQ5c3LYvf3dqUXrw9xfLqf_Q9PsN0eDp40EUuVrdIVj-JtaMYpVvIKi4Y4C22IYkn9yiKoYFmyw3qtBBK5YyfvC5FY2MzCgHIyR-Yzn/w400-h224/inimigo.png" width="400" /\u003E\u003C/a\u003E\u003C/div\u003E\u003Cdiv class="separator" style="clear: both; text-align: center;"\u003E\u003Cbr /\u003E\u003C/div\u003E\u003C/div\u003E',
      //   },
      //   link: [
      //     {
      //       rel: "edit",
      //       type: "application/atom+xml",
      //       href: "https://www.blogger.com/feeds/8122934176709728665/posts/default/7552142288042583786",
      //     },
      //     {
      //       rel: "self",
      //       type: "application/atom+xml",
      //       href: "https://www.blogger.com/feeds/8122934176709728665/posts/default/7552142288042583786",
      //     },
      //     {
      //       rel: "alternate",
      //       type: "text/html",
      //       href: "https://dnaholograficoequantico.blogspot.com/2022/04/dialogo-dirigido-com-o-inimigo-interior.html",
      //       title: "Diálogo Dirigido com o Inimigo Interior (ou Duplo)",
      //     },
      //   ],
      //   author: [
      //     {
      //       name: { $t: "DNA Positivo" },
      //       uri: { $t: "http://www.blogger.com/profile/12680980880370164731" },
      //       email: { $t: "noreply@blogger.com" },
      //       gd$image: {
      //         rel: "http://schemas.google.com/g/2005#thumbnail",
      //         width: "33",
      //         height: "21",
      //         src: "http://2.bp.blogspot.com/-Ntnmwx5DA8c/VP-QwEjYqrI/AAAAAAAAAt4/L9wLem4HoPw/s220/marca%2Bnova%2Bblog.jpg",
      //       },
      //     },
      //   ],
      //   media$thumbnail: {
      //     xmlns$media: "http://search.yahoo.com/mrss/",
      //     url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgvPX6TXE-WLkVHl5nGg3CIW25HphVuwEnwtBFQiJ3kruUDN_dvgEKeVmrVqBy-CCDG2Z9go_7oP772_aXzyCQ5c3LYvf3dqUXrw9xfLqf_Q9PsN0eDp40EUuVrdIVj-JtaMYpVvIKi4Y4C22IYkn9yiKoYFmyw3qtBBK5YyfvC5FY2MzCgHIyR-Yzn/s72-w400-h224-c/inimigo.png",
      //     height: "72",
      //     width: "72",
      //   },
      // },
      {
        id: {
          $t: "tag:blogger.com,1999:blog-8122934176709728665.post-8195705592096633595",
        },
        published: { $t: "2022-04-03T18:03:00.000-03:00" },
        updated: { $t: "2022-04-03T18:03:02.331-03:00" },
        title: { type: "text", $t: "Diálogo Dirigido com o Câncer de Mama" },
        content: {
          type: "html",
          $t: '\u003Cp style="text-align: justify;"\u003E\u003Cspan style="font-family: verdana;"\u003EDiálogo dirigido para o tratamento do Câncer de Mama. Utiliza as cores e suas funções terapêuticas para corrigir a multiplicação desordenada das células anormais da mama, de forma a restabelecer o padrão saudável dos tecidos mamários.\u0026nbsp;\u003C/span\u003E\u003C/p\u003E\u003Cp style="text-align: justify;"\u003E\u003Cspan style="font-family: verdana;"\u003EFique atento às fases da narração para repetir em voz alta as cores e suas funções.\u003C/span\u003E\u003C/p\u003E\u003Cp style="text-align: justify;"\u003E\u003Cspan style="font-family: verdana;"\u003E\u003Cbr /\u003E\u003C/span\u003E\u003C/p\u003E\u003Cp style="text-align: justify;"\u003E\u003C/p\u003E\u003Cdiv class="separator" style="clear: both; text-align: center;"\u003E\u003Ca href="https://dialogos.ml/cancer_de_mama_0987" imageanchor="1" style="margin-left: 1em; margin-right: 1em;" target="_blank"\u003E\u003Cimg border="0" data-original-height="304" data-original-width="540" height="225" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgThxHrWhN88WTacaWBwMhI_1mOi0gPpfWmn4_Nk8GYSQrhbm9c-w0vqU43GJAUn0ChKsNI6TWuowdgScOEQEOm6a-c08uBkyaFNExUFXuUsC_OvszEPcZl5dP5JmyfhAaj_6fH7RDGAjlsN1hK6mxGeb7DBXgSLG2tRXMuXSnWvJe5Bn8rbtiurM_1/w400-h225/mama.png" width="400" /\u003E\u003C/a\u003E\u003C/div\u003E\u003Cbr /\u003E\u003Cspan style="font-family: verdana;"\u003E\u003Cbr /\u003E\u003C/span\u003E\u003Cp\u003E\u003C/p\u003E',
        },
        link: [
          {
            rel: "edit",
            type: "application/atom+xml",
            href: "https://www.blogger.com/feeds/8122934176709728665/posts/default/8195705592096633595",
          },
          {
            rel: "self",
            type: "application/atom+xml",
            href: "https://www.blogger.com/feeds/8122934176709728665/posts/default/8195705592096633595",
          },
          {
            rel: "alternate",
            type: "text/html",
            href: "https://dnaholograficoequantico.blogspot.com/2022/04/dialogo-dirigido-com-o-cancer-de-mama.html",
            title: "Diálogo Dirigido com o Câncer de Mama",
          },
        ],
        author: [
          {
            name: { $t: "DNA Positivo" },
            uri: { $t: "http://www.blogger.com/profile/12680980880370164731" },
            email: { $t: "noreply@blogger.com" },
            gd$image: {
              rel: "http://schemas.google.com/g/2005#thumbnail",
              width: "33",
              height: "21",
              src: "http://2.bp.blogspot.com/-Ntnmwx5DA8c/VP-QwEjYqrI/AAAAAAAAAt4/L9wLem4HoPw/s220/marca%2Bnova%2Bblog.jpg",
            },
          },
        ],
        media$thumbnail: {
          xmlns$media: "http://search.yahoo.com/mrss/",
          url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgThxHrWhN88WTacaWBwMhI_1mOi0gPpfWmn4_Nk8GYSQrhbm9c-w0vqU43GJAUn0ChKsNI6TWuowdgScOEQEOm6a-c08uBkyaFNExUFXuUsC_OvszEPcZl5dP5JmyfhAaj_6fH7RDGAjlsN1hK6mxGeb7DBXgSLG2tRXMuXSnWvJe5Bn8rbtiurM_1/s72-w400-h225-c/mama.png",
          height: "72",
          width: "72",
        },
      },
      {
        id: {
          $t: "tag:blogger.com,1999:blog-8122934176709728665.post-8114863418911604913",
        },
        published: { $t: "2022-03-20T14:05:00.001-03:00" },
        updated: { $t: "2022-03-20T14:05:05.701-03:00" },
        title: { type: "text", $t: "Doenças da Pele com Origem Autoimune" },
        content: {
          type: "html",
          $t: '\u003Cdiv style="text-align: justify;"\u003E\u003Cspan style="font-family: verdana;"\u003EDiálogo para o tratamento de doenças na pele com origem autoimune, como a psoríase, pênfigo, vitiligo, urticária crônica espontânea e dermatite atópica. Essas doenças são causadas por desordens do sistema imunológico, fazendo com que os anticorpos agridam o próprio organismo, por considerarem o órgão pele como um ser estranho ao corpo. Fique atento às fases da narração para repetir em voz alta as cores e suas funções.\u003C/span\u003E\u003C/div\u003E\u003Cdiv style="text-align: justify;"\u003E\u003Cspan style="font-family: verdana;"\u003E\u003Cbr /\u003E\u003C/span\u003E\u003C/div\u003E\u003Cdiv style="text-align: justify;"\u003E\u003Cdiv class="separator" style="clear: both; text-align: center;"\u003E\u003Ca href="https://dialogos.ml/autoimune_pele_0333" imageanchor="1" style="margin-left: 1em; margin-right: 1em;" target="_blank"\u003E\u003Cimg border="0" data-original-height="304" data-original-width="540" height="225" src="https://blogger.googleusercontent.com/img/a/AVvXsEhUtVcJ4QVOIjelm1-a9igGfyj25sruyzQu_pG64NSTxFhszCS2s8ZdlKlFHMFBIbS7Xa3rkJ-zjCyKnjRkrm9ZeBqKIUMQiZhGvkcap1NusSQA1KeiPNTz5uZcUiUDNmQ-hBGYLgx2N2BtgXGwdvosMV4zOiPZCcS-S89Ixm9FNjnQD9-zwsYMzZ_T=w400-h225" width="400" /\u003E\u003C/a\u003E\u003C/div\u003E\u003Cbr /\u003E\u003Cspan style="font-family: verdana;"\u003E\u003Cbr /\u003E\u003C/span\u003E\u003C/div\u003E',
        },
        link: [
          {
            rel: "edit",
            type: "application/atom+xml",
            href: "https://www.blogger.com/feeds/8122934176709728665/posts/default/8114863418911604913",
          },
          {
            rel: "self",
            type: "application/atom+xml",
            href: "https://www.blogger.com/feeds/8122934176709728665/posts/default/8114863418911604913",
          },
          {
            rel: "alternate",
            type: "text/html",
            href: "https://dnaholograficoequantico.blogspot.com/2022/03/doencas-da-pele-com-origem-autoimune.html",
            title: "Doenças da Pele com Origem Autoimune",
          },
        ],
        author: [
          {
            name: { $t: "DNA Positivo" },
            uri: { $t: "http://www.blogger.com/profile/12680980880370164731" },
            email: { $t: "noreply@blogger.com" },
            gd$image: {
              rel: "http://schemas.google.com/g/2005#thumbnail",
              width: "33",
              height: "21",
              src: "http://2.bp.blogspot.com/-Ntnmwx5DA8c/VP-QwEjYqrI/AAAAAAAAAt4/L9wLem4HoPw/s220/marca%2Bnova%2Bblog.jpg",
            },
          },
        ],
        media$thumbnail: {
          xmlns$media: "http://search.yahoo.com/mrss/",
          url: "https://blogger.googleusercontent.com/img/a/AVvXsEhUtVcJ4QVOIjelm1-a9igGfyj25sruyzQu_pG64NSTxFhszCS2s8ZdlKlFHMFBIbS7Xa3rkJ-zjCyKnjRkrm9ZeBqKIUMQiZhGvkcap1NusSQA1KeiPNTz5uZcUiUDNmQ-hBGYLgx2N2BtgXGwdvosMV4zOiPZCcS-S89Ixm9FNjnQD9-zwsYMzZ_T=s72-w400-h225-c",
          height: "72",
          width: "72",
        },
      },
      {
        id: {
          $t: "tag:blogger.com,1999:blog-8122934176709728665.post-1959492595146926735",
        },
        published: { $t: "2022-03-20T14:00:00.004-03:00" },
        updated: { $t: "2022-03-20T14:00:40.718-03:00" },
        title: {
          type: "text",
          $t: "Diálogo Dirigido com Lesões Císticas e Neoplásicas",
        },
        content: {
          type: "html",
          $t: '\u003Cdiv style="text-align: justify;"\u003E\u003Cspan style="font-family: verdana;"\u003EDiálogo para o tratamento de lesões Císticas e Neoplásicas. Um cisto pode ser definido como uma lesão neoplásica benigna, sendo uma cavidade patológica preenchida por fluido e revestida, externamente, por uma cápsula de tecido conjuntivo fibroso e, internamente, por epitélio. A neoplasia é uma massa de tecido anormal que surge em diferentes partes do corpo, com características específicas em cada local e apresenta ritmos de crescimento e riscos diferentes. Fique atento às fases da narração para repetir em voz alta as cores e suas funções.\u003C/span\u003E\u003C/div\u003E\u003Cdiv style="text-align: justify;"\u003E\u003Cbr /\u003E\u003C/div\u003E\u003Cdiv class="separator" style="clear: both; text-align: center;"\u003E\u003Ca href="https://dialogos.ml/tratamento_fonseca_0111" imageanchor="1" style="margin-left: 1em; margin-right: 1em;" target="_blank"\u003E\u003Cimg border="0" data-original-height="303" data-original-width="540" height="225" src="https://blogger.googleusercontent.com/img/a/AVvXsEgN-X17kYXlY2-7rJVwW6FvKeTfseX6H59yvMlVLuQ6AnN0o2OqDak-Em0nThcEuMxAzJwYTFMH_u_Z0rsijYcrLEwTcjpm0MWZnpt9a8E1JVOq6g8PGlmFSWL3X_l9EGKGl7bMj3gyeGgd070ziWk17Tx1488_22bi954dnctl_-9FeNUk9rwg2ugS=w400-h225" width="400" /\u003E\u003C/a\u003E\u003C/div\u003E\u003Cbr /\u003E\u003Cdiv style="text-align: justify;"\u003E\u003Cbr /\u003E\u003C/div\u003E',
        },
        link: [
          {
            rel: "edit",
            type: "application/atom+xml",
            href: "https://www.blogger.com/feeds/8122934176709728665/posts/default/1959492595146926735",
          },
          {
            rel: "self",
            type: "application/atom+xml",
            href: "https://www.blogger.com/feeds/8122934176709728665/posts/default/1959492595146926735",
          },
          {
            rel: "alternate",
            type: "text/html",
            href: "https://dnaholograficoequantico.blogspot.com/2022/03/dialogo-dirigido-com-lesoes-cisticas-e.html",
            title: "Diálogo Dirigido com Lesões Císticas e Neoplásicas",
          },
        ],
        author: [
          {
            name: { $t: "DNA Positivo" },
            uri: { $t: "http://www.blogger.com/profile/12680980880370164731" },
            email: { $t: "noreply@blogger.com" },
            gd$image: {
              rel: "http://schemas.google.com/g/2005#thumbnail",
              width: "33",
              height: "21",
              src: "http://2.bp.blogspot.com/-Ntnmwx5DA8c/VP-QwEjYqrI/AAAAAAAAAt4/L9wLem4HoPw/s220/marca%2Bnova%2Bblog.jpg",
            },
          },
        ],
        media$thumbnail: {
          xmlns$media: "http://search.yahoo.com/mrss/",
          url: "https://blogger.googleusercontent.com/img/a/AVvXsEgN-X17kYXlY2-7rJVwW6FvKeTfseX6H59yvMlVLuQ6AnN0o2OqDak-Em0nThcEuMxAzJwYTFMH_u_Z0rsijYcrLEwTcjpm0MWZnpt9a8E1JVOq6g8PGlmFSWL3X_l9EGKGl7bMj3gyeGgd070ziWk17Tx1488_22bi954dnctl_-9FeNUk9rwg2ugS=s72-w400-h225-c",
          height: "72",
          width: "72",
        },
      },
      {
        id: {
          $t: "tag:blogger.com,1999:blog-8122934176709728665.post-2937172285312053202",
        },
        published: { $t: "2022-03-20T13:52:00.002-03:00" },
        updated: { $t: "2022-03-20T13:55:04.326-03:00" },
        title: { type: "text", $t: "Doença Cardíaca Isquêmica Coronariana" },
        content: {
          type: "html",
          $t: '\u003Cdiv style="text-align: justify;"\u003E\u003Cspan style="font-family: verdana;"\u003EDiálogo para o tratamento da Doença Cardíaca Isquêmica Coronariana, que é uma síndrome causada por um espasmo coronariano de alta intensidade, em curto período de tempo, com vasoconstricção das artérias epicárdicas e que leva à oclusão do vaso coronariano. Fique atento às fases da narração para repetir em voz alta as cores e suas funções.\u003C/span\u003E\u003C/div\u003E\u003Cdiv style="text-align: justify;"\u003E\u003Cspan style="font-family: verdana;"\u003E\u003Cbr /\u003E\u003C/span\u003E\u003C/div\u003E\u003Cdiv style="text-align: justify;"\u003E\u003Cdiv class="separator" style="clear: both; text-align: center;"\u003E\u003Ca href="https://dialogos.ml/doenca_cardiaca_isquemica_0321" style="margin-left: 1em; margin-right: 1em;" target="_blank"\u003E\u003Cimg border="0" data-original-height="302" data-original-width="539" height="224" src="https://blogger.googleusercontent.com/img/a/AVvXsEgNxvuraIGu3Nv266jbfKpSdQ0j8-SggJQEM2Hf_HyAwyN6VNBNY1dmztjjlVh9TYWik7eaOJGZ78WpjObBawsjwq2xHqT0d_S8Yha1FJD1NoqeFh0gv0qqSbutbbQib2iS3M9FJsJjC7siXPnSCdHR79Ld0SoTUnoaOLzYUsDaJTq1FOTNJspK-tMB=w400-h224" width="400" /\u003E\u003C/a\u003E\u003C/div\u003E\u003Cbr /\u003E\u003Cspan style="font-family: verdana;"\u003E\u003Cbr /\u003E\u003C/span\u003E\u003C/div\u003E',
        },
        link: [
          {
            rel: "edit",
            type: "application/atom+xml",
            href: "https://www.blogger.com/feeds/8122934176709728665/posts/default/2937172285312053202",
          },
          {
            rel: "self",
            type: "application/atom+xml",
            href: "https://www.blogger.com/feeds/8122934176709728665/posts/default/2937172285312053202",
          },
          {
            rel: "alternate",
            type: "text/html",
            href: "https://dnaholograficoequantico.blogspot.com/2022/03/doenca-cardiaca-isquemica-coronariana.html",
            title: "Doença Cardíaca Isquêmica Coronariana",
          },
        ],
        author: [
          {
            name: { $t: "DNA Positivo" },
            uri: { $t: "http://www.blogger.com/profile/12680980880370164731" },
            email: { $t: "noreply@blogger.com" },
            gd$image: {
              rel: "http://schemas.google.com/g/2005#thumbnail",
              width: "33",
              height: "21",
              src: "http://2.bp.blogspot.com/-Ntnmwx5DA8c/VP-QwEjYqrI/AAAAAAAAAt4/L9wLem4HoPw/s220/marca%2Bnova%2Bblog.jpg",
            },
          },
        ],
        media$thumbnail: {
          xmlns$media: "http://search.yahoo.com/mrss/",
          url: "https://blogger.googleusercontent.com/img/a/AVvXsEgNxvuraIGu3Nv266jbfKpSdQ0j8-SggJQEM2Hf_HyAwyN6VNBNY1dmztjjlVh9TYWik7eaOJGZ78WpjObBawsjwq2xHqT0d_S8Yha1FJD1NoqeFh0gv0qqSbutbbQib2iS3M9FJsJjC7siXPnSCdHR79Ld0SoTUnoaOLzYUsDaJTq1FOTNJspK-tMB=s72-w400-h224-c",
          height: "72",
          width: "72",
        },
      },
      {
        id: {
          $t: "tag:blogger.com,1999:blog-8122934176709728665.post-3876888212596878116",
        },
        published: { $t: "2022-03-20T13:46:00.002-03:00" },
        updated: { $t: "2022-03-20T13:54:53.564-03:00" },
        title: { type: "text", $t: "Diálogo Dirigido com o Mal de Parkinson" },
        content: {
          type: "html",
          $t: '\u003Cdiv style="text-align: justify;"\u003E\u003Cspan style="font-family: verdana;"\u003EDiálogo para o tratamento do Mal de Parkinson, que é uma doença degenerativa do sistema nervoso central,  crônica e progressiva, caracterizada pela diminuição da produção da dopamina. A dopamina é um neurotransmissor responsável por transportar os impulsos nervosos, emitidos pelo cérebro, a todas as partes do corpo. A doença de Parkinson compromete os movimentos, causando rigidez muscular e instabilidade na postura. Fique atento às fases da narração para repetir em voz alta as cores e suas funções.\u003C/span\u003E\u003C/div\u003E\u003Cdiv style="text-align: justify;"\u003E\u003Cspan style="font-family: verdana;"\u003E\u003Cbr /\u003E\u003C/span\u003E\u003C/div\u003E\u003Cdiv style="text-align: justify;"\u003E\u003Cdiv class="separator" style="clear: both; text-align: center;"\u003E\u003Ca href="https://dialogos.ml/mal_de_parkinson_0222" style="margin-left: 1em; margin-right: 1em;" target="_blank"\u003E\u003Cimg border="0" data-original-height="304" data-original-width="538" height="226" src="https://blogger.googleusercontent.com/img/a/AVvXsEhcMO99C0wXXGf-okYmCn2rwLFdUxsQR7jpUjuED2iBQXnEBtYnJ6dt3xmCUbNb6wKro1yWzApud2sTRmOPcAh6OTH3MqA2wxixLi63VR4abFHlG1wKHlWvvdEvL4GD-64o4n3zZk2KDNrXnplkgUv0d2iYxqNPWhP_Y1IsfSA5xZ5nq3Swyq2igsm7=w400-h226" width="400" /\u003E\u003C/a\u003E\u003C/div\u003E\u003Cbr /\u003E\u003Cspan style="font-family: verdana;"\u003E\u003Cbr /\u003E\u003C/span\u003E\u003C/div\u003E',
        },
        link: [
          {
            rel: "edit",
            type: "application/atom+xml",
            href: "https://www.blogger.com/feeds/8122934176709728665/posts/default/3876888212596878116",
          },
          {
            rel: "self",
            type: "application/atom+xml",
            href: "https://www.blogger.com/feeds/8122934176709728665/posts/default/3876888212596878116",
          },
          {
            rel: "alternate",
            type: "text/html",
            href: "https://dnaholograficoequantico.blogspot.com/2022/03/dialogo-dirigido-com-o-mal-de-parkinson.html",
            title: "Diálogo Dirigido com o Mal de Parkinson",
          },
        ],
        author: [
          {
            name: { $t: "DNA Positivo" },
            uri: { $t: "http://www.blogger.com/profile/12680980880370164731" },
            email: { $t: "noreply@blogger.com" },
            gd$image: {
              rel: "http://schemas.google.com/g/2005#thumbnail",
              width: "33",
              height: "21",
              src: "http://2.bp.blogspot.com/-Ntnmwx5DA8c/VP-QwEjYqrI/AAAAAAAAAt4/L9wLem4HoPw/s220/marca%2Bnova%2Bblog.jpg",
            },
          },
        ],
        media$thumbnail: {
          xmlns$media: "http://search.yahoo.com/mrss/",
          url: "https://blogger.googleusercontent.com/img/a/AVvXsEhcMO99C0wXXGf-okYmCn2rwLFdUxsQR7jpUjuED2iBQXnEBtYnJ6dt3xmCUbNb6wKro1yWzApud2sTRmOPcAh6OTH3MqA2wxixLi63VR4abFHlG1wKHlWvvdEvL4GD-64o4n3zZk2KDNrXnplkgUv0d2iYxqNPWhP_Y1IsfSA5xZ5nq3Swyq2igsm7=s72-w400-h226-c",
          height: "72",
          width: "72",
        },
      },
      {
        id: {
          $t: "tag:blogger.com,1999:blog-8122934176709728665.post-9219429754609307850",
        },
        published: { $t: "2022-03-08T23:11:00.000-03:00" },
        updated: { $t: "2022-03-08T23:11:06.705-03:00" },
        title: {
          type: "text",
          $t: "Diálogo Dirigido para a Urticária Crônica Espontânea",
        },
        content: {
          type: "html",
          $t: '\u003Cdiv style="text-align: justify;"\u003E\u003Cspan style="font-family: verdana;"\u003EDiálogo para o tratamento da Urticária Crônica Espontânea, que é uma doença da pele com origem autoimune, causada por desordens do sistema imunológico, fazendo com que os anticorpos agridam o próprio organismo por considerarem o órgão pele como um ser estranho ao corpo. Fique atento às fases da narração para repetir em voz alta as cores e suas funções.\u003C/span\u003E\u003C/div\u003E\u003Cdiv style="text-align: justify;"\u003E\u003Cspan style="font-family: verdana;"\u003E\u003Cbr /\u003E\u003C/span\u003E\u003C/div\u003E\u003Cdiv style="text-align: justify;"\u003E\u003Cdiv class="separator" style="clear: both; text-align: center;"\u003E\u003Ca href="https://dialogos.ml/urticaria_cronica_espontanea_0111" imageanchor="1" style="margin-left: 1em; margin-right: 1em;" target="_blank"\u003E\u003Cimg border="0" data-original-height="302" data-original-width="538" height="225" src="https://blogger.googleusercontent.com/img/a/AVvXsEhAYWawTwuXnnpd8zgp95S2zv6zYTF-fC0_N1kv0IQfwoT-Vc1Ly7dpE9_3QInt06jdTU8qJV8o28W0ATeZB3rughVywSzWsd_HSOlN10UzqeL75RHqzJLjVJknPJvKZv-DXVL9orVIglG-NETgEavVzsvl52BOv1JEUzGIXcfAwcr_ca1GriYMc7-K=w400-h225" width="400" /\u003E\u003C/a\u003E\u003C/div\u003E\u003Cbr /\u003E\u003Cspan style="font-family: verdana;"\u003E\u003Cbr /\u003E\u003C/span\u003E\u003C/div\u003E',
        },
        link: [
          {
            rel: "edit",
            type: "application/atom+xml",
            href: "https://www.blogger.com/feeds/8122934176709728665/posts/default/9219429754609307850",
          },
          {
            rel: "self",
            type: "application/atom+xml",
            href: "https://www.blogger.com/feeds/8122934176709728665/posts/default/9219429754609307850",
          },
          {
            rel: "alternate",
            type: "text/html",
            href: "https://dnaholograficoequantico.blogspot.com/2022/03/dialogo-dirigido-para-urticaria-cronica.html",
            title: "Diálogo Dirigido para a Urticária Crônica Espontânea",
          },
        ],
        author: [
          {
            name: { $t: "DNA Positivo" },
            uri: { $t: "http://www.blogger.com/profile/12680980880370164731" },
            email: { $t: "noreply@blogger.com" },
            gd$image: {
              rel: "http://schemas.google.com/g/2005#thumbnail",
              width: "33",
              height: "21",
              src: "http://2.bp.blogspot.com/-Ntnmwx5DA8c/VP-QwEjYqrI/AAAAAAAAAt4/L9wLem4HoPw/s220/marca%2Bnova%2Bblog.jpg",
            },
          },
        ],
        media$thumbnail: {
          xmlns$media: "http://search.yahoo.com/mrss/",
          url: "https://blogger.googleusercontent.com/img/a/AVvXsEhAYWawTwuXnnpd8zgp95S2zv6zYTF-fC0_N1kv0IQfwoT-Vc1Ly7dpE9_3QInt06jdTU8qJV8o28W0ATeZB3rughVywSzWsd_HSOlN10UzqeL75RHqzJLjVJknPJvKZv-DXVL9orVIglG-NETgEavVzsvl52BOv1JEUzGIXcfAwcr_ca1GriYMc7-K=s72-w400-h225-c",
          height: "72",
          width: "72",
        },
      },
      {
        id: {
          $t: "tag:blogger.com,1999:blog-8122934176709728665.post-994212776919303582",
        },
        published: { $t: "2022-02-22T09:05:00.005-03:00" },
        updated: { $t: "2022-02-22T09:08:24.502-03:00" },
        title: { type: "text", $t: "Diálogo Dirigido com o HD/DNA" },
        content: {
          type: "html",
          $t: '\u003Cdiv style="text-align: justify;"\u003E\u003Cspan style="font-family: verdana;"\u003E\u003Cspan style="color: #444444; font-size: medium;"\u003ENosso corpo físico é semelhante a um computador e pode ser reprogramado. As informações e códigos de programação ficam armazenadas em nosso DNA, que é equivalente a um disco rígido, ou HD (hard disk). Conscientes dessa realidade e com o comando correto, podemos alterar as linhas de código do nosso programa e corrigir as informações que causam a doença, ajustando, assim, a frequência do nossos sinais biofísicos.\u003C/span\u003E\u003C/span\u003E\u003C/div\u003E\u003Cdiv style="text-align: justify;"\u003E\u003Cspan style="font-family: verdana; font-size: large;"\u003E\u003Cspan style="color: #444444;"\u003E\u003Cbr /\u003E\u003C/span\u003E\u003C/span\u003E\u003C/div\u003E\u003Cdiv style="text-align: center;"\u003E\u003Cspan style="font-family: verdana; font-size: large;"\u003E\u003Cdiv class="separator" style="clear: both; text-align: center;"\u003E\u003Ca href="https://dialogos.ml/hd_4580" style="margin-left: 1em; margin-right: 1em;" target="_blank"\u003E\u003Cimg border="0" data-original-height="454" data-original-width="805" height="225" src="https://blogger.googleusercontent.com/img/a/AVvXsEj6kV6wb3B2n1E6ESwvrRpJTFmC-xLJm08Dv_ePiiygNXAv4Ny0pevuZnrF2QoxniXs8ES7MVrZkHODa9y3CH7wTP4Qfeiq0ZOmIRK7DrEVSy6wn7ChNpCI5wdqG3w3xAsLt0VoeKGhYXySKPdjQCNFT9Wvtk_ZQt7PXyD86aX0MXA0FxcObxcN38LW=w400-h225" width="400" /\u003E\u003C/a\u003E\u003C/div\u003E\u003Cbr /\u003E\u003Cspan style="color: #444444;"\u003E\u003Cbr /\u003E\u003C/span\u003E\u003C/span\u003E\u003C/div\u003E',
        },
        link: [
          {
            rel: "edit",
            type: "application/atom+xml",
            href: "https://www.blogger.com/feeds/8122934176709728665/posts/default/994212776919303582",
          },
          {
            rel: "self",
            type: "application/atom+xml",
            href: "https://www.blogger.com/feeds/8122934176709728665/posts/default/994212776919303582",
          },
          {
            rel: "alternate",
            type: "text/html",
            href: "https://dnaholograficoequantico.blogspot.com/2022/02/dialogo-dirigido-com-o-hddna.html",
            title: "Diálogo Dirigido com o HD/DNA",
          },
        ],
        author: [
          {
            name: { $t: "DNA Positivo" },
            uri: { $t: "http://www.blogger.com/profile/12680980880370164731" },
            email: { $t: "noreply@blogger.com" },
            gd$image: {
              rel: "http://schemas.google.com/g/2005#thumbnail",
              width: "33",
              height: "21",
              src: "http://2.bp.blogspot.com/-Ntnmwx5DA8c/VP-QwEjYqrI/AAAAAAAAAt4/L9wLem4HoPw/s220/marca%2Bnova%2Bblog.jpg",
            },
          },
        ],
        media$thumbnail: {
          xmlns$media: "http://search.yahoo.com/mrss/",
          url: "https://blogger.googleusercontent.com/img/a/AVvXsEj6kV6wb3B2n1E6ESwvrRpJTFmC-xLJm08Dv_ePiiygNXAv4Ny0pevuZnrF2QoxniXs8ES7MVrZkHODa9y3CH7wTP4Qfeiq0ZOmIRK7DrEVSy6wn7ChNpCI5wdqG3w3xAsLt0VoeKGhYXySKPdjQCNFT9Wvtk_ZQt7PXyD86aX0MXA0FxcObxcN38LW=s72-w400-h225-c",
          height: "72",
          width: "72",
        },
      },
      {
        id: {
          $t: "tag:blogger.com,1999:blog-8122934176709728665.post-2535896279610757140",
        },
        published: { $t: "2022-02-05T13:29:00.002-03:00" },
        updated: { $t: "2022-02-05T13:30:10.601-03:00" },
        title: { type: "text", $t: "Diálogo Dirigido com o Sol" },
        content: {
          type: "html",
          $t: '\u003Cdiv style="text-align: justify;"\u003E\u003Cspan style="color: #444444; font-family: verdana; font-size: medium;"\u003EDiálogo utilizado para auxiliar o bom funcionamento dos sistemas corpóreos por meio da absorção consciente das partículas de luz chamadas fótons, emitidas pelo Sol. Esse diálogo ajuda na regulação dos níveis da Vitamina (hormônio) D e de minerais como o Cálcio, bem como na disposição do corpo e no fortalecimento do Sistema Imunológico.\u0026nbsp;\u003C/span\u003E\u003C/div\u003E\u003Cdiv style="text-align: justify;"\u003E\u003Cspan style="color: #444444; font-family: verdana; font-size: medium;"\u003E\u003Cbr /\u003E\u003C/span\u003E\u003C/div\u003E\u003Cdiv style="text-align: justify;"\u003E\u003Cspan style="color: #444444; font-family: verdana; font-size: medium;"\u003EMas lembre-se, o vídeo é apenas um recurso! É importante, também, que se crie o hábito de tomar banho de Sol, por 10 a 30 minutos, no horário entre 10h30 e 13h00, e fazer o diálogo disponível no blog \u003Ca href="https://dnafisicoequantico.blogspot.com/p/dialogo-dirigido-com-o-sol-e-vitamina.html" target="_blank"\u003EDNA Físico e Quântico.\u003C/a\u003E\u003C/span\u003E\u003C/div\u003E\u003Cdiv style="text-align: justify;"\u003E\u003Cspan style="color: #444444; font-family: verdana; font-size: large;"\u003E\u003Cbr /\u003E\u003C/span\u003E\u003C/div\u003E\u003Cdiv style="text-align: justify;"\u003E\u003Cdiv class="separator" style="clear: both; text-align: center;"\u003E\u003Ca href="https://dialogos.ml/sol_0905" style="margin-left: 1em; margin-right: 1em;" target="_blank"\u003E\u003Cimg border="0" data-original-height="454" data-original-width="807" height="225" src="https://blogger.googleusercontent.com/img/a/AVvXsEhY7idDyiUXONuWJHInh94dO9tfx6HZr3gyf89GbiHb-tA1mSgbHCRism2l7HD3gZUYwvAJXY-pFW337pfS3IjXZeTzIk9t8F4GkiZzGqsX8A9Hlez9H8aYSOj1AfWt5wjyC0probgYnWbfzPiEDvDA2o2tHnN3SGg72zbRv_usbgBXupkECgdzShm6=w400-h225" width="400" /\u003E\u003C/a\u003E\u003C/div\u003E\u003C/div\u003E',
        },
        link: [
          {
            rel: "edit",
            type: "application/atom+xml",
            href: "https://www.blogger.com/feeds/8122934176709728665/posts/default/2535896279610757140",
          },
          {
            rel: "self",
            type: "application/atom+xml",
            href: "https://www.blogger.com/feeds/8122934176709728665/posts/default/2535896279610757140",
          },
          {
            rel: "alternate",
            type: "text/html",
            href: "https://dnaholograficoequantico.blogspot.com/2022/02/dialogo-dirigido-com-o-sol.html",
            title: "Diálogo Dirigido com o Sol",
          },
        ],
        author: [
          {
            name: { $t: "DNA Positivo" },
            uri: { $t: "http://www.blogger.com/profile/12680980880370164731" },
            email: { $t: "noreply@blogger.com" },
            gd$image: {
              rel: "http://schemas.google.com/g/2005#thumbnail",
              width: "33",
              height: "21",
              src: "http://2.bp.blogspot.com/-Ntnmwx5DA8c/VP-QwEjYqrI/AAAAAAAAAt4/L9wLem4HoPw/s220/marca%2Bnova%2Bblog.jpg",
            },
          },
        ],
        media$thumbnail: {
          xmlns$media: "http://search.yahoo.com/mrss/",
          url: "https://blogger.googleusercontent.com/img/a/AVvXsEhY7idDyiUXONuWJHInh94dO9tfx6HZr3gyf89GbiHb-tA1mSgbHCRism2l7HD3gZUYwvAJXY-pFW337pfS3IjXZeTzIk9t8F4GkiZzGqsX8A9Hlez9H8aYSOj1AfWt5wjyC0probgYnWbfzPiEDvDA2o2tHnN3SGg72zbRv_usbgBXupkECgdzShm6=s72-w400-h225-c",
          height: "72",
          width: "72",
        },
      },
      {
        id: {
          $t: "tag:blogger.com,1999:blog-8122934176709728665.post-3773069863381299601",
        },
        published: { $t: "2022-02-05T13:20:00.001-03:00" },
        updated: { $t: "2022-02-05T13:24:22.139-03:00" },
        title: { type: "text", $t: "Diálogo Dirigido com a Fibromatose" },
        content: {
          type: "html",
          $t: '\u003Cp style="text-align: justify;"\u003E\u003Cspan style="color: #444444; font-family: verdana; font-size: medium;"\u003EDiálogo para o tratamento da Fibromatose, que é uma doença que prolifera o tecido conjuntivo e produz massas espessas ou nódulos no corpo, podendo ser palmar (quando o nódulo se localiza logo abaixo dos dedos das mãos), plantar (quando afeta a planta dos pés e os tendões flexores dos dedos) ou peniana (quando afeta a anatomia do órgão). Fique atento às fases da narração para repetir em voz alta as cores e suas funções.\u003C/span\u003E\u003C/p\u003E\u003Cp style="text-align: justify;"\u003E\u003C/p\u003E\u003Cdiv class="separator" style="clear: both; text-align: center;"\u003E\u003Ca href="https://dialogos.ml/fibromatose_0584" style="margin-left: 1em; margin-right: 1em;" target="_blank"\u003E\u003Cimg border="0" data-original-height="453" data-original-width="806" height="225" src="https://blogger.googleusercontent.com/img/a/AVvXsEjDao-xMvg5gDTTA2TR43sRw1DpnWRb6q03FbJH0sF7BoloRh9ShFQKXcTO7BZRwTVum0xap0z78GIqtxhfqiCXedD7EMPAjfP_lm2YSXVFsxwyOeexO41uO_waJEjsDhNmsDu3aNV-e0r_t08I1fjNlXgSchlaQtnaxlTiQQ2aD9KvuSr2gCxbUbTP=w400-h225" width="400" /\u003E\u003C/a\u003E\u003C/div\u003E\u003Cp\u003E\u003C/p\u003E',
        },
        link: [
          {
            rel: "edit",
            type: "application/atom+xml",
            href: "https://www.blogger.com/feeds/8122934176709728665/posts/default/3773069863381299601",
          },
          {
            rel: "self",
            type: "application/atom+xml",
            href: "https://www.blogger.com/feeds/8122934176709728665/posts/default/3773069863381299601",
          },
          {
            rel: "alternate",
            type: "text/html",
            href: "https://dnaholograficoequantico.blogspot.com/2022/02/dialogo-dirigido-com-fibromatose.html",
            title: "Diálogo Dirigido com a Fibromatose",
          },
        ],
        author: [
          {
            name: { $t: "DNA Positivo" },
            uri: { $t: "http://www.blogger.com/profile/12680980880370164731" },
            email: { $t: "noreply@blogger.com" },
            gd$image: {
              rel: "http://schemas.google.com/g/2005#thumbnail",
              width: "33",
              height: "21",
              src: "http://2.bp.blogspot.com/-Ntnmwx5DA8c/VP-QwEjYqrI/AAAAAAAAAt4/L9wLem4HoPw/s220/marca%2Bnova%2Bblog.jpg",
            },
          },
        ],
        media$thumbnail: {
          xmlns$media: "http://search.yahoo.com/mrss/",
          url: "https://blogger.googleusercontent.com/img/a/AVvXsEjDao-xMvg5gDTTA2TR43sRw1DpnWRb6q03FbJH0sF7BoloRh9ShFQKXcTO7BZRwTVum0xap0z78GIqtxhfqiCXedD7EMPAjfP_lm2YSXVFsxwyOeexO41uO_waJEjsDhNmsDu3aNV-e0r_t08I1fjNlXgSchlaQtnaxlTiQQ2aD9KvuSr2gCxbUbTP=s72-w400-h225-c",
          height: "72",
          width: "72",
        },
      },
      {
        id: {
          $t: "tag:blogger.com,1999:blog-8122934176709728665.post-3573509366485341167",
        },
        published: { $t: "2022-02-05T13:12:00.004-03:00" },
        updated: { $t: "2022-02-05T13:12:55.325-03:00" },
        title: {
          type: "text",
          $t: "Dialogo Dirigido com o Coração e o Sistema Cardíaco",
        },
        content: {
          type: "html",
          $t: '\u003Cp style="text-align: justify;"\u003E\u003Cspan style="color: #444444; font-family: verdana; font-size: medium;"\u003EDiálogo para o tratamento de disfunções cardíacas. Utiliza cores e suas funções terapêuticas para o equilíbrio do sistema cardíaco. Fique atento às fases da narração para relatar o seu caso específico e os sintomas, e concentre-se na apresentação das cores e suas funções.\u003C/span\u003E\u003C/p\u003E\u003Cdiv class="separator" style="clear: both; text-align: center;"\u003E\u003Ca href="https://dialogos.ml/coracao_0441" imageanchor="1" style="margin-left: 1em; margin-right: 1em;" target="_blank"\u003E\u003Cimg border="0" data-original-height="454" data-original-width="806" height="225" src="https://blogger.googleusercontent.com/img/a/AVvXsEgccMnt8F_AZxReOyYtfGSS5xGm4evyzYh5Vc3W4xTuwImTG-sWW4numQs6IDx37pH4DohCWAhwTTXuPLUZ3RX5F2m_tA8OLgSye2MhSZm8JDBp7f-UHyjltFCfO36Epxa0tNU7u20bJ3K1plex-PfTa7sjd8l6MeZTmbTEOtLIIIPvHSl_fG1o0Zdv=w400-h225" width="400" /\u003E\u003C/a\u003E\u003C/div\u003E\u003Cp\u003E\u003C/p\u003E',
        },
        link: [
          {
            rel: "edit",
            type: "application/atom+xml",
            href: "https://www.blogger.com/feeds/8122934176709728665/posts/default/3573509366485341167",
          },
          {
            rel: "self",
            type: "application/atom+xml",
            href: "https://www.blogger.com/feeds/8122934176709728665/posts/default/3573509366485341167",
          },
          {
            rel: "alternate",
            type: "text/html",
            href: "https://dnaholograficoequantico.blogspot.com/2022/02/dialogo-dirigido-com-o-coracao-e-o.html",
            title: "Dialogo Dirigido com o Coração e o Sistema Cardíaco",
          },
        ],
        author: [
          {
            name: { $t: "DNA Positivo" },
            uri: { $t: "http://www.blogger.com/profile/12680980880370164731" },
            email: { $t: "noreply@blogger.com" },
            gd$image: {
              rel: "http://schemas.google.com/g/2005#thumbnail",
              width: "33",
              height: "21",
              src: "http://2.bp.blogspot.com/-Ntnmwx5DA8c/VP-QwEjYqrI/AAAAAAAAAt4/L9wLem4HoPw/s220/marca%2Bnova%2Bblog.jpg",
            },
          },
        ],
        media$thumbnail: {
          xmlns$media: "http://search.yahoo.com/mrss/",
          url: "https://blogger.googleusercontent.com/img/a/AVvXsEgccMnt8F_AZxReOyYtfGSS5xGm4evyzYh5Vc3W4xTuwImTG-sWW4numQs6IDx37pH4DohCWAhwTTXuPLUZ3RX5F2m_tA8OLgSye2MhSZm8JDBp7f-UHyjltFCfO36Epxa0tNU7u20bJ3K1plex-PfTa7sjd8l6MeZTmbTEOtLIIIPvHSl_fG1o0Zdv=s72-w400-h225-c",
          height: "72",
          width: "72",
        },
      },
      {
        id: {
          $t: "tag:blogger.com,1999:blog-8122934176709728665.post-3489164376858350841",
        },
        published: { $t: "2022-01-31T22:08:00.003-03:00" },
        updated: { $t: "2022-01-31T22:08:44.026-03:00" },
        title: {
          type: "text",
          $t: "Diálogo Dirigido com os Microcistos Mamários (Mama)",
        },
        content: {
          type: "html",
          $t: '\u003Cdiv style="text-align: justify;"\u003E\u003Cspan style="color: #444444; font-family: verdana; font-size: medium;"\u003EDiálogo para o tratamento de microcistos e cistos mamários, este diálogo também pode ser usado no caso de tumores e outras doenças da mama, bastando complementar, em voz alta, com o nome da doença e o local.\u0026nbsp;\u003C/span\u003E\u003C/div\u003E\u003Cdiv style="text-align: justify;"\u003E\u003Cspan style="color: #444444; font-family: verdana; font-size: medium;"\u003E\u003Cbr /\u003E\u003C/span\u003E\u003C/div\u003E\u003Cdiv style="text-align: justify;"\u003E\u003Cspan style="color: #444444; font-family: verdana; font-size: medium;"\u003EPor exemplo, para um carcinoma invasivo na mama direita, acrescente logo após a narração do trecho “... e se direcionam para a mama esquerda” os dizeres “... carcinoma invasivo na mama direita”.\u003C/span\u003E\u003C/div\u003E\u003Cdiv style="text-align: justify;"\u003E\u003Cspan style="font-family: verdana; font-size: large;"\u003E\u003Cbr /\u003E\u003C/span\u003E\u003C/div\u003E\u003Cdiv style="text-align: justify;"\u003E\u003Cdiv class="separator" style="clear: both; text-align: center;"\u003E\u003Ca href="https://dialogos.ml/mama_0726" style="margin-left: 1em; margin-right: 1em;" target="_blank"\u003E\u003Cimg border="0" data-original-height="452" data-original-width="804" height="225" src="https://blogger.googleusercontent.com/img/a/AVvXsEimXqvXr4pMOhM5f9qV4rLfvfRJhF1PfbQ2GrwVyOcBy_pUG5qismfko20C-iZjx7arj_RxjXwDoqS0LQ06KG0eXUm6vYwuDl3uHWqMsJPkr-3IvVJnL5QHkXW9CWGvVRc7lznKbqeop__fxACfrqlpQwmwmk7kWBEnX2lPmRKHC24C-tLIKKnbEbCZ=w400-h225" width="400" /\u003E\u003C/a\u003E\u003C/div\u003E\u003Cbr /\u003E\u003Cspan style="font-family: verdana; font-size: large;"\u003E\u003Cbr /\u003E\u003C/span\u003E\u003C/div\u003E',
        },
        link: [
          {
            rel: "edit",
            type: "application/atom+xml",
            href: "https://www.blogger.com/feeds/8122934176709728665/posts/default/3489164376858350841",
          },
          {
            rel: "self",
            type: "application/atom+xml",
            href: "https://www.blogger.com/feeds/8122934176709728665/posts/default/3489164376858350841",
          },
          {
            rel: "alternate",
            type: "text/html",
            href: "https://dnaholograficoequantico.blogspot.com/2022/01/dialogo-dirigido-com-os-microcistos.html",
            title: "Diálogo Dirigido com os Microcistos Mamários (Mama)",
          },
        ],
        author: [
          {
            name: { $t: "DNA Positivo" },
            uri: { $t: "http://www.blogger.com/profile/12680980880370164731" },
            email: { $t: "noreply@blogger.com" },
            gd$image: {
              rel: "http://schemas.google.com/g/2005#thumbnail",
              width: "33",
              height: "21",
              src: "http://2.bp.blogspot.com/-Ntnmwx5DA8c/VP-QwEjYqrI/AAAAAAAAAt4/L9wLem4HoPw/s220/marca%2Bnova%2Bblog.jpg",
            },
          },
        ],
        media$thumbnail: {
          xmlns$media: "http://search.yahoo.com/mrss/",
          url: "https://blogger.googleusercontent.com/img/a/AVvXsEimXqvXr4pMOhM5f9qV4rLfvfRJhF1PfbQ2GrwVyOcBy_pUG5qismfko20C-iZjx7arj_RxjXwDoqS0LQ06KG0eXUm6vYwuDl3uHWqMsJPkr-3IvVJnL5QHkXW9CWGvVRc7lznKbqeop__fxACfrqlpQwmwmk7kWBEnX2lPmRKHC24C-tLIKKnbEbCZ=s72-w400-h225-c",
          height: "72",
          width: "72",
        },
      },
      {
        id: {
          $t: "tag:blogger.com,1999:blog-8122934176709728665.post-5891003541063509107",
        },
        published: { $t: "2022-01-31T22:00:00.005-03:00" },
        updated: { $t: "2022-01-31T22:19:42.354-03:00" },
        title: {
          type: "text",
          $t: "Diálogo Dirigido com Sistema Nervoso, Central e Periférico",
        },
        content: {
          type: "html",
          $t: '\u003Cp style="text-align: justify;"\u003E\u003Cspan style="color: #444444; font-family: verdana; font-size: medium;"\u003EDiálogo para o tratamento de sintomas como ansiedade, tristeza, aborrecimento, sentimento de abandono e problemas de relacionamento na família ou em geral. O objetivo é o alívio dos sintomas por meio do equilíbrio do Sistema Nervoso, Central e Periférico.\u003C/span\u003E\u003C/p\u003E\u003Cdiv class="separator" style="clear: both; text-align: center;"\u003E\u003Ca href="https://dialogos.ml/snc_snp_0752" style="margin-left: 1em; margin-right: 1em;" target="_blank"\u003E\u003Cimg border="0" data-original-height="456" data-original-width="808" height="226" src="https://blogger.googleusercontent.com/img/a/AVvXsEifYg9qV0OHVF2ehyHk32-IBfhDbRQg_Z-AE10Q8occahb-sOjIPry5k29UwHTpt_q1lHcSt2qEFeLPOrXm5dBlnkhTMcLu7rjznyBaCUPjuOvayOHbYwhwi4BcR5idu-1axt3a7c63s1eJUdqECojqEhowhIKY4OTYYLSQ2c1LLOXjdQOh1drhc59m=w400-h226" width="400" /\u003E\u003C/a\u003E\u003C/div\u003E',
        },
        link: [
          {
            rel: "edit",
            type: "application/atom+xml",
            href: "https://www.blogger.com/feeds/8122934176709728665/posts/default/5891003541063509107",
          },
          {
            rel: "self",
            type: "application/atom+xml",
            href: "https://www.blogger.com/feeds/8122934176709728665/posts/default/5891003541063509107",
          },
          {
            rel: "alternate",
            type: "text/html",
            href: "https://dnaholograficoequantico.blogspot.com/2022/01/dialogo-dirigido-com-sistema-nervoso.html",
            title: "Diálogo Dirigido com Sistema Nervoso, Central e Periférico",
          },
        ],
        author: [
          {
            name: { $t: "DNA Positivo" },
            uri: { $t: "http://www.blogger.com/profile/12680980880370164731" },
            email: { $t: "noreply@blogger.com" },
            gd$image: {
              rel: "http://schemas.google.com/g/2005#thumbnail",
              width: "33",
              height: "21",
              src: "http://2.bp.blogspot.com/-Ntnmwx5DA8c/VP-QwEjYqrI/AAAAAAAAAt4/L9wLem4HoPw/s220/marca%2Bnova%2Bblog.jpg",
            },
          },
        ],
        media$thumbnail: {
          xmlns$media: "http://search.yahoo.com/mrss/",
          url: "https://blogger.googleusercontent.com/img/a/AVvXsEifYg9qV0OHVF2ehyHk32-IBfhDbRQg_Z-AE10Q8occahb-sOjIPry5k29UwHTpt_q1lHcSt2qEFeLPOrXm5dBlnkhTMcLu7rjznyBaCUPjuOvayOHbYwhwi4BcR5idu-1axt3a7c63s1eJUdqECojqEhowhIKY4OTYYLSQ2c1LLOXjdQOh1drhc59m=s72-w400-h226-c",
          height: "72",
          width: "72",
        },
      },
      {
        id: {
          $t: "tag:blogger.com,1999:blog-8122934176709728665.post-8365311538127326588",
        },
        published: { $t: "2022-01-31T21:54:00.003-03:00" },
        updated: { $t: "2022-01-31T22:19:16.565-03:00" },
        title: { type: "text", $t: "Tratamento com o DNA das Cores" },
        content: {
          type: "html",
          $t: '\u003Cp style="text-align: justify;"\u003E\u003Cspan style="color: #444444; font-family: verdana;"\u003EDiálogo para o tratamento de todo tipo de problema ou doença. Fique atento às fases da narração para relatar o seu caso. Veja, por exemplo, os pontos da narração no caso do tratamento da doença ceratocone, que é uma deformidade da córnea do olho:\u003C/span\u003E\u003C/p\u003E\u003Cp\u003E\u003C/p\u003E\u003Cul style="text-align: left;"\u003E\u003Cli style="text-align: justify;"\u003E\u003Cspan style="color: #444444; font-family: verdana;"\u003ENarração “cujo o nome vou falar agora”, dizer em voz alta: o órgão é o olho e o sistema é o ocular, minha doença se chama ceratocone que projeta a córnea para a frente formando um cone, comprometendo a visão.\u0026nbsp;\u003C/span\u003E\u003C/li\u003E\u003C/ul\u003E\u003Cul style="text-align: left;"\u003E\u003Cli style="text-align: justify;"\u003E\u003Cspan style="color: #444444; font-family: verdana;"\u003ENarração “e cujos sintomas abalam o meu corpo a minha mente e meu espírito”, dizer em voz alta: os principais são visão embaçada e perda de visão.\u003C/span\u003E\u003C/li\u003E\u003C/ul\u003E\u003Cul style="text-align: left;"\u003E\u003Cli style="text-align: justify;"\u003E\u003Cspan style="color: #444444; font-family: verdana;"\u003ENarração “atua na reconstrução das células e tecidos doentes”, dizer em voz alta: Azul como regenerador das células da córnea, Verde como antisséptico e antinflamatório, Amarelo como revigorante, e Rosa como equilibrador e paralisador do avanço da deformidade.\u003C/span\u003E\u003C/li\u003E\u003C/ul\u003E\u003Cp\u003E\u003C/p\u003E\u003Cp style="text-align: justify;"\u003E\u003Cspan style="color: #444444; font-family: verdana;"\u003EPara uma visão geral sobre a função das cores, veja a página \u003Ca href="https://dna-positivo.vercel.app/cat/2/b651fd6c-9106-5b46-9764-8421ca06edf1" target="_blank"\u003ECromoterapia: as cores e suas funções\u003C/a\u003E.\u003C/span\u003E\u003C/p\u003E\u003Cp style="text-align: justify;"\u003E\u003Cspan style="color: #444444; font-family: verdana;"\u003E\u003Cbr /\u003E\u003C/span\u003E\u003C/p\u003E\u003Cp style="text-align: justify;"\u003E\u003C/p\u003E\u003Cdiv class="separator" style="clear: both; text-align: center;"\u003E\u003Ca href="https://dialogos.ml/universal_0924" style="margin-left: 1em; margin-right: 1em;" target="_blank"\u003E\u003Cimg border="0" data-original-height="456" data-original-width="808" height="226" src="https://blogger.googleusercontent.com/img/a/AVvXsEh5_4AJ9A0Eg6o18O993BFfDfF1LU54Eo9-QJRw8qW9wE6C1ofoMH8ptOE3ZAtAWGvfCdgtUJDLDEpJF55zLsPof0gPGhEx2a5wXsSuxQzyl-n0e6XvoP6fQbkiSTOOHEHrrByvsVAOTc23pD_tF1qHqRKjdPPbZr3YdOlS3dTVEej1sjqX0C3xSEW_=w400-h226" width="400" /\u003E\u003C/a\u003E\u003C/div\u003E\u003Cp style="text-align: justify;"\u003E\u003Cbr /\u003E\u003C/p\u003E',
        },
        link: [
          {
            rel: "edit",
            type: "application/atom+xml",
            href: "https://www.blogger.com/feeds/8122934176709728665/posts/default/8365311538127326588",
          },
          {
            rel: "self",
            type: "application/atom+xml",
            href: "https://www.blogger.com/feeds/8122934176709728665/posts/default/8365311538127326588",
          },
          {
            rel: "alternate",
            type: "text/html",
            href: "https://dnaholograficoequantico.blogspot.com/2022/01/tratamento-com-o-dna-das-cores.html",
            title: "Tratamento com o DNA das Cores",
          },
        ],
        author: [
          {
            name: { $t: "DNA Positivo" },
            uri: { $t: "http://www.blogger.com/profile/12680980880370164731" },
            email: { $t: "noreply@blogger.com" },
            gd$image: {
              rel: "http://schemas.google.com/g/2005#thumbnail",
              width: "33",
              height: "21",
              src: "http://2.bp.blogspot.com/-Ntnmwx5DA8c/VP-QwEjYqrI/AAAAAAAAAt4/L9wLem4HoPw/s220/marca%2Bnova%2Bblog.jpg",
            },
          },
        ],
        media$thumbnail: {
          xmlns$media: "http://search.yahoo.com/mrss/",
          url: "https://blogger.googleusercontent.com/img/a/AVvXsEh5_4AJ9A0Eg6o18O993BFfDfF1LU54Eo9-QJRw8qW9wE6C1ofoMH8ptOE3ZAtAWGvfCdgtUJDLDEpJF55zLsPof0gPGhEx2a5wXsSuxQzyl-n0e6XvoP6fQbkiSTOOHEHrrByvsVAOTc23pD_tF1qHqRKjdPPbZr3YdOlS3dTVEej1sjqX0C3xSEW_=s72-w400-h226-c",
          height: "72",
          width: "72",
        },
      },
      {
        id: {
          $t: "tag:blogger.com,1999:blog-8122934176709728665.post-3383932672874288005",
        },
        published: { $t: "2022-01-31T21:43:00.004-03:00" },
        updated: { $t: "2022-01-31T21:44:31.271-03:00" },
        title: { type: "text", $t: "Diálogo Dirigido ao Dormir" },
        content: {
          type: "html",
          $t: '\u003Cdiv style="text-align: justify;"\u003E\u003Cspan style="color: #444444; font-family: verdana; font-size: medium;"\u003EQuando dormimos, nosso espírito se lança pelo tecido do espaço-tempo e nos leva aos umbrais e universos paralelos. Lá encontramos os registros de nossas histórias, que produzem no tempo presente os desequilíbrios e o sofrimento no corpo físico. Portanto, nesse diálogo somos orientados a fazer um deslocamento consciente durante o sono, de forma a tratarmos nossos registros e a doença no corpo físico. Pode ser feito todas as noites, antes de dormir, em especial para os casos de insônia, sonambulismo e sono conturbado.\u003C/span\u003E\u003C/div\u003E\u003Cdiv style="text-align: justify;"\u003E\u003Cspan style="color: #444444; font-family: verdana; font-size: medium;"\u003E\u003Cbr /\u003E\u003C/span\u003E\u003C/div\u003E\u003Cdiv style="text-align: justify;"\u003E\u003Cdiv class="separator" style="clear: both; text-align: center;"\u003E\u003Ca href="https://dialogos.ml/ao_dormir_0555" style="margin-left: 1em; margin-right: 1em;" target="_blank"\u003E\u003Cspan style="color: #444444; font-family: verdana; font-size: medium;"\u003E\u003Cimg border="0" data-original-height="451" data-original-width="805" height="224" src="https://blogger.googleusercontent.com/img/a/AVvXsEiCuc02Vi_uHQbHspm0KLNLbqDnVn7p8g4gf45_nwBzrqB8kkvULYtNh1uaMFDMl8D_c47zAZDIRX8SqyLgaZ1FY_wQ132QweZLUr1zWK7-e9cx2EGI96X_uA8pxjmtyyZzn3_qRhsAW30_lFezWf_owIENJJa8IxZyWCeSfl6RVKJEaOOx4d6YdZlY=w400-h224" width="400" /\u003E\u003C/span\u003E\u003C/a\u003E\u003C/div\u003E\u003Cspan style="color: #444444; font-family: verdana; font-size: medium;"\u003E\u003Cbr /\u003E\u003C/span\u003E\u003Cspan style="font-family: verdana; font-size: large;"\u003E\u003Cbr /\u003E\u003C/span\u003E\u003C/div\u003E',
        },
        link: [
          {
            rel: "edit",
            type: "application/atom+xml",
            href: "https://www.blogger.com/feeds/8122934176709728665/posts/default/3383932672874288005",
          },
          {
            rel: "self",
            type: "application/atom+xml",
            href: "https://www.blogger.com/feeds/8122934176709728665/posts/default/3383932672874288005",
          },
          {
            rel: "alternate",
            type: "text/html",
            href: "https://dnaholograficoequantico.blogspot.com/2022/01/dialogo-dirigido-ao-dormir.html",
            title: "Diálogo Dirigido ao Dormir",
          },
        ],
        author: [
          {
            name: { $t: "DNA Positivo" },
            uri: { $t: "http://www.blogger.com/profile/12680980880370164731" },
            email: { $t: "noreply@blogger.com" },
            gd$image: {
              rel: "http://schemas.google.com/g/2005#thumbnail",
              width: "33",
              height: "21",
              src: "http://2.bp.blogspot.com/-Ntnmwx5DA8c/VP-QwEjYqrI/AAAAAAAAAt4/L9wLem4HoPw/s220/marca%2Bnova%2Bblog.jpg",
            },
          },
        ],
        media$thumbnail: {
          xmlns$media: "http://search.yahoo.com/mrss/",
          url: "https://blogger.googleusercontent.com/img/a/AVvXsEiCuc02Vi_uHQbHspm0KLNLbqDnVn7p8g4gf45_nwBzrqB8kkvULYtNh1uaMFDMl8D_c47zAZDIRX8SqyLgaZ1FY_wQ132QweZLUr1zWK7-e9cx2EGI96X_uA8pxjmtyyZzn3_qRhsAW30_lFezWf_owIENJJa8IxZyWCeSfl6RVKJEaOOx4d6YdZlY=s72-w400-h224-c",
          height: "72",
          width: "72",
        },
      },
      // {
      //   id: {
      //     $t: "tag:blogger.com,1999:blog-8122934176709728665.post-5990570422370569993",
      //   },
      //   published: { $t: "2022-01-28T18:00:00.006-03:00" },
      //   updated: { $t: "2022-01-31T21:34:57.727-03:00" },
      //   title: { type: "text", $t: "Diálogo Dirigido ao Acordar" },
      //   content: {
      //     type: "html",
      //     $t: '\u003Cdiv style="text-align: justify;"\u003E\u003Cspan style="color: #444444; font-family: verdana; font-size: medium;"\u003EQuando dormimos, nosso espírito se lança pelo tecido do espaço-tempo e nos leva aos umbrais e universos paralelos. É por isso que, eventualmente, acordamos sentindo sintomas que não tínhamos antes de dormir, como: dor, taquicardia, mal estar, falta de ar e outros. Esse diálogo deve ser feito toda vez que acordarmos com algum sintoma.\u003C/span\u003E\u003C/div\u003E\u003Cdiv style="text-align: justify;"\u003E\u003Cspan style="color: #444444; font-family: verdana; font-size: medium;"\u003E\u003Cbr /\u003E\u003C/span\u003E\u003C/div\u003E\u003Cdiv style="text-align: justify;"\u003E\u003Cspan style="color: #444444; font-family: verdana; font-size: medium;"\u003EDurante a narração, somos orientados a cortar a ligação com esses mundos paralelos e a conscientizar nossos corpos físico e etéricos, neutralizando, assim, os sintomas oriundos desse deslocamento.\u003C/span\u003E\u003C/div\u003E\u003Cdiv style="text-align: justify;"\u003E\u003Cbr /\u003E\u003C/div\u003E\u003Cdiv style="text-align: justify;"\u003E\u003Cdiv class="separator" style="clear: both; text-align: center;"\u003E\u003Ca href="https://dialogos.ml/ao_acordar_0444" style="margin-left: 1em; margin-right: 1em;" target="_blank"\u003E\u003Cimg border="0" data-original-height="456" data-original-width="806" height="226" src="https://blogger.googleusercontent.com/img/a/AVvXsEggH15TCrEQjkrIbpnL_FiDLmph3OMD9mS-G6sHHI3YnV2boGykRwSBQEsDitnhuL26GYLGeYUwjATyNO7KNapC7i7LKSJ_0CbcptURAjHYiOghlGXYPS90WCD5M6dm0apfY1S4DreWOe1q867pEQ3DgaxlXXI1gSKkl3lIrp2EzM4Rs-zlCH6qTneN=w400-h226" width="400" /\u003E\u003C/a\u003E\u003C/div\u003E\u003Cbr /\u003E\u003Cspan style="font-family: verdana; font-size: large;"\u003E\u003Cbr /\u003E\u003C/span\u003E\u003C/div\u003E',
      //   },
      //   link: [
      //     {
      //       rel: "edit",
      //       type: "application/atom+xml",
      //       href: "https://www.blogger.com/feeds/8122934176709728665/posts/default/5990570422370569993",
      //     },
      //     {
      //       rel: "self",
      //       type: "application/atom+xml",
      //       href: "https://www.blogger.com/feeds/8122934176709728665/posts/default/5990570422370569993",
      //     },
      //     {
      //       rel: "alternate",
      //       type: "text/html",
      //       href: "https://dnaholograficoequantico.blogspot.com/2022/01/dialogo-dirigido-ao-acordar.html",
      //       title: "Diálogo Dirigido ao Acordar",
      //     },
      //   ],
      //   author: [
      //     {
      //       name: { $t: "DNA Positivo" },
      //       uri: { $t: "http://www.blogger.com/profile/12680980880370164731" },
      //       email: { $t: "noreply@blogger.com" },
      //       gd$image: {
      //         rel: "http://schemas.google.com/g/2005#thumbnail",
      //         width: "33",
      //         height: "21",
      //         src: "http://2.bp.blogspot.com/-Ntnmwx5DA8c/VP-QwEjYqrI/AAAAAAAAAt4/L9wLem4HoPw/s220/marca%2Bnova%2Bblog.jpg",
      //       },
      //     },
      //   ],
      //   media$thumbnail: {
      //     xmlns$media: "http://search.yahoo.com/mrss/",
      //     url: "https://blogger.googleusercontent.com/img/a/AVvXsEggH15TCrEQjkrIbpnL_FiDLmph3OMD9mS-G6sHHI3YnV2boGykRwSBQEsDitnhuL26GYLGeYUwjATyNO7KNapC7i7LKSJ_0CbcptURAjHYiOghlGXYPS90WCD5M6dm0apfY1S4DreWOe1q867pEQ3DgaxlXXI1gSKkl3lIrp2EzM4Rs-zlCH6qTneN=s72-w400-h226-c",
      //     height: "72",
      //     width: "72",
      //   },
      // },
      // {
      //   id: {
      //     $t: "tag:blogger.com,1999:blog-8122934176709728665.post-5966888304664869543",
      //   },
      //   published: { $t: "2022-01-28T14:33:00.021-03:00" },
      //   updated: { $t: "2022-01-31T21:35:06.756-03:00" },
      //   title: {
      //     type: "text",
      //     $t: "Diálogo Dirigido para a Inversão da Polaridade Negativa",
      //   },
      //   content: {
      //     type: "html",
      //     $t: '\u003Ch2 style="text-align: left;"\u003E\u003Cdiv class="separator" style="clear: both;"\u003E\u003Cdiv style="text-align: justify;"\u003E\u003Cspan style="color: #444444; font-family: verdana; font-size: medium; font-weight: normal;"\u003ENesse diálogo, aprendemos a reprogramar os sentimentos de intolerância, egoísmo, ódio, discriminação e violência que alimentam uma energia de polaridade negativa, vinda da borda da galáxia, e que é capaz de interferir em nossos pensamentos e ações.\u003C/span\u003E\u003C/div\u003E\u003Cdiv style="text-align: justify;"\u003E\u003Cspan style="color: #444444; font-family: verdana; font-size: medium; font-weight: 400;"\u003E\u003Cbr /\u003E\u003C/span\u003E\u003C/div\u003E\u003Cspan style="color: #444444; font-family: verdana; font-size: medium; font-weight: normal;"\u003E\u003Cdiv style="text-align: justify;"\u003EAo exercitarmos o sorriso sincero, o abraço fraterno e o aperto de mão, transformamos a energia do ambiente que nos cerca, produzindo sentimentos de boa vontade e confiança mútua, de forma a contribuir para um mundo melhor.\u003C/div\u003E\u003Cdiv style="text-align: justify;"\u003E\u003Cbr /\u003E\u003C/div\u003E\u003Cdiv class="separator" style="clear: both; text-align: center;"\u003E\u003Ca href="https://dialogos.ml/inversao_polaridade_0068" style="margin-left: 1em; margin-right: 1em; text-align: center;" target="_blank"\u003E\u003Cimg border="0" data-original-height="455" data-original-width="808" height="225" src="https://blogger.googleusercontent.com/img/a/AVvXsEhKrCIszYlTffTNBayq5sVx9tyZ2KbhVh11AgffhgSsYLMIEwbFrrEkWCVIZlkd-n76RhFBVqGmLztLC7Li11mIVThRYYb8aCops2cvHesY3SXYgDfmZmuv7o9BzSYyxTnGjMaKEnKVoSiqufO8O5XDRzYWqhKJuVUT8KwWJj9bndnNYOsdLStYDihT=w400-h225" width="400" /\u003E\u003C/a\u003E\u003C/div\u003E\u003Cdiv style="text-align: justify;"\u003E\u003C/div\u003E\u003C/span\u003E\u003C/div\u003E\u003Cspan style="font-family: verdana; font-size: large;"\u003E\u003Cbr /\u003E\u003Cdiv class="separator" style="clear: both; text-align: center;"\u003E\u003Cbr /\u003E\u003C/div\u003E\u003Cbr /\u003E\u003C/span\u003E\u003C/h2\u003E',
      //   },
      //   link: [
      //     {
      //       rel: "edit",
      //       type: "application/atom+xml",
      //       href: "https://www.blogger.com/feeds/8122934176709728665/posts/default/5966888304664869543",
      //     },
      //     {
      //       rel: "self",
      //       type: "application/atom+xml",
      //       href: "https://www.blogger.com/feeds/8122934176709728665/posts/default/5966888304664869543",
      //     },
      //     {
      //       rel: "alternate",
      //       type: "text/html",
      //       href: "https://dnaholograficoequantico.blogspot.com/2022/01/inversao-da-polaridade-negativa.html",
      //       title: "Diálogo Dirigido para a Inversão da Polaridade Negativa",
      //     },
      //   ],
      //   author: [
      //     {
      //       name: { $t: "DNA Positivo" },
      //       uri: { $t: "http://www.blogger.com/profile/12680980880370164731" },
      //       email: { $t: "noreply@blogger.com" },
      //       gd$image: {
      //         rel: "http://schemas.google.com/g/2005#thumbnail",
      //         width: "33",
      //         height: "21",
      //         src: "http://2.bp.blogspot.com/-Ntnmwx5DA8c/VP-QwEjYqrI/AAAAAAAAAt4/L9wLem4HoPw/s220/marca%2Bnova%2Bblog.jpg",
      //       },
      //     },
      //   ],
      //   media$thumbnail: {
      //     xmlns$media: "http://search.yahoo.com/mrss/",
      //     url: "https://blogger.googleusercontent.com/img/a/AVvXsEhKrCIszYlTffTNBayq5sVx9tyZ2KbhVh11AgffhgSsYLMIEwbFrrEkWCVIZlkd-n76RhFBVqGmLztLC7Li11mIVThRYYb8aCops2cvHesY3SXYgDfmZmuv7o9BzSYyxTnGjMaKEnKVoSiqufO8O5XDRzYWqhKJuVUT8KwWJj9bndnNYOsdLStYDihT=s72-w400-h225-c",
      //     height: "72",
      //     width: "72",
      //   },
      // },
    ],
  },
};
