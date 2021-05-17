import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Accordion as AccordionComponent, AccordionProps } from './Accordion'
import { InterventionInfoSummary } from '../interventionInfoSummary'
import { InterventionInfoSummary as InfoSummaryStory } from '../interventionInfoSummary/InterventionInfoSummary.stories'
import { ScoreInfoSummary as ScoreSummaryStory } from '../scoreInfoSummary/ScoreInfoSummary.stories'
import { action } from '@storybook/addon-actions'
import { ScoreInfoSummary } from '../scoreInfoSummary'
import { Stack } from '../stack'

export default {
  component: AccordionComponent,
  title: 'Components/Accordion'
} as Meta

const Template: Story<AccordionProps> = (args) => (
  <div style={{ maxWidth: '480px' }}>
    <AccordionComponent {...args}>
      <AccordionComponent.Header>
        <InterventionInfoSummary {...InfoSummaryStory.args} />
      </AccordionComponent.Header>
      <AccordionComponent.Content>
        <Stack gap={3}>
          <Stack.Item>
            <AccordionComponent>
              <AccordionComponent.Header>
                <ScoreInfoSummary {...ScoreSummaryStory.args} />
              </AccordionComponent.Header>
              <AccordionComponent.Content>
                A Little Content
              </AccordionComponent.Content>
            </AccordionComponent>
          </Stack.Item>
          <Stack.Item>
            <AccordionComponent>
              <AccordionComponent.Header>
                <ScoreInfoSummary {...ScoreSummaryStory.args} />
              </AccordionComponent.Header>
              <AccordionComponent.Content>
                A Little Content
              </AccordionComponent.Content>
            </AccordionComponent>
          </Stack.Item>
        </Stack>
      </AccordionComponent.Content>
    </AccordionComponent>
  </div>
)

export const Accordion = Template.bind({})
Accordion.args = {
  onClick: action('Accordion Clicked.'),
  onOpen: action('Accordion Opened.'),
  onClose: action('Accordion Closed.')
}

export const ControlledAccordion = Template.bind({})
ControlledAccordion.args = {
  open: true,
  onClick: action('Accordion Clicked.'),
  onOpen: action('Accordion Opened.'),
  onClose: action('Accordion Closed.')
}

export const DefaultOpenAccordion = Template.bind({})
DefaultOpenAccordion.args = {
  defaultOpen: true,
  onClick: action('Accordion Clicked.'),
  onOpen: action('Accordion Opened.'),
  onClose: action('Accordion Closed.')
}

export const OnClickAccordion = Template.bind({})
OnClickAccordion.args = {
  onClick: action('Accordion Clicked.'),
  onOpen: action('Accordion Opened.'),
  onClose: action('Accordion Closed.')
}

const NoContentTemplate: Story<AccordionProps> = (args) => (
  <div style={{ maxWidth: '480px' }}>
    <AccordionComponent {...args}>
      <AccordionComponent.Header>
        <InterventionInfoSummary {...InfoSummaryStory.args} />
      </AccordionComponent.Header>
    </AccordionComponent>
  </div>
)

export const NoContentAccordion = NoContentTemplate.bind({})
NoContentAccordion.args = {
  onClick: action('Accordion Clicked.'),
  onOpen: action('Accordion Opened.'),
  onClose: action('Accordion Closed.')
}
