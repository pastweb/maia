import { windowResize as _windowResize } from './windowResize';

export function windowResize (width?: number, height?: number): void {
  _windowResize(width, height);
}
