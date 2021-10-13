import { useRef } from 'react';

export function useWillMount(fn: () => void): void {
    const isFunctionCalled = useRef(false);

    if (!isFunctionCalled.current) {
        fn();
        isFunctionCalled.current = true;
    }
}
