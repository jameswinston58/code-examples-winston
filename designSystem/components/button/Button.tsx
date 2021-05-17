import React, { FC } from 'react'
import {
  Button as ReakitButton
} from 'reakit'
import { PositionProps, space, SpaceProps, position, TypographyProps, typography } from 'styled-system'
import styled, { css } from 'styled-components'
import { CommonProps } from '../common'

/* TODO:
- Loading State
*/

type ColorTypes =
  | 'default'
  | 'primary'
  | 'success'
  | 'error'
  | 'warning'
  | 'link'
  | 'info';

export interface CommonButtonProps extends PositionProps, SpaceProps, TypographyProps, CommonProps {
  size?: 'small' | 'normal' | 'medium' | 'large';
  color?: ColorTypes;
  variant?: 'outline' | 'text' | 'flat' | 'ghost';
  isHeavy?: boolean;
  disabled?: boolean;
  selected?: boolean;
  role?: string;
  fullwidth?: boolean;
}

export interface ButtonProps extends CommonButtonProps {
  className?: string; // documentation: use this at your own peril
  id?: string;
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
  type?: 'submit' | 'reset' | 'button';
  as?: 'button' | 'a' | 'div';
  target?: string;
  href?: string;
  rel?: string;
}

// Flat Buttons
// TODO: Check these styles
const flatButtonStyles = (colors) => css`
  background-color: ${colors.default.bg};
  color: ${colors.default.color};
  border: 1px solid ${colors.default.border};
  &:not([disabled]):hover {
    background-color: ${colors.hover.bg};
    color: ${colors.hover.color};
    border: 1px solid ${colors.hover.border};
  }
  &:active {
    background-color: ${colors.active.bg};
    color: ${colors.active.color};
    border: 1px solid ${colors.active.border};
  }
  &:focus {
    background-color: ${colors.focused.bg};
    color: ${colors.focused.color};
    border: 1px solid ${colors.focused.border};
    box-shadow: ${colors.focused.boxShadow};
  }
  &:disabled {
    background-color: ${colors.disabled.bg};
    color: ${colors.disabled.color};
    border: 1px solid ${colors.disabled.border};
  }
`
// Outline Buttons
// TODO: Check these styles.
const outlineButtonStyles = (colors) => css`
  background-color: transparent;
  color: ${colors.default.border};
  border: 1px solid ${colors.default.border};
  &:not([disabled]):hover {
    background-color: ${colors.hover.bg};
    color: ${colors.hover.color};
    border: 1px solid ${colors.hover.border};
  }
  &:active {
    background-color: ${colors.active.bg};
    color: ${colors.active.bg};
    border: 1px solid ${colors.active.border};
  }
  &:focus {
    background-color: ${colors.focused.bg};
    color: ${colors.focused.color};
    border: 1px solid ${colors.focused.border};
    box-shadow: ${colors.focused.boxShadow};
  }
  &:disabled {
    background-color: ${colors.disabled.bg};
    color: ${colors.disabled.color};
    border: 1px solid ${colors.disabled.border};
  }
`
const textButtonStyles = (colors) => css`
  background-color: transparent;
  color: ${colors.default.link};
  border: none;
  &:not([disabled]):hover {
    background-color: transparent;
    color: ${colors.default.link};
    border: none;
    text-decoration: underline;
  }
  &:active {
    background-color: transparent;
    color: ${colors.default.link};
    border: none;
    text-decoration: underline;
  }
  &:focus {
    background-color: transparent;
    color: ${colors.default.link};
    border: none;
    text-decoration: underline;
  }
  &:disabled {
    background-color: transparent;
    color: ${colors.disabled.link};
    border: none;
  }
`

const selectedButtonStyles = (theme) => css`
  background-color: ${theme.buttons.selected.default.bg};
  color: ${theme.buttons.selected.default.color};
  border: none;
  font-weight: ${theme.fontWeights.medium};
  &:not([disabled]):hover {
    background-color: ${theme.buttons.selected.hover.bg};
    color: ${theme.buttons.selected.hover.color};
    border: none;
  }
  &:active {
    background-color: ${theme.buttons.selected.active.bg};
    color: ${theme.buttons.selected.active.color};
    border: none;
  }
  &:focus {
    background-color: ${theme.buttons.selected.focused.bg};
    color: ${theme.buttons.selected.focused.color};
    border: none;
  }
  &:disabled {
    background-color: ${theme.buttons.selected.disabled.bg};
    color: ${theme.buttons.selected.disabled.color};
    border: none;
    opacity: .5;
  }
`

const ghostButtonStyles = (colors) => css`
  background-color: transparent;
  color: ${colors.default.color};
  border: 1px solid transparent;
  &:not([disabled]):hover {
    background-color: ${colors.hover.bg};
    color: ${colors.hover.color};
    border: 1px solid transparent;
  }
  &:active {
    background-color: ${colors.hover.border};
    color: ${colors.hover.color};
    border: 1px solid transparent;
  }
  &:focus {
    background-color: ${colors.hover.bg};
    color: ${colors.hover.color};
    border: 1px solid transparent;
  }
  &:disabled {
    border: 1px solid transparent;
    background-color: ${colors.disabled.bg};
    color: ${colors.disabled.color};
  }
`

const buttonVariants = {
  flat: flatButtonStyles,
  outline: outlineButtonStyles,
  text: textButtonStyles,
  ghost: ghostButtonStyles
}

type StyledButtonProps = Omit<CommonButtonProps, 'fullwidth' | 'isHeavy'> &
{
  $fullwidth?: boolean;
  $isHeavy?: boolean;
}

const StyledButton = styled(({ ...rest }) => (
  <ReakitButton {...rest} />
)) <StyledButtonProps>`
  border-radius: 6px;
  cursor: pointer;
  height: ${({ theme, size }) => theme.buttons.sizes[size].height};
  line-height: ${({ theme, size }) => theme.buttons.sizes[size].height};
  box-sizing: border-box;
  display: inline-block;
  padding-left: ${({ theme, size }) => theme.buttons.sizes[size].padding};
  padding-right: ${({ theme, size }) => theme.buttons.sizes[size].padding};
  font-size: ${({ theme, size }) => theme.buttons.sizes[size].fontSize}px;
  ${({ theme, color, variant }) => {
    const colors = theme.buttons.colors[color]
    return buttonVariants[variant](colors)
  }};
  font-weight: ${({ theme, $isHeavy }) =>
    $isHeavy
      ? theme.buttons.fontWeights.strong
      : theme.buttons.fontWeights.default};
  ${({ theme, selected }) => (selected ? selectedButtonStyles(theme) : '')};
  ${space}
  ${typography}
  ${position}
  text-decoration: none;
  &:is(a) {
    text-decoration: none;
  }
  ${({ $fullwidth }) => $fullwidth ? 'width: 100%;' : ''}
`

// Note: because of these defaults, we never actually use the majority of the styles up top.
const defaultProps: ButtonProps = {
  color: 'default',
  variant: 'flat',
  size: 'normal',
  isHeavy: false,
  disabled: false,
  role: 'button',
  selected: false,
  className: '',
  id: '',
  fullwidth: false,
  // leftIcon: "",
  // rightIcon: "",
  onClick: () => { },
  type: 'button'
}

export const Button: FC<ButtonProps> = ({
  children,
  fullwidth,
  isHeavy,
  ...props
}) => {
  return (
    <StyledButton
      {...props}
      $fullwidth={fullwidth}
      $isHeavy={isHeavy}
    >
      {children}
    </StyledButton>
  )
}

Button.displayName = 'Button'
Button.defaultProps = defaultProps
