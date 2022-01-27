import { isObject } from '@maia/tools';

export type Theme = {
  [prop: string]: string | number | Theme | ((theme: Theme) => string | number | Theme);
}

export function createTheme(themes: Theme[], skipProps: string | string[] = []): Theme {
  let _theme = {};
  const _skipProps = new Set(Array.isArray(skipProps) ? skipProps : [skipProps]);

  function mergeDeep(theme: Theme): Theme {
    return Object.entries(theme).reduce((acc, [prop, value]) => {
      if (isObject(value)) {
        return { ...acc, [prop]: mergeDeep(value as Theme) };
      }

      return { ...acc, [prop]: value };
    }, _theme);
  }

  themes.forEach((theme: Theme) => {
    _theme = mergeDeep(theme);
  });

  function interpolate(theme: Theme): Theme {
    return Object.entries(theme).reduce((acc, [prop, value]) => {
      if (typeof value === 'function' && !_skipProps.has(prop)) {
        return { ...acc, [prop]: value(acc) };
      }

      return acc;
    }, _theme);
  }

  return interpolate(_theme);
}
