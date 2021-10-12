import { open, close, update } from './util';
import {
  Portal,
  Portals,
  OpenPortalConfig,
  UpdatePortalConfig,
  ClosePortalConfig
} from './types';

export const portals: Portals = {};

export const portal: Portal = {
  open: (portalConfig: OpenPortalConfig): string | false =>
    open(portals, portalConfig),
  update: (portalConfig: UpdatePortalConfig): boolean =>
    update(portals, portalConfig),
  close: (portalConfig: ClosePortalConfig): boolean =>
    close(portals, portalConfig)
};
