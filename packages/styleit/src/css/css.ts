import { Style, StyleSettings, StyleInfo } from './types';
import { hashCode } from './hashCode';

export function css(styleStrings: TemplateStringsArray, ...args: any[]): Style
{
  const info = Symbol();
  const styles = Object.freeze({
    [info]: {
      data: {
        argsAsArray: false,
        componentName: '',
        fileName: '',
        forwardArgs: {},
      }
    },
    set(styleSettings = {}): Style {
      styles[info].data = { ...styles[info].data, ...styleSettings };
      return styles;
    },
    getSettings(): StyleSettings {
      return {
        ...styles[info].data,
        forwardArgs: { ... styles[info].data.forwardArgs },
      }
    },
    make(): StyleInfo {
      const {
        argsAsArray,
        componentName,
        fileName,
        forwardArgs,
      } = styles[info].data;
      
      const rules = !args.length ? styleStrings[0] || '' : args.reduce(
        (acc: string[], cur: string | number | ((...args: any[]) => string | number), i: number) => {
          const args = argsAsArray ? Object.values(forwardArgs) : [{ ...forwardArgs }];
          return `${acc}${typeof cur === 'function' ? cur(...args) : cur }${styleStrings[i+1]}`;
        },
        styleStrings[0] || ''
      );
      
      const styleKey = hashCode(rules);

      return {
        componentName,
        fileName,
        rules,
        styleKey,
      };
    },
  });

  return styles;
}
