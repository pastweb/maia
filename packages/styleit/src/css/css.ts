import { Style, StyleOptions, StyleInfo, TagArg } from './types';
import { hashCode } from './hashCode';
import { isObject } from '@maia/tools';

export function css(styleStrings: TemplateStringsArray, ...args: any[]): Style
{
  const info = Symbol();
  const styles: Style = Object.freeze({
    [info]: {
      data: {
        argsAsArray: false,
        name: '',
        fileName: '',
        forwardArgs: {},
      }
    },
    setOptions(styleOptions = {}): Style {
      styles[info].data = { ...styles[info].data, ...styleOptions };
      return styles;
    },
    getOptions(): StyleOptions {
      return {
        ...styles[info].data,
        forwardArgs: { ... styles[info].data.forwardArgs },
      }
    },
    interpolate(): StyleInfo {
      const {
        argsAsArray,
        name,
        fileName,
        forwardArgs,
      } = styles[info].data;
      
      const rules = !args.length ? styleStrings[0] || '' : args.reduce(
        (acc: string[], cur: TagArg, i: number) => {
          const args = argsAsArray ? Object.values(forwardArgs) : [{ ...forwardArgs }];
          
          return `${acc}${
            isObject(cur) && typeof (cur as any).interpolate === 'function' ?
              (cur as any).interpolate().rules :
                typeof cur === 'function' ? cur(...args) : cur
          }${styleStrings[i+1]}`;
        },
        styleStrings[0] || ''
      );
      
      const styleKey = hashCode(rules);

      return {
        name,
        fileName,
        rules,
        styleKey,
      };
    },
  });

  return styles;
}
