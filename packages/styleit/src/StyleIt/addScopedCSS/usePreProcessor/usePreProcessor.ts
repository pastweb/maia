import { StyleInfo } from '../../../css';
import { PreProcessorError } from './types';

export function usePreProcessor(
  styleInfo: StyleInfo,
  scopedRules: string,
  preProcessor: (rules: string) => string,
  ): string
{
  const { rules, fileName, componentName } = styleInfo;
  try {
    return preProcessor(scopedRules);
  } catch(e) {
    throw new PreProcessorError(
      `styleIt - syntax error in:\n\n${`${componentName}\n\n`}${`${fileName}\n\n`}${rules}\n\n`
    );
  }
}
