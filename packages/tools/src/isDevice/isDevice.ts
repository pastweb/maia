import { isSSR } from '../isSSR';
import {
  MatchMedias,
  DevicesConfig,
  DeviceConfig,
  IsDevicesResult,
  MediaQueryCallback,
} from './types';

export const defaultUaRegExp =
  /iP(hone|ad|od)|blackberry|Android|(W|w)indows (P|p)hone/g;

const matchMedias: MatchMedias = {}; 

function checkWithMediaQuery(
  mql: MediaQueryListEvent | MediaQueryList,
  uaRegex: RegExp
): boolean {
  const { matches } = mql;
  return uaRegex.test(window.navigator.userAgent) || matches ? true : false;
}

export function isDevice(config: DevicesConfig = {}, onMediaQueryChange?: MediaQueryCallback): IsDevicesResult {
  const devices: IsDevicesResult = {};

  Object.entries(config).forEach(
    ([deviceName, deviceConfig]: [string, DeviceConfig]) => {
      const { forceTrue, uaRegExp, mediaQueryString } = deviceConfig;
      const isDeviceName = `is${deviceName
        .charAt(0)
        .toUpperCase()}${deviceName.slice(1)}`;

      if (typeof forceTrue !== 'undefined') {
        devices[isDeviceName] = forceTrue;
      } else if (isSSR) {
        devices[isDeviceName] = false;
      } else {
        const regexp =
          !uaRegExp || typeof uaRegExp === 'boolean'
            ? defaultUaRegExp
            : uaRegExp;

        if (mediaQueryString) {
          const mql: MediaQueryList = window.matchMedia(mediaQueryString);
          
          if (onMediaQueryChange && !matchMedias[mediaQueryString]) {
            matchMedias[mediaQueryString] = mql;
            const _onMediaQueryChange = (): void => {
              onMediaQueryChange(isDevice(config, onMediaQueryChange));
            };
  
            mql.addEventListener('change', _onMediaQueryChange);
          }
          devices[isDeviceName] = checkWithMediaQuery(mql, regexp);
        } else {
          devices[isDeviceName] = regexp.test(window.navigator.userAgent);
        }
      }
    }
  );

  return devices;
}
