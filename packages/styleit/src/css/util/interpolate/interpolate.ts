import { Theme } from '../../../createTheme';
import { isObject, mergeDeep } from '@maia/tools';
import { StyleOptions, TagArg, CSSObject, StyleObject } from '../../types';
import { cssToObject } from '../cssToObject';
import { stringify } from '../stringify';

function mergeTheme(obj: StyleObject, currentTheme: Theme): StyleObject {
  const options = obj.getOptions();
  const { forward, ...restOptions } = options;
  const theme = (forward as any).theme as Theme;
  obj.setOptions({
    forward: {
      ...forward,
      theme: mergeDeep(currentTheme, theme),
    },
    ...restOptions,
  });
  return obj;
}

export function interpolate(
  options: StyleOptions,
  style: TemplateStringsArray | CSSObject,
  args: any[]): CSSObject {
  const forward = options.forward || { theme: { fontFamily: {}, keyframes: {} } };

  function traverse(obj: CSSObject): CSSObject {
    return Object.entries(obj).reduce((acc, [prop, value]) => {
      if (isObject(value)) {
        const toTraverse = typeof (value as StyleObject).getStyleInfo === 'function' ?
        mergeTheme((value as StyleObject), forward.theme).getStyleInfo().cssObject : value;

        return { ...acc, [prop]: traverse(toTraverse as CSSObject) };
      }
      if (typeof value === 'function') {
        return { ...acc, [prop]: value(forward) };
      }
      return { ...acc, [prop]: value };
    }, {});
  }

  if (isObject(style)) {
    return traverse(style as CSSObject);
  }

  const rules = !args.length ? (style as TemplateStringsArray)[0] || '' : args.reduce(
    (acc: string[], cur: TagArg, i: number) => {    
      return `${acc}${
        isObject(cur) &&
        typeof (cur as StyleObject).getStyleInfo === 'function' ?
          stringify(mergeTheme(cur as StyleObject, forward.theme).getStyleInfo().cssObject) :
          typeof cur === 'function' ? cur(forward) : cur
      }${(style as TemplateStringsArray)[i+1]}`;
    },
    (style as TemplateStringsArray)[0] || ''
  );

  return cssToObject(rules);
}
