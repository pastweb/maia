import { Theme } from '@maia/styleit';
import { cloneElement, createContext, useContext } from 'react';
import { checkTheme } from './util';
import { StyleIt } from './StyleIt';
import { ThemeProviderProps, StyleItProps } from './types';

export function getStyleIt(theme?: Theme) {
  theme = checkTheme(theme);
  let currentTheme = theme;
  let ThemeContext = createContext(theme);

  const useTheme = () => useContext(ThemeContext);

  return {
    StyleIt: (props: StyleItProps) => <StyleIt useTheme={useTheme} { ...props } />,
    ThemeProveder: ({ theme, children, ...restProps }: ThemeProviderProps) => {
      theme = checkTheme(theme);
    
      if (theme !== currentTheme) {
        currentTheme = theme;
        ThemeContext = createContext(theme);
      }
      
      return (
        <ThemeContext.Provider value={theme}>
          {cloneElement(children, restProps)}
        </ThemeContext.Provider>
      );
    },
  }
}
