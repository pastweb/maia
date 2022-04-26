import { Entry } from './Entry';

export type EntryOptions = {
  EntryComponent?: any;
  domElement?: HTMLElement;
  initData?: { [key: string]: any };
  [key: string]: any;
};

export type EntryExtension = Entry & {
  mount: (...args: any[]) => void;
  unmount?: (...args: any[]) => void;
  ssr?: (...args: any[]) => Promise<string>;
  [attr: string | symbol]: any;
}
