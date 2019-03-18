import * as React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';

import theme from './Theme';

interface IRootProps {
  className?: string;
}

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-family: ${theme.fonts.family.join(',')};
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    background-color: ${theme.colors.blueLightest};
  }

  input {
    border: 0;
  }

  a {
    color: ${theme.colors.greyDarker};
  }

  button {
    padding: ${theme.lengths.l2};
    background: ${theme.colors.transparent};
    border: 0;
    border-radius: ${theme.lengths.l1};
    cursor: pointer;
  }

  button,
  a,
  input {
    &:focus {
      outline: none;
    }
  }

  .root {
    height: 100vh;
  }

  p,
  h1,
  h2,
  h3,
  h4 {
    margin: 0;
  }

  ul {
    list-style: none;
  }
`;

const Root: React.SFC<IRootProps> = ({ children }) => (
  <React.Fragment>
    <Normalize />
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <React.Fragment>{children}</React.Fragment>
    </ThemeProvider>
  </React.Fragment>
);

export default Root;
