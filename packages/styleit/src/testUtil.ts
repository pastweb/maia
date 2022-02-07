import { css } from './css';

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

export const EXPECTED_STYLE_KEY = '_uniqueId';

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

export const forward = {
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
  forward,
});

export const STYLE_WITH_KEYFRAMES = `
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

@keyframes expample {
  from { opacity: 0; }
  to { opacity: 1; }
}

@font-face {
  font-family: "MyWebFont", 'OtherFallBack', sans-serif;
  src: url('webfont.eot'); /* IE9 Compat Modes */
  src: url('webfont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('webfont.woff2') format('woff2'), /* Super Modern Browsers */
       url('webfont.woff') format('woff'), /* Pretty Modern Browsers */
       url('webfont.ttf')  format('truetype'), /* Safari, Android, iOS */
       url('webfont.svg#svgFontName') format('svg'); /* Legacy iOS */
}

@keyframes example-2 {
  from { opacity: 1; }
  to { opacity: 0; }
}
`;

export const STYLE_WITHOUT_KEYFRAMES = `
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

