import { EventEmitter } from '@maia/tools';
import { getEmitter, initCache } from './util';
import { Cache } from './types';

export function getCache(): Cache {
  const emitter: EventEmitter = getEmitter();
  return initCache(emitter);
}
