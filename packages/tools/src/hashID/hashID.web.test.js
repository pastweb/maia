import { hashID } from './';
import { isObject } from '../isObject';

describe('hashID', () => {
  it('hashID should be an objct', () => {
    expect(isObject(hashID)).toBe(true);
  });

  it('hashID should contains the "generate" function', () => {
    expect(typeof hashID.generate).toBe('function');
  });

  it('hashID should contains the "generateUnique" function', () => {
    expect(typeof hashID.generateUnique).toBe('function');
  });
});