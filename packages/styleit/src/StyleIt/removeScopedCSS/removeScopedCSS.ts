import { updateCSS } from '../updateCSS';
import { cache } from '../../cache';
import { StyleInfo } from '../../css';

export function removeScopedCSS(styleInfo: StyleInfo): void {
  if (cache.style.remove(styleInfo)) {
    updateCSS();
  }
}
