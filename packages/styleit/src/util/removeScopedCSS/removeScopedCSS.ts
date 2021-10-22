import { updateCSS } from '../updateCSS';
import { Cache, UpdateTarget, StyleCache } from '../types';

export function removeScopedCSS(rules: string, cache: Cache, updateTarget: UpdateTarget): void {
  if (!cache.style) return;
  if (!cache.style.has(rules)) return;
  const styleCache: StyleCache = cache.style.get(rules);

  if (styleCache.counter === 1) {
    cache.style.remove(rules, styleCache);
    updateCSS(updateTarget, cache);
  } else {
    styleCache.counter -= 1;
    cache.style.update(rules, styleCache);
  }
}
