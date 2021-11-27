import { isSSR } from '@maia/tools';
import { UpdateTarget } from './types';
import { STYLE_TAG_NAME } from '../../constants';


let _updateTarget: UpdateTarget = { textContent: '' };

if (!isSSR) {
  _updateTarget = document.getElementById(STYLE_TAG_NAME) as HTMLStyleElement;
  if (!_updateTarget) {
    _updateTarget = document.createElement('style');
    _updateTarget.id = STYLE_TAG_NAME;
    document.head.appendChild(_updateTarget);
  }
}

export const updateTarget = _updateTarget;
