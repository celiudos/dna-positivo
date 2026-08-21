# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Sobre o projeto

DNA Positivo é um app Next.js (Pages Router, TypeScript) que espelha o conteúdo de cinco blogs Blogspot (posts e "pages") em uma experiência única de app, com busca, favoritos e PWA. Não há backend próprio de conteúdo: os posts são baixados do Blogger, normalizados e persistidos em [data/todos-os-posts.json](data/todos-os-posts.json), que é commitado no repositório e servido como fonte de dados estática em runtime/build.

## Comandos

```bash
npm run dev              # servidor de desenvolvimento (localhost:3000)
npm run build             # build de produção (gera o service worker via next-pwa)
npm run start              # roda o build de produção
npm run tsc                # checagem de tipos (tsc -p .), sem emitir
npm run lint                # next lint (eslint-config-next)
npm test                    # jest --watch
npm run unimported          # detecta arquivos/exports não utilizados
```

- Rodar um único teste: `npx jest utils/BaixarPostsDoBlogger.test.ts` (ou `npx jest -t "nome do teste"`). Os testes ficam ao lado do código-fonte (`*.test.ts`), não em `tests/` — `tests/e2e/` guarda apenas um script legado do Selenium IDE.
- Versionamento: usar `npm version patch|minor|major -m "Nova versão"` (o número de versão é exibido no rodapé da Home a partir de `package.json`).

## Arquitetura

### Pipeline de conteúdo (Blogger → JSON estático → app)

1. **[utils/BaixarPostsDoBlogger.ts](utils/BaixarPostsDoBlogger.ts)** busca os feeds JSON públicos do Blogspot (`bloggerEntities`, um por categoria/site) via `fetch`, conserta JSON malformado que o Blogger às vezes retorna (`fixJson`, vírgulas soltas), sanitiza HTML (`sanitize-html`), gera IDs determinísticos com `uuid-by-string` a partir do id original do post, e normaliza tudo para o formato `IPost`.
2. **pages/api/atualizar.ts** e **pages/api/atualizar-force.ts** disparam esse download (por categoria via `?catId=` ou geral) e regravam **[data/todos-os-posts.json](data/todos-os-posts.json)** via `utils/FileUtils.ts`, depois chamam `res.revalidate(rota)` para invalidar o ISR das páginas afetadas (`/` e `/cat/{catId}`).
3. Esse endpoint é acionado manualmente (ver processo no [README.md](README.md)): sobe o servidor local, acessa `/api/atualizar`, e o arquivo JSON resultante é commitado. Não há cron/job automático.
4. **[lib/ApiJsonImport.ts](lib/ApiJsonImport.ts)** importa esse JSON estático em build/runtime; **[lib/ApiSearch.ts](lib/ApiSearch.ts)** indexa esse conjunto com `js-search` (busca por substring) e expõe `search()` com filtro, ordenação e paginação; **[lib/ApiPost.ts](lib/ApiPost.ts)** é a camada consumida pelas páginas, combinando o JSON estático com posts "recentes" buscados em runtime (`pages/api/ultimos-posts.ts`) para mostrar novidades sem esperar o próximo `atualizar`.

### Roteamento (pages/, Next.js Pages Router)

- `/` (`pages/index.tsx`) — Home, `getStaticProps` com `ApiPost.getPostsRecentes`.
- `/cat/[catId]` — listagem por categoria, `getStaticPaths` com `fallback: true` (páginas geradas sob demanda) + `getStaticProps`.
- `/cat/[catId]/[id]` — detalhe do post/diálogo individual.
- `/favoritos` — lista posts salvos no `localStorage` do navegador.
- `/atualizar` — tela auxiliar ligada ao fluxo de atualização de conteúdo.
- ISR: todas as páginas de conteúdo usam `revalidate: configApp.nextJs.revalidate` (1 dia), mais a revalidação manual disparada por `/api/atualizar`.

### Estado e dados no cliente

- Redux (`store/`) guarda apenas estado de UI/sessão: favoritos, post favoritado alterado, flag de carregamento e o cache de `allPosts` em memória (populado por `ApiPost.setAllPosts()` a partir do hook `hook/useFuseSearch.tsx`). Não é a fonte de verdade do conteúdo — isso é o JSON estático + fetch runtime.
- Favoritos persistem em `localStorage` via **[utils/FavoritosStorageUtils.ts](utils/FavoritosStorageUtils.ts)**, com um campo `version` para migração de formato (`alteracaoDeVersao`), independente do Redux (o Redux só espelha o storage para a UI reagir).
- Busca "instantânea" no cliente (`hook/useFuseSearch.tsx`) usa `fuse.js` sobre `allPosts`, diferente da busca em `lib/ApiSearch.ts` (que usa `js-search` e roda sobre o JSON estático em SSR/API routes). São dois mecanismos de busca distintos para contextos diferentes — não unificar sem entender por quê.

### Path aliases

`@components`, `@data`, `@lib`, `@pages`, `@public`, `@store`, `@styles`, `@tests`, `@typesApp`, `@utils`, `@theme`, `@hook` apontam para as pastas de mesmo nome na raiz (configurados em [tsconfig.json](tsconfig.json) `paths` **e** duplicados em `package.json` → `jest.moduleNameMapper` — ao adicionar um alias novo, atualizar os dois lugares).

### Estilo e tema

MUI v5 + Emotion, com `jsxImportSource: "@emotion/react"` (ver [.babelrc](.babelrc) e [tsconfig.json](tsconfig.json)) — não é necessário importar `jsx` do Emotion manualmente. Tema e paleta central em [theme/ThemeConfig.tsx](theme/ThemeConfig.tsx).

### Configuração do app

[configApp.ts](configApp.ts) na raiz centraliza textos, URLs, e-mail de contato, posts em destaque e o intervalo de revalidação do ISR — é o primeiro lugar a olhar para mudanças de conteúdo fixo/institucional (fora dos posts do Blogger).
