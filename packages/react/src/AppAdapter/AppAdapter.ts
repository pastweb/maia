import { createElement, useRef, useCallback, useEffect } from 'react';
import { AppAdapterProps } from './types';
import { useWillMount, useWillUnmount } from '../';
import { App, isSSR } from '@maia/tools';

//  TODO: try to remove extra html div node after mount

export function AppAdapter(props: AppAdapterProps) {
  const { app, ...restProps } = props;
  const mountElement = useRef<HTMLElement | null>(null);
  let ssrId;

  const ref = useCallback((node: HTMLElement | null) => {
    if (node) {
      const appendDomElement: HTMLElement | null = node.parentElement;
      appendDomElement?.appendChild(mountElement.current as HTMLElement);
    }
  }, []);

  useWillMount(() => {
    const isAppExtension = app.constructor.prototype instanceof App;
    if (!isAppExtension) {
      throw Error('The "app" property must contains the instance of an App class extension.');
    }

    app.mergeOptions({ initData: restProps });

    if(!isSSR) {
      mountElement.current = document.createElement('div');
      app.setDomElement(mountElement.current);
      app.mount();
    } else {
      ssrId = app.ssrId;
      app.memoSSR((isStatic: boolean) => (app as any).ssr(isStatic));
    }
  });

  useEffect(() => {
    app.emit('update', restProps);
  }, [restProps]);

  useWillUnmount(() => {
    app.emit('unmount');
  });

  return ssrId || createElement('div', { ref });
}
