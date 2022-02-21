export type ForwardArgs = {
  [argName: string]: any;
};

export type CSSObject = {
  [propName: string]: string | ((...args: any[]) => string | number) | CSSObject | StyleObject;
};

export type CSSFunction = ((...args: any[]) => string | number);

export type TagArg = string |
number |
StyleObject |
CSSFunction;

export type Validate = {
  [argName: string]: (arg: any) => boolean;
};

export type StyleOptions = {
  fileName?: string;
  forward?: ForwardArgs;
  frameworkName?: string;
  name?: string;
  validate?: Validate;
};

export type StyleInfo = {
  classId: string;
  frameworkId: string;
  name: string;
  fileName: string;
  frameworkName: string;
  cssObject: CSSObject;
  css: string,
  styleKey: string;
}

export interface StyleObject {
  [data: symbol]: {
    info: StyleInfo,
    options: {
      fileName: string;
      forward: ForwardArgs;
      frameworkName: string;
      name: string;
      validate?: Validate;
      useFrameworkClassId: boolean,
    };
  };
  setOptions: (styleOptions?: StyleOptions) => any;
  getOptions: () => StyleOptions;
  getStyleInfo: () => StyleInfo;
}
