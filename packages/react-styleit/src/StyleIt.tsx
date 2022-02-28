import { createElement, forwardRef, useState, useEffect, Ref } from 'react';
import styleIt from '@maia/styleit';
import { useWillUnmount } from '@maia/react';
import { updateState } from './util';
import { useTheme as useGlobalTheme } from './ThemeProveder';
import { StyleItProps, StyleItState } from './types';

export const StyleIt = forwardRef((props: StyleItProps, ref: Ref<Element>) => {
  const {
    useTheme,
    forward,
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
  }, [ forward, options, styles, tagName, className]);

  const { classId, frameworkId } = state.scopedNames;
  const { name: styleName } = state.styleInfo;

  const compProps = {
    ref,
    className: `${styleName ? `${styleName} ` : ''}${className ? `${className} ` : ''}${classId}${frameworkId ? ` ${frameworkId}` : ''}`,
    ...restProps,
  };

  return createElement(tagName, compProps, children);
});
