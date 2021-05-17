import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { UnassociatedScoreInfoSummary as UnAssociatedScoreComponent, UnassociatedScoreInfoSummaryProps } from './UnassociatedScoreInfoSummary'
import { Text } from '../text'

export default {
  component: UnAssociatedScoreComponent,
  title: 'Patient Information/Unassociated Score Info Summary'
} as Meta

const Template: Story<UnassociatedScoreInfoSummaryProps> = (args) =>
  <div style={{ maxWidth: '400px' }}>
    <UnAssociatedScoreComponent {...args} />
  </div>
export const UnassociatedScoreInfo = Template.bind({})
UnassociatedScoreInfo.args = {
  title: 'Patient Satisfaction Survey',
  date: new Date(),
  score: 88, // Grab these from the big score component
  denominator: 100, // Grab these from the big score component
  label: 'Score',
  project: 'Non-Intervention Study and Some Other Stuff',
  fromPreviousChange: {
    percentage: 45,
    type: 'negative'
  }
}

export const UnassociatedScoreInfoWProjectAsComponent = Template.bind({})
UnassociatedScoreInfoWProjectAsComponent.args = {
  title: 'Patient Satisfaction Survey',
  date: new Date(),
  score: 88, // Grab these from the big score component
  denominator: 100, // Grab these from the big score component
  label: 'Score',
  project: <Text color='semantic.success'>Some Text.</Text>
}
