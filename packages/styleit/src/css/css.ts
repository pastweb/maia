import { StyleObject, StyleOptions, StyleInfo, CSSObject } from './types';
import { stringify, hash } from './util';
import { cache } from '../cache';
import {
  validateArgs,
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
        cssObject: {},
        css: '',
        styleKey: '',
      },
      options: {
        fileName: '',
        forward: {
          theme: {
            fontFamily: {},
            keyframes: {},
          },
        },
        frameworkName: '',
        useFrameworkClassId: false,
        name: '',
        validate: {},
      },
    },
    setOptions(styleOptions = styles[data].options): StyleObject {
      styles[data].options = { ...styles[data].options, ...styleOptions };
      return styles;
    },
    getOptions(): StyleOptions {
      return styles[data].options;
    },
    getStyleInfo(): StyleInfo {
      const { options } = styles[data];
      const { name, fileName, frameworkName, useFrameworkClassId } = options;

      if (!options.forward) {
        options.forward = {
          theme: {
            fontFamily: {},
            keyframes: {},
          },
        };
      } else if(!options.forward.theme) {
        options.forward.theme = {
          fontFamily: {},
          keyframes: {},
        };
      } else if (!options.forward.theme.fontFamily) {
        options.forward.theme.fontFamily = {};
      } else if (!options.forward.theme.keyframes) {
        options.forward.theme.keyframes = {};
      }

      validateArgs(options);

      const cssObject = interpolate(options, styleStrings, args);
      const scss = stringify(cssObject);
      const styleKey = hash(scss);
      
      let { css, classId } = styles[data].info;
      const _frameworkId = frameworkName && cache.frameworks[frameworkName] ||
        frameworkName && styleKey;
      const frameworkId = useFrameworkClassId ? '' : _frameworkId;
      classId = useFrameworkClassId ? _frameworkId : styleKey;
      
      if (styleKey !== styles[data].info.styleKey) {
        const withKey = applyStyleKey(scss, classId);
        const { fontFamily, keyframes } = withKey; 
        const _css = parse(withKey.scoped, `.${classId}`);

        options.forward.theme.fontFamily = { ...options.forward.theme.fontFamily || {}, ...fontFamily };
        options.forward.theme.keyframes = { ...options.forward.theme.keyframes || {}, ...keyframes };
        css = _css;
      }

      styles[data].info = {
        classId,
        frameworkId,
        name,
        fileName,
        frameworkName,
        css,
        cssObject,
        styleKey,
      };

      return styles[data].info;
    },
  };

  return styles;
}
