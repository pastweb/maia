import { isSSR, EventEmitter } from '@maia/tools';
import {
  GLOBAL_EMITTER_NAME,
} from '../../../../constants';
import { readOnlyProp } from '../readOnlyProp';

export function getEmitter(): EventEmitter {
  let emitter: EventEmitter = isSSR ? new EventEmitter() : window[GLOBAL_EMITTER_NAME];

  if (!emitter) {
    emitter = new EventEmitter();
    readOnlyProp(window, GLOBAL_EMITTER_NAME, emitter);
  }

  return emitter;
}
