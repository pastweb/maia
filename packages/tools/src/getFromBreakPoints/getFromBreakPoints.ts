import { isSSR } from '../isSSR';
import { isObject } from '../isObject';
import { BreakPointsConfig } from './types';

/**
 * Given a config Object like:
 * const breaks = {
 *      0: 'phone',
 *      450: 'tablet',
 *      1025: 'desktop'
 *  }
 * @return {false|Any} break value.
 */

export function getFromBreakPoints(breaks: BreakPointsConfig): boolean | any {
  if (isSSR) return false;
  if (!isObject(breaks)) return false;

  const sorted = Object.keys(breaks)
    .map((_break: string) => parseFloat(_break))
    .sort((a, b) => a - b);

  const _break: number = sorted.find((_break: number) => _break >= window.innerWidth) || sorted[sorted.length - 1 ];
  return breaks[_break];
}
