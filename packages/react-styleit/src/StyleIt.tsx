import { ReactElement, createElement, Children, forwardRef, useState, useEffect, Ref, useRef, MutableRefObject } from 'react';
import { noop } from '@maia/tools';
import styleIt from '@maia/styleit';
import { useFunction, useDidMount, useWillUnmount } from '@maia/react';
import { updateState, getClassNames, elementTravers, childTraverse } from './util';
import { useTheme as useGlobalTheme } from './ThemeProveder';
import { StyleItProps, StyleItState } from './types';

export const StyleIt = forwardRef((props: StyleItProps, ref: Ref<Element>) => {
  const {
    useTheme,
    forward,
    passClassId = false,
    onClassId = noop,
    onClasses = noop,
    defer = false,
    options,
    styles,
    tagName = 'div',
    className,
    children,
    ...restProps
  } = props;

  const theme = useTheme ? useTheme() : useGlobalTheme();

	const [state, setState] = useState<StyleItState>(updateState(props, theme));
  const elRef = useRef<HTMLElement | null>(null);
  const { classId, frameworkId, classes } = state.scopedNames;

  useWillUnmount(() => {
    styleIt.remove(state.styleInfo);
  });

  useEffect(() => {
    const newState = updateState(props, theme);

    styleIt.replace(state.styleInfo, newState.styleInfo);
    setState(newState);
  }, [ forward, options, styles ]);

  useEffect(() => {
    onClassId(classId);
    onClasses(classes);

    if (elRef.current && defer) {
      elementTravers(elRef.current, classes);
    }
  }, [ state ]);

  useDidMount(() => {
    if (elRef.current && defer) {
      elementTravers(elRef.current, classes);
    }
  });

  const tagRef = useFunction((node: HTMLElement | null) => {
    if (ref && typeof ref === 'function') {
      ref(node);
    } else if (ref && ref.current) {
      (ref as MutableRefObject<HTMLElement | null>).current = node;
    }
    if (node && defer) {
      elRef.current = node;
    }
  });

  const compProps = {
    ref: tagRef,
    className: `${className ? `${getClassNames(classes, className)} ` : ''}${classId}${frameworkId ? ` ${frameworkId}` : ''}`,
    ...restProps,
  };

  const childProps: { [propName: string]: any } = passClassId ? { classId } : {};

  return createElement(tagName, compProps, Children.map(children, (child: ReactElement) => {
    return childTraverse(child, classes, childProps);
  }));
});
