import { compile, serialize, middleware, prefixer, stringify } from 'stylis';

export function defaultPreProcessor(scopedRules: string): string {
  return serialize(compile(scopedRules), middleware([prefixer, stringify]));
}