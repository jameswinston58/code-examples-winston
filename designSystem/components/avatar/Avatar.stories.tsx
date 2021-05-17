import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Avatar as AvatarComponent, AvatarProps } from './Avatar'

export default {
  component: AvatarComponent,
  title: 'Components/Avatar'
} as Meta

const Template: Story<AvatarProps> = (args) => <AvatarComponent {...args} />

export const Avatar = Template.bind({})
Avatar.args = {
  initials: 'JM'
}
