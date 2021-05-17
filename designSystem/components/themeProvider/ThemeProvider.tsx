import React, { FC } from 'react'
import { ThemeProvider as SCThemeProvider, createGlobalStyle } from 'styled-components'
import LightTheme from '../../theme/lightTheme'
import { Helmet } from 'react-helmet'

export const GlobalStyle = createGlobalStyle`
  // we could do an even more robust reset here.
  body {
    box-sizing: border-box;
    font-family: 'Roboto','Helvetica Neue',Helvetica,Arial,sans-serif;
    color:#4C5F60; /*This need to be cleaned with Typescript. Won't let me access theme right now. This will need to be done before true themeing can happen */
  }
  table {
    border-collapse: collapse;
  }
  button {
    color: inherit;
  }
  * {
    vertical-align: baseline;
    font-weight: inherit;
    font-family: 'Roboto','Helvetica Neue',Helvetica,Arial,sans-serif;
    font-style: inherit;
    border: 0 none;
    outline: 0;
    padding: 0;
    margin: 0;
  }
`

const themesObject = {
  light: LightTheme
}

export interface ThemeProviderProps {
  theme: 'light' | 'dark' | 'patient';
  omitGlobalStyles?: boolean;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({
  theme,
  omitGlobalStyles,
  children
}) => {
  return (
    <SCThemeProvider
      theme={themesObject[theme]} // THEMES OF THEMES OF THEMES.
    >
      <Helmet>
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link href='https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap' rel='stylesheet' />
      </Helmet>
      {!omitGlobalStyles && <GlobalStyle />}
      {children}
    </SCThemeProvider>
  )
}

ThemeProvider.defaultProps = {
  theme: 'light',
  omitGlobalStyles: false
}
