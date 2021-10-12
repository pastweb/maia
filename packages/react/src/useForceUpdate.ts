import { useState, Dispatch, SetStateAction } from 'react';

export function useForceUpdate(): Dispatch<SetStateAction<undefined>> {
    return useState()[1];
}
