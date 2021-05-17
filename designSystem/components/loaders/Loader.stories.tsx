import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Loader, LoaderProps } from './Loader'
import { BigText } from '../../ie11Examples/BigText'

export default {
  component: Loader,
  title: 'Components/Loaders'
} as Meta

const BaseTemplate: Story<LoaderProps> = (args) => <div style={{ position: 'relative' }}><Loader {...args} /></div>

const Template: Story<LoaderProps> = (args) => <div style={{ position: 'relative' }}><BigText /><Loader {...args} /></div>

export const BaseLoader = BaseTemplate.bind({})
BaseLoader.args = {
  text: 'Loading...'
}

export const WithOverlay = Template.bind({})
WithOverlay.args = {
  overlay: true
}

export const ViewportOverlay = Template.bind({})
ViewportOverlay.args = {
  overlay: true,
  fixedToViewPort: true
}
