import React, { FC, ReactElement } from 'react'
import styled from 'styled-components'
import sx, { SxProp } from '../sx'
import {
  space,
  SpaceProps,
  position,
  PositionProps,
  display,
  DisplayProps,
  layout,
  LayoutProps
} from 'styled-system'
import {
  useMenuState,
  Menu as ReakitMenu,
  MenuItem,
  MenuButton,
  MenuItemProps as ReakitMenuItemProps,
  MenuProps as ReakitMenuProps
} from 'reakit/Menu'
import { PopoverState } from 'reakit/Popover/PopoverState'
import shortid from 'shortid'
import { Button } from '../button'
import { Icon } from '../icon'
import { Truncate, TruncateProps } from '../truncate'
import { CommonProps } from '../common'

/* TODO:
  - Make a controlled version.
  - Style Fix: Fix the width.
  - Extract Styles out of this.
  - Wrap attr getting passed down warning. Need to figure out why this is happening. We HAVE to pass these into the styled components for the MenuItem.
*/

type BaseMenuProps = Partial<ReakitMenuProps>;

export interface MenuProps extends BaseMenuProps, CommonProps {
  disabled?: boolean;
  triggerType?: 'default' | 'more' | 'cta'; // default, cta, more
  key?: string | number;
  hideIcon?: boolean;
  customTrigger?: ReactElement;
  triggerLabel?: string;
  align?: 'right' | 'left';
  onChange?: (unknown) => void;
  ariaLabel?: string;
  fullwidth?: boolean;
  truncateOptions?: TruncateProps;
}

// "auto-start" | "auto" | "auto-end" | "top-start" | "top" | "top-end" | "right-start" | "right" | "right-end" | "bottom-end" | "bottom" | "bottom-start" | "left-end" | "left" | "left-start";
const dropdownAlignments = new Map<string, string>()
dropdownAlignments.set('left', 'bottom-start')
dropdownAlignments.set('right', 'bottom-end')

const StyledMenuOuterWrap = styled.div<
  SpaceProps & PositionProps & LayoutProps & DisplayProps & SxProp
  >`
  ${space}
  ${position}
  ${display}
  ${layout}
  ${sx}
`

interface StyledButtonProps {
  $fullwidth?: boolean;
}

const StyledMenuButton = styled(MenuButton)<StyledButtonProps>`
  border: none;
  outline: none;
  background: none;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  ${({ $fullwidth }) => $fullwidth ? 'width: 100%;' : ''}
  &:disabled {
    opacity: .7;
  }
`

const StyledBaseMenu = styled(ReakitMenu)`
  z-index: 999;
  :focus {
    outline: 0 !important;
  }
`

type StyledMenuItemProps = MenuItemProps | Partial<MenuActionProps>;

const StyledMenuItem = styled(MenuItem)<StyledMenuItemProps>`
  background-color: white;
  border: none;
  outline: none;
  padding: 8px 8px;
  text-align: left;
  border-radius: 6px;
  transition: .25s;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }): string => theme.colors.text.base};
  &:not([disabled]):hover {
    background-color: ${({ theme }): string => theme.colors.bg.secondaryLight};
    color: ${({ theme }): string => theme.colors.text.dark};
    * {
      color: ${({ theme }): string => theme.colors.text.dark};
    }
  }
  &:focus {
    background-color: ${({ theme }): string => theme.colors.bg.secondaryLight};
  }
  &:active {
    background-color: ${({ theme }): string => theme.colors.bg.secondaryLight};
  }
  &:disabled {
    opacity: .5;
  }
`

const StyledMenuWrap = styled.div`
  background-color: white;
  display: inline-flex;
  flex-direction: column;
  align-items: stretch;
  border: 1px solid ${({ theme }): string => theme.colors.border.dark};
  border-radius: 6px;
  max-width: 400px;
  outline: none !important;
  padding: 8px;
  cursor: pointer;
  :focus {
    outline: 0 !important;
  }
`

const StyledMenuButtonContent = styled.div`
  display: flex;
  justify-content: space-between;
`
const StyledIconWrapper = styled.div`
  margin-left: 8px;
`

export interface MenuSubComponents {
  Item: React.FC<MenuItemProps>;
}

type TriggerProps = Pick<MenuProps, 'triggerLabel' | 'hideIcon' | 'disabled' | 'fullwidth' | 'truncateOptions'>;

const DefaultTrigger: FC<TriggerProps> = ({
  triggerLabel,
  hideIcon,
  disabled,
  fullwidth,
  truncateOptions
}) => (
  <Button
    as='div'
    color='default'
    position='relative'
    disabled={disabled}
    fullwidth={fullwidth}
    textAlign='left'
  >
    <StyledMenuButtonContent>
      <Truncate
        modifier={truncateOptions.modifier}
        text={triggerLabel}
        truncateType={truncateOptions.truncateType}
      />
      {!hideIcon && (
        <StyledIconWrapper>
          <Icon name='expandMore' />
        </StyledIconWrapper>
      )}
    </StyledMenuButtonContent>
  </Button>
)

const PrimaryTrigger: FC<TriggerProps> = ({
  triggerLabel,
  hideIcon,
  disabled,
  fullwidth,
  truncateOptions
}) => (
  <Button
    as='div'
    color='primary'
    position='relative'
    disabled={disabled}
    fullwidth={fullwidth}
    textAlign='left'
  >
    <StyledMenuButtonContent>
      <Truncate
        modifier={truncateOptions.modifier}
        text={triggerLabel}
        truncateType={truncateOptions.truncateType}
      />
      {!hideIcon && (
        <StyledIconWrapper>
          <Icon name='expandMore' />
        </StyledIconWrapper>
      )}
    </StyledMenuButtonContent>
  </Button>
)

const MoreTrigger: FC<TriggerProps> = () => (
  <Button as='div' variant='ghost' color='default'>
    <Icon name='moreVertical' />
  </Button>
)

interface CustomChild extends ReactElement {
  props: { [k: string]: unknown };
  type: FC;
}

export const ItemWrap: React.FC<MenuItemProps> = ({ children }) => {
  return <div>{children}</div>
}

ItemWrap.defaultProps = {
  data: {},
  id: shortid.generate(),
  rel: '',
  href: '',
  target: ''
}

type MenuActionProps = {
  href?: string,
  as?: 'button' | 'a',
  rel?: string,
  target?: string
}

export const Menu: FC<MenuProps> & { Item: FC<MenuItemProps> } = ({
  children,
  onChange,
  disabled,
  triggerLabel,
  triggerType,
  customTrigger,
  hideIcon,
  align,
  ariaLabel,
  fullwidth,
  truncateOptions,
  ...rest
}) => {
  const placement: string = dropdownAlignments.get(align) || 'auto'

  const placementCast: PopoverState['placement'] = placement as PopoverState['placement']

  const menu = useMenuState({
    placement: placementCast,
    gutter: 3
  })

  const handleChange = (data: unknown): void => {
    menu.hide()
    onChange(data)
  }

  const triggerProps = {
    triggerLabel,
    hideIcon,
    disabled,
    fullwidth,
    truncateOptions
  }

  return (
    <StyledMenuOuterWrap {...rest}>
      <StyledMenuButton {...menu} disabled={disabled} $fullwidth={fullwidth}>
        {triggerType === 'default' && !customTrigger && <DefaultTrigger {...triggerProps} />}
        {triggerType === 'cta' && !customTrigger && <PrimaryTrigger {...triggerProps} />}
        {triggerType === 'more' && !customTrigger && <MoreTrigger />}
        {customTrigger && customTrigger}
      </StyledMenuButton>
      <StyledBaseMenu {...menu} aria-label={ariaLabel}>
        <StyledMenuWrap>
          {React.Children.map(children, (child: CustomChild) => {
            // This is support for non-node elements (eg. pure text), they have no props

            if (!child) {
              return child
            }

            if (!child.props) {
              return child
            }
            if (child.props.children) {
              if (child.type === ItemWrap) {
                const { data, ...childProps } : MenuActionProps & MenuItemProps = child.props
                const { href, rel, target } : MenuActionProps = childProps
                const menuActionProps: MenuActionProps = {}
                const disabled: boolean = childProps.disabled
                if (href) {
                  menuActionProps.href = href
                  menuActionProps.as = 'a'
                  if (rel) {
                    menuActionProps.rel = rel
                  }
                  if (target) {
                    menuActionProps.target = target
                  }
                }

                return (
                  <StyledMenuItem
                    disabled={disabled}
                    onClick={(): void => handleChange(data)}
                    {...menu}
                    key={childProps.key}
                    {...menuActionProps}
                  >
                    {child.props.children}
                  </StyledMenuItem>
                )
              }
            }
          })}
        </StyledMenuWrap>
      </StyledBaseMenu>
    </StyledMenuOuterWrap>
  )
}

type BaseMenuItemProps = Partial<PositionProps> &
  Partial<SpaceProps> &
  Partial<SxProp> &
  Partial<ReakitMenuItemProps>;

export interface MenuItemProps extends BaseMenuItemProps {
  id?: string;
  data?: unknown;
  href?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
}

Menu.Item = ItemWrap

const defaultProps: Partial<MenuProps> = {
  disabled: false,
  className: '',
  customTrigger: null,
  triggerType: 'default',
  triggerLabel: '',
  hideIcon: false,
  align: 'left',
  onChange: () => { },
  fullwidth: false,
  truncateOptions: {
    modifier: '',
    truncateType: 'line'
  }
}

Menu.defaultProps = defaultProps
