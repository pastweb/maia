import { MINIRESET } from '../constants';
import { UpdateTarget, Cache } from '../types';

export function updateCSS(target: UpdateTarget, cache: Cache): void {
  if (!cache.style) return;
  target.textContent = `${MINIRESET}${cache.style.css}`;
}
