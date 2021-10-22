import {
  addScopedCSS,
  getCache,
  getUpdateTarget,
  UpdateTarget,
  getStyleItCacheTagString,
  removeScopedCSS,
} from './util';
import { ScopedNames } from './util';

const updateTarget: UpdateTarget = getUpdateTarget();
const cache = getCache();

function add(rules: string): ScopedNames {
  return addScopedCSS(rules, cache, updateTarget);
}

function remove(rules: string): void {
  removeScopedCSS(rules, cache, updateTarget);
}

export const styleIt = Object.freeze({
  add,
  remove,
  getStyleItCacheTagString: (): string => getStyleItCacheTagString(cache),
});
