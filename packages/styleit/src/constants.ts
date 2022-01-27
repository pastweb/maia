import version from './version';

// minireset.css v0.0.6 | MIT License | github.com/jgthms/minireset.css
export const MINIRESET = 'html,body,p,ol,ul,li,dl,dt,dd,blockquote,figure,fieldset,legend,textarea,pre,iframe,hr,h1,h2,h3,h4,h5,h6{margin:0;padding:0}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal}ul{list-style:none}button,input,select,textarea{margin:0}html{box-sizing:border-box}*,*::before,*::after{box-sizing:inherit}img,video{height:auto;max-width:100%}iframe{border:0}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}td:not([align]),th:not([align]){text-align:left}';

export const GLOBAL_IDS_NAME = '___MAIA_STYLEIT_IDS_CACHE___';
export const GLOBAL_STYLEMAP_NAME = '___MAIA_STYLEIT_STYLEMAP_CACHE___';
export const GLOBAL_FRAMEWORKS_NAME = '___MAIA_STYLEIT_FRAMEWORKS_CACHE___';
export const GLOBAL_STYLE_CACHE_NAME = '___MAIA_STYLEIT_STYLE_CACHE___';
export const SCRIPT_TAG_NAME = `maia-styleIt-script_${version}`;
export const STYLE_TAG_NAME = `maia-styleIt_${version}`;
