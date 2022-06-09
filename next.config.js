const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  env: {
    SECRET: "OI&baUv*L|n4)R:)",
  },
};

module.exports = nextConfig;
