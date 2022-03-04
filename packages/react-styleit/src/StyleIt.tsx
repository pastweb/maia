import { ReactElement, createElement, cloneElement, Children, forwardRef, useState, useEffect, Ref, isValidElement } from 'react';
import { noop } from '@maia/tools';
import styleIt from '@maia/styleit';
import { useWillUnmount } from '@maia/react';
import { updateState } from './util';
import { useTheme as useGlobalTheme } from './ThemeProveder';
import { StyleItProps, StyleItState } from './types';

export const StyleIt = forwardRef((props: StyleItProps, ref: Ref<Element>) => {
  const {
    useTheme,
    forward,
    passClassId = false,
    onClassId = noop,
    options,
    styles,
    tagName = 'div',
    className,
    children,
    ...restProps
  } = props;

  const theme = useTheme ? useTheme() : useGlobalTheme();

	const [state, setState] = useState<StyleItState>(updateState(props, theme));

  useWillUnmount(() => {
    styleIt.remove(state.styleInfo);
  });

  useEffect(() => {
    
    const newState = updateState(props, theme);

    styleIt.replace(state.styleInfo, newState.styleInfo);
    setState(newState);
  }, [ forward, options, styles ]);

  useEffect(() => {
    const { classId } = state.scopedNames;
    onClassId(classId);
  }, [ state.scopedNames ]);

  const { classId, frameworkId } = state.scopedNames;

  const compProps = {
    ref,
    className: `${className ? `${className} ` : ''}${classId}${frameworkId ? ` ${frameworkId}` : ''}`,
    ...restProps,
  };

  const childProps = passClassId ? { classId } : {};

  return createElement(tagName, compProps, Children.map(children, child => {
    if (isValidElement(child)) {
      return cloneElement(child as ReactElement, childProps);
    }
    
    return child;
  }));
});
