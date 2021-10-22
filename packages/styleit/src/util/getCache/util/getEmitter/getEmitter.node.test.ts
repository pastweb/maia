import { getEmitter } from './getEmitter';

describe('getEmitter', () => {
  it('emitter should be defined.', () => {
    const emitter = getEmitter();
    expect(emitter).toBeDefined();
  });
});