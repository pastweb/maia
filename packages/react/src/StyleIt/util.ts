import styleIt, { ForwardArgs, ScopedNames } from '@maia/styleit';
import { StyleItState, Theme } from './types';

export function updateState(props: any, theme: Theme): StyleItState {
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
  const styleName = name || options.name || styleObject.getOptions().name;

  const newOptions = { ...options, name: styleName, ...forward };
  const styleInfo = styleObject.setOptions(newOptions).getStyleInfo();

  const scopedNames: ScopedNames = styleIt.add(styleInfo);
  
  return {
    styleInfo,
    scopedNames, 
  };
}
