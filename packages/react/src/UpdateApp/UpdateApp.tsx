import { cloneElement, useState } from 'react';
import { UpdateAppProps } from './types';

export function UpdateApp({ on, children, ...restProps }: UpdateAppProps) {
  const [appProps, setAppProps] = useState<{ [propName: string]: any }>(restProps);

  on('update', (newProps: { [propName: string]: any }): void => {
    setAppProps(newProps);
  });

  return cloneElement(children, appProps);
}
