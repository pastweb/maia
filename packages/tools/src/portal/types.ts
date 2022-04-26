import { EntryExtension } from '../Entry';

export type Portals = {
  [portalId: string]: { [entryId: string]: EntryExtension };
};

export type OpenPortalConfig = {
  portalId: string;
  entry: EntryExtension;
};

export type UpdatePortalConfig = {
  portalId: string;
  entryId: string;
  entryData: any;
};

export type ClosePortalConfig = {
  portalId: string;
  entryId: string;
};

export type Portal = {
  open: (portalConfig: OpenPortalConfig) => string | false;
  update: (portalConfig: UpdatePortalConfig) => boolean;
  close: (portalConfig: ClosePortalConfig) => boolean;
};

export type CreatePortalConfig = {
  portalId: string;
  entry: EntryExtension;
};

export type CreatedPortal = {
  open: (component: any, initData?: { [key: string]: any }) => string | false;
  update: (entryId: string, entryData: any) => boolean;
  close: (entryId: string) => boolean;
};
