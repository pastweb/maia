import { useEffect } from 'react';

export function useWillUnmount(fn: () => void): void {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect((): (() => void) => fn, []);
}
