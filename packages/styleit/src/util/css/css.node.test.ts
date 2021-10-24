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

const styleKey = hashCode(EXPECTED_STYLE);

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
`();

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
`({ fileName: filename });

const styleDetailWithFunctions = css`
.example {
  background-color: ${() => 'red'};
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
`({
  fileName: filename,
  componentName: component,
  styleKey,
});

describe('css - web', () => {
    it('without vars in template literals, the string should be as expected.', () => {
      const { rules, fileName, componentName, styleKey } = styleDetailNoVars;
      expect(rules === EXPECTED_STYLE).toBe(true);
      expect(fileName).toBe('');
      expect(componentName).toBe('');
      expect(styleKey).toBe(styleKey);
    });

    it('with vars in template literals, the string should be as expected.', () => {
      const { rules, fileName, styleKey } = styleDetailWithVars;
      expect(rules === EXPECTED_STYLE).toBe(true);
      expect(fileName).toBe(filename);
      expect(styleKey).toBe(styleKey);
    });

    it('with functions in template literals, the string should be as expected.', () => {
      const { rules, fileName, componentName, styleKey } = styleDetailWithFunctions;
      expect(rules === EXPECTED_STYLE).toBe(true);
      expect(fileName).toBe(filename);
      expect(componentName).toBe(component);
      expect(styleKey).toBe(styleKey);
    });
});