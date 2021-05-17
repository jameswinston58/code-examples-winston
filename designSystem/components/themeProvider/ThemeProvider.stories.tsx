import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Box as BoxComponent, BoxProps } from '../box'
import { Text } from '../text'
import {
  ThemeProvider as ThemeComponent,
  ThemeProviderProps
} from './ThemeProvider'

export default {
  component: ThemeComponent,
  title: 'Getting Started/Theme Provider'
} as Meta

const Template: Story<BoxProps & ThemeProviderProps> = (args) => (
  <ThemeComponent {...args}>
    <BoxComponent bg='black' p={4}>
      <Text color='white'>This text should have padding of "4", black background and white text.</Text>
    </BoxComponent>
  </ThemeComponent>
)

export const ThemeProvider = Template.bind({})
ThemeProvider.args = {
  theme: 'light'
}
