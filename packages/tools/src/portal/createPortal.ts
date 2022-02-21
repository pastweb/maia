import { portal } from './portal';
import { CreatedPortal, CreatePortalConfig } from './types';

export function createPortal({ portalId, app }: CreatePortalConfig): CreatedPortal {
  return {
    open: (component: any, initData?: { [key: string]: any }): string | false => {
      initData = initData || {};
      app.mergeOptions({ initData: { portal, component, ...initData } });
      return portal.open({ portalId, app });
    },
    update: (appId: string, appData?: any): boolean => {
      return portal.update({ portalId, appId, appData });
    },
    close: (appId: string): boolean => portal.close({ portalId, appId })
  };
}
