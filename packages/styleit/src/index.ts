import {
  addScopedCSS,
  css,
  getCache,
  getUpdateTarget,
  UpdateTarget,
  getStyleItCacheTagString as _getStyleItCacheTagString,
  removeScopedCSS,
  ScopedNames,
  StyleDetail,
} from './util';

const updateTarget: UpdateTarget = getUpdateTarget();
const cache = getCache();

export function add(styleDetail: StyleDetail): ScopedNames {
  return addScopedCSS(styleDetail, cache, updateTarget);
}

export { css }

export function remove(styleDetail: StyleDetail): void {
  removeScopedCSS(styleDetail, cache, updateTarget);
}

export const getStyleItCacheTagString = (): string => _getStyleItCacheTagString(cache);

export default Object.freeze({
  add,
  css,
  remove,
  getStyleItCacheTagString,
});
