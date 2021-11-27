import { ScopedStyle } from './util/applyId';

export type ForwardArgs = {
  [argName: string]: any;
};

export type TagArg = string |
number |
StyleObject |
((...args: any[]) => string | number)

export type Validate = {
  [argName: string]: (arg: any) => boolean;
};

export type StyleOptions = {
  argsAsArray?: boolean;
  argsSelector?: string[];
  fileName?: string;
  forward?: ForwardArgs;
  name?: string;
  validate?: Validate;
};

export type StyleInfo = ScopedStyle & {
  name: string;
  fileName: string;
  styleKey: string;
}

export interface StyleObject {
  [options: symbol]: { data: {
      argsAsArray: boolean;
      argsSelector: string[];
      fileName: string;
      forward: ForwardArgs;
      name: string;
      validate?: Validate;
    }
  };
  setOptions: (styleOptions?: StyleOptions) => any;
  getOptions: () => StyleOptions;
  interpolate: () => StyleInfo;
  // getStyle: (id?: string) => StyleInfo;
}
