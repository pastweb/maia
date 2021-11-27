import { StyleInfo } from '../../css';
import { StyleCache } from '../../cache';
import { preProcessor } from './preProcessor';

export function createStyleCache(styleInfo: StyleInfo): StyleCache {
  const { fontFamily, keyframes, styleKey } = styleInfo;
  
  const css = preProcessor(styleInfo);

  return {
    counter: 1,
    css,
    fontFamily,
    styleKey,
    keyframes,
  };
}
