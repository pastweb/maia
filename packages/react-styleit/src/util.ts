import { isObject } from '@maia/tools';
import styleIt, { ForwardArgs, ScopedNames, Theme } from '@maia/styleit';
import { StyleItState } from './types';

export const defaultTheme: Theme = {
  fontFamify: {},
  keyframes: {},
};

export function checkTheme(theme?: Theme): Theme {
  theme = theme || defaultTheme;
  if (!isObject(theme)) {
    throw new Error('@maia/react - StyleIt - ThemeProvider() error:\nThe theme argument must be an Object.');
  } else if (theme !== defaultTheme) {
    const themeKeys = Object.keys(theme);
    
    if (themeKeys.filter(key => key === 'fontFamily' || key === 'keyframes').length < 2) {
      theme.fontFamily = theme.fontFamily || {};
      theme.keyframes = theme.keyframes || {};
    }  
  }
  return theme;
}

export function updateState(props: any, theme: Theme): StyleItState {
  const { options = { forward: {} }, forward = {}, styles } = props;
  
  const _forward: ForwardArgs = { ...forward, theme };
  
  const styleObject = typeof styles === 'function'? styles(_forward) : styles;

  const newOptions = { ...options, forward: { ..._forward } };
  const styleInfo = styleObject.setOptions(newOptions).getStyleInfo();

  const scopedNames: ScopedNames = styleIt.add(styleInfo);
  
  return {
    styleInfo,
    scopedNames, 
  };
}
