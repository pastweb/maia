/**
 * get target Type.
 * @param target
 * @returns {string}
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getType (target: any): string {
  return Object.prototype.toString.call(target).slice(8, -1);
}
