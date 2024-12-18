/** @type {import('next').NextConfig} */

const withTM = require("next-transpile-modules")([
  "@mui/material",
  "@mui/system",
]); // pass the modules you would like to see transpiled

const withPWA = require("next-pwa");

module.exports = withPWA(
  withTM({
    pwa: {
      dest: "public",
      disable: process.env.NODE_ENV === "development",
    },
    images: {
      domains: ["blogger.googleusercontent.com"],
    },
    reactStrictMode: true,
    excludeFile: (str) => /\*.{spec,test}.js/.test(str),
  })
);
