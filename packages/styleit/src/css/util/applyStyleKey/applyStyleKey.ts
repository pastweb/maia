import { CSSObject } from '../../types';
import { cssToObject } from '../cssToObject';

type Names = {
  [name: string]: string;
};

export type ScopedNames = {
  fontFamily : Names;
  keyframes: Names;
  classes: Names;
  scoped: CSSObject;
};

export function applyStyleKey(scss: string, styleKey:string): ScopedNames {
  const fontFamily: Names = {};
  const keyframes: Names = {};
  const classes: Names = {};

  const classNames = scss.match(/\.[_a-zA-Z-]+/g);
  if (classNames) {
    new Set(classNames).forEach(className => {
      const newClassName = `${className}${styleKey}`;
      scss = scss.replace(new RegExp(`\\${className}(?![_a-zA-Z-]+)`, 'g'), newClassName);
      classes[className.replace('.', '')] = newClassName.replace('.', '');
    });
  }

  if (scss.includes('@font-face')) {
    const fonts = scss.match(/font-family*.+;/);
    if (fonts) {
      fonts.forEach(line => {
        let newLine = line;
        const fontNames = line.match(/['"][\w\s]+['"]/);
        fontNames?.forEach(name => {
          const _name: string = name.replace(/["']/g, '');
          fontFamily[_name] = `${_name}${styleKey}`;
          newLine = newLine.replace(name, `"${fontFamily[_name]}"`);
        });
        scss = scss.replace(new RegExp(line, 'g'), newLine);
      });
    }
  }

  const frames = scss.match(/@keyframes.*{/g);
  if (frames) {
    frames.forEach(line => {
      const name = line.replace(/(@keyframes\s+)|(\s+{)/g, '');
      keyframes[name] = `${name}${styleKey}`;
      const newLine = line.replace(name, keyframes[name]);
      scss = scss.replace(line, newLine);
    });

    const animations = scss.match(/animation(-name)?:.*;/g);
    if (animations) {
      animations.forEach(line => {
        let newLine = line;
        Object.entries(keyframes).forEach(([name, scopedName]) => {
          newLine = newLine.replace(name, scopedName);
        });
        scss = scss.replace(line, newLine);
      });
    }
  }

  return {
    fontFamily,
    keyframes,
    classes,
    scoped: cssToObject(scss),
  };
}