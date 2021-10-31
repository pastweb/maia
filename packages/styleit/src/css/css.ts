import { StyleObject, ForwardArgs, StyleOptions, StyleInfo, TagArg } from './types';
import { hashCode } from './hashCode';
import { isObject } from '@maia/tools';

export function css(styleStrings: TemplateStringsArray, ...args: any[]): StyleObject
{
  const options = Symbol();
  const styles: StyleObject = Object.freeze({
    [options]: {
      data: {
        argsAsArray: false,
        argsSelector: [],
        fileName: '',
        forward: {},
        name: '',
        validate: {},
      }
    },
    setOptions(styleOptions = {}): StyleObject {
      styles[options].data = { ...styles[options].data, ...styleOptions };
      return styles;
    },
    getOptions(): StyleOptions {
      return {
        ...styles[options].data,
        forward: { ... styles[options].data.forward },
      }
    },
    interpolate(): StyleInfo {
      const {
        argsAsArray,
        argsSelector,
        fileName,
        forward,
        name,
        validate,
      } = styles[options].data;
      
      const toValidate = Object.entries(validate || {});
      
      if (toValidate.length) {
        toValidate.forEach(([ argName, validFunc]: [string, (arg: any) => boolean]) => {
          if (!validFunc(forward[argName])) {
            throw new Error(`@maia/styleit - css validation error in: ${fileName.length ? `${fileName} -` : ''}${name} for arg "${argName}"`);
          }
        });
      }

      const selectedArgs = argsSelector.length ? argsSelector.reduce(
        (acc: ForwardArgs, argName: string) => {
          return { ...acc, [argName]: forward[argName] };
        }, {}
      ) : forward;
      
      const rules = !args.length ? styleStrings[0] || '' : args.reduce(
        (acc: string[], cur: TagArg, i: number) => {
          const args = argsAsArray ? Object.values(selectedArgs) : [{ ...selectedArgs }];
          
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
