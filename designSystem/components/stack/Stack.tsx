import React from 'react'
import styled from 'styled-components'
import sx, { SxProp } from '../sx'
import { space, SpaceProps, position, PositionProps } from 'styled-system'
import { CommonProps } from '../common'

/* TODO:
  - Make a Stack Reel (Scrolling)
*/

export interface StackProps extends PositionProps, SpaceProps, SxProp, CommonProps {
  gap?: number; // we don't use this currently.
}

export interface StackItemProps extends PositionProps, SpaceProps, SxProp, CommonProps {
  gap?: number; // we don't use this currently.
}

export const StyledStackItem = styled.div<
  StackItemProps
>`
  ${space}
  ${position}
  ${sx}
`

// TODO: This could be succint, but I like to leave it open for future customizations.
export const StyledStack = styled.div<
  StackProps
>`
  margin: 0;
  ${StyledStackItem} {
    margin-bottom: ${({ theme, gap }) => theme.space[gap]}px;
  }
  ${StyledStackItem}:last-child {
    margin-bottom: 0px;
  }
  ${space}
  ${position}
  ${sx}
`

export interface StackSubComponents {
  Item: React.FC<StackItemProps>;
}

export const Stack: React.FC<StackProps> & StackSubComponents = props => (
  <StyledStack {...props}>{props.children}</StyledStack>
)

export const StackItem: React.FC<StackItemProps> = props => (
  <StyledStackItem {...props}>{props.children}</StyledStackItem>
)

Stack.displayName = 'Stack'
Stack.Item = StackItem
Stack.defaultProps = {
  gap: 3
}
