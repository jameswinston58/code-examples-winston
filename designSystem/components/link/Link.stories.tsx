import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Link as LinkComponent, StyledLinkProps } from './Link'

export default {
  component: LinkComponent,
  title: 'Components/Link'
} as Meta

const Template: Story<StyledLinkProps> = (args) => <LinkComponent {...args} />

export const BaseLink = Template.bind({})
BaseLink.args = {
  children: 'This is a Link!',
  href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
}

export const StyledLink = Template.bind({})
StyledLink.args = {
  children: 'This link is giant and is underline.',
  fontSize: 5,
  underline: true,
  newWindow: false,
  href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
}

export const MutedLink = Template.bind({})
MutedLink.args = {
  children: 'This link is giant and is underline.',
  underline: false,
  newWindow: false,
  muted: true,
  href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
}

export const AsButton = Template.bind({})
AsButton.args = {
  children: 'This link is giant and is underline.',
  as: 'button',
  href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
}

export const NewWindow = Template.bind({})
NewWindow.args = {
  children: 'This opens in a new window',
  newWindow: true,
  href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
}
