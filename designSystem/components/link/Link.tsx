import React from 'react'
import styled from 'styled-components'
import {
  TypographyProps,
  typography,
  PositionProps,
  position,
  SpaceProps,
  space,
  DisplayProps,
  display,
  color,
  ColorProps
} from 'styled-system'
import { CommonProps } from '../common'

export interface StyledLinkProps
  extends
    PositionProps,
    SpaceProps,
    DisplayProps,
    ColorProps,
    CommonProps,
    TypographyProps {
  // hoverColor?: string; TODO: Accept a CustomHover Color
  muted?: boolean;
  href: string;
  underline?: boolean;
  as?: 'button' | 'a' | 'input';
  newWindow?: boolean;
}

const StyledLink = styled.a.attrs((props) => {
  const attrs: Partial<{rel: string, target: string, href: string}> = {}

  if (props.rel) {
    attrs.rel = props.rel
    attrs.target = props.target ? props.target : '_self'
  }

  return {
    href: props.href ? props.href : '#',
    ...attrs
  }
})<StyledLinkProps>`
  color: ${({ theme, muted }) =>
    muted ? theme.colors.text.dark : theme.colors.blue[600]};
  text-decoration:  ${(props) => (props.underline ? 'underline' : 'none')};
  font-weight: ${(props) =>
    props.muted ? 500 : 400}; /* TODO: Should be themed variables */
  &:hover {
    text-decoration: ${(props) => (props.underline ? 'underline' : 'none')};
    color: ${({ theme, muted }) =>
      muted ? theme.colors.text.light : theme.colors.text.base};
  }
  &:visited {
    color: inherit;
  }
  &:is(button) {
    display: inline-block;
    padding: 0;
    font-size: inherit;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    background-color: transparent;
    border: 0;
    appearance: none;
  }
  ${typography}
  ${space}
  ${position}
  ${display}
  ${color}
`

export const Link: React.FC<StyledLinkProps> = ({
  children,
  newWindow,
  color,
  ...props
}) => {
  const newStyleObject: Partial<{rel: string, target: string}> = {}

  if (newWindow) {
    newStyleObject.rel = 'noopener noreferrer'
    newStyleObject.target = '_blank'
  }

  return ( // had to cast color as string here. i don't know why this works.
    <StyledLink color={color as string} {...newStyleObject} {...props}>
      {children}
    </StyledLink>
  )
}

export default Link
