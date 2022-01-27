import { isObject } from '@maia/tools';
import { StyleOptions, TagArg, CSSObject, StyleObject } from '../../types';
import { cssToObject } from '../cssToObject';
import { stringify } from '../stringify';

export function interpolate(
  options: StyleOptions,
  style: TemplateStringsArray | CSSObject,
  args: any[]): CSSObject {
  const { argsAsArray, forward = {} } = options;
  const forwardArgs = argsAsArray ? Object.values(forward) : [{ ...forward }];

  function traverse(obj: CSSObject): CSSObject {
    return Object.entries(obj).reduce((acc, [prop, value]) => {
      if (isObject(value)) {
        const toTraverse = typeof (value as StyleObject).getStyleInfo === 'function' ?
          (value as StyleObject).getStyleInfo().cssObject : value;

        return { ...acc, [prop]: traverse(toTraverse as CSSObject) };
      }
      if (typeof value === 'function') {
        return { ...acc, [prop]: value(...forwardArgs) };
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
          stringify((cur as StyleObject).getStyleInfo().cssObject) :
          typeof cur === 'function' ? cur(...forwardArgs) : cur
      }${(style as TemplateStringsArray)[i+1]}`;
    },
    (style as TemplateStringsArray)[0] || ''
  );

  return cssToObject(rules);
}
