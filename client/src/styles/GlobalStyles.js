import { createGlobalStyle } from 'styled-components';
import { reducedMotion } from './animations';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    line-height: 1.5;
    transition: background-color ${({ theme }) => theme.transitions.normal}, color ${({ theme }) => theme.transitions.normal};
    min-height: 100vh;
    overflow-x: hidden;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.fast};

    &:hover {
      color: ${({ theme }) => theme.colors.primaryHover};
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.borderFocus};
      outline-offset: 2px;
      border-radius: ${({ theme }) => theme.radius.xs};
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.borderFocus};
      outline-offset: 2px;
      border-radius: ${({ theme }) => theme.radius.xs};
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  input, select, textarea {
    font-family: inherit;
    font-size: inherit;
    color: inherit;

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.borderFocus};
      outline-offset: 1px;
    }
  }

  code, pre {
    font-family: ${({ theme }) => theme.typography.monoFontFamily};
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 4px;

    &:hover {
      background: ${({ theme }) => theme.colors.textMuted};
    }
  }

  ${reducedMotion}
`;

