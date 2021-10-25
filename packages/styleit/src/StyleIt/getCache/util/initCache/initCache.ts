import { isSSR, EventEmitter } from '@maia/tools';
import { getStyleMapper } from '../getStyleMapper';
import {
  GLOBAL_IDS_CACHE_NAME,
  GLOBAL_STYLE_CACHE_NAME,
  SCRIPT_TAG_NAME,
  MAIA_STYLEIT_GET_CACHE_EVENT
} from '../../../../util/constants';
import { Cache, StyleMap } from '../../types';

export function initCache(emitter: EventEmitter): Cache {
  let styleMap: StyleMap = {};
  const cache = getStyleMapper(styleMap, emitter);

  if (!isSSR) {
    if (window[GLOBAL_IDS_CACHE_NAME] && window[GLOBAL_STYLE_CACHE_NAME]) {
      cache.ids = new Set(JSON.parse(window[GLOBAL_IDS_CACHE_NAME]));
      styleMap = JSON.parse(window[GLOBAL_STYLE_CACHE_NAME]);
      cache.style.setStyleMap(styleMap);
      
      delete window[GLOBAL_IDS_CACHE_NAME];
      delete window[GLOBAL_STYLE_CACHE_NAME];
      
      const styleitScriptTag = document.getElementById(SCRIPT_TAG_NAME);
      
      if (styleitScriptTag) {
        styleitScriptTag.remove();
      }
    } else {
      (async () => {
        await emitter.emit(MAIA_STYLEIT_GET_CACHE_EVENT);
      })()
    }
  }

  return cache;
}