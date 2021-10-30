import styleIt, { ScopedNames } from '@maia/styleit';
import { StyleItProps, StyleItState, Theme } from './types';

export function updateState(props:StyleItProps, theme: Theme): StyleItState {
  const { styles, argsAsArray, forward, componentName} = props;

  const forwardArgs = Object.keys(theme).length ? { ...forward, theme } : forward;
  
  const styleObject = typeof styles === 'function'? styles(forwardArgs) : styles;

  const styleInfo = styleObject.set({
    argsAsArray,
    forwardArgs,
    name: componentName,
  }).interpolate();

  const scopedNames = styleIt.add(styleInfo);
  
  return {
    styles: styleObject,
    styleInfo,
    scopedNames, 
  };
}

const skipProps = new Set([
  'ref',
  'tagName',
  'styles',
  'className',
  'forward',
  'componentName',
]);

export function getProps(props: StyleItProps, scopedNames: ScopedNames, ref: any) {
  const { className = '' } = props;
  const { name, id } = scopedNames;
  
  const newProps = {
    ref,
    className: `${name}${className ? ` ${className}` : ''} ${id}`,
  };
  
  return Object.entries(props).reduce((acc, [propName, value]) => {
    if (skipProps.has(propName)) return { ...acc };
    return { ...acc, [propName]: value };
  }, newProps);
}