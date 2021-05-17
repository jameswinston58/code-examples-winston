import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Stack as StackComponent, StackProps } from './Stack'

export default {
  component: StackComponent,
  title: 'Layout/Stack'
} as Meta

const Template: Story<StackProps> = (args) =>
  <>
    <h2>Default</h2>
    <div style={{ border: '2px solid red' }}>
      <StackComponent {...args}>
        <StackComponent.Item>One</StackComponent.Item>
        <StackComponent.Item>Two</StackComponent.Item>
        <StackComponent.Item>Three</StackComponent.Item>
      </StackComponent>
    </div>
  </>

export const Stack = Template.bind({})
Stack.args = {
  gap: 3
}
