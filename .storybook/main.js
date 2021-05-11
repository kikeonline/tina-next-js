module.exports = {
  "stories": [
    "../src/components/styleguide/*.stories.mdx",
    "../src/components/styleguide/*.stories.@(js|jsx|ts|tsx)",
    "../src/components/*.stories.mdx",
    "../src/components/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    '@storybook/addon-postcss'
  ],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
    }
  },
  reactOptions: {
    fastRefresh: true,
  }
}