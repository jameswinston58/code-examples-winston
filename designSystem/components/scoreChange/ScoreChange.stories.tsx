import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { ScoreChange, ScoreChangeProps } from './ScoreChange'

export default {
  component: ScoreChange,
  title: 'Patient Information/Score Change'
} as Meta

const Template: Story<ScoreChangeProps> = (args) => <ScoreChange {...args} />

export const PositiveScoreChange = Template.bind({})
PositiveScoreChange.args = {
  type: 'positive',
  percentage: -39,
  label: 'vs PreOp'
}

export const NegativeScoreChange = Template.bind({})
NegativeScoreChange.args = {
  type: 'negative',
  percentage: 39,
  label: 'vs PreOp'
}

export const NeutralScoreChange = Template.bind({})
NeutralScoreChange.args = {
  type: 'neutral',
  percentage: 0,
  label: 'vs PreOp'
}
