import { MINIRESET } from '../constants';
import { UpdateTarget } from '../getUpdateTarget';
import { Cache } from '../getCache';

export function updateCSS(target: UpdateTarget, cache: Cache): void {
  if (!cache.style) return;
  target.textContent = `${MINIRESET}${cache.style.css}`;
}
