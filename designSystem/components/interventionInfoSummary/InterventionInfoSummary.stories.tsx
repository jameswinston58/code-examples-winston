import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { InterventionInfoSummary as InfoComponent, InterventionInfoSummaryProps } from './InterventionInfoSummary'

export default {
  component: InfoComponent,
  title: 'Patient Information/Intervention Info Summary'
} as Meta

const Template: Story<InterventionInfoSummaryProps> = (args) =>
  <div style={{ maxWidth: '400px' }}>
    <InfoComponent {...args} />
  </div>
export const InterventionInfoSummary = Template.bind({})
InterventionInfoSummary.args = {
  title: 'Total Hip Arthroplasty And Lorem Ipsum Dolor Sit Em Akalor Vulcan',
  subTitle: 'Left',
  date: new Date(),
  physician: 'Stephen P. Haggerty',
  label: 'Intervention'
}
