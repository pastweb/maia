import { StyleDetail } from '../css';
import { PreProcessorError } from './types';

export function usePreProcessor(
  styleDetail: StyleDetail,
  scopedRules: string,
  preProcessor: (rules: string) => string,
  ): string
{
  const { rules, fileName, componentName } = styleDetail;
  try {
    return preProcessor(scopedRules);
  } catch(e) {
    throw new PreProcessorError(`styleIt - syntax error in:\n\n${`${componentName}\n\n`}${`${fileName}\n\n`}${rules}\n\n`);
  }
}
