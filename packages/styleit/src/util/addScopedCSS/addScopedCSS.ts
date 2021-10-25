import { generateId } from '../generateId';
import { getScopedCSS } from '../getScopedCSS';
import { updateCSS } from '../updateCSS';
import { Cache, StyleCache } from '../getCache';
import { UpdateTarget } from '../getUpdateTarget';
import { StyleDetail } from '../css';
import { ScopedNames } from './types';

export function addScopedCSS(
  styleDetail: StyleDetail,
  cache: Cache,
  updateTarget: UpdateTarget,
  preProcessor: (scopedRules: string) => string,
  ): ScopedNames
{
  const { rules, styleKey, componentName } = styleDetail;
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
    const { css, fontFamily, keyframes } = getScopedCSS(styleDetail, id, preProcessor);

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
