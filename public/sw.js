if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,c)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let r={};const t=e=>n(e,i),o={module:{uri:i},exports:r,require:t};s[i]=Promise.all(a.map((e=>o[e]||t(e)))).then((e=>(c(...e),r)))}}define(["./workbox-6316bd60"],(function(e){"use strict";importScripts("fallback-OASjnD3Y5exjlXzuUzmrq.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/OASjnD3Y5exjlXzuUzmrq/_buildManifest.js",revision:"b098114e371028031c47444d7159737b"},{url:"/_next/static/OASjnD3Y5exjlXzuUzmrq/_middlewareManifest.js",revision:"fb2823d66b3e778e04a3f681d0d2fb19"},{url:"/_next/static/OASjnD3Y5exjlXzuUzmrq/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/29107295-fbcfe2172188e46f.js",revision:"fbcfe2172188e46f"},{url:"/_next/static/chunks/335-6b07bb8655ec9e9e.js",revision:"6b07bb8655ec9e9e"},{url:"/_next/static/chunks/425-dd0470021900fef1.js",revision:"dd0470021900fef1"},{url:"/_next/static/chunks/433-11f5607f4ec2edec.js",revision:"11f5607f4ec2edec"},{url:"/_next/static/chunks/630-456cda4251723003.js",revision:"456cda4251723003"},{url:"/_next/static/chunks/894.9047cda612e8fce0.js",revision:"9047cda612e8fce0"},{url:"/_next/static/chunks/945-5baf1dc7b19ed99d.js",revision:"5baf1dc7b19ed99d"},{url:"/_next/static/chunks/framework-5f4595e5518b5600.js",revision:"5f4595e5518b5600"},{url:"/_next/static/chunks/main-9fceec23514cd2c4.js",revision:"9fceec23514cd2c4"},{url:"/_next/static/chunks/pages/404-a8332ed4809efa13.js",revision:"a8332ed4809efa13"},{url:"/_next/static/chunks/pages/_app-3d65ae41da774410.js",revision:"3d65ae41da774410"},{url:"/_next/static/chunks/pages/_error-350d9d86556f6d87.js",revision:"350d9d86556f6d87"},{url:"/_next/static/chunks/pages/_offline-c90c8c87f95bc404.js",revision:"c90c8c87f95bc404"},{url:"/_next/static/chunks/pages/cat/%5BcatId%5D-021c61b17acc9bed.js",revision:"021c61b17acc9bed"},{url:"/_next/static/chunks/pages/cat/%5BcatId%5D/%5Bid%5D-40aefd43542083bc.js",revision:"40aefd43542083bc"},{url:"/_next/static/chunks/pages/favoritos-f224ff1f57b369c1.js",revision:"f224ff1f57b369c1"},{url:"/_next/static/chunks/pages/index-5ca2b6a187d8abad.js",revision:"5ca2b6a187d8abad"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"99442aec5788bccac9b2f0ead2afdd6b"},{url:"/_next/static/chunks/webpack-f618100367375cfe.js",revision:"f618100367375cfe"},{url:"/_next/static/css/acbb9b1f96bf678e.css",revision:"acbb9b1f96bf678e"},{url:"/_offline",revision:"OASjnD3Y5exjlXzuUzmrq"},{url:"/favicon.ico",revision:"287149a7ae752094cec8a94fb5a2c4b3"},{url:"/favicon/android-chrome-1024x1024.png",revision:"9724f3716fb4aafaf89e5cfad6b35bb9"},{url:"/favicon/android-chrome-192x192.png",revision:"b1f845e86419b7ee25c814a9c52f4edf"},{url:"/favicon/android-chrome-2048x2048.png",revision:"c7ac246cd6d49502a458d6222d7c701d"},{url:"/favicon/android-chrome-512x512.png",revision:"5f6d07729e66130f123fd1a9d834ec27"},{url:"/favicon/apple-touch-icon.png",revision:"d430c298784d3651efa9d2a0c4646626"},{url:"/favicon/browserconfig.xml",revision:"68c9044fa4a08749efb85bb2a4edaede"},{url:"/favicon/favicon-16x16.png",revision:"3fedbfe49006438a1401c871232af945"},{url:"/favicon/favicon-32x32.png",revision:"295ff1507d844922ecbd677926b7a766"},{url:"/favicon/mstile-150x150.png",revision:"918a3e6d70a816a392f2eebc03d2564b"},{url:"/favicon/safari-pinned-tab.svg",revision:"c96b587b9358ad1c701c4a21d46bebea"},{url:"/img/DNA-Genetics.gif",revision:"809c2d761eeddf8ac9d86519dfdfe51e"},{url:"/img/gif-grande.gif",revision:"184a4b95bde1684cab969f3776dfc888"},{url:"/img/logo-180x180.jpg",revision:"12698b07ffc93cd9ab6b7f68f18096b3"},{url:"/img/logo.jpg",revision:"ed8e5840e8d3a01236228f9284974e77"},{url:"/img/planeta-maior.jpg",revision:"263bc167b324d5443c8ee9adbc74100d"},{url:"/img/planeta.jpg",revision:"c0d2d5561e00b548a0a936cfb44b7355"},{url:"/site.webmanifest",revision:"5ed986dfc04a80c3c3f4be7cb673e7a8"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET")}));
