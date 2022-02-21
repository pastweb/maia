export type AppOptions = {
  domElement?: HTMLElement;
  initData?: { [key: string]: any };
  [key: string]: any;
};

export type PrivateKeys = {
  optionsKey?: symbol;
  domElementKey?: symbol;
};

export type AppExtension = App & {
  mount: (...args: any[]) => void;
  unmount?: (...args: any[]) => void;
  ssr?: (...args: any[]) => Promise<string>;
  [attr: string | symbol]: any;
}
