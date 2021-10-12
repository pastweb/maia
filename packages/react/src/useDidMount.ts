import { useEffect, EffectCallback } from 'react';

export function useDidMount(fn: EffectCallback): void {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(fn, []);
}
