import { ReactElement } from 'react';

export interface DependencyInfo {
  exportName?: string;
  dependency: Promise<any> | (() => Promise<any>);
  onSuccess?: (dependency: any) => void;
  onError?: (error: any) => void;
}

export type Dependency = Promise<any> | (() => Promise<any>) | DependencyInfo;

export interface AsyncComponentProps {
  component: Dependency | DependencyInfo;
  dependencies?: (Dependency | DependencyInfo)[];
  fallback?: ReactElement | null;
};

