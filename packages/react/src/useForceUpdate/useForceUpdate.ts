import { useState } from 'react';

export function useForceUpdate(): (() => void) {
    return useState()[1] as (() => void);
}
