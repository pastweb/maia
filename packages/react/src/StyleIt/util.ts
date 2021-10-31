import styleIt, { ForwardArgs, ScopedNames } from '@maia/styleit';
import { StyleItProps, StyleItState, Theme } from './types';

export function updateState(props:StyleItProps, theme: Theme): StyleItState {
  const {
    extFuncOptions,
    name,
    options = {},
    styles,
  } = props;
  
  const forward: ForwardArgs = { ...props.forward, theme };
  let extFuncForward: ForwardArgs = forward;

  if (extFuncOptions) {
    const { argsSelector, argsAsArray } = extFuncOptions;
    
    if (argsSelector && Array.isArray(argsSelector) && argsSelector.length) {
      extFuncForward = argsSelector.reduce((acc: ForwardArgs, argName: string) => {
          return { ...acc, [argName]: forward[argName] };
        }, {}
      );
    }

    if (argsAsArray) {
      extFuncForward = Object.values(extFuncForward);  
    }
  }
  
  const styleObject = typeof styles === 'function'? styles(extFuncForward) : styles;

  const newOptions = { ...options, name: name || options.name, ...forward };
  const styleInfo = styleObject.setOptions(newOptions).interpolate();

  const scopedNames = styleIt.add(styleInfo);
  
  return {
    styleInfo,
    scopedNames, 
  };
}

const skipProps = new Set([
  'className',
  'extFuncOptions',
  'forward',
  'name',
  'options',
  'ref',
  'styles',
  'tagName',
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