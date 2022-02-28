import { StyleObject, StyleOptions, StyleInfo, ScopedNames, ForwardArgs, Theme } from '@maia/styleit';
import { ReactNode, ElementType, Ref, HTMLAttributes, ReactElement } from 'react';

export interface StyleItProps extends HTMLAttributes<HTMLElement> { 
  useTheme?: () => Theme; 
  className?: string;
  forward?: ForwardArgs;
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

export type ThemeProviderProps = {
  theme?: Theme;
  children: ReactElement;
  [propName: string]: any;
}
