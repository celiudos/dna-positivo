# Rodar o projeto

## Requisitos

- [NodeJs > 15](https://nodejs.org/en/download/)

## Instalar

1.  Baixe o [projeto dna-positivo do github](https://github.com/celiudos/dna-positivo)

1.  No diretório do projeto, instale localmente as libs com o comando

        npm install

## Rodar o projeto

1.  Inicie o servidor de desenvolvimento

        npm run dev

# Publicar manualmente

[Atualizar todos os posts JSON](http://localhost:3000/api/atualizar?catId=4)

    [
        {
          name: "dnafisicoequantico",
          catId: 1,
          catName: "DNA Físico e Quântico",
        },
        {
          name: "dnapositivo",
          catId: 2,
          catName: "DNA Positivo",
        },
        {
          name: "inteligenciaartificialpositiva",
          catId: 3,
          catName: "Inteligência Artificial Positiva",
        },
        {
          name: "dnaholograficoequantico",
          catId: 4,
          catName: "DNA Holográfico e Quântico",
        },
      ]

# Processo para atualizar publicações

1.  Localmente, suba o servidor
1.  Acesse http://localhost:3000/api/atualizar. Vai atualizar o arquivo "todos-os-posts.json"
1.  Commita o arquivo "todos-os-posts.json"

# Geral

## Objetivo

Melhorar a Usabilidade do App

## Resumo

Basicamente, uma remodelagem do que hoje existe no Aplicativo Android, adaptando tudo a um site.

## Melhorias

- Criar Favoritos, permitindo acessar os dados de forma offline
- Aprimorar a busca por Diálogos e outros dados
- Permitir que usuários de Iphone tenham acesso às mesmas funcionalidades do App pelo site (caso não exista o app para Iphone)
- Redimensionar a fonte. Facilitar a leitura em smartphone. Letras maiores

## Tecnologias

Todas são gratuitas, inclusive hospedagem

## URLS

Sites:

- https://dnapositivo.blogspot.com/
- https://dnafisicoequantico.blogspot.com/
- https://inteligenciaartificialpositiva.blogspot.com/
- https://dnaholograficoequantico.blogspot.com/

Aux:

- https://www.exeideas.com/2016/02/parameters-in-blogspot-feed.html

- Recuperar todos posts ou pages
  -- https://dnaholograficoequantico.blogspot.com/feeds/pages/default?alt=json&start-index=1&max-results=200

- Recuperar últimos posts
  -- https://dnafisicoequantico.blogspot.com/feeds/posts/default?alt=json&updated-min=2021-11-05T00:00:00&orderby=updated

# COMMIT

## Versionando GIT e package.json

Utilize **major**, **minor**, ou **patch**

    npm version patch -m "Nova versão"
