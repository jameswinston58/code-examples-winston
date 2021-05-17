import React from 'react'
import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Button, ButtonProps } from './Button'

export default {
  component: Button,
  title: 'Components/Button'
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const DefaultButton = Template.bind({})
DefaultButton.args = {
  children: 'Default Flat Button',
  color: 'default', // inherits from the theme file
  variant: 'flat', // only builing flat and outline right now
  // size: 'normal', //not building right now
  disabled: false,
  fullwidth: false,
  selected: false,
  isHeavy: false,
  className: '',
  id: '',
  onClick: action('button_clicked')
}

export const FlatButton = Template.bind({})
FlatButton.args = {
  children: 'Flat Button',
  color: 'primary', // inherits from the theme file
  variant: 'flat', // only builing flat and outline right now
  // size: 'normal', //not building right now
  disabled: false,
  fullwidth: false,
  selected: false,
  isHeavy: false,
  className: '',
  id: '',
  onClick: action('button_clicked')
}

export const OutlineButton = Template.bind({})
OutlineButton.args = {
  children: 'Outline Button',
  // color: "default", //inherits from the theme file
  variant: 'outline', // only builing flat and outline right now
  // size: 'normal', //not building right now
  disabled: false,
  fullwidth: false,
  selected: false,
  isHeavy: false,
  className: '',
  id: '',
  onClick: action('button_clicked')
}

export const TextButton = Template.bind({})
TextButton.args = {
  children: 'Text Button',
  // color: "primary", //inherits from the theme file
  variant: 'text', // only builing flat and outline right now
  // size: 'normal', //not building right now
  disabled: false,
  fullwidth: false,
  selected: false,
  isHeavy: false,
  className: '',
  id: '',
  onClick: action('button_clicked')
}

export const GhostButton = Template.bind({})
GhostButton.args = {
  children: 'Ghost Button',
  // color: "primary", //inherits from the theme file
  variant: 'ghost', // only builing flat and outline right now
  // size: 'normal', //not building right now
  disabled: false,
  fullwidth: false,
  selected: false,
  isHeavy: false,
  className: '',
  id: '',
  color: 'default',
  onClick: action('button_clicked')
}
