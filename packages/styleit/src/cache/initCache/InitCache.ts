import { isSSR } from '@maia/tools';
import { Cache, StyleMap, StyleCache } from '../types';
import { StyleInfo } from '../../css';
import { GLOBAL_STYLE_CACHE_NAME } from '../../constants';

const styleMap = Symbol();

export function initCache(): Cache {
  let frameworks: { [name: string]: string } = {};
  let _styleMap: StyleMap = {};

  if (!isSSR) {
    if (window[GLOBAL_STYLE_CACHE_NAME]) {
      const globalCahe = JSON.parse(window[GLOBAL_STYLE_CACHE_NAME]);
      frameworks = globalCahe.frameworks;
      _styleMap = globalCahe.styleMap;
      delete window[GLOBAL_STYLE_CACHE_NAME];
    }
  }

  const cache: Cache = {
    [styleMap]: _styleMap,
    frameworks,
    style: {
      has: (styleKey: string): boolean => !!cache[styleMap][styleKey],
      get: (styleKey: string): StyleCache => cache[styleMap][styleKey],
      getStyleMap: (): StyleMap => cache[styleMap],
      setStyleMap: (newStyleMap: StyleMap): void => {
        cache[styleMap] = newStyleMap;
      },
      add: (styleInfo: StyleInfo) => {
        const { styleKey, frameworkName, css } = styleInfo;
        let updateTargetCSS = false;
      
        if (!cache[styleMap][styleKey]) {
          if (frameworkName && !cache.frameworks[frameworkName]) {
            cache.frameworks[frameworkName] = styleKey;
          }
          const styleCache = {
            counter: 0,
            css,
          };
          cache[styleMap][styleKey] = styleCache;
          updateTargetCSS = true;
        } else {
          cache[styleMap][styleKey].counter ++;
        }

        return updateTargetCSS;
      },
      replace: (removeInfo: StyleInfo, addInfo: StyleInfo): boolean => {
        let response = cache.style.remove(removeInfo);
        const addResponse = cache.style.add(addInfo);
        if (!response) {
          response = addResponse;
        }
        return response;
      },
      remove: (styleInfo: StyleInfo): boolean => {
        const { styleKey, frameworkName } = styleInfo;
        let updateTargetCSS = false;

        if (cache[styleMap][styleKey]) {
          if (cache[styleMap][styleKey].counter) {
            cache[styleMap][styleKey].counter --;
          } else {
            if (cache.frameworks[frameworkName]) {
              delete cache.frameworks[frameworkName];
            }
            delete cache[styleMap][styleKey];
            updateTargetCSS = true;
          }
        }
        return updateTargetCSS;
      },
      size: 0,
      css: '',
    },
  };

  Object.defineProperties(cache.style, {
    size : {
      get() { return Object.keys(cache[styleMap]).length; },
      set() { return; }
    },
    css : {
      get() {
        let CSS = '';
        Object.values(cache[styleMap]).forEach(({ css }) => {
          CSS = `${CSS}${css}`;
        });
        return CSS;
      },
      set() { return; }
    },
  });

  return cache;
}
