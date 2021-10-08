import { isSSR } from './';

describe('isSSR client side', () => {
  it('isSSR should be true', () => {
    expect(isSSR).toBe(false);
  });
});