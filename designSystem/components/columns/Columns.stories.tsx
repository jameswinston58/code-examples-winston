import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Columns } from './Columns'
import { Box } from '../box/Box.stories'

export default {
  component: Columns,
  title: 'Layout/Columns'
} as Meta

const Template: React.FC = ({ children, ...args }) => (
  <div style={{ width: '600px', margin: '0 auto' }}>
    <Columns {...args}>
      {children}
    </Columns>
  </div>
)

export const MultiLine = Template.bind({})
MultiLine.args = {
  isMultiline: true,
  className: 'column-class-name',
  // isVCentered: true,
  children: (
    <>
      {[...Array(10)].map((_, i) => (
        <Columns.Column width={6} className='columnNameHere' id={i.toString()} key={i}>
          <Box bg='brand.primary' p={1} color='white'>
            Lorem Ipsum Dolor Sit.
          </Box>
        </Columns.Column>
      ))}
    </>
  )
}

export const ChangeGutter = Template.bind({})
ChangeGutter.args = {
  isMultiline: true,
  gutter: 5,
  children: (
    <>
      {[...Array(10)].map((_, i) => (
        <Columns.Column width={6} key={i}>
          <Box bg='brand.primary' p={1} color='white'>
            Lorem Ipsum Dolor Sit.
          </Box>
        </Columns.Column>
      ))}
    </>
  )
}

export const ResponsiveGutter = Template.bind({})
ResponsiveGutter.args = {
  isMultiline: true,
  gutter: [2, 5, 0],
  children: (
    <>
      {[...Array(10)].map((_, i) => (
        <Columns.Column width={6} key={i}>
          <Box bg='brand.primary' p={1} color='white'>
            Lorem Ipsum Dolor Sit.
          </Box>
        </Columns.Column>
      ))}
    </>
  )
}

export const HorizontalCentered = Template.bind({})
HorizontalCentered.args = {
  isCentered: true,
  children: (
    <Columns.Column width={6}>
      <Box bg='brand.primary' p={1} color='white'>
        Lorem Ipsum Dolor Sit.
      </Box>
    </Columns.Column>
  )
}

export const VerticallyCentered = Template.bind({})
VerticallyCentered.args = {
  isVCentered: true,
  children: (
    <>
      <Columns.Column width={4}>
        <Box bg='brand.primary' p={1} color='white'>
          Lorem Ipsum Dolor Sit.
        </Box>
      </Columns.Column>
      <Columns.Column width={8}>
        <Box bg='brand.primary' p={1} color='white'>
          Lorem Ipsum Dolor Siaget. Lorem Ipsum Dolor Sigaegt. Lorem Ipsum Dolor Sit. Lorem Ipsum Dolor Sit. Lorem Ipsum Dolor Sit. Lorem Ipsum Dolor Sit. Lorem Ipsum Dolor Sit. Lorem Ipsum Dolor Sit. Lorem Ipsum Dolor Sit.
        </Box>
      </Columns.Column>
    </>
  )
}

export const NestingColumns = Template.bind({})
NestingColumns.args = {
  isVCentered: true,
  children: (
    <>
      <Columns.Column width={6}>
        <Columns isMultiline>
          <Columns.Column width={6}>
            Ok Now.
          </Columns.Column>
          <Columns.Column width={6}>
            Ok Now.
          </Columns.Column>
          <Columns.Column width={6}>
            Ok Now.
          </Columns.Column>
          <Columns.Column width={6}>
            Ok Now.
          </Columns.Column>
        </Columns>
      </Columns.Column>
      <Columns.Column width={6}>
        <Columns>
          <Columns.Column>
            Ok Now.
          </Columns.Column>
          <Columns.Column>
            Ok Now.
          </Columns.Column>
        </Columns>
      </Columns.Column>
    </>
  )
}
