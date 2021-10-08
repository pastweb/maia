import { Portals, OpenPortalConfig, UpdatePortalConfig, ClosePortalConfig, HTMLElementAttrs } from './types';
export declare function setElementAttributes(element: HTMLElement | null, attrs: HTMLElementAttrs): void;
export declare function open(portals: Portals, { portalId, tagName, tagAttrs, app }: OpenPortalConfig): string | false;
export declare function update(portals: Portals, { portalId, appId, tagAttrs, appData }: UpdatePortalConfig): boolean;
export declare function close(portals: Portals, { portalId, appId }: ClosePortalConfig): boolean;
