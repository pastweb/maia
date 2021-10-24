import { StyleDetail } from '../types';
import { compile, serialize, middleware, prefixer, stringify } from 'stylis';
import { ProcessorError } from './types';

export function stylis(styleDetail: StyleDetail, scopedRules: string): string {
  const { rules, fileName, componentName } = styleDetail;
  try {
    return serialize(compile(scopedRules), middleware([prefixer, stringify]));
  } catch(e) {
    throw new ProcessorError(`styleIt - syntax error in:\n\n${`${componentName}\n\n`}${`${fileName}\n\n`}${rules}\n\n`);
  }
}
