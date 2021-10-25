export function readOnlyProp(target: { [porpName: string]: any }, prop: string, value: any) {
  Object.defineProperty(target, prop, {
    value,
    writable: false,
    configurable: false,
  });
}
