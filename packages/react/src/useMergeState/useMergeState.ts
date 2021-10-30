import { useReducer } from 'react';

function reducer(
    currentState: { [key: string]: any },
    newState: { [key: string]: any },
): { [key: string]: any } {
    return { ...currentState, ...newState };
}

export function useMergeState(
    initialState: { [key: string]: any },
    init?: ((initialState: { [key: string]: any }) => { [key: string]: any })): { [key: string]: any }
{
    return useReducer<any, any>(reducer, initialState, init || (() => initialState));
}
