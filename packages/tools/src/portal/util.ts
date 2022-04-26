import { hashID } from '../hashID';
import { EntryExtension } from '../Entry';
import {
  Portals,
  OpenPortalConfig,
  UpdatePortalConfig,
  ClosePortalConfig,
} from './types';

export function open(portals: Portals, { portalId, entry }: OpenPortalConfig): string | false {
  const portal = document.getElementById(portalId);

  if (!portal) {
    return false;
  }

  const domElement = document.createElement('div');

  if (!portals[portalId]) {
    portals[portalId] = {};
  }

  const entryId = hashID.generateUnique(Object.keys(portals[portalId]));
  domElement.id = entryId;
  portal.appendChild(domElement);

  entry.setDomElement(domElement);
  entry.mergeOptions({ domElement, initData: {portalId, entryId} });
  portals[portalId][entryId] = entry;
  entry.mount();

  return entryId;
}

export function update(portals: Portals, portalConfig: UpdatePortalConfig): boolean {
  const { portalId, entryId, entryData } = portalConfig;

  if (!portals[portalId] || (entryId !== '*' && !portals[portalId][entryId])) {
    return false;
  }

  if (entryData) {
    if (entryId === '*') {
      Object.values(portals[portalId]).forEach((entry: EntryExtension) => entry.update(entryData));
    } else {
      portals[portalId][entryId].update(entryData);
    }
  }

  return true;
}

export function close(portals: Portals,{ portalId, entryId }: ClosePortalConfig): boolean {
  if (!portals[portalId] || (entryId !== '*' && !portals[portalId][entryId]))
    return false;

  function closeIt({ portalId, entryId }: ClosePortalConfig) {
    (portals[portalId][entryId] as any).unmount();
    delete portals[portalId][entryId];
    const element: HTMLElement | null = document.getElementById(entryId);
    if (element) {
      element.remove();
    }
    return true;
  }

  if (entryId === '*') {
    Object.keys(portals[portalId]).forEach((entryId) =>
      portals[portalId][entryId].emit('unmount')
    );
  }

  return closeIt({ portalId, entryId });
}
