import React, { FC } from 'react'
import styled from 'styled-components'
import { space, SpaceProps, position, PositionProps } from 'styled-system'
import { CommonProps } from '../common'

export interface IndicatorProps extends PositionProps, SpaceProps, CommonProps {
  color?: 'success' | 'warning' | 'error' | 'info';
  number?: number | null;
}

const Circle = styled.div<IndicatorProps>`
  display: inline-block;
  vertical-align: middle;
  position: relative;
  background-color: ${({ theme, color }) => theme.colors.semantic[color]};
  border-radius: 50%;
  height: 14px;
  width: 14px;
`

const Number = styled.div<IndicatorProps>`
  font-size: ${({ theme }) => theme.fontSizes[0]}px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  left: 50%;
  position: absolute;
  top: 50%;
  color: ${({ theme }) => theme.colors.white}; //extract to a theme file
  transform: translate(-50%, -50%);
  ${space}
  ${position}
`

export const Indicator: FC<IndicatorProps> = ({ number, className, id, ...props }) => (
  <Circle className={className} id={id} {...props}>
    <Number {...props}>{number}</Number>
  </Circle>
)

Indicator.displayName = 'Indicator'
Indicator.defaultProps = {
  number: 0,
  color: 'info'
}
