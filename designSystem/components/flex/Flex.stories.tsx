import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Box as PlainBox } from '../box'
import { Flex as PlainFlex } from './index'

export default {
  component: PlainFlex,
  title: 'Layout/Flex'
} as Meta

// const Template: Story<ButtonProps> = (args) => <Button {...args} />;
const Template: Story = () => (
  <PlainFlex flexWrap='wrap' mt={[0, 4]}>
    <PlainBox
      width={[1, 1 / 2]}
      p={3}
      pl={6}
      flex={1}
      color='white'
      bg='brand.primary'
    >
      Reflex
    </PlainBox>
    <PlainBox width={[1, 1 / 2]} p={3} bg='brand.secondary' color='white'>
      Box
    </PlainBox>
  </PlainFlex>
)

export const Flex = Template.bind({})
Flex.args = {}
