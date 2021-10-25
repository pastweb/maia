import { updateCSS } from '../updateCSS';
import { UpdateTarget } from '../getUpdateTarget';
import { Cache, StyleCache } from '../getCache';
import { StyleDetail } from '../css';

export function removeScopedCSS(styleDetail: StyleDetail, cache: Cache, updateTarget: UpdateTarget): void {
  const { styleKey } = styleDetail;

  if (!cache.style.has(styleKey)) return;
  const styleCache: StyleCache = cache.style.get(styleKey);

  if (styleCache.counter === 1) {
    cache.style.remove(styleKey, styleCache);
    updateCSS(updateTarget, cache);
  } else {
    styleCache.counter -= 1;
    cache.style.update(styleKey, styleCache);
  }
}
