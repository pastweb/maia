import { isDevice } from './';

describe('isDevice - server side.', () => {
  it('isMobile should be false on the server side', () => {
    expect(JSON.stringify(isDevice())).toBe(JSON.stringify({}));
  });

  it('when forced to true it should return true.', () => {
    const { isMobile } = isDevice({ mobile: { forceTrue: true } });
    expect(isMobile).toBe(true);
  });
});
