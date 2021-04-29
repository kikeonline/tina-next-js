require("dotenv").config();

module.exports = {
  future: {
    webpack5: true,
  },
  env: {
    STRAPI_URL: process.env.STRAPI_URL,
    NEXTJS_URL: process.env.NEXTJS_URL,
  },
  images: {
    domains: ["localhost"],
  },
};
