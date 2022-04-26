import { createElement, useRef, useCallback, useEffect } from 'react';
import { EntryAdapterProps } from './types';
import { useWillMount, useWillUnmount } from '../';
import { Entry, isSSR } from '@maia/tools';

//  TODO: try to remove extra html div node after mount

export function EntryAdapter(props: EntryAdapterProps) {
  const { entry, ...restProps } = props;
  const mountElement = useRef<HTMLElement | null>(null);
  let ssrId;

  const ref = useCallback((node: HTMLElement | null) => {
    if (node) {
      const appendDomElement: HTMLElement | null = node.parentElement;
      appendDomElement?.appendChild(mountElement.current as HTMLElement);
    }
  }, []);

  useWillMount(() => {
    const isEntryExtension = entry.constructor.prototype instanceof Entry;
    if (!isEntryExtension) {
      throw Error('The "entry" property must contains the instance of an Entry class extension.');
    }

    entry.mergeOptions({ initData: restProps });

    if(!isSSR) {
      mountElement.current = document.createElement('div');
      entry.setDomElement(mountElement.current);
      entry.mount();
    } else {
      ssrId = entry.ssrId;
      entry.memoSSR((isStatic: boolean) => (entry as any).ssr(isStatic));
    }
  });

  useEffect(() => {
    entry.emit('update', restProps);
  }, [restProps]);

  useWillUnmount(() => {
    entry.emit('unmount');
  });

  return ssrId || createElement('div', { ref });
}
