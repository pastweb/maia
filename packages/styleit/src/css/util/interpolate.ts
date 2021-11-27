import { isObject } from '@maia/tools';
import { StyleOptions, TagArg } from '../types';
import { applyId, ScopedStyle } from './applyId';

export function interpolate(id: string, options: StyleOptions, styleStrings: TemplateStringsArray, args: any[]): ScopedStyle {
  const { argsAsArray, forward = {} } = options;
  const rules = !args.length ? styleStrings[0] || '' : args.reduce(
    (acc: string[], cur: TagArg, i: number) => {
      const args = argsAsArray ? Object.values(forward) : [{ ...forward }];
      
      return `${acc}${
        isObject(cur) && typeof (cur as any).interpolate === 'function' ?
          (cur as any).interpolate().rules :
            typeof cur === 'function' ? cur(...args) : cur
      }${styleStrings[i+1]}`;
    },
    styleStrings[0] || ''
  );

  return applyId(rules, id);
}
