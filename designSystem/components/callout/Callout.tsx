import React, { FC } from 'react'
import styled from 'styled-components'
import sx, { SxProp } from '../sx'
import { space, SpaceProps, ColorProps, color } from 'styled-system'
import { BoxProps } from '../box'
import { CommonProps } from '../common'

/*
TODO:
  - Theme extraction and creation of Callout.ts theme file.
*/

export type CalloutProps = BoxProps
  & SxProp
  & ColorProps
  & SpaceProps
  & CommonProps

export const StyledCallout = styled.div<CalloutProps>`
    border-radius: ${({ theme }) => theme.radiiDefault};
    border: 1px solid ${({ theme }) => theme.colors.border.base};
    background-color: ${({ theme }) => theme.colors.bg.callout};
    ${color}
    ${space}
    ${sx}
`
export const Callout: FC<CalloutProps> = (props) => (
  <StyledCallout {...props}>{props.children}</StyledCallout>
)

Callout.displayName = 'Callout'
Callout.defaultProps = {
  p: 4 // This is from styled system.
}
