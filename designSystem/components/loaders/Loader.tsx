import React, { FC } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { space, SpaceProps, PositionProps } from 'styled-system'
// import { transparentize } from 'polished'
export interface LoaderProps extends PositionProps, SpaceProps {
  size?: 'small' | 'normal' | 'medium' | 'large';
  text?: string;
  forceGifFallBack?: boolean;
  fixedToViewPort?: boolean;
  overlay?: boolean;
}

export interface TransitiveLoaderProps {
  $fixedToViewPort?: boolean;
  $overlay?: boolean;
}

const loaderAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const StyledLoader = styled.div`
  display: block;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  &:after {
    border-radius: 25%;
    width: 2rem;
    height: 2rem;
  }
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: .2rem solid ${({ theme }) => theme.loaders.background};
  border-right: .2rem solid ${({ theme }) => theme.loaders.background};
  border-bottom: .2rem solid ${({ theme }) => theme.loaders.background};
  border-left: .2rem solid ${({ theme }) => theme.loaders.foreground};
  transform: translateZ(0);
  animation: ${loaderAnimation} 1.1s infinite linear;
`

/* const sizes = {
  small: '24',
  normal: '36',
  medium: '48',
  large: '54'
} */

const fixedStyles = (/* bgColor */) => css`
  background-color: rgba(255,255,255,.75);
  position: fixed;
`

const overlayStyles = (/* bgColor */) => css`
  background-color: rgba(255,255,255,.75);
  padding-right: 1.5rem;
  padding-left: 1.5rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const StyledLoaderWrapper = styled.div<TransitiveLoaderProps>`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.base};
  ${space}
  ${({ $overlay }) => ($overlay ? overlayStyles(/* theme.colors.bg.base */) : '')};
  ${({ $fixedToViewPort }) => ($fixedToViewPort ? fixedStyles(/* theme.colors.bg.base */) : '')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${StyledLoader} {
    margin-left: auto;
    margin-right: auto;
    display: block;
    margin-bottom: 12px;
  }
`

const StyledLoaderElement = styled.div<LoaderProps>`
  //calculate a padding top and bottom
  text-align: center;
  ${StyledLoader} {
    margin-left: auto;
    margin-right: auto;
    display: block;
    margin-bottom: 12px;
  }
`

export const LoaderElement: FC<LoaderProps> = ({ text, fixedToViewPort, overlay }) => (
  <StyledLoaderElement overlay={overlay} fixedToViewPort={fixedToViewPort}>
    <StyledLoader />
    {text && (
      <div>
        {text}
      </div>
    )}
  </StyledLoaderElement>
)

export const Loader: FC<LoaderProps> = ({ size, text, fixedToViewPort, overlay }) => {
  return (
    <>
      {!overlay && (
        <LoaderElement size={size} text={text} />
      )}
      {overlay && (
        <StyledLoaderWrapper $overlay={overlay} $fixedToViewPort={fixedToViewPort}>
          <LoaderElement size={size} text={text} />
        </StyledLoaderWrapper>
      )}
    </>
  )
}

Loader.displayName = 'Icon'
Loader.defaultProps = {
  size: 'normal',
  text: null
}
