import { addScopedCSS, ScopedNames } from './addScopedCSS';
import { getStyleItCacheTagString as _getStyleItCacheTagString } from './getStyleItCacheTagString';
import { removeScopedCSS } from './removeScopedCSS';
import { StyleInfo } from '../css';
import { replaceScopedCSS } from './replaceScopedCSS';

export function add(styleInfo: StyleInfo): ScopedNames {
  return addScopedCSS(styleInfo);
}

export function replace(removeInfo: StyleInfo, addInfo: StyleInfo): ScopedNames {
  return replaceScopedCSS(removeInfo, addInfo);
}

export function remove(styleInfo: StyleInfo): void {
  removeScopedCSS(styleInfo);
}

export function getStyleItCacheTagString(): string {
  return _getStyleItCacheTagString();
}
