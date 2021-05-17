import React, { FC } from 'react'
import styled from 'styled-components'
import sx, { SxProp } from '../sx'
import { CommonProps } from '../common'
import { space, SpaceProps, position, PositionProps } from 'styled-system'

export interface AvatarProps extends PositionProps, SpaceProps, SxProp, CommonProps {
  size?: 'small' | 'normal' | 'medium' | 'large';
  initials?: string;
}

export const Circle = styled.div<AvatarProps>`
  display: inline-block;
  vertical-align: middle;
  position: relative;
  background-color: ${({ theme }) => theme.colors.brand.primary};
  border-radius: 50%;
  height: 18px;
  width: 18px;
`

export const Initials = styled.div<AvatarProps>`
  font-size: ${({ theme }) => theme.fontSizes[0]}px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  left: 50%;
  position: absolute;
  top: 50%;
  color: ${({ theme }) => theme.colors.white}; //extract to a theme file
  transform: translate(-50%, -50%);
  ${space}
  ${position}
  ${sx}
`

export const Avatar: FC<AvatarProps> = ({ initials, className, id, ...props }) => (
  <Circle className={className} id={id} {...props}>
    <Initials {...props}>{initials}</Initials>
  </Circle>
)

Avatar.displayName = 'Avatar'
Avatar.defaultProps = {
  initials: '',
  size: 'normal'
}
