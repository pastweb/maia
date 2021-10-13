import { hashID } from '../hashID';
import {
  Portals,
  OpenPortalConfig,
  UpdatePortalConfig,
  ClosePortalConfig,
  HTMLElementAttrs,
  StyleConfig,
} from './types';
import { App } from '../App';

export function setElementAttributes(
  element: HTMLElement | null,
  attrs: HTMLElementAttrs
): void {
  if (!element) return;
  Object.entries(attrs).forEach(
    ([attr, value]: [string, string | StyleConfig]) => {
      if (attr === 'style') {
        Object.entries(value).forEach(([prop, value]: [string, string]) => {
          (element.style as any)[prop] = `${value}`;
        });
      } else {
        (element as any)[attr] = `${value}`;
      }
    }
  );
}

export function open(
  portals: Portals,
  { portalId, tagName = 'div', tagAttrs, app = {} }: OpenPortalConfig
): string | false {
  const portal = document.getElementById(portalId);

  if (!portal) return false;

  const appElement = document.createElement(tagName);

  if (tagAttrs) setElementAttributes(appElement, tagAttrs);
  if (!portals[portalId]) portals[portalId] = {};

  const appId = hashID.generateUnique(Object.keys(portals[portalId]));
  appElement.id = appId;
  portal.appendChild(appElement);

  const {
    AppClass = class {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      mount() {}
    },
    options = {},
    privateKeys = {}
  } = app;

  const appInstance = new AppClass(
    { portalId, appId, ...options },
    appElement,
    privateKeys
  );
  portals[portalId][appId] = appInstance;
  appInstance.mount();

  return appId;
}

export function update(
  portals: Portals,
  { portalId, appId, tagAttrs, appData }: UpdatePortalConfig
): boolean {
  if (!portals[portalId] || (appId !== '*' && !portals[portalId][appId]))
    return false;

  if (tagAttrs) setElementAttributes(document.getElementById(appId), tagAttrs);

  if (appData) {
    if (appId === '*') {
      Object.values(portals[portalId]).forEach((app: App) =>
        (app as any).update(appData)
      );
    } else {
      (portals[portalId][appId] as any).update(appData);
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
