import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { InfoPair as InfoPairComponent, InfoPairProps } from './InfoPair'

export default {
  component: InfoPairComponent,
  title: 'Patient Information/Info Pair'
} as Meta

const Template: Story<InfoPairProps> = (args) => <InfoPairComponent {...args} />

export const DefaultInfoPair = Template.bind({})
DefaultInfoPair.args = {
  label: 'MRN',
  gap: 1,
  value: '852965239'
}

export const VerticalInfoPair = Template.bind({})
VerticalInfoPair.args = {
  label: 'Project',
  gap: 1,
  value: 'Total Hip Surgeries',
  isVertical: true
}

export const NumericValueInfoPair = Template.bind({})
NumericValueInfoPair.args = {
  label: 'Project',
  gap: 1,
  value: 23
}
