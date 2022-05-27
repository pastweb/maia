import { Children, ReactElement, cloneElement } from 'react';
import { isObject } from '@maia/tools';
import styleIt, { ForwardArgs, ScopedNames, Theme, ClassesFunc } from '@maia/styleit';
import { StyleItState } from './types';

export const defaultTheme: Theme = {
  fontFamify: {},
  keyframes: {},
};

export function checkTheme(theme?: Theme): Theme {
  theme = theme || defaultTheme;
  if (!isObject(theme)) {
    throw new Error('@maia/react - StyleIt - ThemeProvider() error:\nThe theme argument must be an Object.');
  } else if (theme !== defaultTheme) {
    const themeKeys = Object.keys(theme);
    
    if (themeKeys.filter(key => key === 'fontFamily' || key === 'keyframes').length < 2) {
      theme.fontFamily = theme.fontFamily || {};
      theme.keyframes = theme.keyframes || {};
    }  
  }
  return theme;
}

export function updateState(props: any, theme: Theme): StyleItState {
  const { options = { forward: {} }, forward = {}, styles } = props;
  
  const _forward: ForwardArgs = { ...forward, theme };
  
  const styleObject = typeof styles === 'function'? styles(_forward) : styles;

  const newOptions = { ...options, forward: { ..._forward } };
  const styleInfo = styleObject.setOptions(newOptions).getStyleInfo();

  const scopedNames: ScopedNames = styleIt.add(styleInfo);
  
  return {
    styleInfo,
    scopedNames, 
  };
}

export function assignClassNames(source: any, classes: ClassesFunc, target?: any): void {
  target = target || source;

  const { className } = source;

  if (typeof className === 'string') {
    target.className = classes(className);
  }
}

export function elementTravers(element: HTMLElement, classes: ClassesFunc): void {
  if (element.children) {
    for (let i = 0; i < element.children.length; i++) {
      elementTravers(element.children[i] as HTMLElement, classes);
    }
  }

  assignClassNames(element, classes);
}

export function childTraverse(child: ReactElement, classes: ClassesFunc): ReactElement {
  if (child && (typeof child.type === 'string')) {
    const { props } = child;
    const newProps: { [propName: string]: any } = {};

    if (props.children) {
      assignClassNames(props, classes, newProps);
      
      const children = Children.map(props.children, child => childTraverse(child, classes));
      newProps.children = children;

      return cloneElement(child as ReactElement, newProps);
    }

    assignClassNames(props, classes, newProps);
    
    return cloneElement(child as ReactElement, newProps);
  }

  return child;
}
