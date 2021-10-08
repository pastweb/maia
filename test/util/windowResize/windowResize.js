import { fireWindowEvent } from '../fireWindowEvent/fireWindowEvent';

let storedWidth = null;
let storedHeight = null;

if (typeof window !== 'undefined') {
  storedWidth = window.innerWidth;
  storedHeight = window.innerHeight;
}

export function windowResize (width, height) {
  if (typeof window !== 'undefined') {
    window.innerWidth = isNaN(width) ? storedWidth : width;
    window.innerHeight = isNaN(height) ? storedHeight : height;
    fireWindowEvent('resize');
  }
}
