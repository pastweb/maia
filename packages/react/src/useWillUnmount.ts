import { useEffect } from 'react';

export function useWillUnmount(fn: () => void): void {
    useEffect((): (() => void) => fn, []);
}
