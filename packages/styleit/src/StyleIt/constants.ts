export const STYLE_OBJECT_ERROR = 'styleIt methods just accept a valid css (scss,sass,less) plain string\nor a styleObject format { rules: <code>, filePath: <path> }.';

// minireset.css v0.0.6 | MIT License | github.com/jgthms/minireset.css
export const MINIRESET = 'html,body,p,ol,ul,li,dl,dt,dd,blockquote,figure,fieldset,legend,textarea,pre,iframe,hr,h1,h2,h3,h4,h5,h6{margin:0;padding:0}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal}ul{list-style:none}button,input,select,textarea{margin:0}html{box-sizing:border-box}*,*::before,*::after{box-sizing:inherit}img,video{height:auto;max-width:100%}iframe{border:0}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}td:not([align]),th:not([align]){text-align:left}';

export const MAIA_STYLEIT_CACHE_UPDATE_EVENT = 'MAIA_STYLEIT_CACHE_UPDATE_EVENT';
export const MAIA_STYLEIT_GET_CACHE_EVENT = 'MAIA_STYLEIT_GET_CACHE_EVENT';

export const GET_KEYFRAMES_NAME_RAWS_REGEX = /@keyframes\s+.*{/g;
export const GET_ANIMATION_LINES_REGEX = /animation(?:-name)?:\s*.*/g;

export const GET_FONT_FACE_BLOCKS_REGEX = /@font-face\s*{\s*(?:\/\*.*\*\/)?\s*font-family:\s*.*\s*;/g;
export const GET_FONT_FAMILY_RAWS_REGEX = /font-family:\s*['"].*['"]/g;

export const GLOBAL_IDS_CACHE_NAME = '___MAIA_STYLEIT_IDS_CACHE___';
export const GLOBAL_STYLE_CACHE_NAME = '___MAIA_STYLEIT_STYLE_CACHE___';
export const GLOBAL_EMITTER_NAME = '___MAIA_STYLEIT_EMITTER___';
export const SCRIPT_TAG_NAME = 'maia-styleIt-script';
export const STYLE_TAG_NAME = 'maia-styleIt';
