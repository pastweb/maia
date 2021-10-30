import { updateCSS } from '../updateCSS';
import { UpdateTarget } from '../getUpdateTarget';
import { Cache, StyleCache } from '../getCache';
import { StyleInfo } from '../../css';

export function removeScopedCSS(styleInfo: StyleInfo, cache: Cache, updateTarget: UpdateTarget): void {
  const { styleKey } = styleInfo;

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
