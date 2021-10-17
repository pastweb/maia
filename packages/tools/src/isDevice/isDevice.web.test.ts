import { defaultUaRegExp, isDevice, resetMediaQueryCache } from './isDevice';
import { DevicesConfig, IsDevicesResult } from './types';
import { setUserAgent, MatchMedia } from '@maia/test';

let matchMedia: MatchMedia;

const testUA = [
  'iPad',
  'iPhone',
  'iPod',
  'blackberry',
  'Android',
  'windows phone',
  'Windows Phone'
];

const devicesConfig: DevicesConfig = {
  mobile: { uaRegExp: true },
  phone: { mediaQueryString: '(max-width: 320px)' },
  tablet: { mediaQueryString: '(max-width: 600px)' },
  desktop: { mediaQueryString: '(max-width: 1024px)' },
  tv: { mediaQueryString: '(min-width: 1025px)' },
  iPad: { uaRegExp: /iPad/, },
  iPhone: { uaRegExp: /iPhone/ },
  iPod: { uaRegExp: /iPod/ },
  blackberry: { uaRegExp: /blackberry/ },
  Android: { uaRegExp: /Android/ },
  'windows phone': { uaRegExp: /windows phone/ },
  'Windows Phone': { uaRegExp: /Windows Phone/ },
};

describe('isDevice - web', () => {
  beforeAll(() => {
    matchMedia = new MatchMedia();
  });

  beforeEach(() => {
    setUserAgent();
  });
 
  afterEach(() => {
    matchMedia.clear();
  });

  describe('defaultUaRegExp', () => {
    it.each(testUA)
      (`the uaRegex test function should return true for "%s"`, (ua: string) => {
        expect(ua).toMatch(defaultUaRegExp);
      });
  });

  describe('devicesConfig', () => {
    it.each(Object.entries(devicesConfig))
      (`the property "isDeviceName" in devices result Object sould be true`, (device, config) => {
        const { mediaQueryString, uaRegExp } = config;
        if (!mediaQueryString && uaRegExp) {
          const isDeviceName = `is${device.charAt(0).toUpperCase()}${device.slice(1)}`;
          if (typeof uaRegExp === 'boolean') {
            setUserAgent('iPhone');
          } else {
            setUserAgent(device);
          }
          const devices = isDevice(devicesConfig);
          expect(devices[isDeviceName]).toBe(true);
        }
      });

      it.each(Object.entries(devicesConfig))
        (`for the device "%s" the mediaQuery should match so "isDeviceName" should be true`, (device, config) => {
          const { mediaQueryString, uaRegExp } = config;
          if (mediaQueryString && !uaRegExp) {
            const isDeviceName = `is${device.charAt(0).toUpperCase()}${device.slice(1)}`;
            matchMedia = new MatchMedia(mediaQueryString);
            const devices = isDevice(devicesConfig);
            expect(devices[isDeviceName]).toBe(true);
          }
        });

      it.each(Object.entries(devicesConfig))
        (`for the device "%s" the mediaQuery listener should be called.`, (device, config) => {
          const { mediaQueryString, uaRegExp } = config;
          if (mediaQueryString && !uaRegExp) {
            resetMediaQueryCache();
            let devicesResult: IsDevicesResult = {};
            
            const onMediaQueryChange = jest.fn().mockImplementation((devices: IsDevicesResult) => {
              devicesResult = devices;
            });
            
            const devices = isDevice(devicesConfig, onMediaQueryChange);
            matchMedia.useMediaQuery(mediaQueryString);

            expect(onMediaQueryChange).toHaveBeenCalledTimes(1);
          }
        });
  });
});
