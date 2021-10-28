import { generateId } from './generateId';
import { getScopedStyle } from './getScopedStyle';
import { usePreProcessor } from './usePreProcessor';
import { updateCSS } from '../updateCSS';
import { Cache, StyleCache } from '../getCache';
import { UpdateTarget } from '../getUpdateTarget';
import { StyleInfo } from '../../css';
import { ScopedNames } from './types';

export function addScopedCSS(
  styleInfo: StyleInfo,
  cache: Cache,
  updateTarget: UpdateTarget,
  preProcessor: (scopedRules: string) => string,
  ): ScopedNames
{
  const { rules, styleKey, componentName } = styleInfo;
  
  if (!rules) {
    return {
      id: '',
      componentName,
      fontFamily: {},
      keyframes: {},
    };
  }

  let scopedNames: ScopedNames | null = null;

  if (!cache.style.has(styleKey)) {
    const id = generateId(cache.ids);

    const {
      fontFamily,
      keyframes,
      rules: scopedRules,
    } = getScopedStyle(styleInfo.rules, id);
    
    const css = usePreProcessor(styleInfo, scopedRules, preProcessor);

    cache.style.add(styleKey, {
      counter: 1,
      css,
      fontFamily,
      id,
      keyframes,
    });
    
    updateCSS(updateTarget, cache);
    
    scopedNames = { id, componentName, fontFamily, keyframes };
  } else {
    const styleCache: StyleCache = cache.style.get(styleKey);
    styleCache.counter += 1;
    cache.style.update(styleKey, styleCache);
    const { id, fontFamily, keyframes } = styleCache;
    scopedNames = { id, componentName, fontFamily, keyframes };
  }

  return scopedNames;
}
