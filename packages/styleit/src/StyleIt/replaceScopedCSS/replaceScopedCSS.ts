import { cache } from '../../cache';
import { updateCSS } from '../updateCSS';
import { StyleInfo } from '../../css';
import { ScopedNames } from '..';

export function replaceScopedCSS(removeInfo: StyleInfo, addInfo: StyleInfo): ScopedNames {
  if (cache.style.replace(removeInfo, addInfo)) {
    updateCSS();
  }

  const { classId, frameworkId } = addInfo;
  return { classId, frameworkId };
}
