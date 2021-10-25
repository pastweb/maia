import { getScopedStyle, ScopedStyle } from '../getScopedStyle';
import { usePreProcessor } from '../usePreProcessor';
import { ScopedCSS } from './types';
import { StyleDetail } from '../css';

export function getScopedCSS(
  styleDetail: StyleDetail,
  id: string,
  preProcessor: (scopedRules: string) => string
  ): ScopedCSS
{
  const {
    fontFamily,
    keyframes,
    rules,
  } : ScopedStyle = getScopedStyle(styleDetail.rules, id);
  
  const css = usePreProcessor(styleDetail, rules, preProcessor);
  
  return {
    fontFamily,
    keyframes,
    css,
  };
}
