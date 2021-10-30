import { Style, ForwardArgs, StyleInfo, ScopedNames } from '@maia/styleit';
import { ReactChildren, ReactHTMLElement } from 'react';

export interface StyleItProps extends ReactHTMLElement <HTMLElement> {
  className?: string;
  componentName?: string;
  styles: Style | ((...args: any[]) => Style);
  forward?: ForwardArgs;
  argsAsArray?: boolean;
  tagName?: string;
  children: ReactChildren;
};

export type StyleItState = {
  styleInfo: StyleInfo;
  scopedNames: ScopedNames;
};

export type Theme = {
  [key: string]: any;
}

export type ThemeProviderProps = {
  theme: { [key: string]: any };
  children: ReactChildren;
}
