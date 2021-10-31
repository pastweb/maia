import { createElement, forwardRef, useState, useEffect } from 'react';
import styleIt from '@maia/styleit';
import { useWillUnmount } from '..';
import { useTheme } from './ThemeProveder';
import { updateState, getProps } from './util';
import { StyleItProps, StyleItState } from './types';

export const StyleIt = forwardRef((props: StyleItProps, ref) => {
  const {
    extFuncOptions,
    forward,
    name,
    options,
    styles,
    tagName = 'div',
    children,
  } = props;
  const theme = useTheme();

  const [state, setState] = useState<StyleItState>(updateState(props, theme));

  useWillUnmount(() => {
    styleIt.remove(state.styleInfo);
  });

  useEffect(() => {
    
    const newState = updateState(props, theme);

    styleIt.replace(state.styleInfo, newState.styleInfo);
    setState(newState);
  }, [extFuncOptions, forward, name, options, styles, tagName]);

  return createElement(tagName, getProps(props, state.scopedNames, ref), children);
});
