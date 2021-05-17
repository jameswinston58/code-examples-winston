import React, { FC } from 'react'
import styled from 'styled-components'
import { SpaceProps, LayoutProps, FlexProps, BorderProps, space, layout, flexbox, TypographyProps, typography } from 'styled-system'
import { ResponsiveType, formatResponsiveProperty } from '../../utils'
import { CommonProps } from '../common'

type GutterType = Exclude<ResponsiveType, string>

const cleanGutter = (gutter: number): number =>
  gutter === 0 ? Math.abs(gutter) : -Math.abs(gutter)

const translateGutter = (gutter: ResponsiveType): ResponsiveType => {
  return formatResponsiveProperty(gutter, cleanGutter)
}

const create12Width = (width: number): number => {
  return width / 12
}

const calculateWidth = (width: ResponsiveType): ResponsiveType => {
  return formatResponsiveProperty(width, create12Width)
}

const defaultColumnsProps: ColumnsProps = {
  gutter: 2,
  isMultiline: false,
  isVCentered: false,
  isCentered: false
}

const ColumnsContext = React.createContext(defaultColumnsProps)

export interface ColumnsProps extends LayoutProps, SpaceProps, FlexProps, BorderProps, CommonProps {
  isMultiline?: boolean;
  isVCentered?: boolean;
  isCentered?: boolean;
  gutter?: GutterType;
}

// Rewrite some of these interfaces
export interface ColumnProps extends SpaceProps, Omit<LayoutProps, 'width'>, FlexProps, BorderProps, TypographyProps, CommonProps {
  gutter?: GutterType;
  width?: ResponsiveType;
}

export interface StyleColumnProps extends SpaceProps, LayoutProps, FlexProps, BorderProps, TypographyProps {}

export interface ColumnsSubComponents {
  Column: React.FC<ColumnProps>;
}

const StyledColumns = styled.div<ColumnsProps>`
  box-sizing: border-box;
  margin: 0;
  min-width: 0px;
  flex-wrap: wrap;
  display: flex;
  ${({ isVCentered }) => isVCentered ? 'align-items: center' : ''};
  ${({ isCentered }) => isCentered ? 'justify-content: center' : ''};
  ${space}
  ${layout}
  ${flexbox}
`
const StyledColumn = styled.div<StyleColumnProps>`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: block;
  ${({ width }) => !width ? 'flex-basis: 0' : ''};
  ${({ width }) => !width ? 'flex-grow: 1' : ''};
  ${({ width }) => !width ? 'flex-shrink: 1' : ''};
  ${({ width }) => width ? 'flex: none' : ''};
  ${typography}
  ${space}
  ${layout}
  ${flexbox}
`

export const Column: FC<ColumnProps> = ({
  children,
  width,
  ...rest
}) => {
  const calculatedWidth = calculateWidth(width)

  return (
    <ColumnsContext.Consumer>
      {({ gutter, isMultiline }) => {
        const columnProps: { [key: string]: unknown } = {
          px: gutter,
          width: calculatedWidth
        }

        if (isMultiline) {
          columnProps.py = gutter
        }

        return (
          <StyledColumn
            {...columnProps}
            {...rest}
          >
            {children}
          </StyledColumn>
        )
      }}
    </ColumnsContext.Consumer>
  )
}

export const Columns: FC<ColumnsProps> & ColumnsSubComponents = ({
  gutter,
  isMultiline,
  isVCentered,
  isCentered,
  children,
  ...rest
}) => {
  const translatedGutter = translateGutter(gutter)

  return (
    <ColumnsContext.Provider
      value={{
        gutter: gutter,
        isMultiline: isMultiline
      }}
    >
      <StyledColumns
        mx={translatedGutter}
        isVCentered={isVCentered}
        isCentered={isCentered}
        {...rest}
      >
        {children}
      </StyledColumns>
    </ColumnsContext.Provider>
  )
}

Columns.defaultProps = defaultColumnsProps
Columns.Column = Column
