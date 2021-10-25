import { getEmitter } from './getEmitter';
import { EventEmitter } from '@maia/tools';
import {
  GLOBAL_EMITTER_NAME,
} from '../../../../util/constants';

describe('getEmitter', () => {
  it('if the emitter is present in the window Object, should be returned from getEmitter().', () => {
    window[GLOBAL_EMITTER_NAME] = new EventEmitter();
    const emitter = getEmitter();
    expect(window[GLOBAL_EMITTER_NAME] === emitter).toBe(true);
  });

  it('window[GLOBAL_EMITTER_NAME] should be defined, returned from getEmitter() and read only.', () => {
    if (window[GLOBAL_EMITTER_NAME]) {
      delete window[GLOBAL_EMITTER_NAME];
    }

    const emitter = getEmitter();
    expect(window[GLOBAL_EMITTER_NAME]).toBeDefined();
    expect(window[GLOBAL_EMITTER_NAME] === emitter).toBe(true);
    expect(() => {
      window[GLOBAL_EMITTER_NAME] = 0;
    }).toThrow();
  });
});