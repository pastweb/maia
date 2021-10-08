import { portal } from './portal';
import { CreatedPortal, CreatePortalConfig, HTMLElementAttrs } from './types';

export function createPortal ({ portalId, tagName, tagAttrs, app = {} }: CreatePortalConfig): CreatedPortal {
  app.options = app.options || {};
  return {
    open: (component: any, initData?: { [key: string]: any }): string | false => portal.open({
        portalId,
        tagName,
        tagAttrs,
        app: {
          ...app,
          options: {
            ...app.options,
            portal,
            component,
            initData,
          },
        }
    }),
    update: (appId: string, appData?: any, tagAttrs?: HTMLElementAttrs): boolean => {
      return portal.update({ portalId, appId, appData, tagAttrs });
    },
    close: (appId: string): boolean => portal.close({ portalId, appId }),
  };
}
