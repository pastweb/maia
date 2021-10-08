import { isMobile } from './';

describe('isMobile - server side.', () => {
  it('isMobile should be false on the server side', () => {
     expect(isMobile()).toBe(false);
  });

  it('when forced to true it should return true.', () => {
    expect(isMobile({ isMobile: true } )).toBe(true);
  });
});