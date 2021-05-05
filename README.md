[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![TS-Standard - Typescript Standard Style Guide](https://badgen.net/badge/code%20style/ts-standard/blue?icon=typescript)](https://github.com/standard/ts-standard)
[![Lint](https://github.com/kikeonline/tina-next-js/actions/workflows/lint.yml/badge.svg?branch=main)](https://github.com/kikeonline/tina-next-js/actions/workflows/lint.yml)
[![Build](https://github.com/kikeonline/tina-next-js/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/kikeonline/tina-next-js/actions/workflows/build.yml)

# Next.js + TinaCMS + StrapiCMS

## Features
- 🔥 Next.js
- 🦙 Tina CMS
- 🗄 Strapi CMS
- 📚 Storybook JS
- 🎨 Tailwind CSS & SASS
- 🎉 Typescript (Strict)
- 🤖 SEO metadata and Open Graph tags
- 🛠 Prettier
- 💅🏼 PostCSS Autoprefixer

## How to use

Install dependencies and run the example:

```bash
yarn install
yarn dev
```
Setup enviorment variables:

| KEY | TYPE | DESCRIPTION | REQUIRED 
| ------ | ------ | ------ | ------------- 
| STRAPI_URL  | string | URL of deployed Strapi CMS | true 
| NEXTJS_URL  | string | host or domain | true 


## TODO: 

- Add github actions for linting and build
- Update usePlugin(form) on each blog post
- Fix date | Shows wrong date when date picker updates
- Manage About Us Page content in Strapi


## Tutorials used to build this boilerplate
- https://medium.com/@gogl.alex/how-to-set-up-typescript-eslint-prettier-for-next-gatsby-c5330b4a9b7a
- https://eslint.org/docs/user-guide/command-line-interface
- https://dev.to/risafj/how-to-set-up-eslint-with-standardjs-for-a-new-react-native-typescript-project-ebl
- https://nebulab.com/blog/nextjs-tailwind-storybook
- https://github.com/tailwindlabs/tailwindcss/discussions/2929
