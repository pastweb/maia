import { EventEmitter } from '@maia/tools';
import {
  MAIA_STYLEIT_CACHE_UPDATE_EVENT,
  MAIA_STYLEIT_GET_CACHE_EVENT,
} from '../../../constants';
import { Cache, StyleMap, StyleCache } from '../../types';

export function updateCache(cache: Cache, emitter: EventEmitter): void {
  emitter.emit(MAIA_STYLEIT_CACHE_UPDATE_EVENT, cache);
}

export function getStyleMapper(styleMap: StyleMap, emitter: EventEmitter): Cache {
  emitter.on(MAIA_STYLEIT_CACHE_UPDATE_EVENT, ({ ids, style }: Cache) => {
    cache.ids = ids;
    styleMap = style.getStyleMap();
  });
  emitter.on(MAIA_STYLEIT_GET_CACHE_EVENT, () => {
    emitter.emit(MAIA_STYLEIT_CACHE_UPDATE_EVENT, cache);
  });

  const cache: Cache = {
    ids: new Set(),
    style: {
      has: (rules: string): boolean => !!styleMap[rules],
      get: (rules: string): StyleCache => styleMap[rules],
      getStyleMap: (): StyleMap => styleMap,
      setStyleMap: (newStyleMap: StyleMap): void => {
        styleMap = newStyleMap;
      },
      add: (rules: string, styleCache: StyleCache) => {
        const { id } = styleCache;
        cache.ids.add(id);
        styleMap[rules] = styleCache;
        updateCache(cache, emitter);
      },
      update: (rules: string, styleCache: StyleCache): void => {
        if (!styleMap[rules]) return;
        styleMap[rules] = styleCache;
        updateCache(cache, emitter);
      },
      remove: (rules: string, styleCache: StyleCache): void => {
        cache.ids.delete(styleCache.id);
        delete styleMap[rules];
        updateCache(cache, emitter);
      },
      size: 0,
      css: '',
    },
  };

  Object.defineProperties(cache.style, {
    size : {
      get() { return Object.keys(styleMap).length; },
      set() { return; }
    },
    css : {
      get() {
        let CSS = '';
        Object.values(styleMap).forEach(({ css }) => {
          CSS = `${CSS}${css}`;
        });
        return CSS;
      },
      set() { return; }
    },
  });

  return cache;
}