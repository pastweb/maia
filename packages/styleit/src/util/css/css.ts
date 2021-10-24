import { StyleDetail, StyleInfo } from './types';
import { hashCode } from '../hashCode';

export function css(styleStrings: TemplateStringsArray, ...args: any[]):
  (styleInfo?: StyleInfo) => StyleDetail
{
  const rules = !args.length ? styleStrings[0] || '' : args.reduce(
    (acc: string[], cur: string | number | (() => string | number), i: number) => {
      return `${acc}${typeof cur === 'function' ? cur() : cur }${styleStrings[i+1]}`;
    },
    styleStrings[0] || ''
  );

  return function(styleInfo = {}): StyleDetail {
    const {
      fileName = '',
      componentName = '',
      styleKey = hashCode(rules),
    } = styleInfo;
    return {
      rules,
      fileName,
      componentName,
      styleKey,
    };
  }
}

css.styleItCss = true;
