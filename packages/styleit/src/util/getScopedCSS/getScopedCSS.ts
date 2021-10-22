import { getScopedStyle, ScopedStyle } from '../getScopedStyle';
import { stylis } from '../stylis';
import { ScopedCSS } from './types';

export function getScopedCSS(rules: string, id: string): ScopedCSS {
  const { rules: _rules, fontFamily, keyframes } : ScopedStyle = getScopedStyle(rules, id);
  const css = stylis(_rules);
  
  return {
    fontFamily,
    keyframes,
    css,
  };
}
