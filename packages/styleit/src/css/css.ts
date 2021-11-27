import { cache } from '../cache';
import { StyleObject, StyleOptions, StyleInfo } from './types';
import { validateArgs, selectArgs, generateId, interpolate } from './util';

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
      return { ...styles[options].data };
    },
    interpolate(): StyleInfo {
      const _options = styles[options].data;
      const { name, fileName } = _options;

      const styleKey = generateId(cache.ids);

      validateArgs(_options);

      const selectedArgs = selectArgs(_options);

      const { fontFamily, keyframes, rules, scopedRules } = interpolate(
        styleKey,
        { ..._options, forward: selectedArgs },
        styleStrings,
        args
      );

      return {
        name,
        fileName,
        fontFamily,
        keyframes,
        rules,
        scopedRules,
        styleKey,
      };
    },
  });

  return styles;
}
