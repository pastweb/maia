import { useCallback } from 'react';

export function useFunction<T extends (...args: any[]) => any>(fn: T): T {
  return useCallback(fn, []);
}