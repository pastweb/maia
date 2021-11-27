import { MINIRESET } from '../../constants';
import { UpdateTarget } from '../getUpdateTarget';
import { Cache } from '../../cache';

export function updateCSS(target: UpdateTarget, cache: Cache): void {
  if (!cache.style) return;
  target.textContent = `${MINIRESET}${cache.style.css}`;
}
