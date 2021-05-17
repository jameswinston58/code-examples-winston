import React, { FC, ReactElement } from 'react'
import styled from 'styled-components'
import sx, { SxProp } from '../sx'
import { space, SpaceProps, ColorProps, color } from 'styled-system'
import { CommonProps } from '../common'
import { Icon } from '../icon'
import { CalloutProps } from '../callout'
import { useAutoControlled } from 'react-auto-controlled'

export interface AccordionProps
  extends CalloutProps,
    SxProp,
    ColorProps,
    SpaceProps,
    CommonProps {
  hideAccordionArrow?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
  onOpen?(event: React.MouseEvent<HTMLButtonElement>): void;
  onClose?(event: React.MouseEvent<HTMLButtonElement>): void;
}

export interface AccordionHeaderProps {
  isExpanded?: boolean;
  noContent?: boolean;
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
}

export interface AccordionContentProps extends AccordionProps {
  isExpanded?: boolean;
}

export interface AccordionSubComponents {
  Header: React.FC<AccordionProps>;
  Content: React.FC<AccordionProps>;
}

const AccordionContext = React.createContext({
  isExpanded: false,
  setIsExpanded: null,
  hideAccordionArrow: false,
  noContent: true,
  onClickCallback: null,
  onCloseCallback: null,
  onOpenCallback: null
})

export const StyledAccordion = styled.div<AccordionProps>`
    border-radius: ${({ theme }) => theme.radiiDefault};
    border: 1px solid ${({ theme }) => theme.colors.border.base};
    background-color: ${({ theme }) => theme.colors.bg.callout};
    padding: 18px 18px;
    ${color}
    ${space}
    ${sx}
`

export const StyledAccordionDivider = styled.div<AccordionHeaderProps>`
  height: 0px;
  box-sizing: border-box;
  margin: 0;
  min-width: 0px;
  flex-wrap: wrap;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.base};
  margin-bottom: ${({ isExpanded }) => (isExpanded ? '18px' : '0px')};
  display: ${({ isExpanded }) => (isExpanded ? 'flex' : 'none')};
  margin-left: -18px;
  margin-right: -18px;
`

export const StyledAccordionHeader = styled.button<AccordionHeaderProps>`
  position: relative;
  display: block;
  padding: 0px;
  border: 0;
  outline: 0;
  width: 100%;
  background: 0;
  cursor: ${({ noContent }) => (noContent ? 'default' : 'pointer')};
  ${({ isExpanded }) => (isExpanded ? 'padding-bottom: 18px;' : '')}
`
export const StyledAccordionContent = styled.div<AccordionContentProps>`
  position: relative;
`
export const StyledAccordionArrow = styled.div<AccordionHeaderProps>`
  position: absolute;
  display: block;
  width: 1rem;
  height: 1rem;
  left: -29px; //This is hacky, but also correct. Fix.
  top: 0px;
  cursor: pointer;
  background-color: ${({ isExpanded, theme }): string =>
      isExpanded ? theme.colors.bg.secondaryUltraLight : theme.colors.bg.base
    };
  ${({ theme }) => theme.colors.bg.callout};
  border-radius: 100px;
  border: 1px solid ${({ isExpanded, theme }): string =>
      isExpanded ? theme.colors.border.dark : theme.colors.border.base
    };
  transition-duration: 0.3s;
  color: ${({ isExpanded, theme }): string =>
      isExpanded ? theme.colors.border.ultraDark : theme.colors.border.base
    };
  transition-property: transform;
  transform: ${({ isExpanded }): string =>
    isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)'};
  span {
    top: 0;
  }
`

const AccordionHeader: FC<AccordionHeaderProps> = ({
  children
}) => (
  <AccordionContext.Consumer>
    {({ isExpanded, setIsExpanded, noContent, onClickCallback, onCloseCallback, onOpenCallback }) => {
      const handleClick = () => {
        if (noContent) {
          return false
        }
        onClickCallback()
        if (isExpanded) {
          onCloseCallback()
        } else {
          onOpenCallback()
        }
        setIsExpanded(!isExpanded)
      }

      return (
        <div style={{ display: 'block', position: 'relative' }}>
          {!noContent && (
            <StyledAccordionArrow onClick={handleClick} isExpanded={isExpanded}>
              <Icon name='expandMore' />
            </StyledAccordionArrow>
          )}
          <StyledAccordionHeader
            onClick={handleClick}
            isExpanded={isExpanded}
            noContent={noContent}
          >
            {children}
          </StyledAccordionHeader>
          <StyledAccordionDivider isExpanded={isExpanded} />
        </div>
      )
    }}
  </AccordionContext.Consumer>
)

const AccordionContent: React.FC<AccordionContentProps> = (props) => (
  <AccordionContext.Consumer>
    {({ isExpanded, noContent }) => (
      <>
        {!noContent && (
          <StyledAccordionContent isExpanded={isExpanded}>
            {isExpanded && props.children}
          </StyledAccordionContent>
        )}
      </>
    )}
  </AccordionContext.Consumer>
)

interface CustomChild extends ReactElement {
  props: { [k: string]: unknown };
  type: FC;
}

export const Accordion: FC<AccordionProps> & AccordionSubComponents = ({
  children,
  open,
  defaultOpen,
  hideAccordionArrow,
  onClick,
  onClose,
  onOpen,
  className,
  id
}) => {
  const [
    isExpanded,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setIsExpanded,
    trySetIsExpanded,
    getDerivedIsExpandedFromProp
  ] = useAutoControlled(false, {
    prop: open,
    defaultProp: defaultOpen
  })

  getDerivedIsExpandedFromProp()

  let noContent = true

  React.Children.map(children, (child: CustomChild) => {
    if (child.type === AccordionContent) {
      noContent = false
    }
  })

  return (
    <AccordionContext.Provider
      value={{
        isExpanded,
        setIsExpanded: trySetIsExpanded,
        hideAccordionArrow,
        noContent,
        onClickCallback: onClick,
        onCloseCallback: onClose,
        onOpenCallback: onOpen
      }}
    >
      <StyledAccordion
        className={className}
        id={id}
      >
        {children}
      </StyledAccordion>
    </AccordionContext.Provider>
  )
}

Accordion.Header = AccordionHeader
Accordion.Content = AccordionContent
Accordion.displayName = 'Accordion'
Accordion.defaultProps = {
  onClick: () => {},
  onClose: () => {},
  onOpen: () => {}
}
