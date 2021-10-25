export type StyleInfo = {
  fileName?: string;
  componentName?: string;
};

export type StyleDetail = {
  rules: string;
  fileName: string;
  componentName: string;
  styleKey: string;
};

export type ForwardArgs = {
  [argName: string]: any;
};

export interface FunctionInfo {
  [funcName: string]: (styleInfo?: StyleInfo, forwarArgs?: ForwardArgs) => any;
}
