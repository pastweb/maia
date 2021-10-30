import { useState } from 'react';
import { isDevice } from '@maia/tools';
import { DevicesConfig, IsDevicesResult } from './types';

export function useDevice(config: DevicesConfig): IsDevicesResult {
  function onMediaQueryChange(result: IsDevicesResult) {
    setNewDevices(result);
  }

  function getDevices(config: DevicesConfig): IsDevicesResult {
    return isDevice(config, onMediaQueryChange);
  }
  
  const [devices, setDevices] = useState<IsDevicesResult>(getDevices(config));

  function setNewDevices(result: IsDevicesResult): void {
    setDevices(result);
  }

  return devices;
}
