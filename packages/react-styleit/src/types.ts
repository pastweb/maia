import { StyleObject, StyleOptions, StyleInfo, ScopedNames, ForwardArgs, Theme } from '@maia/styleit';
import { ElementType, Ref, HTMLAttributes, ReactElement } from 'react';

export interface StyleItProps extends HTMLAttributes<HTMLElement> { 
  useTheme?: () => Theme; 
  className?: string;
  forward?: ForwardArgs;
  passClassId?: boolean;
  onClassId?: (classId: string) => void;
  options?: StyleOptions;
  styles: StyleObject | ((...args: any[]) => StyleObject);
  tagName?: ElementType<any>;
  ref?: Ref<Element>;
  children: ReactElement | ReactElement[];
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
