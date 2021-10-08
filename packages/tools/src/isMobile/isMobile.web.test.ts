import { isMobile, uaRegex } from './isMobile';
import { IsMobileCallbackEvent } from './types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const onMediaQueryChange = (e: IsMobileCallbackEvent) => { /** */ }

window.matchMedia = jest.fn().mockImplementation(() => {
  return {
    matches: true ,
    media: '',
    onchange: onMediaQueryChange,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
});

describe('isMobile', () => {
  it(`the uaRegex test function should return true for "iPad"`, () => {
    expect(uaRegex.test('iPad')).toBe(true);
  });

  it('should return true if the mediaQuery matches is true.', () => {
    const mediaQueryString = '(max-width: 600px)';
    expect(isMobile({ mediaQueryString })).toBe(true);
  });
});