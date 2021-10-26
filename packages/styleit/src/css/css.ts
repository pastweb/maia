import { ForwardArgs, StyleDetail, FunctionInfo } from './types';
import { hashCode } from './hashCode';

export function css(styleStrings: TemplateStringsArray, ...args: any[]): FunctionInfo
{
  return Object.freeze({
    styleInfo (styleInfo = {}): FunctionInfo {
      const {
        fileName = '',
        componentName = '',
      } = styleInfo;
      
      return Object.freeze({
        forwardArgs (forwardArgs = {}): StyleDetail {
          const rules = !args.length ? styleStrings[0] || '' : args.reduce(
            (acc: string[], cur: string | number | ((forwardArgs: ForwardArgs) => string | number), i: number) => {
              return `${acc}${typeof cur === 'function' ? cur({ ...forwardArgs }) : cur }${styleStrings[i+1]}`;
            },
            styleStrings[0] || ''
          );

          return Object.freeze({
            rules,
            fileName,
            componentName,
            styleKey: hashCode(rules),
          });
        },
      });
    },
  });
}
