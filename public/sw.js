if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return n[e]||(s=new Promise((async s=>{if("document"in self){const n=document.createElement("script");n.src=e,document.head.appendChild(n),n.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!n[e])throw new Error(`Module ${e} didn’t register its module`);return n[e]}))},s=(s,n)=>{Promise.all(s.map(e)).then((e=>n(1===e.length?e[0]:e)))},n={require:Promise.resolve(s)};self.define=(s,i,a)=>{n[s]||(n[s]=Promise.resolve().then((()=>{let n={};const t={uri:location.origin+s.slice(1)};return Promise.all(i.map((s=>{switch(s){case"exports":return n;case"module":return t;default:return e(s)}}))).then((e=>{const s=a(...e);return n.default||(n.default=s),n}))})))}}define("./sw.js",["./workbox-4a677df8"],(function(e){"use strict";importScripts("fallback-zFRBFFi2bU8tp43Bl57BW.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/20-076c5f5643a0bad3f306.js",revision:"zFRBFFi2bU8tp43Bl57BW"},{url:"/_next/static/chunks/271-9edd9320b3be42adb87c.js",revision:"zFRBFFi2bU8tp43Bl57BW"},{url:"/_next/static/chunks/29107295-2648cb5e919f7c78c7cc.js",revision:"zFRBFFi2bU8tp43Bl57BW"},{url:"/_next/static/chunks/577-82d857e1c8130eeb3e83.js",revision:"zFRBFFi2bU8tp43Bl57BW"},{url:"/_next/static/chunks/884-8f3f3148c296b4500c90.js",revision:"zFRBFFi2bU8tp43Bl57BW"},{url:"/_next/static/chunks/923-6f21d31221479670d56f.js",revision:"zFRBFFi2bU8tp43Bl57BW"},{url:"/_next/static/chunks/927-a1a5c3ecb5efd203e72d.js",revision:"zFRBFFi2bU8tp43Bl57BW"},{url:"/_next/static/chunks/framework-2191d16384373197bc0a.js",revision:"zFRBFFi2bU8tp43Bl57BW"},{url:"/_next/static/chunks/main-da1bc8f8d312ca485cee.js",revision:"zFRBFFi2bU8tp43Bl57BW"},{url:"/_next/static/chunks/pages/404-6b0481157cecca1a40bf.js",revision:"zFRBFFi2bU8tp43Bl57BW"},{url:"/_next/static/chunks/pages/_app-2f0f548d714190a4e0c5.js",revision:"zFRBFFi2bU8tp43Bl57BW"},{url:"/_next/static/chunks/pages/_error-737a04e9a0da63c9d162.js",revision:"zFRBFFi2bU8tp43Bl57BW"},{url:"/_next/static/chunks/pages/_offline-3a12dc105048863b7f23.js",revision:"zFRBFFi2bU8tp43Bl57BW"},{url:"/_next/static/chunks/pages/cat/%5BcatId%5D-87c3b60f3d4f872a62fd.js",revision:"zFRBFFi2bU8tp43Bl57BW"},{url:"/_next/static/chunks/pages/cat/%5BcatId%5D/%5Bid%5D-8a2efd92cf8f1790b406.js",revision:"zFRBFFi2bU8tp43Bl57BW"},{url:"/_next/static/chunks/pages/favoritos-b563f0a3ad66fd7ec7a5.js",revision:"zFRBFFi2bU8tp43Bl57BW"},{url:"/_next/static/chunks/pages/index-5b1b5684be436af60781.js",revision:"zFRBFFi2bU8tp43Bl57BW"},{url:"/_next/static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js",revision:"zFRBFFi2bU8tp43Bl57BW"},{url:"/_next/static/chunks/webpack-483a2d4fb3ade84a5d64.js",revision:"zFRBFFi2bU8tp43Bl57BW"},{url:"/_next/static/css/02583df6c7556c650ad8.css",revision:"zFRBFFi2bU8tp43Bl57BW"},{url:"/_next/static/zFRBFFi2bU8tp43Bl57BW/_buildManifest.js",revision:"zFRBFFi2bU8tp43Bl57BW"},{url:"/_next/static/zFRBFFi2bU8tp43Bl57BW/_ssgManifest.js",revision:"zFRBFFi2bU8tp43Bl57BW"},{url:"/_offline",revision:"zFRBFFi2bU8tp43Bl57BW"},{url:"/favicon.ico",revision:"355a40de20a74d00abe04b14b396ca89"},{url:"/favicon/android-chrome-144x144.png",revision:"b5907eeff116d5cb5b014bfa9802abd1"},{url:"/favicon/android-chrome-512x512.png",revision:"417009f1f68d0d621c313d0efc2fcd82"},{url:"/favicon/apple-touch-icon.png",revision:"da452c86dfa3deef2343425148acfab3"},{url:"/favicon/browserconfig.xml",revision:"68c9044fa4a08749efb85bb2a4edaede"},{url:"/favicon/favicon-16x16.png",revision:"4c246c4c3f763fae6c36b5a781170b65"},{url:"/favicon/favicon-32x32.png",revision:"5eab656b412709d89110713cfd03cb0e"},{url:"/favicon/mstile-150x150.png",revision:"54a582d77bcb209543b4de0c7a3a3069"},{url:"/favicon/safari-pinned-tab.svg",revision:"70b34d0c98a19ab6ec0b9f9dbdd7b043"},{url:"/img/logo-180x180.jpg",revision:"9d0b398c7834b58cb13867e6587e29bd"},{url:"/img/logo-180x180.png",revision:"32795381d72aeec5ae38f4f76530e7c4"},{url:"/img/logo.png",revision:"d0ae2db46b4451b88ac419c18a8db9cc"},{url:"/site.webmanifest",revision:"ede75bb51252f9adc833b5d55b64fb63"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET")}));
