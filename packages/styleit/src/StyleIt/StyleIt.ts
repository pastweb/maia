import { addScopedCSS, ScopedNames } from './addScopedCSS';
import { getCache, Cache } from './getCache';
import { getUpdateTarget, UpdateTarget } from './getUpdateTarget';
import { getStyleItCacheTagString as _getStyleItCacheTagString } from './getStyleItCacheTagString';
import { removeScopedCSS } from './removeScopedCSS';
import { StyleInfo } from '../css';
import { replaceScopedCSS } from './replaceScopedCSS';

const updateTarget: UpdateTarget = getUpdateTarget();
const cache: Cache = getCache();

export function add(styleInfo: StyleInfo): ScopedNames {
  return addScopedCSS(styleInfo, cache, updateTarget);
}

export function replace(removeInfo: StyleInfo, addInfo: StyleInfo): ScopedNames {
  return replaceScopedCSS(removeInfo, addInfo, cache, updateTarget);
}

export function remove(styleInfo: StyleInfo): void {
  removeScopedCSS(styleInfo, cache, updateTarget);
}

export function getStyleItCacheTagString(): string {
  return _getStyleItCacheTagString(cache)
}
