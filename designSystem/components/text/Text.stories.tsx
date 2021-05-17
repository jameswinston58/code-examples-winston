import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Text as TextComponent, TextProps } from './Text'

export default {
  component: TextComponent,
  title: 'Components/Text'
} as Meta

const Template: Story<TextProps> = (args) => <TextComponent {...args} />

export const BaseText = Template.bind({})
BaseText.args = {
  children: 'This is base text'
}

export const StyledText = Template.bind({})
StyledText.args = {
  children: 'This text is a giant H1 and uses the sementic.success color.',
  fontSize: 1,
  color: 'semantic.success',
  as: 'h1'
}
