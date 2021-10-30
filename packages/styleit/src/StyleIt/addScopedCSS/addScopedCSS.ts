import { updateCSS } from '../updateCSS';
import { Cache, StyleCache } from '../getCache';
import { UpdateTarget } from '../getUpdateTarget';
import { StyleInfo } from '../../css';
import { ScopedNames } from './types';
import { createStyleCache } from '../createStyleCahe/createStyleCache';

export function addScopedCSS(styleInfo: StyleInfo, cache: Cache, updateTarget: UpdateTarget): ScopedNames
{
  const { rules, styleKey, name } = styleInfo;
  
  if (!rules) {
    return {
      id: '',
      name,
      fontFamily: {},
      keyframes: {},
    };
  }

  let styleCache: StyleCache | null = null;

  if (!cache.style.has(styleKey)) {
    styleCache = createStyleCache(styleInfo, cache);
    cache.style.add(styleKey, styleCache);
    updateCSS(updateTarget, cache);
  } else {
    styleCache = cache.style.get(styleKey);
    styleCache.counter += 1;
    cache.style.update(styleKey, styleCache);
  }

  const { id, fontFamily, keyframes } = styleCache;

  return { id, name, fontFamily, keyframes };;
}
