import React, { ComponentProps } from 'react'
import { Story } from '@storybook/react'
import Footer from './footer'

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Footer',
  component: Footer
}

// 👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof Footer>> = (args) => <Footer {...args} />

export const NormalView = Template.bind({})
NormalView.args = {
  /* 👇 The args you need here will depend on your component */
}
