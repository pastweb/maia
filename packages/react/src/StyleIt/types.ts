import { StyleObject, StyleOptions, StyleInfo, ScopedNames, ForwardArgs } from '@maia/styleit';
import { ReactNode, ElementType, Ref, HTMLAttributes } from 'react';

export type ExternalFunctionOptions = {
  argsAsArray?: boolean;
  argsSelector?: string[];
};

// interface Props extends SimpleBarJS.Options, HTMLAttributes<HTMLElement>

export interface StyleItProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  extFuncOptions?: ExternalFunctionOptions;
  forward?: ForwardArgs;
  name?: string;
  options?: StyleOptions;
  styles: StyleObject | ((...args: any[]) => StyleObject);
  tagName?: ElementType<any>;
  ref?: Ref<Element>;
  children: ReactNode;
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
  children: ReactNode;
}
