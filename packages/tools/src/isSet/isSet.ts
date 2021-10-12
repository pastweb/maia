import { isType } from '../isType';

/**
 * Simple Set check.
 * @param target
 * @returns {boolean}
 */

export function isSet(target: any): boolean {
  return isType('Set', target);
}
