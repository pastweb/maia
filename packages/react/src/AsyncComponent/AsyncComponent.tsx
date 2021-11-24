import { useRef, createElement, ReactNode } from 'react';
import { useWillMount } from '../useWillMount';
import { useForceUpdate } from '../useForceUpdate';
import { loadDependency } from './util';
import { AsyncComponentProps, DependencyInfo } from './types';

export function AsyncComponent(props: AsyncComponentProps) {
  const {
    component,
    dependencies,
    fallback = null,
    ...restProps
  } = props;

  const Component = useRef<NonNullable<ReactNode> | null>(fallback);
  const depCounter = useRef(0);
  const forceUpdate = useForceUpdate();

  function loadComponent() {
    const exportName = Object.keys(component)[0];
    const { onSuccess } = component;
    component.onSuccess = (module: any) => {
      Component.current = (module as any)[exportName];
      if (onSuccess) {
        onSuccess(module);
      }
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

  return Component.current ? createElement((Component as any).current, { ...restProps }) : null;
}
