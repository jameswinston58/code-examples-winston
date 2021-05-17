import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { BigScore as BigScoreComponent, BigScoreProps } from './BigScore'

export default {
  component: BigScoreComponent,
  title: 'Patient Information/Big Score'
} as Meta

const Template: Story<BigScoreProps> = (args) => <BigScoreComponent {...args} />

export const BigScore = Template.bind({})
BigScore.args = {
  score: 88,
  denominator: 100
}

export const BigScoreNoDenom = Template.bind({})
BigScoreNoDenom.args = {
  score: 88
}
