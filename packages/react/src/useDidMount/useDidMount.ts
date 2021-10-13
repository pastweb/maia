import { useEffect, EffectCallback } from 'react';

export function useDidMount(fn: EffectCallback): void {
    useEffect(fn, []);
}
