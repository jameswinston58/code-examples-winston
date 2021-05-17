import React from 'react'
import styled from 'styled-components'
import { Box, BoxProps } from '../box'
import sx, { SxProp } from '../sx'
import {
  space,
  SpaceProps,
  TypographyProps,
  typography,
  PositionProps,
  position
} from 'styled-system'
import { Icon } from '../icon'
import { Text } from '../text'
import { Level } from '../level'
import { Label } from '../label'
import { format } from 'date-fns'
import { Truncate, TruncateProps } from '../truncate'
import { CommonProps } from '../common'

export interface InterventionInfoSummaryProps
  extends BoxProps,
    TypographyProps,
    SpaceProps,
    PositionProps,
  SxProp,
  CommonProps{
  title?: string;
  subTitle?: string;
  date?: Date; // ;
  physician?: string;
  label?: string;
  truncateOptions?: TruncateProps;
}

const StyledInterventionInfoSummary = styled.span<InterventionInfoSummaryProps>`
  ${typography} //eventually this should be controlled more
  ${space}
  ${position}
  ${sx}
`

// TODO: This should be in a design token.
const fontSize = 2

export const InterventionInfoSummary: React.FC<InterventionInfoSummaryProps> = ({
  title,
  subTitle,
  date,
  physician,
  label,
  truncateOptions,
  className,
  id
}) => {
  return (
    <StyledInterventionInfoSummary className={className} id={id}>
      <Box mb={3}>
        <Level gap={4}>
          {title && (
            <Level.LeftItem>
              <Text color='text.base' as='span' fontSize={fontSize} lineHeight='.6'>
                <Truncate text={title} {...truncateOptions} />
              </Text>
            </Level.LeftItem>
          )}
          {label && (
            <Level.RightItem>
              <Label>{label}</Label>
            </Level.RightItem>
          )}
        </Level>
      </Box>
      <Level gap={2} hasDividers>
        <Level.Item>
          <Text fontSize={fontSize} color='text.light'>
            <Icon name='calendarToday' mr={1} />
            {date ? format(date, 'M/d/yyyy') : 'No Date'}
          </Text>
        </Level.Item>
        {subTitle && (
          <Level.Item>
            <Text fontSize={fontSize} color='text.light'>{subTitle}</Text>
          </Level.Item>
        )}
        {physician && (
          <Level.Item>
            <Text fontSize={fontSize} color='text.light'>{physician}</Text>
          </Level.Item>
        )}
      </Level>
    </StyledInterventionInfoSummary>
  )
}

InterventionInfoSummary.displayName = 'InterventionInfoSummary'
InterventionInfoSummary.defaultProps = {
  title: '',
  subTitle: '',
  date: new Date(),
  physician: '',
  label: '',
  truncateOptions: {
    truncateType: 'line',
    modifier: '...'
  }
}
