/** @type {import('next').NextConfig} */

const { PHASE_PRODUCTION_BUILD } = require("next/constants");

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blogger.googleusercontent.com",
      },
    ],
  },
  reactStrictMode: true,
  // O `sanitize-html` é CommonJS mas depende do `htmlparser2@12`, que é ESM
  // puro (nenhuma versão >= 11 tem build CommonJS). Em runtimes sem suporte a
  // `require(esm)` — Node < 22.12, que é o caso do servidor da Vercel — isso
  // estoura ERR_REQUIRE_ESM e derruba TODA invocação da função serverless.
  //
  // A dupla abaixo resolve em tempo de build: `bundlePagesRouterDependencies`
  // empacota as dependências do servidor em vez de deixá-las como `require()`
  // em runtime, e `esmExternals: "loose"` autoriza o webpack a resolver o
  // `require()` de um pacote ESM feito por um pacote CommonJS.
  bundlePagesRouterDependencies: true,
  experimental: {
    esmExternals: "loose",
  },
};

module.exports = (phase) => {
  // O next-pwa só faz sentido durante o build de produção: é lá que ele gera o
  // service worker via webpack. Deixá-lo fora do runtime evita carregar todo o
  // webpack/workbox a cada cold start do servidor (~700ms) e mantém o bundle da
  // função sem dependências que só existem em tempo de build.
  if (phase !== PHASE_PRODUCTION_BUILD) return nextConfig;

  const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    workboxOptions: {
      exclude: [
        // padrões que o próprio next-pwa usa por padrão
        /\/_next\/static\/.*(?<!\.p)\.woff2/,
        /\.map$/,
        /^manifest.*\.js$/,
        // O Next 16 emite este manifesto na raiz de .next e ele não é servido
        // em /_next/. Sem excluir, o workbox tenta pré-cachear, recebe erro
        // ("bad-precaching-response") e o service worker nunca instala.
        /^dynamic-css-manifest\.json$/,
      ],
    },
  });

  return withPWA(nextConfig);
};
