
import { isSSR } from '@maia/tools';
import { GLOBAL_STYLE_CACHE_NAME } from '../../constants';
import { initCache } from '../initCache';
import { Cache } from '../types';

export function getCache(): Cache {
  if (!isSSR && window[GLOBAL_STYLE_CACHE_NAME]) {
    return window[GLOBAL_STYLE_CACHE_NAME];
  }

  return initCache();
}
