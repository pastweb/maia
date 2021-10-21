import { renderHook } from '@testing-library/react-hooks';
import { useDevice, DevicesConfig, IsDevicesResult } from './';
import { MatchMedia, setUserAgent } from '@maia/test';

let matchMedia: MatchMedia;

describe('useDevice - web', () => {
  beforeAll(() => {
    matchMedia = new MatchMedia();
  });
 
  afterEach(() => {
    setUserAgent();
    matchMedia.clear();
  });

  it('the default uaRegex test function should return true for "iPhone"', () => {
    const devicesConfig: DevicesConfig = {
      mobile: { uaRegExp: true },
    };
    setUserAgent('iPhone');
    const { result } = renderHook(() => useDevice(devicesConfig));
    const devices: IsDevicesResult = result.current;
    const { isMobile } = devices;
    expect(isMobile).toBe(true);
  });
  
  it('the mediaQuery should match true for "isPone"', () => {
    const devicesConfig: DevicesConfig = {
      phone: { mediaQueryString: '(max-width: 320px)' },
    };
    const { mediaQueryString } = devicesConfig.phone;
    matchMedia.useMediaQuery(mediaQueryString as string);
    const { result } = renderHook(() => useDevice(devicesConfig));
    const devices: IsDevicesResult = result.current;

    const { isPhone } = devices;
    expect(isPhone).toBe(true);
  });

  it('`the mediaQuery should match true for "isMobile" and "isTablet"', () => {
    const devicesConfig: DevicesConfig = {
      mobile: { mediaQueryString: '(max-width: 600px)' },
      phone: { mediaQueryString: '(max-width: 320px)' },
      tablet: { mediaQueryString: '(max-width: 600px)' },
    };
    const { mediaQueryString } = devicesConfig.mobile;
    matchMedia.useMediaQuery(mediaQueryString as string);
    const { result } = renderHook(() => useDevice(devicesConfig));
    const devices: IsDevicesResult = result.current;

    const { isMobile, isTablet } = devices;
    expect(isMobile).toBe(true);
    expect(isTablet).toBe(true);
  });
});