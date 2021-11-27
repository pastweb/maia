import { updateCSS } from '../updateCSS';
import { Cache, StyleCache } from '../../cache';
import { UpdateTarget } from '../getUpdateTarget';
import { StyleInfo } from '../../css';
import { ScopedNames } from './types';
import { createStyleCache } from '../createStyleCahe';

export function addScopedCSS(styleInfo: StyleInfo, cache: Cache, updateTarget: UpdateTarget): ScopedNames
{
  const { rules, styleKey, name, fontFamily, keyframes } = styleInfo;
  
  if (!rules) {
    return {
      styleKey: '',
      name,
      fontFamily: {},
      keyframes: {},
    };
  }

  let styleCache: StyleCache;

  if (!cache.style.has(styleKey)) {
    styleCache = createStyleCache(styleInfo);
    cache.style.add(styleKey, styleCache);
    updateCSS(updateTarget, cache);
  } else {
    styleCache = cache.style.get(styleKey);
    styleCache.counter += 1;
    cache.style.update(styleKey, styleCache);
  }

  return { styleKey, name, fontFamily, keyframes };;
}
