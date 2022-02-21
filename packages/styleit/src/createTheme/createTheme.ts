import { isObject, mergeDeep } from '@maia/tools';
import { Theme, ThemeFunction } from './types';

export function createTheme(themes: (Theme | ThemeFunction)[], skipProps: string | string[] = []): Theme {
  let _theme: Theme = {
    fontFamily: {},
    keyframes: {},
  };

  const _skipProps = new Set(Array.isArray(skipProps) ? skipProps : [skipProps]);

  themes.forEach((curr: Theme | ThemeFunction) => {
    const themeObject = typeof curr === 'function' ? curr(_theme) : curr;
    _theme = mergeDeep(_theme, themeObject);
  });

  function interpolate(target: Theme): void {
    Object.entries(target).forEach(([prop, value]) => {
      if (isObject(value)) {
        interpolate(value as Theme);
      } else if (typeof value === 'function' && !_skipProps.has(prop)) {
        target[prop] = value(_theme);
      }
    });
  }

  interpolate(_theme);

  return _theme;
}
