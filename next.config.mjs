/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [process.env.IMAGE_HOST],
    // loader: 'imgix',
    // path: '/',
    // domains: ['localhost'],
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
};

// const path = require("path");

// // module.exports = nextConfig
// (module.exports = nextConfig),
//   {
//     sassOptions: {
//       includePaths: [path.join(__dirname, "styles")],
//     },
//   };

export default nextConfig;
