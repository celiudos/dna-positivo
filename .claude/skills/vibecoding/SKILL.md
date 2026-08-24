---
name: vibecoding
description: Guia de vibecoding do DNA Positivo — use ao criar ou alterar telas, componentes, layout, cores, textos ou qualquer coisa visual/funcional do app. Traz a regra mobile-first de 600px, o mapa de "onde mexer para mudar X", as convenções de código do repo, o loop de validação obrigatório (tsc + lint + jest) e as armadilhas conhecidas. Dispare também quando o pedido for vago ("deixa mais bonito", "arruma a home", "melhora essa tela").
---

# Vibecoding no DNA Positivo

App Next.js **Pages Router** + TypeScript + MUI/Emotion que espelha 5 blogs do Blogspot.
Sem backend próprio: o conteúdo vive em `data/todos-os-posts.json`, commitado no repo.

## 1. Regra de ouro: 600px

**Este é um app mobile.** `components/ContainerApp.tsx` usa `Container maxWidth="sm"`, ou seja,
tudo acontece dentro de 600px. No desktop é a mesma moldura centralizada sobre o fundo.

- Pense e valide qualquer mudança visual em uma viewport de ~400px.
- Coluna única; grade de no máximo 2 colunas (ver `CategoriaGrid`).
- Alvos de toque generosos, tipografia legível sem zoom.
- Nunca trate o desktop como caso principal nem adicione enfeite que só existe em tela larga.

## 2. Onde mexer para mudar X

| Quero mudar... | Arquivo |
| --- | --- |
| Cor, fonte, raio, sombra, estilo padrão de componente MUI | `theme/ThemeConfig.tsx` (única fonte de verdade visual) |
| Gradiente da marca, borda, superfície, sombra de cartão | `export const tokens` em `theme/ThemeConfig.tsx` |
| Fundo da página, formatação do HTML dos posts (`.conteudo-post`) | `styles/globals.css` |
| Texto institucional, e-mail, introdução, destaques, avisos, categorias, revalidate do ISR | `configApp.ts` |
| Estrutura/seções da Home | `pages/index.tsx` + componentes `Home*` |
| Listagem por categoria / detalhe do post | `pages/cat/[catId]/index.tsx` e `pages/cat/[catId]/[id].tsx` |
| Moldura, SEO e Analytics de todas as telas | `components/ContainerApp.tsx` |
| Favoritos (persistência) | `utils/FavoritosStorageUtils.ts` (localStorage, com campo `version`) |
| Busca no cliente | `hook/useFuseSearch.tsx` (fuse.js sobre `allPosts` em memória) |
| Busca em SSR/API | `lib/ApiSearch.ts` (js-search sobre o JSON estático) |
| Como os posts são baixados/normalizados do Blogger | `utils/BaixarPostsDoBlogger.ts` |

**Antes de criar componente novo, olhe `components/`** — já existem `ListHeader`, `ListItens`,
`ListSection`, `EstadoVazio`, `TelaLoading`, `TelaEmpty`, `EstrelaFavorito`, `CategoriaGrid`,
`DestaquesLista`. Reaproveite em vez de duplicar.

## 3. Convenções do repo

- **Tudo em português**: nomes de componentes, variáveis, props e comentários. Siga o idioma do arquivo.
- **Componente** = um arquivo `.tsx` em `components/`, PascalCase, `export default function Nome()`,
  com `type Props = { ... }` local. Nada de `React.FC`.
- **Comentário JSDoc curto acima do componente explicando o *porquê*** do layout, no estilo dos
  existentes (ex.: `CategoriaGrid`, `ContainerApp`). Não comente o óbvio.
- **Estilo via prop `sx`** do MUI. `styled()` do Emotion só nos 2 casos legados
  (`ContainerApp`, `MainAppBar`) — não espalhe.
- **Nunca hardcode cor**: use `theme.palette.*` ou `tokens` de `@theme/ThemeConfig`.
  Exceção já aceita: as cores por categoria vindas de `configApp.categorias` (`cor`/`corFundo`).
- **Espaçamento** pelo grid do MUI (`sx={{ px: 2, mb: 3.5 }}`), não em px cru.
- **Imports por alias**: `@components`, `@lib`, `@utils`, `@store`, `@theme`, `@typesApp`,
  `@hook`, `@styles`, `@data`. `configApp` é importado pela raiz mesmo (`from "configApp"`).
- **Ícones**: `@iconify/react` + `@iconify/icons-mdi` ou `@iconify/icons-ic`.
- **`id` estável em elemento clicável**, no padrão `Componente-Elemento-${lodash.snakeCase(titulo)}`
  (usado por analytics/e2e). Ver `ListItens` e `ListHeader`.
- **Navegação** com `next/link`; ao sair da tela, despache `carregandoPaginaAction()` para acender a
  barra de progresso do `MainAppBar`.
- **Imagens** com `next/image` (`blogger.googleusercontent.com` já está liberado em `next.config.js`).
- **Prettier**: aspas duplas, 2 espaços, fim de linha CRLF (`.editorconfig`).
- **Commits**: `feat:` / `fix:` com mensagem em português. Versão: `npm version patch|minor|major -m "Nova versão"`.

## 4. Loop de validação (obrigatório antes de dizer "pronto")

```bash
npm run tsc     # tipos — o strict está ligado
npm run lint    # eslint (flat config, eslint-config-next/core-web-vitals)
npx jest        # roda a suíte uma vez; NÃO use `npm test` (é --watch e trava)
```

Para conferir de fato na tela: `npm run dev` e abra `http://localhost:3000` **numa viewport de ~400px**.
Mudança visual sem olhar em 400px não está validada — diga isso em vez de afirmar que ficou bom.

## 5. Armadilhas conhecidas

- **`npm test` é `jest --watch`** e não retorna. Sempre `npx jest` (ou `npx jest caminho/arquivo.test.ts`).
- **Aliases fora de sincronia**: `tsconfig.json` `paths` e `package.json` → `jest.moduleNameMapper`
  são listas separadas e hoje divergem (`@theme` e `@hook` faltam no jest; `@public` falta no tsconfig;
  `@hooks/*` aponta para uma pasta `hooks/` que não existe — a pasta real é `hook/`).
  Ao criar alias novo, atualize **os dois** arquivos.
- **Duas buscas diferentes de propósito**: `fuse.js` no cliente, `js-search` no servidor.
  Não unifique sem entender o motivo.
- **`data/todos-os-posts.json` não se edita à mão.** Ele é regerado por `/api/atualizar`
  (subir o dev server, acessar a rota, commitar o JSON). Não há cron.
- **`next.config.js` tem ajustes frágeis e comentados** (`bundlePagesRouterDependencies`,
  `esmExternals: "loose"`, exclusões do workbox). Foram correções de produção na Vercel —
  não mexa sem ler os comentários.
- **next-pwa só roda no build de produção**; em `dev` o service worker fica desligado de propósito.
- **ISR**: páginas de conteúdo usam `revalidate: configApp.nextJs.revalidate` (1 dia) e
  `getStaticPaths` com `fallback: true` — trate o estado de carregamento (`TelaLoading`).
- **Redux guarda só estado de UI/sessão** (favoritos, loading, cache de `allPosts`).
  Não é fonte de verdade de conteúdo.
- Windows: shell é PowerShell, arquivos em CRLF.

## 6. Receitas rápidas

**Nova seção na Home** — crie o componente em `components/`, importe em `pages/index.tsx` e envolva em
`<Box component="section">` com `<ListHeader primary="..." secondary="..." />` dentro do `<Stack spacing={4}>`.

**Nova categoria/blog** — adicione a entrada em `configApp.categorias` (`cat`, `title`, `href`, `icone`,
`cor`, `corFundo`), mapeie o `icone` em `components/CategoriaGrid.tsx` e registre o blog em
`bloggerEntities` de `utils/BaixarPostsDoBlogger.ts`.

**Mudança de paleta/tipografia** — só em `theme/ThemeConfig.tsx` (`themeOptions` e `tokens`).
Se vazar para o CSS global, ajuste também as variáveis `--app-*` em `styles/globals.css`.

**Formatação do conteúdo dos posts** — classe `.conteudo-post` em `styles/globals.css`
(o HTML vem sanitizado do Blogger; não confie em classes do Blogspot).

## 7. Checklist antes de entregar

- [ ] Pensado e conferido em ~400px de largura
- [ ] Sem cor/tamanho hardcoded que deveria vir do tema ou de `tokens`
- [ ] Reaproveitou componente existente em vez de criar um quase-igual
- [ ] Textos em português, comentários explicando o porquê
- [ ] `npm run tsc` e `npm run lint` limpos, `npx jest` verde
- [ ] Se não deu para validar visualmente, disse isso explicitamente
