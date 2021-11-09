import { ReactNode } from 'react';

export type DependencyFunctions = {
  onSuccess: (module: any) => void;
  onError: (error: any) => void;
};

export type DependencyInfo = DependencyFunctions & {
  [exportName: string]: Promise<any> | (() => Promise<any>);
}

export interface AsyncComponentProps {
  component: DependencyInfo;
  dependencies?: DependencyInfo[];
  fallback?: NonNullable<ReactNode> | null;
};
