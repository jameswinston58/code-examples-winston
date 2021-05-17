import React, { FC } from 'react'
import styled from 'styled-components'
import { CommonButtonProps } from '../button'
import { Icon } from '../icon'

interface ChipProps {
  size?: CommonButtonProps['size'];
  onDelete?(event: React.MouseEvent<HTMLButtonElement>): void;
  hideDelete?: boolean;
}

export const StyledChip = styled.span<ChipProps>`
  display: inline-block;
  border: 1px solid ${({ theme }) => theme.buttons.colors.default.default.border};
  padding-left: ${({ theme, size }) => theme.buttons.sizes[size].padding};
  padding-right: ${({ theme, size }) => theme.buttons.sizes[size].padding};
  font-size: ${({ theme, size }) => theme.buttons.sizes[size].fontSize}px;
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.text.light};
  height: ${({ theme, size }) => theme.buttons.sizes[size].height};
  line-height: ${({ theme, size }) => theme.buttons.sizes[size].height};
  box-sizing: border-box;
  display: inline-block;
`

export const StyledDeleteButton = styled.button`
  background: transparent;
  outline: none;
  border: none;
  box-sizing: border-box;
  display: inline-block;
  margin-left: 6px;
  color: ${({ theme }) => theme.colors.text.ultraLight};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.text.base};
  }
`

export const StyledChipGroup = styled.div`
  ${StyledChip} {
    margin-right: 8px;
    margin-bottom: 8px;
  }
`

export const Chip: FC<ChipProps> = ({ children, size, onDelete, hideDelete }) => {
  return (
    <StyledChip size={size}>
      {children}
      {!hideDelete && (
        <StyledDeleteButton onClick={onDelete}>
          <Icon name='clear' />
        </StyledDeleteButton>
      )}
    </StyledChip>
  )
}

export const ChipGroup: FC = ({ children }) => (
  <StyledChipGroup>
    {children}
  </StyledChipGroup>
)

Chip.displayName = 'Chip'
Chip.defaultProps = {
  size: 'small',
  onDelete: () => { },
  hideDelete: false
}
