// Import the global style enabling tailwind classes
// Hierarchy https://github.com/storybookjs/storybook/issues/6327
import '../src/styles/global.css'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: [
        'StyleGuide', ['Introduction', 'Colors', 'Typography'],
        'Components', ['Footer']
    
    ],
    },
  },
}