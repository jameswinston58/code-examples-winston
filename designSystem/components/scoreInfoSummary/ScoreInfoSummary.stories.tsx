import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import {
  ScoreInfoSummary as ScoreComponent,
  ScoreInfoSummaryProps
} from './ScoreInfoSummary'

export default {
  component: ScoreComponent,
  title: 'Patient Information/Score Info Summary'
} as Meta

const Template: Story<ScoreInfoSummaryProps> = (args) => (
  <div style={{ maxWidth: '400px' }}>
    <ScoreComponent preOpChange={{}} {...args} />
  </div>
)
export const ScoreInfoSummary = Template.bind({})
ScoreInfoSummary.args = {
  title: 'PROMIS Pain Score',
  date: new Date(),
  score: 88, // Grab these from the big score component
  denominator: 100, // Grab these from the big score component
  label: 'Score',
  timePoint: '2YPO',
  preOpChange: {
    percentage: 22,
    type: 'negative'
  },
  allPatientsChange: {
    percentage: 89,
    type: 'positive'
  }
}

export const ScoreInfoSummaryMissingPreOp = Template.bind({})
ScoreInfoSummaryMissingPreOp.args = {
  title: 'PROMIS Pain Score',
  date: new Date(),
  score: 88, // Grab these from the big score component
  denominator: 100, // Grab these from the big score component
  label: 'Score',
  timePoint: '2YPO',
  preOpChange: null,
  allPatientsChange: {
    percentage: 89,
    type: 'positive'
  }
}

export const ScoreInfoSummaryMissingAllPatients = Template.bind({})
ScoreInfoSummaryMissingAllPatients.args = {
  title: 'PROMIS Pain Score',
  date: new Date(),
  score: 88, // Grab these from the big score component
  denominator: 100, // Grab these from the big score component
  label: 'Score',
  timePoint: '2YPO',
  preOpChange: {
    percentage: 33,
    type: 'negative'
  }
}

export const ScoreInfoSummaryMissingPreOpAndMissingAllPatients = Template.bind({})
ScoreInfoSummaryMissingPreOpAndMissingAllPatients.args = {
  title: 'PROMIS Pain Score',
  date: new Date(),
  score: 88, // Grab these from the big score component
  denominator: 100, // Grab these from the big score component
  label: 'Score',
  timePoint: '2YPO',
  preOpChange: null,
  allPatientsChange: {
    percentage: null,
    type: 'positive'
  }
}
