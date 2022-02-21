import { ThrottleCallback } from './types';

export function throttle(
  fn: ThrottleCallback,
  timeout = 300
): ThrottleCallback {
  let inThrottle: boolean;

  return (...args) => {
    if (inThrottle) return;

    fn.apply(this, args);
    inThrottle = true;
    setTimeout(() => {
      inThrottle = false;
    }, timeout);
  };
}
