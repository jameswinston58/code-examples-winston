import React from 'react'
import styled from 'styled-components'
import { TypographyProps, typography } from 'styled-system'
import { BigScore, BigScoreProps } from '../bigScore'

const StyledInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: stretch;
`

const StyledBigScoreContainer = styled.div`
  flex-direction: row;
  display: flex;
  margin-right: ${({ theme }) => theme.space[3]}px;
`

interface ScoreLayoutProps extends BigScoreProps {
  topLeft?: unknown;
  bottomLeft?: unknown;
  topRight?: unknown;
  bottomRight?: unknown;
}

const StyledInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-around;
`

const StyledInfoRow = styled.div`
  display: flex;
  flex-direction: row;
`

const StyledInfoElement = styled.div<TypographyProps>`
  display: flex;
  flex-grow: 1;

  overflow: hidden;
  min-width: 0;
  width: 30%;
  ${typography}
`

export const ScoreLayout: React.FC<ScoreLayoutProps> = ({
  score,
  denominator,
  topLeft,
  bottomLeft,
  bottomRight,
  topRight
}) => (
  <>
    <StyledInfoContainer>
      <StyledBigScoreContainer>
        <BigScore score={score} denominator={denominator} />
      </StyledBigScoreContainer>
      <StyledInfoWrapper>
        <StyledInfoRow>
          <StyledInfoElement>{topLeft}</StyledInfoElement>
          <StyledInfoElement textAlign='right'>{topRight}</StyledInfoElement>
        </StyledInfoRow>
        <StyledInfoRow>
          <StyledInfoElement>{bottomLeft}</StyledInfoElement>
          <StyledInfoElement textAlign='right'>{bottomRight}</StyledInfoElement>
        </StyledInfoRow>
      </StyledInfoWrapper>
    </StyledInfoContainer>
  </>
)

/*
I don't usually keep code. But when I do.
It's the old version of this layout where the columns were split differently.

import React from "react";
import styled from "styled-components";
import { BigScore, BigScoreProps } from "../bigScore";
import { Box } from "../box";

const StyledInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: stretch;
`;

const StyledBigScoreContainer = styled.div`
  flex-direction: column;
  align-items: flex-start;
  display: flex;
  align-content: stretch;
  margin-right: ${({ theme }) => theme.space[3]}px;
`;

interface InfoColumnProps {
  dualBlock?: boolean;
}

const StyledInfoStackColumn = styled.div<InfoColumnProps>`
  height: 100%;
  flex-direction: column;
  align-items: flex-start;
  align-content: stretch;
  justify-content: ${({ dualBlock }) => dualBlock ? "space-around" : "flex-start" };
  display: flex;
`;

interface ScoreLayoutProps extends BigScoreProps {
  topLeft?: unknown;
  bottomLeft?: unknown;
  topRight?: unknown;
  bottomRight?: unknown;
}

export const ScoreLayout: React.FC<ScoreLayoutProps> = ({
  score,
  denominator,
  topLeft,
  bottomLeft,
  bottomRight,
  topRight,
}) => (
  <StyledInfoContainer>
    <StyledBigScoreContainer>
      <BigScore score={score} denominator={denominator} />
    </StyledBigScoreContainer>
    <Box flex={1} mr={3}>
      <StyledInfoStackColumn
        dualBlock={true}
      >
        {topLeft && (
            <Box display="block">{topLeft}</Box>
        )}
        {bottomLeft && (
            <Box display="block">{bottomLeft}</Box>
        )}
      </StyledInfoStackColumn>
    </Box>
    <Box flex={1} mr={3}>
      <StyledInfoStackColumn
       dualBlock={false}
      >
        {topRight && (
            <Box display="block">{topRight}</Box>
        )}

        {bottomRight && (
            <Box display="block">{bottomRight}</Box>
        )}

      </StyledInfoStackColumn>
    </Box>
  </StyledInfoContainer>
);

*/
