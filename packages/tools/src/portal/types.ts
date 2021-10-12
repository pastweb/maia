import { App, AppOptions, PrivateKeys } from '../App';

export type Portals = {
  [portalId: string]: { [appId: string]: App };
};

export type AppConfig = {
  AppClass?: any;
  options?: AppOptions;
  privateKeys?: PrivateKeys;
};

export type StyleConfig = {
  [prop: string]: string;
};

export type HTMLElementAttrs = {
  [attr: string]: string | StyleConfig;
};

export type OpenPortalConfig = {
  portalId: string;
  tagName?: string;
  tagAttrs?: HTMLElementAttrs;
  app?: AppConfig;
};

export type UpdatePortalConfig = {
  portalId: string;
  appId: string;
  tagAttrs?: { [attr: string]: any };
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
  tagName?: string;
  tagAttrs?: HTMLElementAttrs;
  app?: AppConfig;
};

export type CreatedPortal = {
  open: (component: any, initData?: { [key: string]: any }) => string | false;
  update: (
    appId: string,
    appData?: any,
    tagAttrs?: HTMLElementAttrs
  ) => boolean;
  close: (appId: string) => boolean;
};
