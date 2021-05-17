import React, { FC } from 'react'
import styled from 'styled-components'
import sx, { SxProp } from '../sx'
import { space, SpaceProps, ColorProps } from 'styled-system'
import { Text } from '../text'
import { BoxProps } from '../box'
import { Button } from '../button'
import { Icon } from '../icon'
import { Link } from '../link'
import { Illustrations } from '../../theme/illustrations/Illustrations'
import { CommonProps } from '../common'

/*
TODO:
  - Theme extraction and creation of Callout.ts theme file.
*/

export interface CallToActionProps
  extends BoxProps,
    SxProp,
    ColorProps,
    SpaceProps,
    CommonProps
  {
      title?: string;
      subTitle?: string;
      illustration?: 'horizontalCharts' | 'stackedCharts' | 'lockedCharts';
      ctaLabel?: string;
      ctaLink?: string;
      ctaType?: 'link' | 'default' | 'email';
      moreInfo?: string | React.ReactNode;
      onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
}

export const StyledCallToAction = styled.div<CallToActionProps>`
  border-radius: ${({ theme }) => theme.radiiDefault};
  border: 1px solid ${({ theme }) => theme.colors.border.base};
  background-color: ${({ theme }) => theme.colors.bg.callout};
  text-align: center;
  padding: ${({ theme }) => theme.space[6]}px;
  padding-bottom: ${({ theme }) => theme.space[7]}px;
  ${space}
  ${sx}
`
export const StyledIllustrationWrap = styled.div`
  margin-bottom: ${({ theme }) => theme.space[6]}px;
`

export const CallToAction: FC<CallToActionProps> = ({
  title,
  subTitle,
  illustration,
  ctaLabel,
  ctaType,
  ctaLink,
  onClick,
  moreInfo,
  ...rest
}) => {
  const IllustrationComponent = Illustrations[illustration] ? Illustrations[illustration].image : Illustrations.horizontalCharts.image

  return (
    <StyledCallToAction {...rest}>
      <Text as='h1' fontSize={6} fontWeight='medium' color='text.dark' mb={5} mt={0}>
        {title}
      </Text>
      {subTitle && (
        <Text as='div' fontSize={3} color='text.base' mb={5}>
          {subTitle}
        </Text>
      )}
      {illustration && Illustrations[illustration] && (
        <StyledIllustrationWrap>
          <IllustrationComponent />
        </StyledIllustrationWrap>
      )}
      {moreInfo && moreInfo}
      {ctaType === 'default' && (
        <Button color='primary' onClick={onClick} size='large'>
          {ctaLabel}
        </Button>
      )}
      {ctaType === 'link' && (
        <Button href={ctaLink} color='primary' as='a' target='_blank' rel='noreferrer noopener' size='large'>
          {ctaLabel} <Icon name='launch' />
        </Button>
      )}
      {ctaType === 'email' && (
        <Text color='text.dark' fontSize={3}>
          {ctaLabel} <Link href='mailto:support@patientiq.io' color='semantic.link'>support@patientiq.io</Link>
        </Text>
      )}
    </StyledCallToAction>
  )
}

CallToAction.displayName = 'CallToAction'
CallToAction.defaultProps = {
  title: '',
  subTitle: '',
  illustration: 'horizontalCharts',
  ctaLabel: '',
  ctaType: 'default',
  moreInfo: '',
  ctaLink: '',
  onClick: () => {}
}
