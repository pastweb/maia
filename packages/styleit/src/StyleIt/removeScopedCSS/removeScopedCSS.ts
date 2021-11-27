import { updateCSS } from '../updateCSS';
import { cache, StyleCache } from '../../cache';
import { StyleInfo } from '../../css';

export function removeScopedCSS(styleInfo: StyleInfo): void {
  const { styleKey } = styleInfo;

  if (!cache.style.has(styleKey)) return;
  const styleCache: StyleCache = cache.style.get(styleKey);

  if (styleCache.counter === 1) {
    cache.style.remove(styleKey, styleCache);
    updateCSS();
  } else {
    styleCache.counter -= 1;
    cache.style.update(styleKey, styleCache);
  }
}
