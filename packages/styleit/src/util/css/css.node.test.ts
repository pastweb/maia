import { css } from './';
import { hashCode } from '../hashCode';

const filename = 'some/file/path';
const component = 'MyComponentName';

const EXPECTED_STYLE = `
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

const EXPECTED_STYLE_KEY = hashCode(EXPECTED_STYLE);

const styleDetailNoVars = css`
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

const styleDetailWithVars = css`
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
`.styleInfo({ fileName: filename });

const forwardArgs = {
  backgroundColor: 'red',
  ExampleAnimationName: 'expample',
  animationDuration: '5s',
  ExampleAnimationName2: 'expample-2',
}

const styleDetailWithFunctions = css`
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
`.styleInfo({
  fileName: filename,
  componentName: component,
}).forwardArgs(forwardArgs);

describe('css - web', () => {
    it('without vars in template literals, the string should be as expected.', () => {
      expect(typeof styleDetailNoVars.styleInfo).toBe('function');
      const { forwardArgs } = styleDetailNoVars.styleInfo();
      expect(typeof forwardArgs).toBe('function');
      const { rules, fileName, componentName, styleKey } = forwardArgs();
      expect(rules === EXPECTED_STYLE).toBe(true);
      expect(fileName).toBe('');
      expect(componentName).toBe('');
      expect(styleKey).toBe(EXPECTED_STYLE_KEY);
    });

    it('with vars in template literals, the string should be as expected.', () => {
      expect(typeof styleDetailWithVars.forwardArgs).toBe('function');
      const { rules, fileName, styleKey } = styleDetailWithVars.forwardArgs();
      expect(rules === EXPECTED_STYLE).toBe(true);
      expect(fileName).toBe(filename);
      expect(styleKey).toBe(EXPECTED_STYLE_KEY);
    });

    it('with functions in template literals, the string should be as expected.', () => {
      const { rules, fileName, componentName, styleKey } = styleDetailWithFunctions;
      expect(rules === EXPECTED_STYLE).toBe(true);
      expect(fileName).toBe(filename);
      expect(componentName).toBe(component);
      expect(styleKey).toBe(EXPECTED_STYLE_KEY);
    });
});