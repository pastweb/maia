import { fireWindowEvent } from '../fireWindowEvent/fireWindowEvent';

let storedWidth: number | null = null;
let storedHeight: number | null = null;

if (typeof window !== 'undefined') {
  storedWidth = window.innerWidth;
  storedHeight = window.innerHeight;
}

export function windowResize (width?: number, height?: number): void {
  if (typeof window !== 'undefined') {
    (window as any).innerWidth = !width ? storedWidth : width;
    (window as any).innerHeight = !height ? storedHeight : height;
    fireWindowEvent('resize');
  }
}
