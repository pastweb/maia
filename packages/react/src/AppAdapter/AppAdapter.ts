import { createElement, forwardRef, useRef, useCallback, useEffect } from 'react';
import { EXCLUDE_PROPS, AppAdapterProps } from './types';
import { useWillMount, useWillUnmount } from '../';
import { App, isSSR } from '@maia/tools';

// TODO: add server side rendering support

export function getCompProps(props: AppAdapterProps): any {
  return Object.entries(props).reduce((acc, [propName, value]) => {
    if (!EXCLUDE_PROPS.includes(propName)) {
      return { ...acc, [propName]: value };
    }
    return acc;
  }, {});
}

export const AppAdapter = forwardRef((props: AppAdapterProps, ref) => {
  const { tagName = 'div', tagClass, tagStyle, app } = props;
  const domElemntRef = useRef<HTMLElement | null>(null);

  useWillMount(() => {
    const isAppExtension = app.prototype instanceof App;
    if (!isAppExtension) {
      throw Error('The "app" property must contains the instance of an App class extension.');
    }
    if(!isSSR) {
      const mountElement: HTMLElement = document.createElement(tagName);
      if (tagClass) {
        mountElement.className = tagClass;
      }
      if (tagStyle) {
        Object.entries(tagStyle).forEach(([prop, value]: [string, string | number]) => {
          (mountElement.style as any)[prop] = `${value}`;
        });
      }
      domElemntRef.current = mountElement;
      (app as any).mergeOptions({ initData: getCompProps(props) });
      (app as any).setDomElement(mountElement);
      (app as any).emit('mount');
    }
  });

  const refCallback = useCallback((node: HTMLElement | null) => {
    if (node) {
      const appendDomElement: HTMLElement | null = node.parentElement;
      appendDomElement?.appendChild(domElemntRef.current as HTMLElement);
      if (ref) {
        if (typeof ref === 'function') {
          ref(domElemntRef.current)
        } else {
          ref.current = domElemntRef.current;
        }
      }
    }
  }, []);

  useEffect(() => {
    (app as any).emit('update', getCompProps(props));
  }, [props]);

  useWillUnmount(() => {
    (app as any).emit('unmount');
  });

  return (
    createElement(tagName, { ref: refCallback, className: tagClass, style: tagStyle })
  );
});

