import { StyleOptions } from '../types';

export function validateArgs({ validate = {}, forward, fileName }: StyleOptions): void {
  const toValidate = Object.entries(validate);
      
  if (toValidate.length && forward) {
    toValidate.forEach(([ argName, validFunc]: [string, (arg: any) => boolean]) => {
      if (forward[argName] && !validFunc(forward[argName])) {
        throw new Error(`@maia/styleit - css validation error in: ${fileName ? `${fileName} -` : ''}`);
      }
    });
  }
}
