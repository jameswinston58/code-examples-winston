import React from 'react'
import styled from 'styled-components'
import { space, SpaceProps, PositionProps, position } from 'styled-system'

export interface FormLabelProps extends SpaceProps, PositionProps {}

const StyledFormLabel = styled.label<FormLabelProps>`
  display: block;
  color: ${({ theme }) => theme.colors.text.light};
  font-size: ${({ theme }) => theme.fontSizes[1]}px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.space[1]}px;
  ${position}
  ${space}
`

export const FormLabel: React.FC<FormLabelProps> = ({ children, ...rest }) => (
  <StyledFormLabel {...rest}>
    {children}
  </StyledFormLabel>
)

FormLabel.displayName = 'FormLabel'
FormLabel.defaultProps = {}
