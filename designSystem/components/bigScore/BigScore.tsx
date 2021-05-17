import React from 'react'
import styled from 'styled-components'
import { BoxProps } from '../box'
import { SxProp } from '../sx'
import {
  space,
  SpaceProps,
  TypographyProps,
  PositionProps,
  position,
  layout
} from 'styled-system'

export interface BigScoreProps
  extends BoxProps,
    TypographyProps,
    SpaceProps,
    PositionProps,
    SxProp {
  score?: number;
  denominator?: number | null;
  removeBox?: boolean;
}

const StyledBox = styled.div<BigScoreProps>`
  border: 1px solid ${({ theme }) => theme.colors.border.base};
  display: flex;
  border-radius: ${({ theme }) => theme.radiiDefault};
  text-align: center;
  width: 80px;
  background-color: ${({ theme }) => theme.colors.bg.secondaryUltraLight};
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  ${space}
  ${position}
  ${layout}
`

const StyledScoreInner = styled.div`
  display: block;
`

const StyledScore = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[5]}px;
  color: ${({ theme }) => theme.colors.text.dark};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-align: center;
`

const StyledDenominator = styled.div`
  font-size: 12px; //outside the grid design reasons. extract to it's own file
  color: ${({ theme }) => theme.colors.text.light};
  text-align: center;
`

export const BigScorePrimitive: React.FC<BigScoreProps> = ({
  score,
  denominator
}) => (
  <StyledScoreInner>
    <StyledScore>{score}</StyledScore>
    {denominator && <StyledDenominator>out of {denominator}</StyledDenominator>}
  </StyledScoreInner>
)

export const BigScore: React.FC<BigScoreProps> = (props) => {
  if (props.removeBox) {
    return <BigScorePrimitive {...props} />
  }

  // Faking Omits so we don't pass props down to HTML elements
  const { score, denominator, ...rest } = props

  return (
    <StyledBox {...rest}>
      <BigScorePrimitive score={score} denominator={denominator} />
    </StyledBox>
  )
}

BigScore.displayName = 'BigScore'
BigScore.defaultProps = {
  score: 0,
  denominator: null,
  removeBox: false
}
