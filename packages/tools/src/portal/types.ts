import { AppExtension } from '../App';

export type Portals = {
  [portalId: string]: { [appId: string]: AppExtension };
};

export type OpenPortalConfig = {
  portalId: string;
  app: AppExtension;
};

export type UpdatePortalConfig = {
  portalId: string;
  appId: string;
  appData: any;
};

export type ClosePortalConfig = {
  portalId: string;
  appId: string;
};

export type Portal = {
  open: (portalConfig: OpenPortalConfig) => string | false;
  update: (portalConfig: UpdatePortalConfig) => boolean;
  close: (portalConfig: ClosePortalConfig) => boolean;
};

export type CreatePortalConfig = {
  portalId: string;
  app: AppExtension;
};

export type CreatedPortal = {
  open: (component: any, initData?: { [key: string]: any }) => string | false;
  update: (appId: string, appData: any) => boolean;
  close: (appId: string) => boolean;
};
