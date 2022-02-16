export type AppOptions = {
  domElement?: HTMLElement;
  initData?: { [key: string]: any };
  [key: string]: any;
};

export type PrivateKeys = {
  optionsKey?: symbol;
  domElementKey?: symbol;
};
