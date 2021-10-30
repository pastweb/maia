import { css } from '../css';
import { hashCode } from '../hashCode';

export const filename = 'some/file/path';
export const component = 'MyComponentName';

export const EXPECTED_STYLE = `
.example {
  background-color: red;
  &:hover {
    animation-name: expample;
    animation-duration: 4s;
  }
}

.class2 {
  background-color: red;
  &:hover {
    animation: expample 5s infinite;
  }
}

.class3 {
  background-color: red;
  &:hover {
    animation: expample-2 5s infinite;
  }
}
`;

export const EXPECTED_STYLE_KEY = hashCode(EXPECTED_STYLE);

export const styleNoVars = css`
.example {
  background-color: red;
  &:hover {
    animation-name: expample;
    animation-duration: 4s;
  }
}

.class2 {
  background-color: red;
  &:hover {
    animation: expample 5s infinite;
  }
}

.class3 {
  background-color: red;
  &:hover {
    animation: expample-2 5s infinite;
  }
}
`;

export const styleWithVars = css`
.example {
  background-color: ${'red'};
  &:hover {
    animation-name: ${'expample'};
    animation-duration: ${4}s;
  }
}

.class2 {
  background-color: ${'red'};
  &:hover {
    animation: expample ${5}s infinite;
  }
}

.class3 {
  background-color: red;
  &:hover {
    animation: ${'expample-2'} ${5}s infinite;
  }
}
`.setOptions({ fileName: filename });

export const forwardArgs = {
  backgroundColor: 'red',
  ExampleAnimationName: 'expample',
  animationDuration: '5s',
  ExampleAnimationName2: 'expample-2',
}

export const styleWithFunctions = css`
.example {
  background-color: ${({ backgroundColor }: any) => backgroundColor};
  &:hover {
    animation-name: ${function(){ return 'expample' }};
    animation-duration: ${() => 4}s;
  }
}

.class2 {
  background-color: ${function(){ return 'red' }};
  &:hover {
    animation: expample ${() => 5}s infinite;
  }
}

.class3 {
  background-color: red;
  &:hover {
    animation: ${function(){ return 'expample-2'}} ${() => 5}s infinite;
  }
}
`.setOptions({
  fileName: filename,
  name: component,
  forwardArgs,
});
