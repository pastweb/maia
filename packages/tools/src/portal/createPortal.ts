import { portal } from './portal';
import { CreatedPortal, CreatePortalConfig } from './types';

export function createPortal({ portalId, app }: CreatePortalConfig): CreatedPortal {
  const _portal = {
    open: (component: any, initData?: { [key: string]: any }): string | false => {
      initData = initData || {};
      app.setAppComponent(component);
      app.mergeOptions({ initData: { portal: _portal, component, ...initData } });
      return portal.open({ portalId, app });
    },
    update: (appId: string, appData?: any): boolean => {
      return portal.update({ portalId, appId, appData });
    },
    close: (appId: string): boolean => portal.close({ portalId, appId }),
  };

  return Object.freeze(_portal);
}
