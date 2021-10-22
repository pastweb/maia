import { compile, serialize, middleware, prefixer, stringify } from 'stylis';

export function stylis(rules: string) {
  try {
    return serialize(compile(rules), middleware([prefixer, stringify]));
  } catch(e) {
    throw new Error(e as string);
  }
}
