import { generateId } from '../generateId';
import { getScopedCSS } from '../getScopedCSS';
import { updateCSS } from '../updateCSS';
import { ScopedNames } from './types';
import { Cache, StyleCache, UpdateTarget } from '../types';

export function addScopedCSS(rules: string, cache: Cache, updateTarget: UpdateTarget): ScopedNames {
  if (!rules || !cache.style) {
    return {
      id: '',
      fontFamily: {},
      keyframes: {},
    };
  }

  let scopedNames: ScopedNames | null = null;

  if (!cache.style.has(rules)) {
    const id = generateId(cache.ids);
    const { css, fontFamily, keyframes } = getScopedCSS(rules, id);

    cache.style.add(rules, {
      counter: 1,
      css,
      fontFamily,
      id,
      keyframes,
    });
    
    updateCSS(updateTarget, cache);
    
    scopedNames = { id, fontFamily, keyframes };
  } else {
    const styleCache: StyleCache = cache.style.get(rules);
    styleCache.counter += 1;
    cache.style.update(rules, styleCache);
    const { id, fontFamily, keyframes } = styleCache;
    scopedNames = { id, fontFamily, keyframes };
  }

  return scopedNames;
}
