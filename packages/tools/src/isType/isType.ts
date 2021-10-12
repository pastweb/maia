import { getType } from '../getType';

/**
 * Type check.
 * @param target
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isType(type: string, target: any): boolean {
  return target !== undefined && target !== null && getType(target) === type;
}
