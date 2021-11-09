import { useRef, createElement, ReactNode } from 'react';
import { skipProps } from '../skipProps';
import { useWillMount } from '../useWillMount';
import { useForceUpdate } from '../useForceUpdate';
import { loadDependency } from './util';
import { AsyncComponentProps, DependencyInfo } from './types';

const propsToSkip = [
  'component',
  'dependencies',
  'fallback',
];

export function AsyncComponent(props: AsyncComponentProps) {
  const {
    component,
    dependencies,
    fallback = null,
  } = props;

  const Component = useRef<NonNullable<ReactNode> | null>(fallback);
  const depCounter = useRef(0);
  const forceUpdate = useForceUpdate();

  function loadComponent() {
    const exportName = Object.keys(component)[0];
    const { onSuccess } = component;
    component.onSuccess = (module: any) => {
      Component.current = (module as any)[exportName];
      onSuccess(module);
    };
    loadDependency(component);
    forceUpdate();
  }

  function depCountrIncrement(): void {
    depCounter.current += 1;
    if (depCounter.current === (dependencies!.length - 1)) {
      loadComponent();
    }
  }

  function loadDependencies() {
    if (dependencies) {
      dependencies.forEach((dep: DependencyInfo, i: number) => {
        const depPromise = loadDependency(dep);
        depPromise.then(() => depCountrIncrement());
        depPromise.catch(e => {
          console.error(`the dependency with the index ${i} has an error: ${e}`);
        });
      });
    } else {
      loadComponent();
    }
  }

  useWillMount(() => {
    loadDependencies();
  });

  const componentProps = skipProps(props, propsToSkip);
  return Component.current ? createElement((Component as any).current, { ...componentProps }) : null;
}
