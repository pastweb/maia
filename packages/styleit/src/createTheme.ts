import { isObject, mergeDeep } from '@maia/tools';

export type Theme = {
  [prop: string]: string | number | Theme | ((theme: Theme) => string | number | Theme);
}

export type ThemeFunction = (theme: Theme) => Theme;

export function createTheme(themes: any[], skipProps: string | string[] = []): Theme {
  let _theme = {};
  const _skipProps = new Set(Array.isArray(skipProps) ? skipProps : [skipProps]);

  themes.forEach((curr: any) => {
    const themeObject = typeof curr === 'function' ? curr(_theme) : curr;
    _theme = mergeDeep(_theme, themeObject);
  });

  function interpolate(target: any): void {
    Object.entries(target).forEach(([prop, value]) => {
      if (isObject(value)) {
        interpolate(value);
      } else if (typeof value === 'function' && !_skipProps.has(prop)) {
        target[prop] = value(_theme);
      }
    });
  }

  interpolate(_theme);

  return _theme;
}
