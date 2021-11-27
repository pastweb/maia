import { MINIRESET } from '../../constants';
import { updateTarget } from '../updateTarget';
import { cache } from '../../cache';

export function updateCSS(): void {
  if (!cache.style) return;
  updateTarget.textContent = `${MINIRESET}${cache.style.css}`;
}
