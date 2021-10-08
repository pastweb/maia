import { isType } from '../isType';

/**
 * Simple object check.
 * @param target
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isObject (target: any): boolean {
  return isType('Object', target);
}
