import { isType } from '../isType';

/**
 * Simple Map check.
 * @param target
 * @returns {boolean}
 */

export function isMap(target: any): boolean {
  return isType('Map', target);
}
