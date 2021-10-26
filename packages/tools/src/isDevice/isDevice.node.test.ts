import { isDevice } from './';

describe('isDevice - server side.', () => {
  it('isMobile should be false on the server side', () => {
    expect(JSON.stringify(isDevice())).toBe(JSON.stringify({}));
  });

  it('when the useAgent is not defined it should return false.', () => {
    const { isMobile } = isDevice({ mobile: {} });
    expect(isMobile).toBe(false);
  });

  it('when the useAgent and uaRegExp are defined it should return true.', () => {
    const { isMobile } = isDevice({ mobile: { uaRegExp: true, userAgent: 'iPhone' } });
    expect(isMobile).toBe(true);
  });
});
