import { createContext, useContext } from 'react';
import { ThemeProviderProps } from './types';
import { Theme } from '@maia/styleit';
import { checkTheme } from './util';

const defaultTheme: Theme = {
  fontFamify: {},
  keyframes: {},
};

let ThemeContext = createContext(defaultTheme);

export function ThemeProvider({ theme = defaultTheme, children }: ThemeProviderProps) {
  theme = checkTheme(theme);
  ThemeContext = createContext(theme);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
