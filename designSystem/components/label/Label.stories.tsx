import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Label as LabelComponent, LabelProps } from './Label'

export default {
  component: LabelComponent,
  title: 'Components/Label'
} as Meta

const Template: Story<LabelProps> = (args) => <LabelComponent {...args} />

export const Label = Template.bind({})
Label.args = {
  children: 'Score'
}

export const ColoredLabel = Template.bind({})
ColoredLabel.args = {
  children: 'Score',
  color: 'success'
}
