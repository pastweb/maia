import { hashID } from '../hashID';
import { AppExtension } from '../App';
import {
  Portals,
  OpenPortalConfig,
  UpdatePortalConfig,
  ClosePortalConfig,
} from './types';

export function open(portals: Portals, { portalId, app }: OpenPortalConfig): string | false {
  const portal = document.getElementById(portalId);

  if (!portal) {
    return false;
  }

  const domElement = document.createElement('div');

  if (!portals[portalId]) {
    portals[portalId] = {};
  }

  const appId = hashID.generateUnique(Object.keys(portals[portalId]));
  domElement.id = appId;
  portal.appendChild(domElement);

  app.setDomElement(domElement);
  app.mergeOptions({ domElement, initData: {portalId, appId} });
  portals[portalId][appId] = app;
  app.mount();

  return appId;
}

export function update(portals: Portals, portalConfig: UpdatePortalConfig): boolean {
  const { portalId, appId, appData } = portalConfig;

  if (!portals[portalId] || (appId !== '*' && !portals[portalId][appId])) {
    return false;
  }

  if (appData) {
    if (appId === '*') {
      Object.values(portals[portalId]).forEach((app: AppExtension) => app.update(appData));
    } else {
      portals[portalId][appId].update(appData);
    }
  }

  return true;
}

export function close(
  portals: Portals,
  { portalId, appId }: ClosePortalConfig
): boolean {
  if (!portals[portalId] || (appId !== '*' && !portals[portalId][appId]))
    return false;

  function closeIt({ portalId, appId }: ClosePortalConfig) {
    (portals[portalId][appId] as any).unmount();
    delete portals[portalId][appId];
    const element: HTMLElement | null = document.getElementById(appId);
    if (element) {
      element.remove();
    }
    return true;
  }

  if (appId === '*') {
    Object.keys(portals[portalId]).forEach((appId) =>
      portals[portalId][appId].emit('unmount')
    );
  }

  return closeIt({ portalId, appId });
}
