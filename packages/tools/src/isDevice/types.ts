export type IsDeviceCallbackEvent = {
  [eventProp: string]: any;
};

export type MediaQueryCallback = (
  isDeviceCallbackEvent: IsDeviceCallbackEvent
) => void;

export type DeviceConfig = {
  forceTrue?: true | undefined;
  uaRegExp?: RegExp | true;
  mediaQueryString?: string;
  onMediaQueryChange?: MediaQueryCallback;
};

export type DevicesConfig = {
  [deviceName: string]: DeviceConfig;
};

export type IsDevicesResult = {
  [isDeviceName: string]: boolean;
};
