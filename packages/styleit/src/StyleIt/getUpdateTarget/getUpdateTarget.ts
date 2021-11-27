import { isSSR } from '@maia/tools';
import { UpdateTarget } from './types';
import { STYLE_TAG_NAME } from '../../constants';

export function getUpdateTarget(): UpdateTarget {
  let updateTarget: UpdateTarget = { textContent: '' };

  if (!isSSR) {
    updateTarget = document.getElementById(STYLE_TAG_NAME) as HTMLStyleElement;
    if (!updateTarget) {
      updateTarget = document.createElement('style');
      updateTarget.id = STYLE_TAG_NAME;
      document.head.appendChild(updateTarget);
    }
  }

  return updateTarget;
}
