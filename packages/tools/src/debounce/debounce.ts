export type DebouceCallback = (...args: any[]) => any;

export function debounce(fn: DebouceCallback, timeout = 300): DebouceCallback {
  let timer: any;

  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, timeout);
  };
}
