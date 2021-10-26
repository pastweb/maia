export type MatchMediasListeners = {
  [mediaQuery: string]: Set<MediaQueryCallback>;
}

export type MediaQueryCallback = (
  isDevicesResult: IsDevicesResult
) => void;

export type DeviceConfig = {
  userAgent?: string;
  uaRegExp?: RegExp | true;
  mediaQueryString?: string;
};

export type DevicesConfig = {
  [deviceName: string]: DeviceConfig;
};

export type IsDevicesResult = {
  [isDeviceName: string]: boolean;
};
