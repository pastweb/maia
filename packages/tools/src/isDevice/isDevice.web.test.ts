import { defaultUaRegExp, isDevice } from './isDevice';
import { DevicesConfig, IsDevicesResult } from './types';
import { setUserAgent, MatchMedia, MediaQueryListener } from '@maia/test';

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

describe('isDevice', () => {
  describe('defaultUaRegExp', () => {
    testUA.forEach((ua: string) => {
      it(`the uaRegex test function should return true for "${ua}"`, () => {
        expect(ua).toMatch(defaultUaRegExp);
      });
    });
  });

  describe('devices config', () => {
    beforeAll(() => {
      matchMedia = new MatchMedia();
    });
   
    afterEach(() => {
      matchMedia.clear();
    });

    Object.entries(devicesConfig).forEach(([device, config]) => {
      const isDeviceName = `is${device.charAt(0).toUpperCase()}${device.slice(1)}`;
  
      if (!config.mediaQueryString && config.uaRegExp) {
        it(`the property "${isDeviceName}" in devices result Object sould be true`, () => {
          if (typeof config.uaRegExp === 'boolean') {
            setUserAgent('iPhone');
          } else {
            setUserAgent(device);
          }
          const devices = isDevice(devicesConfig);
          expect(devices[isDeviceName]).toBe(true);
        });
      } else if (config.mediaQueryString && !config.uaRegExp) {
        const { mediaQueryString } = (devicesConfig[device] as any);
        it(`for the device "${device}" the mediaQuery should match so "${isDeviceName}" should be true`, () => {
          matchMedia = new MatchMedia(mediaQueryString);
          const devices = isDevice(devicesConfig);
          expect(devices[isDeviceName]).toBe(true);
        });

        // it(`for the device "${device}" the mediaQuery listener should be called so "${isDeviceName}" true should be inside the result object.`, () => {
        //   let devicesResult: IsDevicesResult | null = null;
        //   const onMediaQueryChange = jest.fn().mockImplementation((devices: IsDevicesResult) => {
        //     devicesResult = devices;
        //   })
          
        //   const devices = isDevice(devicesConfig, onMediaQueryChange);
        //   matchMedia.useMediaQuery(mediaQueryString);

        //   // console.log(device, devices)
        //   expect(devices[isDeviceName]).toBe(false);
        //   // expect(onMediaQueryChange).toBeCalledTimes(1);
        // });
      }
    });
  });
});
