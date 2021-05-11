![ts](https://badgen.net/badge/-/TypeScript/blue?icon=typescript&label)
![TypeScript](https://badges.frapsoft.com/typescript/version/typescript-next.svg?v=101)
![Strict TypeScript Checked](https://badgen.net/badge/TS/Strict)
[![Lint](https://github.com/kikeonline/tina-next-js/actions/workflows/lint.yml/badge.svg?branch=main)](https://github.com/kikeonline/tina-next-js/actions/workflows/lint.yml)
[![Build](https://github.com/kikeonline/tina-next-js/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/kikeonline/tina-next-js/actions/workflows/build.yml)

# Next.js + TinaCMS + StrapiCMS

## Features
- 🔥 Next.js
- 🦙 Tina CMS
- 🗄 Strapi CMS
- 🛂 Strict TypeScript
- ⚛️ GraphQL
- 📚 Storybook JS
- 🎨 Tailwind CSS
- 💅🏼 PostCSS Autoprefixer
- 🚨 ESLint & Type-Check
- 🐶 Husky
- 🤖 SEO metadata and OpenGraph tags
- 🛠 Prettier

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

- Testing with Jest & React testing library
- Add github actions for linting and build
- Update usePlugin(form) on each blog post
- Fix date | Shows wrong date when date picker updates
- Manage About Us Page content in Strapi for example purposes


## Dcumentation used to build this boilerplate
- https://tina.io/guides/#nextjs
- https://medium.com/@gogl.alex/how-to-set-up-typescript-eslint-prettier-for-next-gatsby-c5330b4a9b7a
- https://eslint.org/docs/user-guide/command-line-interface
- https://dev.to/risafj/how-to-set-up-eslint-with-standardjs-for-a-new-react-native-typescript-project-ebl
- https://nebulab.com/blog/nextjs-tailwind-storybook
- https://github.com/tailwindlabs/tailwindcss/discussions/2929
- https://github.com/vercel/next.js/blob/canary/examples/with-typescript-eslint-jest/package.json
