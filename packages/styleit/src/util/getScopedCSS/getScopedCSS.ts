import { getScopedStyle, ScopedStyle } from '../getScopedStyle';
import { stylis } from '../stylis';
import { ScopedCSS } from './types';
import { StyleDetail } from '../types';

export function getScopedCSS(styleDetail: StyleDetail, id: string): ScopedCSS {
  const {
    fontFamily,
    keyframes,
    rules,
  } : ScopedStyle = getScopedStyle(styleDetail.rules, id);
  
  const css = stylis(styleDetail, rules);
  
  return {
    fontFamily,
    keyframes,
    css,
  };
}
