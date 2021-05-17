import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { BoxProps } from '../box'
import sx, { SxProp } from '../sx'
import { SpaceProps, PositionProps } from 'styled-system'
import { Text } from '../text'
import { Level } from '../level'
import { Label } from '../label'
import { format } from 'date-fns'
import { Icon } from '../icon'
import { BigScore, BigScoreProps } from '../bigScore'
import { Truncate, PrimitiveTruncateMarkUp } from '../truncate'
import { ScoreLayout } from '../scoreLayout'
import { ScoreChange, ScoreChangeProps } from '../scoreChange'
import { CommonProps } from '../common'

export interface UnassociatedScoreInfoSummaryProps
  extends BigScoreProps,
    BoxProps,
    SpaceProps,
    PositionProps,
    CommonProps,
    SxProp {
  date?: Date;
  project?: ReactNode | string;
  label?: string;
  title?: string;
  fromPreviousChange?: ScoreChangeProps | null;
}

const StyledScoreInfoSummary = styled.div<UnassociatedScoreInfoSummaryProps>`
  ${sx}
`

const textStyles = {
  fontSize: 2,
  fontWeight: 'normal',
  color: 'text.light'
}

export const UnassociatedScoreInfoSummary: React.FC<UnassociatedScoreInfoSummaryProps> = ({
  title,
  date,
  label,
  score,
  denominator,
  project,
  fromPreviousChange,
  className,
  id
}) => {
  // build layout components
  const layoutSections: Partial<{
    topLeft: React.ReactNode,
    bottomRight: React.ReactNode,
    topRight: React.ReactNode
  }> = {}

  // test for date
  if (date) {
    layoutSections.topRight = (
      <Text as='div' width='100%' {...textStyles}>
        <Icon name='calendarToday' mr='4px' color='text.ultraLight' />
        {format(date, 'M/d/yyyy')}
      </Text>
    )
  }

  // test for project of string type
  if (project && typeof project === 'string') {
    layoutSections.bottomRight = (
      <Text as='div' {...textStyles} width='100%'>
        <Truncate
          text={
            <>
              <PrimitiveTruncateMarkUp.Atom>
                <Icon name='scatterPlot' mr='4px' color='text.ultraLight' />
              </PrimitiveTruncateMarkUp.Atom>
              {project}
            </>
          }
          modifier='...'
          truncateType='line'
        />
      </Text>
    )
  }

  // test for project of React type
  if (project && React.isValidElement(project)) {
    // ensures the node is wrapped in a div needed for position/layout styles
    layoutSections.bottomRight = (
      <Text as='div' {...textStyles}>
        <Icon name='scatterPlot' mr='4px' color='text.ultraLight' /> {project}
      </Text>
    )
  }

  // right now we only have one score type so it goes to the
  // top right quadrant. if we have one below this, we'll talk about using
  if (fromPreviousChange) {
    if (
      fromPreviousChange.type &&
      fromPreviousChange.percentage !== null
    ) {
      layoutSections.topLeft = (
        <ScoreChange
          type={fromPreviousChange.type}
          label='vs previous'
          percentage={fromPreviousChange.percentage}
          {...textStyles}
        />
      )
    }
  }

  return (
    <>
      <StyledScoreInfoSummary className={className} id={id}>
        <Level mb={3}>
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
        <ScoreLayout
          score={score}
          denominator={denominator}
          {...layoutSections}
        />
      </StyledScoreInfoSummary>
    </>
  )
}

UnassociatedScoreInfoSummary.displayName = 'UnassociatedScoreInfoSummary'
UnassociatedScoreInfoSummary.defaultProps = {
  title: '',
  date: new Date(),
  label: '',
  project: '',
  // scoreType: "associated",
  ...BigScore.defaultProps,
  fromPreviousChange: {}
}
