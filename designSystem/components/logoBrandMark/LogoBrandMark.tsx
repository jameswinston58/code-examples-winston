import React, { FC } from 'react'
import styled from 'styled-components'
import { space, SpaceProps, position, PositionProps, layout, LayoutProps, display, DisplayProps } from 'styled-system'
import sx, { SxProp } from '../sx'
import { PIQLogoAcronymMini } from '../../theme/assets/pIQ-logo-acronym-mini'

/*
  TODO:
  - Add In Typescript PNG Modules support
*/

export const logos = {
  mini: PIQLogoAcronymMini
}

export interface LogoBrandMarkProps extends PositionProps, SpaceProps, SxProp, DisplayProps, LayoutProps {
  logo: string;
  width: number;
}

export interface StyledLogoBrandMarkProps extends PositionProps, SpaceProps, SxProp, DisplayProps, LayoutProps {
}

export const StyledLogoWrapper = styled.div<StyledLogoBrandMarkProps>`
  ${position}
  ${space}
  ${layout}
  ${display}
  ${sx}
`

export const LogoMark: FC<LogoBrandMarkProps> = ({ width, logo, ...props }) => {
  const LogoComponent = logos[logo] ? logos[logo] : logos.mini

  return (
    <StyledLogoWrapper {...props}>
      <LogoComponent width={width} />
    </StyledLogoWrapper>
  )
}

LogoMark.displayName = 'LogoBrandMark'
LogoMark.defaultProps = {
  width: 25,
  logo: 'mini'
}
