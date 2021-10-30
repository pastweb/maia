export type ForwardArgs = {
  [argName: string]: any;
};

export type TagArg = string |
                     number |
                     Style |
                     ((...args: any[]) => string | number)

export type StyleOptions = {
  argsAsArray?: boolean;
  name?: string;
  fileName?: string;
  forwardArgs?: ForwardArgs;
};

export type StyleInfo = {
  name: string;
  fileName: string;
  rules: string
  styleKey: string;
}

export interface Style {
  [info: symbol]: { data: {
      argsAsArray: boolean;
      name: string;
      fileName: string;
      forwardArgs: ForwardArgs;
    }
  };
  setOptions: (styleOptions?: StyleOptions) => any;
  getOptions: () => StyleOptions;
  interpolate: () => StyleInfo;
}
