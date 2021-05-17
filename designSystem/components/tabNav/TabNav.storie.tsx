import React, { FC } from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { TabNav, TabNavProps } from './TabNav'

export default {
  component: TabNav,
  title: 'Components/TabNav'
} as Meta

const Template: Story<TabNavProps> = (args) => <TabNav {...args} />

const TabContent: FC = ({ children }) => (
  <div
    style={{
      width: '400px',
      height: '300px',
      border: '1px solid black'
    }}
  >
    {children}
  </div>
)

export const StandardTabNav = Template.bind({})
StandardTabNav.args = {
  tabItems: [
    { label: 'Tab 1', content: <TabContent>Tab 1</TabContent> },
    { label: 'Tab 2', content: <TabContent>Tab 2</TabContent> },
    { label: 'Tab 3', content: <TabContent>Tab 3</TabContent> }
  ]
}
