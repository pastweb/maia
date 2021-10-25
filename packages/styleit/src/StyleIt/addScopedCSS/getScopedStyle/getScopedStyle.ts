import {
  GET_ANIMATION_LINES_REGEX,
  GET_FONT_FACE_BLOCKS_REGEX,
  GET_FONT_FAMILY_RAWS_REGEX,
  GET_KEYFRAMES_NAME_RAWS_REGEX,
} from '../../../util/constants';
import { ScopedStyle } from './types';
 
export function getScopedStyle (rules: string, id: string): ScopedStyle {
  const hasKeyframes = rules.includes('@keyframes');
  const hasFontFace = rules.includes('@font-face');
  const scopedRules = `.${id}{${rules}}`;
  const scoped: ScopedStyle = {
    fontFamily: {},
    keyframes: {},
    rules: scopedRules,
  };

  if (hasKeyframes) {
    const keyFramesLines = scopedRules.match(GET_KEYFRAMES_NAME_RAWS_REGEX);

    if (keyFramesLines) {
      const animationLines = scopedRules.match(GET_ANIMATION_LINES_REGEX);

      keyFramesLines.forEach(raw => {
        const name = raw.split(' ')[1].replace('{', '');
        const scopedName = `${name}${id}`;
        scoped.keyframes[name] = scopedName;

        const keyFramesNameRegex = new RegExp(`@keyframes ${name}\\s*{`,'g');
        scoped.rules = scoped.rules.replace(keyFramesNameRegex, `@keyframes ${scopedName}{`);

        if (animationLines) {
          animationLines.forEach(line => {
            const scopedLine = line.replace(name, scopedName);
            scoped.rules = scoped.rules.replace(line, scopedLine);
          });
        }
      });
    }
  }

  if (hasFontFace) {
    const fontFaceBlocks = scopedRules.match(GET_FONT_FACE_BLOCKS_REGEX);

    if (fontFaceBlocks) {
      fontFaceBlocks.forEach(fontFaceBlock => {
        const fontFamilyRaws = fontFaceBlock.match(GET_FONT_FAMILY_RAWS_REGEX);

        if(fontFamilyRaws) {
          const [fontFamilyRaw] = fontFamilyRaws;
          const name = fontFamilyRaw.replace(/font-family:\s*/g, '').replace(/["']/g, '');
          const scopedName = `${name}${id}`;
          scoped.fontFamily[name] = scopedName;
          const fontFamilyNameRegex = new RegExp(`font-family:\\s*['"]${name}['"]`,'g');
          const scopedFaceBlock = fontFaceBlock.replace(fontFamilyNameRegex, `font-family:'${scopedName}'`);
          scoped.rules = scoped.rules.replace(fontFaceBlock, scopedFaceBlock);
        }
      });
    }
  }

  return scoped;
}
