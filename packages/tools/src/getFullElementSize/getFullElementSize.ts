import { isSSR } from '../isSSR';
import { FullElementSize } from './types';

const attrs = {
  width: [
    'width',
    'borderLeftWidth',
    'marginLeft',
    'marginRight',
    'borderRightWidth'
  ],
  height: [
    'height',
    'borderTopWidth',
    'marginTop',
    'marginBottom',
    'borderBottomWidth'
  ]
};

const empty: FullElementSize = { width: 0, height: 0 };

export function getFullElementSize(element?: HTMLElement | null): FullElementSize {
  if (!element) return empty;
  if (isSSR) return empty;

  const cs = window.getComputedStyle(element);
  const sizes: FullElementSize = { ...empty };

  Object.entries(attrs).forEach(([dim, attrs]) => {
    (sizes as any)[dim] = attrs
      .map((attr) => parseFloat((cs as any)[attr]) || 0)
      .reduce((acc, curr) => acc + curr);
  });

  return sizes;
}
