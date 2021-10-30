import { updateCSS } from '../updateCSS';
import { UpdateTarget } from '../getUpdateTarget';
import { Cache, StyleCache } from '../getCache';
import { createStyleCache } from '../createStyleCahe';
import { StyleInfo } from '../../css';
import { ScopedNames } from '..';

export function replaceScopedCSS(removeInfo: StyleInfo, addInfo: StyleInfo, cache: Cache, updateTarget: UpdateTarget): ScopedNames {
  const { styleKey: removeKey } = removeInfo;
  const { styleKey: addKey } = addInfo;
  let update = false;

  if (cache.style.has(removeKey)) {
    const removeCache: StyleCache = cache.style.get(removeKey);

    if (removeCache.counter === 1) {
      cache.style.remove(removeKey, removeCache);
      update = true;
    } else {
      removeCache.counter -= 1;
      cache.style.update(removeKey, removeCache);
    }
  }

  let addCache : StyleCache | null = null;

  if (!cache.style.has(addKey)) {
    addCache = createStyleCache(addInfo, cache);
    cache.style.add(addKey, addCache);
    update = true;
  } else {
    addCache = cache.style.get(addKey);
    addCache.counter += 1;
    cache.style.update(addKey, addCache);
  }

  if (update) {
    updateCSS(updateTarget, cache);
  }

  const { name } = addInfo;
  const { id, fontFamily, keyframes } = addCache;

  return { id, name, fontFamily, keyframes };
}
