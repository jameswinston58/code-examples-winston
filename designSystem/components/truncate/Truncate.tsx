import React, { ReactElement } from 'react'
import TruncateMarkup from 'react-truncate-markup'
export const truncateString = (str: string, len: number, append: string): string => {
  // this is inspired by lodash's _.truncate function
  if (len >= str.length) {
    return str
  }
  return str.substring(0, str.lastIndexOf(' ', len)) + append
  // return str.replace(/^(.{12}[^\s]*).*/, '$1') + append
  // dug this old beauty up. ^
}

export const PrimitiveTruncateMarkUp = TruncateMarkup

export interface TruncateUsageProps {
  text?: string | React.ReactNode;
  length?: number;
  modifier?: string;
}

export const CharTruncate: React.FC<TruncateUsageProps> = ({
  text,
  length,
  modifier
}) => {
  const truncatedText = truncateString(text as string, length, modifier)
  return <>{truncatedText}</>
}

CharTruncate.displayName = 'CharTruncate'
CharTruncate.defaultProps = {
  text: '',
  length: 10,
  modifier: '...'
}

export const LineTruncate: React.FC<TruncateUsageProps> = ({
  modifier,
  text
}) => (
  <TruncateMarkup
    lines={1}
    ellipsis={modifier}
  >
    <div>
      {text}
    </div>
  </TruncateMarkup>
)
LineTruncate.displayName = 'LineTruncate'
LineTruncate.defaultProps = {
  text: '',
  modifier: '...'
}

export interface TruncateProps extends TruncateUsageProps {
  truncateType?: 'none' | 'character' | 'line',
  atom?: ReactElement
}

export const Truncate: React.FC<TruncateProps> = ({
  truncateType,
  ...rest
}) => {
  if (truncateType === 'character') {
    return <CharTruncate {...rest} />
  }
  if (truncateType === 'line') {
    return <LineTruncate {...rest} />
  }
  if (truncateType === 'none') {
    return <>{rest.text}</>
  }
}

Truncate.displayName = 'Truncate'
Truncate.defaultProps = {
  text: '',
  modifier: '...',
  length: 10,
  truncateType: 'line'
}
