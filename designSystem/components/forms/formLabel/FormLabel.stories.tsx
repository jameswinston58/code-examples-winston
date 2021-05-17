import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { FormLabel as FormLabelComponent, FormLabelProps } from './FormLabel'

export default {
  component: FormLabelComponent,
  title: 'Forms/Form Label'
} as Meta

const Template: Story<FormLabelProps> = (args) => <FormLabelComponent {...args} />

export const FormLabel = Template.bind({})
FormLabel.args = {
  children: 'This is a form label.'
}
