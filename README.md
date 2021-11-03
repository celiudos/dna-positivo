# Rodar o projeto

## Requisitos

- [NodeJs >15](https://nodejs.org/en/download/)

## Instalar

1.  Baixe o [projeto dna-positivo do github](https://github.com/celiudos/dna-positivo)

1.  No diretório do projeto, instale localmente as libs com o comando

        npm install

## Rodar o projeto

1.  Inicie o servidor de desenvolvimento

        npm run dev

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

## TODO

- Adicionar número de versão
- Adicionar testes unitários e E2E
- Inserir controladores
- Redimensionar fonte (salvar no cookie)
- Scroll infinito na pesquisa

## URLS

Sites:

- https://dnapositivo.blogspot.com/
- https://dnafisicoequantico.blogspot.com/
- https://inteligenciaartificialpositiva.blogspot.com/

Aux:

- https://www.exeideas.com/2016/02/parameters-in-blogspot-feed.html

- Recuperar todos posts ou pages
  -- https://dnapositivo.blogspot.com/feeds/pages/default?alt=json&start-index=1&max-results=200

- Recuperar últimos posts
  -- https://dnafisicoequantico.blogspot.com/feeds/posts/default?alt=json&updated-min=2021-10-25T00:00:00&orderby=updated
