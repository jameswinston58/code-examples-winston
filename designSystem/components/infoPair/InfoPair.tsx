import React from 'react'
import styled from 'styled-components'
import sx, { SxProp } from '../sx'
import { space, SpaceProps, PositionProps, position } from 'styled-system'
import { CommonProps } from '../common'

export interface InfoPairProps extends SpaceProps, PositionProps, SxProp, CommonProps {
  label?: string;
  value?: string | number | React.ReactNode;
  gap?: number;
  isVertical?: boolean;
}

const StyledInfoLabel = styled.span<InfoPairProps>`
  color: ${({ theme }) => theme.colors.text.light};
  font-size: ${({ theme }) => theme.fontSizes.default}px;
  ${({ theme, isVertical }) =>
    isVertical ? `font-size: ${theme.fontSizes[1]}px;` : ''}
  ${position}
  ${space}
`

const StyledInfoValue = styled.span<InfoPairProps>`
  color: ${({ theme }) => theme.colors.text.base};
  font-size: ${({ theme }) => theme.fontSizes.default}px;
`

const StyledInfoPairWrap = styled.span<InfoPairProps>`
  display: ${({ isVertical }) => (isVertical ? 'inline-flex' : 'inline-block')};
  ${({ isVertical }) => (isVertical ? 'flex-direction: column;' : '')}
  ${({ isVertical }) => (isVertical ? 'align-items: stretch;' : '')}
  ${position}
  ${space}
  ${sx}
`

// TODO: Figure out why we are getting overload when we just simply pass the props down.
export const InfoPair: React.FC<InfoPairProps> = (props) => (
  <StyledInfoPairWrap
    className={props.className}
    id={props.className}
    isVertical={props.isVertical}
    mr={props.gap}
  >
    <StyledInfoLabel mr='3px' isVertical={props.isVertical}>
      {props.label}
    </StyledInfoLabel>
    <StyledInfoValue isVertical={props.isVertical}>
      {props.value}
    </StyledInfoValue>
  </StyledInfoPairWrap>
)

InfoPair.displayName = 'Pair'
InfoPair.defaultProps = {
  value: '',
  label: '',
  gap: 1,
  isVertical: false
}
