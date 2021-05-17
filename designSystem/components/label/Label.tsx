import React from 'react'
import styled from 'styled-components'
import { BoxProps } from '../box'
import sx, { SxProp } from '../sx'
import {
  space,
  SpaceProps,
  TypographyProps,
  typography,
  PositionProps,
  position
} from 'styled-system'

/* TODO:
  - Give options for sizes and colors. For now you can pass anything you want through style system.
  - Create extracted theme and styles file.
*/

export interface LabelProps
  extends BoxProps,
  TypographyProps,
  SpaceProps,
  PositionProps,
  SxProp {
  color?: 'success' | 'warning' | 'error' | 'info';
}

const StyledLabel = styled.span<LabelProps>`
  font-size: ${({ theme }) => theme.fontSizes[1]}px;
  border-radius: ${({ theme }) => theme.radii[1]};
  display: inline-block;
  line-height: 1.5;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  padding-left: ${({ theme }) => theme.space[1]}px;
  padding-right: ${({ theme }) => theme.space[1]}px;
  color: ${({ theme, color }) => color ? 'white' : theme.colors.text.base};
  background-color: ${({ theme, color }) => color ? theme.colors.semantic[color] : theme.colors.bg.secondaryMediumLight};
  ${typography} //eventually this should be controlled more
  ${space} 
  ${position}
  ${sx}
`

export const Label: React.FC<LabelProps> = ({ color, children }) => {
  return <StyledLabel color={color}>{children}</StyledLabel>
}

Label.displayName = 'Label'
Label.defaultProps = {
  color: null
}
