import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Icon as IconComponent, IconProps } from './Icon'

export default {
  component: IconComponent,
  title: 'Components/Icon'
} as Meta

const Template: Story<IconProps> = (args) => <IconComponent {...args} />

export const BaseIcon = Template.bind({})
BaseIcon.args = {
  name: 'launch'
}

export const SizedIcon = Template.bind({})
SizedIcon.args = {
  name: 'launch',
  size: 2
}

export const ErrorIcon = Template.bind({})
ErrorIcon.args = {
  name: 'circleExclamationPoint'
}
