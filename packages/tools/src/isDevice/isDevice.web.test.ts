import { defaultUaRegExp } from './isDevice';
import { IsDeviceCallbackEvent } from './types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const onMediaQueryChange = (e: IsDeviceCallbackEvent) => {
  /** */
};

window.matchMedia = jest.fn().mockImplementation(() => {
  return {
    matches: true,
    media: '',
    onchange: onMediaQueryChange,
    addListener: jest.fn(),
    removeListener: jest.fn()
  };
});

describe('isDevice', () => {
  it(`the uaRegex test function should return true for "iPad"`, () => {
    expect(defaultUaRegExp.test('iPad')).toBe(true);
  });

  // it('should return true if the mediaQuery matches is true.', () => {
  //   const mediaQueryString = '(max-width: 600px)';
  //   expect(isDevice({ mediaQueryString })).toBe(true);
  // });
});
