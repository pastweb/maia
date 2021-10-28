export type ForwardArgs = {
  [argName: string]: any;
};

export type StyleSettings = {
  argsAsArray?: boolean;
  componentName?: string;
  fileName?: string;
  forwardArgs?: ForwardArgs;
};

export type StyleInfo = {
  componentName: string;
  fileName: string;
  rules: string
  styleKey: string;
}

export interface Style {
  set: (styleSettings?: StyleSettings) => any;
  getSettings: () => StyleSettings;
  make: () => StyleInfo;
}
