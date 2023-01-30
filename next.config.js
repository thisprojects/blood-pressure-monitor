/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    hostname: process.env.REACT_APP_HOSTNAME,
  },
};

module.exports = nextConfig;
