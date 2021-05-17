import styled from 'styled-components'
import sx, { SxProp } from '../sx'
import {
  space,
  SpaceProps,
  typography,
  TypographyProps,
  color,
  ColorProps,
  layout,
  LayoutProps
} from 'styled-system'
import { CommonProps } from '../common'

export type TextProps = React.ComponentProps<typeof Text>;

export const StyledText = styled.span<
  SpaceProps & TypographyProps & ColorProps & SxProp & LayoutProps & CommonProps
>`
  line-height: 1.5;
  ${space}
  ${color}
  ${layout}
  ${sx}
  ${({ fontSize, theme }) => {
    if (theme.fontSizes.forceStrong.includes(fontSize)) {
      return `font-weight: ${theme.fontWeights.strong};`
    }
  }}
  ${typography}
`
export const Text = StyledText

Text.displayName = 'Text'
