import { StyleObject, StyleOptions, StyleInfo, CSSObject } from './types';
import { stringify, hash } from './util';
import { cache } from '../cache';
import {
  validateArgs,
  selectArgs,
  interpolate,
  applyStyleKey,
  parse,
} from './util';

export function css(styleStrings: TemplateStringsArray | CSSObject, ...args: any[]): StyleObject
{
  const data = Symbol();

  const styles: StyleObject = {
    [data]: {
      info: {
        classId: '',
        frameworkId: '',
        name: '',
        fileName: '',
        frameworkName: '',
        fontFamily: {},
        keyframes: {},
        cssObject: {},
        css: '',
        styleKey: '',
      },
      options: {
        argsAsArray: false,
        argsSelector: [],
        fileName: '',
        forward: {},
        frameworkName: '',
        useFrameworkClassId: false,
        name: '',
        validate: {},
      },
    },
    setOptions(styleOptions = {}): StyleObject {
      styles[data].options = { ...styles[data].options, ...styleOptions };
      return styles;
    },
    getOptions(): StyleOptions {
      return { ...styles[data].options };
    },
    getStyleInfo(): StyleInfo {
      const { name, fileName, frameworkName, useFrameworkClassId } = styles[data].options;

      validateArgs(styles[data].options);
      const selectedArgs = selectArgs(styles[data].options);
      const forwardOptions = { ...styles[data].options, forward: selectedArgs };

      const cssObject = interpolate(forwardOptions, styleStrings, args);
      const scss = stringify(cssObject);
      const styleKey = hash(scss);
      
      let { fontFamily, keyframes, css, classId } = styles[data].info;
      const _frameworkId = frameworkName && cache.frameworks[frameworkName] ||
        frameworkName && styleKey;
      const frameworkId = useFrameworkClassId ? '' : _frameworkId;
      classId = useFrameworkClassId ? _frameworkId : styleKey;
      
      if (styleKey !== styles[data].info.styleKey) {
        const withKey = applyStyleKey(scss, classId);
        const { fontFamily: _fontFamily, keyframes: _keyframes } = withKey; 
        const _css = parse(withKey.scoped, `.${classId}`);
        fontFamily = _fontFamily;
        keyframes = _keyframes;
        css = _css;
      }

      styles[data].info = {
        classId,
        frameworkId,
        name,
        fileName,
        frameworkName,
        fontFamily,
        keyframes,
        css,
        cssObject,
        styleKey,
      };

      return Object.freeze(styles[data].info);
    },
  };

  return Object.freeze(styles);
}
