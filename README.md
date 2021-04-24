[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Standard JS Linting](https://github.com/kikeonline/tina-next-js/actions/workflows/github-actions-standard-js-lint.yml/badge.svg?branch=main)](https://github.com/kikeonline/tina-next-js/actions/workflows/github-actions-standard-js-lint.yml)


# Next.js static blog starter + TinaCMS (..and Strapi)

This example showcases Next.js's [Static Generation](https://nextjs.org/docs/basic-features/pages) feature using Markdown files as the data source.

The blog posts are stored in `/_posts` as Markdown files with front matter support. Adding a new Markdown file in there will create a new blog post.

This example project uses Next.js' [blog starter](https://next-blog-starter.now.sh/) and adds Tina to it according to the [Tina boostrapping guide](https://tinacms.org/guides/nextjs/adding-tina/overview).

## How to use

Install dependencies and run the example:

```bash
yarn install
yarn dev
```

## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/blog-starter&project-name=blog-starter&repository-name=blog-starter)

Your blog should be up and running on [http://localhost:3000]

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

## Strapi Dockerfile
https://hub.docker.com/r/strapi/strapi/dockerfile

# Notes

This blog-starter uses [Tailwind CSS](https://tailwindcss.com). To control the generated stylesheet's filesize, this example uses Tailwind CSS' v2.0 [`purge` option](https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css) to remove unused CSS.
