import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Box as PlainBox } from './index'
import { Text } from '../text'
export default {
  component: PlainBox,
  title: 'Layout/Box'
} as Meta

// const Template: Story<ButtonProps> = (args) => <Button {...args} />;
const Template: Story = (args) => <PlainBox {...args} />

export const Box = Template.bind({})
Box.args = {
  children: (
    <>
      <Text as='p' color='white'>This box has black ground, a red border, white text, 6rem of margin top and 4rems of padding.</Text>
      <Text as='p' color='white'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Text>
    </>
  ),
  bg: 'black',
  color: 'white',
  p: '4rem',
  mt: '6rem'
}
