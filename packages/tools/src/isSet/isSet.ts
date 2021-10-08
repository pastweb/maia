import { isType } from '../isType';

/**
 * Simple Set check.
 * @param target
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isSet (target: any): boolean {
  return isType('Set', target);
}
