import { cache } from '../../cache';
import { updateCSS } from '../updateCSS';
import { StyleInfo } from '../../css';
import { ScopedNames } from '..';

export function replaceScopedCSS(removeInfo: StyleInfo, addInfo: StyleInfo): ScopedNames {
  if (cache.style.replace(removeInfo, addInfo)) {
    updateCSS();
  }

  const { name, classId, fontFamily, keyframes, frameworkId } = addInfo;
  return { classId, name, fontFamily, keyframes, frameworkId };
}
