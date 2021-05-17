import React, { FC } from 'react'
import styled from 'styled-components'
import { space, SpaceProps, PositionProps, color, ColorProps } from 'styled-system'
import {
  Launch,
  CheckBoxOutlineBlank,
  MoreVert,
  ExpandMore,
  Today,
  Timelapse,
  ArrowDownward,
  ArrowUpward,
  ExpandLess,
  PersonOutline,
  ErrorOutline,
  ArrowBack,
  ArrowForward,
  Add,
  Clear
} from '@styled-icons/material-outlined'
import { CheckBox } from '@styled-icons/material'
import { fontSizes } from '../../theme/primitives/typography'
import ScatterPlot from '../../theme/assets/scatter_plot.svg'

export interface IconProps extends PositionProps, SpaceProps, ColorProps {
  size?: number;
  name?: string; // eventually this needs to be constrained.
}

/* TODO:
  - Constrain The Icon Name Property
  - Tweak Inline Styling
  - Create Paddings for Sizes. See Bulma Icon examples for a good pattern.
  - Make a Styled Component for this so that we can apply position, space, and SX props.
  - Interface magic fo the icons Object
*/

export const icons = {
  launch: Launch,
  checkBoxOutline: CheckBoxOutlineBlank,
  moreVertical: MoreVert,
  expandMore: ExpandMore,
  calendarToday: Today,
  timeLapse: Timelapse,
  arrowDown: ArrowDownward,
  arrowUp: ArrowUpward,
  arrowLeft: ArrowBack,
  arrowRight: ArrowForward,
  expandLess: ExpandLess,
  user: PersonOutline,
  circleExclamationPoint: ErrorOutline,
  scatterPlot: ScatterPlot,
  add: Add,
  checkbox: CheckBox,
  clear: Clear
}

const customIcons = [
  'scatterPlot'
]

const StyleIconWrapper = styled.span`
  display: inline-flex;
  align-self: center;
  top: .2em;
  position: relative;
  svg {
    height: 1rem;
    width: 1rem;
  }
  ${color}
  ${space}
`

export const Icon: FC<IconProps> = ({ name, size, color, ...props }) => {
  // TODO: Set a default here.
  const IconComponent = icons[name] ? icons[name] : 'checkBoxOutline'
  const fontSize = fontSizes[size] ? fontSizes[size] : fontSizes[2]
  const iconProps = customIcons[name] ? {} : { fontSize }
  return (
    <StyleIconWrapper color={color as string} {...props}>
      <IconComponent {...iconProps} />
    </StyleIconWrapper>
  )
}

Icon.displayName = 'Icon'
Icon.defaultProps = {
  size: 4,
  name: 'checkBoxOutline'
}
