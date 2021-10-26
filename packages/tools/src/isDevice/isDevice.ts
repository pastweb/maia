import { isSSR } from '../isSSR';
import {
  MatchMediasListeners,
  DevicesConfig,
  DeviceConfig,
  IsDevicesResult,
  MediaQueryCallback,
} from './types';

export const defaultUaRegExp =
  /iP(hone|ad|od)|blackberry|Android|(W|w)indows (P|p)hone/g;

let matchMediasList: MatchMediasListeners = {};

export function _testResetMediaQueryCache(): void {
  matchMediasList = {};
}

export function checkUserAgent(
  userAgent: string,
  uaRegex: RegExp,
  mql: MediaQueryList | null,
): boolean {
  
  if (mql) {
    const { matches } = mql;
    return uaRegex.test(userAgent) || matches ? true : false;
  }
  
  return uaRegex.test(userAgent);
}

export function isDevice(
  config: DevicesConfig = {},
  onMediaQueryChange?: MediaQueryCallback
): IsDevicesResult {
  const devices: IsDevicesResult = {};

  Object.entries(config).forEach(
    ([deviceName, deviceConfig]: [string, DeviceConfig]) => {
      const isDeviceName = `is${deviceName
        .charAt(0)
        .toUpperCase()}${deviceName.slice(1)}`;

      const forceFalse = isSSR && !deviceConfig.userAgent ? true : false;

      if (forceFalse) {
        devices[isDeviceName] = false;
      } else {
        const { uaRegExp, mediaQueryString } = deviceConfig;
        const userAgent = deviceConfig.userAgent || window && window.navigator.userAgent;

        const regexp =
          !uaRegExp || typeof uaRegExp === 'boolean'
            ? defaultUaRegExp
            : uaRegExp;

        const mql: MediaQueryList | null = !isSSR && mediaQueryString ? window.matchMedia(mediaQueryString) : null;

        if (mql && mediaQueryString && onMediaQueryChange) {
          const listeners: Set<MediaQueryCallback> = matchMediasList[mediaQueryString] ||
            (matchMediasList[mediaQueryString] = new Set<MediaQueryCallback>());

          if (!listeners.has(onMediaQueryChange)) {  
            listeners.add(onMediaQueryChange);
            mql.addEventListener('change', (): void => {
              onMediaQueryChange(isDevice(config, onMediaQueryChange));
            });
          }
        }
        
        devices[isDeviceName] = checkUserAgent(userAgent, regexp, mql);
      }
    }
  );

  return devices;
}
