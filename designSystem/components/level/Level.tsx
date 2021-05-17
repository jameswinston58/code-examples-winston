import React from 'react'
import styled from 'styled-components'
import sx, { SxProp } from '../sx'
import { space, SpaceProps, position, PositionProps } from 'styled-system'
import { CommonProps } from '../common'

/* TODO:
  - Handle styling for scrollbar on Reel. We don't want one.
  - Add a seperator style of component between items if showDividers=true
*/

const LevelContext = React.createContext({
  hasDividers: false,
  dividerSize: 1,
  gap: 1
})

export interface LevelProps extends PositionProps, SpaceProps, SxProp, CommonProps {
  gap?: number; // we don't use this currently.
  reel?: boolean;
  hasDividers?: boolean;
  dividerSize?: number;
}

interface ItemProps extends SpaceProps, SxProp, CommonProps {}

export interface LevelSubComponents {
  Item: React.FC<ItemProps>;
  LeftItem: React.FC<ItemProps>;
  RightItem: React.FC<ItemProps>;
}

// TODO: This could be succint, but I like to leave it open for future customizations.
export const StyledRightLevelItem = styled.div<ItemProps>`
  margin-left: auto;
  ${space}
  ${sx}
`

export const StyledLevelItem = styled.div<ItemProps>`
  margin-left: 0px;
  ${space}
  ${sx}
`
export const StyledLevelDivider = styled.div<LevelProps>`
  width: 0px;
  height: ${({ theme, dividerSize }) => theme.fontSizes[dividerSize]}px;
  border-left: 1px solid ${({ theme }) => theme.colors.border.base};
  display: flex;
`

export const StyledLevel = styled.div<LevelProps>`
  display: flex;
  ${({ reel }) => (reel ? 'overflow-x: auto;' : '')}
  align-items: center;
  margin: 0;
  ${StyledLevelItem} {
    margin-right: ${({ theme, gap }) => theme.space[gap]}px;
  }
  ${StyledLevelItem}:last-child {
    margin-right: ${({ reel, gap }) => (reel ? gap : 0)}px;
    ${StyledLevelDivider} {
      display: none;
    } 
  }
  ${position}
  ${space}
  ${sx}
`
const LevelItem: React.FC<ItemProps> = (props) => (
  <LevelContext.Consumer>
    {({ hasDividers, gap, dividerSize }) => (
      <>
        <StyledLevelItem {...props}>
          {props.children}
        </StyledLevelItem>
        {hasDividers && (
          <StyledLevelItem>
            <StyledLevelDivider gap={gap} dividerSize={dividerSize} />
          </StyledLevelItem>
        )}
      </>
    )}
  </LevelContext.Consumer>
)

const RightLevelItem: React.FC<ItemProps> = (props) => (
  <StyledRightLevelItem {...props}>{props.children}</StyledRightLevelItem>
)

export const Level: React.FC<LevelProps> & LevelSubComponents = (props) => (
  <LevelContext.Provider
    value={{
      hasDividers: props.hasDividers,
      gap: props.gap,
      dividerSize: props.dividerSize
    }}
  >
    <StyledLevel {...props}>
      {props.children}
    </StyledLevel>
  </LevelContext.Provider>

)

Level.Item = LevelItem
Level.LeftItem = LevelItem
Level.RightItem = RightLevelItem
Level.displayName = 'Level'
Level.defaultProps = {
  gap: 1,
  reel: false,
  hasDividers: false,
  dividerSize: 1
}
