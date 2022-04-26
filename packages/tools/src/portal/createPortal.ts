import { portal } from './portal';
import { CreatedPortal, CreatePortalConfig } from './types';

export function createPortal({ portalId, entry }: CreatePortalConfig): CreatedPortal {
  const _portal = {
    open: (component: any, initData?: { [key: string]: any }): string | false => {
      initData = initData || {};
      entry.setEntryComponent(component);
      entry.mergeOptions({ initData: { portal: _portal, component, ...initData } });
      return portal.open({ portalId, entry });
    },
    update: (entryId: string, entryData?: any): boolean => {
      return portal.update({ portalId, entryId, entryData });
    },
    close: (entryId: string): boolean => portal.close({ portalId, entryId }),
  };

  return Object.freeze(_portal);
}
