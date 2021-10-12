import { isSSR } from '../isSSR';
import { DevicesConfig, DeviceConfig, IsDevicesResult } from './types';

export const defaultUaRegExp =
  /iP(hone|ad|od)|blackberry|Android|(W|w)indows (P|p)hone/g;

function checkWithMediaQuery(
  mql: MediaQueryListEvent | MediaQueryList,
  uaRegex: RegExp
): boolean {
  const { matches } = mql;
  return uaRegex.test(window.navigator.userAgent) || matches ? true : false;
}

export function isDevice(config: DevicesConfig = {}): IsDevicesResult {
  const devices: IsDevicesResult = {};

  Object.entries(config).forEach(
    ([deviceName, deviceConfig]: [string, DeviceConfig]) => {
      const { forceTrue, uaRegExp, mediaQueryString, onMediaQueryChange } =
        deviceConfig;
      const isDeviceName = `is${deviceName
        .charAt(0)
        .toLocaleUpperCase()}${deviceName.slice(1)}`;

      if (typeof forceTrue !== 'undefined') {
        devices[isDeviceName] = forceTrue;
      } else if (isSSR) {
        devices[isDeviceName] = false;
      } else {
        const regexp =
          !uaRegExp || typeof uaRegExp === 'boolean'
            ? defaultUaRegExp
            : uaRegExp;

        if (mediaQueryString && onMediaQueryChange) {
          const _onMediaQueryChange = (event: MediaQueryListEvent): void => {
            const isDevice = checkWithMediaQuery(event, regexp);

            if (onMediaQueryChange) {
              onMediaQueryChange({ ...event, [isDeviceName]: isDevice });
            }
          };

          const mql: MediaQueryList = window.matchMedia(mediaQueryString);
          mql.addEventListener('change', _onMediaQueryChange);
          devices[isDeviceName] = checkWithMediaQuery(mql, regexp);
        } else {
          devices[isDeviceName] = regexp.test(window.navigator.userAgent);
        }
      }
    }
  );

  return devices;
}
