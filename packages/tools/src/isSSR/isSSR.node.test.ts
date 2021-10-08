import { isSSR } from './';

describe('isSSR server side', () => {
  it('isSSR should be false', () => {
    expect(isSSR).toBe(true);
  });
});