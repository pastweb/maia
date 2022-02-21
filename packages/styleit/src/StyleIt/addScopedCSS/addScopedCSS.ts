import { updateCSS } from '../updateCSS';
import { cache } from '../../cache';
import { StyleInfo } from '../../css';
import { ScopedNames } from './types';

export function addScopedCSS(styleInfo: StyleInfo): ScopedNames {
  const { name, classId, frameworkId } = styleInfo;

  if (cache.style.add(styleInfo)) {
    updateCSS();
  }

  return { name, classId, frameworkId };
}
