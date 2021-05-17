import React from 'react'
import styled from 'styled-components'
import {
  space,
  SpaceProps,
  PositionProps,
  position,
  typography,
  TypographyProps,
  color,
  ColorProps
} from 'styled-system'
import { Icon } from '../icon'
import { Text } from '../text'

export interface ScoreChangeProps {
  type?: string; // 'positive' | 'negative' | 'neutral'; no reason this union should not work in our storybook. but .... here we are!
  label?: string;
  percentage?: number;
}

export interface ScoreChangeComponentProps extends ScoreChangeProps, SpaceProps, PositionProps, ColorProps, TypographyProps {}

const colorMap = {
  positive: 'semantic.success',
  negative: 'semantic.error',
  neutral: 'text.base'
}

const StyledScoreChange = styled.span<ScoreChangeComponentProps>`
  font-size: ${({ theme }) => theme.fontSizes[2]}px;
  ${space}
  ${position}
  ${color}
  ${typography}
`

export const ScoreChange: React.FC<ScoreChangeComponentProps> = ({
  type,
  label,
  percentage,
  ...rest
}) => {
  const color = colorMap[type] ? colorMap[type] : colorMap.neutral

  const absPercentage = Math.abs(percentage)

  let arrowIcon = 'arrowRight'

  // if positive
  if (Math.sign(percentage) === 1) {
    arrowIcon = 'arrowUp'
  }

  // if negative
  if (Math.sign(percentage) === -1) {
    arrowIcon = 'arrowDown'
  }

  // if 0
  if (Math.sign(percentage) === 0) {
    arrowIcon = 'arrowRight'
  }

  return (
    // there is a bug with styled system. looking at possible fixes. but this is fine for now.
    // https://stackoverflow.com/questions/53711454/styled-system-props-typing-with-typescript
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <StyledScoreChange color={(rest.color as any)} fontSize={rest.fontSize}>
      <Text color={color} fontSize={rest.fontSize}>
        <Icon name={arrowIcon} mr='2px' />
        {absPercentage}%{' '}
      </Text>
      <Text fontSize={rest.fontSize}>
        {label}
      </Text>
    </StyledScoreChange>
  )
}

ScoreChange.displayName = 'ScoreChange'
ScoreChange.defaultProps = {
  type: 'neutral',
  label: '',
  percentage: 0
}
