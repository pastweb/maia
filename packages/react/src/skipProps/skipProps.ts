import { Props } from './types';

export function skipProps(props: Props, skip: string[], defaultNewProps = {}): Props {
  const skipProps = new Set(skip);

  return Object.entries(props).reduce((acc, [propName, value]) => {
    if (skipProps.has(propName)) return { ...acc };
    return { ...acc, [propName]: value };
  }, defaultNewProps);
}
