import { StyleInfo } from '../../../css';
import { PreProcessorError } from './types';
import { compile, serialize, middleware, prefixer, stringify } from 'stylis';

export function preProcessor(styleInfo: StyleInfo): string
{
  const { rules, scopedRules, fileName, name } = styleInfo;
  
  try {
    return serialize(compile(scopedRules), middleware([prefixer, stringify]));
  } catch(e) {
    throw new PreProcessorError(
      `styleIt - syntax error in:\n\n${`${name}\n\n`}${`${fileName}\n\n`}${rules}\n\n`
    );
  }
}
