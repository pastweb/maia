import { createContext, useContext } from 'react';
import { Theme, ThemeProviderProps } from './types';
import { isObject } from '@maia/tools';

const ThemeContext = createContext({});

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = (theme?: Theme) => {
  if (theme && !isObject(theme)) {
    throw new Error('@maia/react - StyleIt - useTheme() error:\nThe theme argument must be an Object.');
  }
  return useContext(theme ? createContext(theme) : ThemeContext);
};
