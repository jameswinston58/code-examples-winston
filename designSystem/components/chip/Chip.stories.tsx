import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Chip, ChipGroup } from './Chip'
export default {
  component: Chip,
  title: 'Components/Chip'
} as Meta

const Template: Story = (args) => (
  <Chip {...args} />
)

const GroupTemplate: Story = (args) => (
  <ChipGroup>
    <Chip {...args} />
    <Chip {...args} />
    <Chip {...args} />
  </ChipGroup>
)

export const DefaultChip = Template.bind({})
DefaultChip.args = {
  children: 'Janeway'
}

export const HideDeleteButton = Template.bind({})
HideDeleteButton.args = {
  children: 'Picard',
  hideDelete: true
}

export const Group = GroupTemplate.bind({})
Group.args = {
  children: 'Chip Label'
}
