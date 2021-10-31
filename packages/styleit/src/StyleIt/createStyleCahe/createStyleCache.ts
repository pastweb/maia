import { StyleInfo } from '../../css';
import { Cache, StyleCache } from '../getCache';
import { generateId } from './generateId';
import { getScopedStyle } from './getScopedStyle';
import { preProcessor } from './preProcessor';

export function createStyleCache(styleInfo: StyleInfo, cache: Cache): StyleCache {
  const id = generateId(cache.ids);

  const {
    fontFamily,
    keyframes,
    rules: scopedRules,
  } = getScopedStyle(styleInfo.rules, id);
  
  const css = preProcessor(styleInfo, scopedRules);

  return {
    counter: 1,
    css,
    fontFamily,
    id,
    keyframes,
  };
}
