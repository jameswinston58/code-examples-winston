import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Indicator, IndicatorProps } from './Indicator'

export default {
  component: Indicator,
  title: 'Components/Indicator'
} as Meta

const Template: Story<IndicatorProps> = (args) => (
  <Indicator {...args} />
)

export const IndicatorStory = Template.bind({})
IndicatorStory.args = {
  number: 2
}
