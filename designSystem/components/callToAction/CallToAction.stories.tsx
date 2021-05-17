import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { CallToAction as CallToActionComponent, CallToActionProps } from './CallToAction'

export default {
  component: CallToActionComponent,
  title: 'Components/Call To Action'
} as Meta

const Template: Story<CallToActionProps> = (args) => (
  <div style={{ width: '400px' }}>
    <CallToActionComponent {...args} />
  </div>
)

export const CallToActionDefault = Template.bind({})
CallToActionDefault.args = {
  title: "I'm a callout.",
  subTitle: 'Some more information and stuff. And a little more text so that you can see this thing wrapping and some line-height.',
  illustration: 'horizontalCharts',
  ctaLabel: 'Enroll patient in a PatientIQ project',
  onClick: () => console.log('Action Clicked')
}

export const CallToActionExternalLink = Template.bind({})
CallToActionExternalLink.args = {
  title: "I'm a callout.",
  subTitle: 'Some more information and stuff. And a little more text so that you can see this thing wrapping and some line-height.',
  illustration: 'lockedCharts',
  ctaType: 'link',
  ctaLink: 'https://www.google.com',
  ctaLabel: 'Enroll patient in a PatientIQ project'
}

export const CallToActionEmailLink = Template.bind({})
CallToActionEmailLink.args = {
  title: "I'm a callout.",
  subTitle: 'Some more information and stuff. And a little more text so that you can see this thing wrapping and some line-height.',
  illustration: 'horizontalCharts',
  ctaType: 'email',
  ctaLabel: 'Have some questions do this: '
}
