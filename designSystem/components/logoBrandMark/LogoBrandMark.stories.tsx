import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { LogoMark as LogoComponent, LogoBrandMarkProps } from './LogoBrandMark'

export default {
  component: LogoComponent,
  title: 'Components/Mini Brandmark Logo'
} as Meta

const Template: Story<LogoBrandMarkProps> = (args) => (
  <LogoComponent {...args} />
)

export const MiniLogo = Template.bind({})
MiniLogo.args = {
  width: 25
}
