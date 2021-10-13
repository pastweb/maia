import { createElement, useRef, useEffect } from 'react';
import { EXCLUDE_PROPS, AppAdapterProps } from './types';
import { useWillMount, useDidMount, useWillUnmount } from '../';
import { App } from '@maia/tools';

export function getCompProps(props: AppAdapterProps): any {
  return Object.entries(props).reduce((acc, [propName, value]) => {
    if (!EXCLUDE_PROPS.includes(propName)) {
      return { ...acc, [propName]: value };
    }
    return acc;
  }, {});
}

export function AppAdapter(props: AppAdapterProps) {
  const { tagName = 'div', tagClass, tagStyle, app } = props;
  const ref = useRef(null);

  useWillMount(() => {
    const isAppExtension = app.prototype instanceof App;
    if (!isAppExtension) {
      throw Error('The "app" property must contains the instance of an App class extension.');
    }
  });
  
  useDidMount(() => {
    (app as any).mergeOptions({ initData: getCompProps(props) });
    (app as any).setDomElement(ref.current);
    (app as any).mount();
  });

  useEffect(() => {
    (app as any).update(getCompProps(props));
  }, [props]);

  useWillUnmount(() => {
    (app as any).unmount();
  });

  return (
    createElement(tagName, { ref, className: tagClass, style: tagStyle })
  );
}
