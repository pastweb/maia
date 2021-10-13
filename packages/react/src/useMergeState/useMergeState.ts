import { useReducer } from 'react';

type StateObject = {
    [key: string]: any;
};

function reducer(
    currentState: StateObject,
    newState: StateObject
): StateObject {
    return { ...currentState, ...newState };
}

export function useMergeState(initialState: StateObject = {}): any {
    return useReducer(reducer, initialState);
}
