import { useState, useRef, cloneElement, ReactElement, isValidElement, createElement } from 'react';
import { useWillMount } from '../useWillMount';
import { loadDependency, normalizeDependency } from './util';
import { AsyncComponentProps, Dependency, DependencyInfo } from './types';

export function AsyncComponent(props: AsyncComponentProps) {
  const {
    component,
    dependencies,
    fallback = null,
    ...restProps
  } = props;

  const [Component, setComponent] = useState<ReactElement | null>(fallback);
  const depCounter = useRef(0);

  function loadComponent() {
    const info = normalizeDependency(component);
    const { onSuccess } = info;
    info.onSuccess = (module: any) => {
      if (onSuccess) {
        onSuccess(module);
      }
      setComponent(module);
    };
    loadDependency(info);
  }

  function depCountrIncrement(): void {
    depCounter.current += 1;
    if (depCounter.current === (dependencies!.length - 1)) {
      loadComponent();
    }
  }

  function loadDependencies() {
    if (dependencies) {
      dependencies.forEach((dep: Dependency | DependencyInfo, i: number) => {
          const depPromise = loadDependency(normalizeDependency(dep));
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

  return (
    Component ? 
      isValidElement(Component) ?
      cloneElement(Component as ReactElement, restProps) :
      createElement(Component, restProps)
    : null
  );
}
