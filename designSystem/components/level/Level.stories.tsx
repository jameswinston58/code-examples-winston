import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Level as LevelComponent, LevelProps } from './Level'
import { Button } from '../button'
import { Callout } from '../callout'
export default {
  component: LevelComponent,
  title: 'Layout/Level'
} as Meta

const Template: Story<LevelProps> = (args) => (
  <>
    <Callout>
      <LevelComponent {...args} />
    </Callout>
  </>
)

export const AsItems = Template.bind({})
AsItems.args = {
  mb: 3,
  gap: 4,
  hasDividers: true,
  dividerSize: 2,
  children: (
    <>
      <LevelComponent.Item>One</LevelComponent.Item>
      <LevelComponent.Item>Two</LevelComponent.Item>
      <LevelComponent.Item>Three</LevelComponent.Item>
    </>
  )
}

export const AsSplitSections = Template.bind({})
AsSplitSections.args = {
  gap: 1,
  children: (
    <>
      <LevelComponent.LeftItem>Left Section</LevelComponent.LeftItem>
      <LevelComponent.RightItem>Right Section</LevelComponent.RightItem>
    </>
  )
}

export const NestingLevels = Template.bind({})
NestingLevels.args = {
  gap: 1,
  children: (
    <>
      <LevelComponent.LeftItem>
        <LevelComponent gap={1}>
          <LevelComponent.Item py={5}>
            <Button>Button</Button>
          </LevelComponent.Item>
          <LevelComponent.Item>Two</LevelComponent.Item>
          <LevelComponent.Item py={2}>Three</LevelComponent.Item>
        </LevelComponent>
      </LevelComponent.LeftItem>
      <LevelComponent.RightItem>
        {' '}
        <LevelComponent gap={1}>
          <LevelComponent.Item>One</LevelComponent.Item>
          <LevelComponent.Item>Two</LevelComponent.Item>
          <LevelComponent.Item>Three</LevelComponent.Item>
        </LevelComponent>
      </LevelComponent.RightItem>
    </>
  )
}

export const AsScrollingReel = Template.bind({})
AsScrollingReel.args = {
  gap: 1,
  reel: true,
  children: (
    <>
      <LevelComponent.Item>
        <Button>Button</Button>
      </LevelComponent.Item>
      <LevelComponent.Item>
        <Button>Button</Button>
      </LevelComponent.Item>
      <LevelComponent.Item>
        <Button>Button</Button>
      </LevelComponent.Item>
      <LevelComponent.Item>
        <Button>Button</Button>
      </LevelComponent.Item>
      <LevelComponent.Item>
        <Button>Button</Button>
      </LevelComponent.Item>
      <LevelComponent.Item>
        <Button>Button</Button>
      </LevelComponent.Item>
      <LevelComponent.Item>
        <Button>Button</Button>
      </LevelComponent.Item>
      <LevelComponent.Item>
        <Button>Button</Button>
      </LevelComponent.Item>
      <LevelComponent.Item>
        <Button>Button</Button>
      </LevelComponent.Item>
      <LevelComponent.Item>
        <Button>Button</Button>
      </LevelComponent.Item>
      <LevelComponent.Item>
        <Button>Button</Button>
      </LevelComponent.Item>
      <LevelComponent.Item>
        <Button>Button</Button>
      </LevelComponent.Item>
      <LevelComponent.Item>
        <Button>Button</Button>
      </LevelComponent.Item>
      <LevelComponent.Item>
        <Button>Button</Button>
      </LevelComponent.Item>
      <LevelComponent.Item>
        <Button>Button</Button>
      </LevelComponent.Item>
      <LevelComponent.Item>
        <Button>Button</Button>
      </LevelComponent.Item>
      <LevelComponent.Item>
        <Button>Button</Button>
      </LevelComponent.Item>
      <LevelComponent.Item>
        <Button>Button</Button>
      </LevelComponent.Item>
      <LevelComponent.Item>
        <Button>Button</Button>
      </LevelComponent.Item>
    </>
  )
}
