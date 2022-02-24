import { App } from './App';

export type AppOptions = {
  AppComponent?: any;
  domElement?: HTMLElement;
  initData?: { [key: string]: any };
  [key: string]: any;
};

export type AppExtension = App & {
  mount: (...args: any[]) => void;
  unmount?: (...args: any[]) => void;
  ssr?: (...args: any[]) => Promise<string>;
  [attr: string | symbol]: any;
}
