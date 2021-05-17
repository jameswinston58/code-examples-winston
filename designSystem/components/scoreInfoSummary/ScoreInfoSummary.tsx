import React from 'react'
import styled from 'styled-components'
import { BoxProps, Box } from '../box'
import sx, { SxProp } from '../sx'
import { space, SpaceProps, position, PositionProps } from 'styled-system'
import { Text } from '../text'
import { Level } from '../level'
import { Label } from '../label'
import { format } from 'date-fns'
import { Icon } from '../icon'
import { BigScore, BigScoreProps } from '../bigScore'
import { ScoreLayout } from '../scoreLayout'
import { ScoreChange, ScoreChangeProps } from '../scoreChange'
import { CommonProps } from '../common'

/*
TODO:
  - Fontsize should be in a design token and/or extracted theme file.
*/

export interface ScoreInfoSummaryProps
  extends BigScoreProps,
    BoxProps,
    SpaceProps,
    PositionProps,
    SxProp,
    CommonProps {
  date?: Date;
  timePoint?: string;
  label?: string;
  title?: string;
  preOpChange?: ScoreChangeProps | null; // this isn't autocompleting. Figure out why, later.
  allPatientsChange?: ScoreChangeProps | null; // this isn't autocompleting. Figure out why, later.
}

const StyledScoreInfoSummary = styled.div<ScoreInfoSummaryProps>`
  ${space}
  ${position}
  ${sx}
`

// TODO: This should be in a design token.
const textStyles = {
  fontSize: 2,
  fontWeight: 'normal',
  color: 'text.light'
}

export const ScoreInfoSummary: React.FC<ScoreInfoSummaryProps> = ({
  title,
  date,
  label,
  score,
  denominator,
  timePoint,
  preOpChange,
  allPatientsChange,
  ...rest
  // scoreType
}) => {
  const scoreLayout: Partial<{
    topLeft: React.ReactNode,
    bottomLeft: React.ReactNode,
    topRight: React.ReactNode,
    bottomRight: React.ReactNode
  }> = {}

  if (date) {
    scoreLayout.topRight = (
      <Text as='div' {...textStyles} width='100%'>
        <Icon name='calendarToday' color='text.ultraLight' /> {format(date, 'M/d/yyyy')}
      </Text>
    )
  }
  if (timePoint) {
    scoreLayout.bottomRight = (
      <Text as='div' {...textStyles} width='100%'>
        <Icon name='timeLapse' color='text.ultraLight' /> {timePoint}
      </Text>
    )
  }

  // we do this to switch on the layout below to make it not have
  // empty weirdness

  let preOpChangeComponent = null
  let allPatientsChangeComponent = null

  if (preOpChange) {
    if (preOpChange.type && preOpChange.percentage !== null) {
      preOpChangeComponent = (
        <ScoreChange
          type={preOpChange.type}
          label='vs PreOp'
          percentage={preOpChange.percentage}
          {...textStyles}
        />
      )
    }
  }

  if (allPatientsChange) {
    if (
      allPatientsChange.type &&
      allPatientsChange.percentage !== null
    ) {
      allPatientsChangeComponent = (
        <ScoreChange
          type={allPatientsChange.type}
          label='vs all patients'
          percentage={allPatientsChange.percentage}
          {...textStyles}
        />
      )
    }
  }

  // make the actual layout
  // if we have both
  if (allPatientsChangeComponent && preOpChangeComponent) {
    scoreLayout.topLeft = preOpChangeComponent
    scoreLayout.bottomLeft = allPatientsChangeComponent
  }
  // only preOp
  if (!allPatientsChangeComponent && preOpChangeComponent) {
    scoreLayout.topLeft = preOpChangeComponent
  }

  // only preOp
  if (allPatientsChangeComponent && !preOpChangeComponent) {
    scoreLayout.topLeft = allPatientsChangeComponent
  }

  return (
    <StyledScoreInfoSummary {...rest}>
      <Level>
        <Level.LeftItem>
          <Text fontSize={textStyles.fontSize} color='text.base'>
            {title}
          </Text>
        </Level.LeftItem>
        {label && (
          <Level.RightItem>
            <Label>{label}</Label>
          </Level.RightItem>
        )}
      </Level>
      <Box mt={2}>
        <ScoreLayout score={score} denominator={denominator} {...scoreLayout} />
      </Box>
    </StyledScoreInfoSummary>
  )
}

ScoreInfoSummary.displayName = 'ScoreInfoSummary'
ScoreInfoSummary.defaultProps = {
  title: '',
  date: new Date(),
  label: '',
  timePoint: '',
  ...BigScore.defaultProps,
  preOpChange: null, // we don't pull in default score change props here.
  allPatientsChange: null // we don't pull in default score change props here.
}
