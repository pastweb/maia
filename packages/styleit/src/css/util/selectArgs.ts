import { StyleOptions, ForwardArgs } from '../types';

export function selectArgs({ argsSelector = [], forward = {} }: StyleOptions): ForwardArgs {
  return argsSelector.length ? argsSelector.reduce(
    (acc: ForwardArgs, argName: string) => {
      return { ...acc, [argName]: forward[argName] };
    }, {}
  ) : forward;
}
