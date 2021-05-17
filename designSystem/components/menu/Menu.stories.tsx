import React, { FC, useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Menu } from './Menu'
import { InterventionInfoSummary as InfoComponent } from '../interventionInfoSummary'
import { Icon } from '../icon'
import { Text } from '../text'
export default {
  component: Menu,
  title: 'Components/Menu',
  argTypes: { onChange: { action: 'clicked' } }
} as Meta

// Make sure you keep your components consistent! Different components have different defaults!!!!!!!

const fontSize = 2

export const DefaultTrigger: React.FC = () => {
  const [selected, setSelected] = useState({ name: 'All Fake Operations' })
  const handleChange = (data): void => setSelected(data)

  return (
    <div style={{ textAlign: 'right' }}>
      <Menu onChange={handleChange} triggerLabel={selected.name} ariaLabel='Default Trigger'>
        <Menu.Item data={{ name: 'All Fake Operations' }} key='0'>
          <Text fontSize={fontSize}>All Interventions</Text>
        </Menu.Item>
        <Menu.Item data={{ name: 'Tribble Removal' }} disabled key='1'>
          <InfoComponent
            fontSize={fontSize}
            title='Tribble Removal'
            subTitle='Full Ship'
            date={new Date()}
            physician='Leonard McCoy'
          />
        </Menu.Item>
        <Menu.Item data={{ name: 'Full Rengeration' }} key='2'>
          <InfoComponent
            title='Full Rengeration'
            subTitle='Tardis'
            date={new Date()}
            physician='The Doctor'
          />
        </Menu.Item>
        <Menu.Item data={{ name: "Full 80's Jam Session" }} key='3'>
          <InfoComponent
            title="Full 80's Jam Session"
            subTitle='Shade'
            date={new Date()}
            physician='Dr. Feelgood'
          />
        </Menu.Item>
      </Menu>
    </div>
  )
}

export const CTATrigger: React.FC = () => {
  const [selected, setSelected] = useState({ name: 'Select Happiness' })
  const handleChange = (data) => setSelected(data)

  return (
    <>
      <Menu
        onChange={handleChange}
        triggerLabel={selected.name}
        triggerType='cta'
        ariaLabel='CTA Trigger'
      >
        <Menu.Item data={{ name: "Brad's Skis" }} key='1'>
          Brad's Skis
        </Menu.Item>
        <Menu.Item data={{ name: "Paul's 3D Printer. This is really long. Like really long. Really long." }} key='2'>
          Paul's 3D Printer. This is really long. Like really long. Really long.
        </Menu.Item>
        <Menu.Item data={{ name: "Yuri's Wife's Cat (That Guy)" }} key='3'>
          Yuri's Wife's Cat (That Guy)
        </Menu.Item>
        <Menu.Item data={{ name: "Joe's Disdain for Clubhouse" }} key='4'>
          Joe's Disdain for Clubhouse
        </Menu.Item>
      </Menu>
    </>
  )
}

export const MoreTrigger: FC = () => (
  <Menu triggerType='more' ariaLabel='More Links'>
    <Menu.Item key={1} href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>
      Item One
      <Icon ml={2} name='launch' />
    </Menu.Item>
    <Menu.Item
      key={2}
      href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      target='_blank'
    >
      Level Two
    </Menu.Item>
    <Menu.Item key={3} href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>
      Item Three
    </Menu.Item>
  </Menu>
)
