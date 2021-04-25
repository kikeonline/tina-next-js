[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Standard JS Linting](https://github.com/kikeonline/tina-next-js/actions/workflows/github-actions-standard-js-lint.yml/badge.svg?branch=main)](https://github.com/kikeonline/tina-next-js/actions/workflows/github-actions-standard-js-lint.yml)


# Next.js + TinaCMS (..and soon Strapi)

This example project uses Next.js' [blog starter](https://next-blog-starter.now.sh/) and adds Tina to it according to the [Tina boostrapping guide](https://tinacms.org/guides/nextjs/adding-tina/overview).

## How to use

Install dependencies and run the example:

```bash
yarn install
yarn dev
```
Your blog should be up and running on [http://localhost:3000]


## Strapi Dockerfile

https://hub.docker.com/r/strapi/strapi/dockerfile

# Tailwind CSS

This blog-starter uses [Tailwind CSS](https://tailwindcss.com). To control the generated stylesheet's filesize, this example uses Tailwind CSS' v2.0 [`purge` option](https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css) to remove unused CSS.
