import { useState } from 'react';
import { isDevice } from '@maia/tools';
import { DevicesConfig, IsDevicesResult } from './types';

export function useDevice(config: DevicesConfig): IsDevicesResult {
  const [devices, setDevices] = useState<IsDevicesResult>(getDevices(config));

  function getDevices(config: DevicesConfig): IsDevicesResult {
    return isDevice(config, setDevices);
  }

  return devices;
}
