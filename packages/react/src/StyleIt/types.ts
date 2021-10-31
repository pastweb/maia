import { StyleObject, StyleOptions, StyleInfo, ScopedNames, ForwardArgs } from '@maia/styleit';
import { ReactChildren, ReactHTMLElement } from 'react';

export type ExternalFunctionOptions = {
  argsAsArray?: boolean;
  argsSelector?: string[];
};

export interface StyleItProps extends ReactHTMLElement <HTMLElement> {
  className?: string;
  extFuncOptions?: ExternalFunctionOptions;
  forward?: ForwardArgs;
  name?: string;
  options?: StyleOptions;
  styles: StyleObject | ((...args: any[]) => StyleObject);
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
