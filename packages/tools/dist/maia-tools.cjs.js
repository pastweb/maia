!function(t,i){"object"==typeof exports&&"undefined"!=typeof module?i(exports):"function"==typeof define&&define.amd?define(["exports"],i):i((t="undefined"!=typeof globalThis?globalThis:t||self)["@maia/tools"]={})}(this,(function(t){"use strict";var i=Symbol(),e=Symbol(),s=Symbol(),n=function(){function t(){this[i]={},this[e]={},this[s]=this[s].bind(this),this.emit=this.emit.bind(this),this.on=this.on.bind(this),this.removeListener=this.removeListener.bind(this)}return t.prototype.emit=function(t){for(var e=[],s=1;s<arguments.length;s++)e[s-1]=arguments[s];if(this[i][t]){var n=new Set;this[i][t].forEach((function(t){n.has(t)||(n.add(t),t.apply(void 0,e))}))}},t.prototype.on=function(t,n){var o=this;this[i][t]||(this[i][t]=new Map);var r=Symbol();return this[i][t].set(r,n),this[e][r]=t,{eventCallbackKey:r,removeListener:function(){return o[s](t,r)}}},t.prototype.removeListener=function(t){var i=this[e][t];i&&this[s](i,t)},t.prototype[s]=function(t,s){this[i][t].delete(s),delete this[e][s]},t}();function o(){}var r=Symbol(),h=Symbol(),l=function(){function t(t,i,e){void 0===t&&(t={}),void 0===e&&(e={});var s=e.optionsKey,l=e.domElementKey;this[h]=e,this[r]=new n,l?this[l]=i:this.domElement=i,s?this[s]=t:this.options=t,this.on=this[r].on,this.emit=this[r].emit,this.removeListener=this[r].removeListener,this.mount&&"function"==typeof this.mount?this.mount=this.mount.bind(this):this.mount=o,this.unmount&&"function"==typeof this.unmount?this.unmount=this.unmount.bind(this):this.unmount=o,this.update&&"function"==typeof this.update?this.update=this.update.bind(this):this.update=o}return t.prototype.setDomElement=function(t,i){i?this[i]=t:this[h].domElementKey?this[h].domElementKey=t:this.domElement=t},t.prototype.setOptions=function(t,i){i?this[i]=t:this[h].optionsKey?this[this[h].optionsKey]=t:this.options=t},t}();function a(t){return Object.prototype.toString.call(t).slice(8,-1)}var c={Number:function(t){return""+t},String:function(t){return""+t},Object:function(t){return i=t,Object.keys(i).reduce((function(t,e,s){return i[e]?""+t+u(s)+e:t}),"");var i},Array:function(t){return d(t)}};function u(t){return t>0?" ":""}function d(t){var i=null;return t.reduce((function(t,e,s){var n=a(e);return c[n]&&(i=c[n](e))?""+t+u(s)+i:t}),"")}var f="undefined"==typeof window;function p(t,i){return null!=i&&a(i)===t}function b(t){return p("Object",t)}
/*! *****************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
var m=function(){return m=Object.assign||function(t){for(var i,e=1,s=arguments.length;e<s;e++)for(var n in i=arguments[e])Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n]);return t},m.apply(this,arguments)},g={width:["width","borderLeftWidth","marginLeft","marginRight","borderRightWidth"],height:["height","borderTopWidth","marginTop","marginBottom","borderBottomWidth"]},v={width:0,height:0};var y="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",S=y.length;function E(t,i){for(var e=i||8,s=t||"",n=0;n<e;n++)s=""+s+y.charAt(Math.floor(Math.random()*S));return s}var w={generate:E,generateUnique:function(t,i,e,s){for(var n=new Set(t)||new Set,o="",r=s||9999,h=0;h<r&&(o=E(i,e),n.has(o));h++)h===r&&console.error("tried "+h+" times to find a unique ID.");return o}};var x=/iP(hone|ad|od)|blackberry|Android|(W|w)indows (P|p)hone/g;function z(t){var i=t.matches;return!(!x.test(window.navigator.userAgent)&&!i)}function A(t,i){t&&Object.entries(i).forEach((function(i){var e=i[0],s=i[1];"style"===e?Object.entries(s).forEach((function(i){var e=i[0],s=i[1];t.style[e]=""+s})):t[e]=""+s}))}var k={},X={open:function(t){return function(t,i){var e=i.portalId,s=i.tagName,n=void 0===s?"div":s,o=i.tagAttrs,r=i.app,h=void 0===r?{}:r,l=document.getElementById(e);if(!l)return!1;var a=document.createElement(n);o&&A(a,o),t[e]||(t[e]={});var c=w.generateUnique(Object.keys(t[e]));a.id=c,l.appendChild(a);var u=h.AppClass,d=void 0===u?function(){function t(){}return t.prototype.mount=function(){},t}():u,f=h.options,p=void 0===f?{}:f,b=h.privateKeys,g=void 0===b?{}:b,v=new d(m({portalId:e,appId:c},p),a,g);return t[e][c]=v,v.mount(),c}(k,t)},update:function(t){return function(t,i){var e=i.portalId,s=i.appId,n=i.tagAttrs,o=i.appData;return!(!t[e]||"*"!==s&&!t[e][s]||(n&&A(document.getElementById(s),n),o&&("*"===s?Object.values(t[e]).forEach((function(t){return t.update(o)})):t[e][s].update(o)),0))}(k,t)},close:function(t){return function(t,i){var e=i.portalId,s=i.appId;return!(!t[e]||"*"!==s&&!t[e][s])&&("*"===s&&Object.keys(t[e]).forEach((function(i){return t[e][i].emit("mustUnmount")})),function(i){var e=i.portalId,s=i.appId;t[e][s].unmount(),delete t[e][s];var n=document.getElementById(s);return n&&n.remove(),!0}({portalId:e,appId:s}))}(k,t)}};const Y={autoHide:!0,show:"both",forceVisible:!1,scrollbarMinSize:25,scrollbarMaxSize:0,direction:"ltr",timeout:1e3,visibleClass:"visible"};t.App=l,t.EventEmitter=n,t.ScrollbarsHandler=class{constructor(t,i){this.setOptions=this.setOptions.bind(this),this.init=this.init.bind(this),this.initListeners=this.initListeners.bind(this),this.recalculate=this.recalculate.bind(this),this.render=this.render.bind(this),this.resizeScrollbar=this.resizeScrollbar.bind(this),this.positionScrollbar=this.positionScrollbar.bind(this),this.toggleTrackVisibility=this.toggleTrackVisibility.bind(this),this.hideNativeScrollbar=this.hideNativeScrollbar.bind(this),this.onScrollX=this.onScrollX.bind(this),this.onScrollY=this.onScrollY.bind(this),this.scrollX=this.scrollX.bind(this),this.scrollY=this.scrollY.bind(this),this.onMouseEnter=this.onMouseEnter.bind(this),this.onMouseMove=this.onMouseMove.bind(this),this.showScrollbar=this.showScrollbar.bind(this),this.hideScrollbars=this.hideScrollbars.bind(this),this.onMouseDown=this.onMouseDown.bind(this),this.onDrag=this.onDrag.bind(this),this.drag=this.drag.bind(this),this.onEndDrag=this.onEndDrag.bind(this),this.isWithinBounds=this.isWithinBounds.bind(this);const{scrollbars:e,scrollContent:s,content:n,trackY:o,scrollbarY:r,trackX:h,scrollbarX:l}=t;this.el=e,this.contentEl=n,this.scrollContentEl=s,this.trackX=h,this.scrollbarX=l,this.trackY=o,this.scrollbarY=r,this.flashTimeout=null,this.dragOffset={x:0,y:0},this.isEnabled={x:!0,y:!0},this.isVisible={x:!1,y:!1},this.scrollOffsetAttr={x:"scrollLeft",y:"scrollTop"},this.sizeAttr={x:"offsetWidth",y:"offsetHeight"},this.scrollSizeAttr={x:"scrollWidth",y:"scrollHeight"},this.offsetAttr={x:"left",y:"top"},this.handleSize={x:0,y:0},this.currentAxis=null,this.scrollbarWidth=null,this.options={...Y,options:i},this.isRtl="rtl"===this.options.direction,this.offsetSize=20,this.contentElWidth=null,this.contentElHeight=null,this.init()}setOptions(t){this.options=Object.assign(this.options,t),this.recalculate()}init(){window&&(this.hideNativeScrollbar(),this.render(),this.recalculate(),this.initListeners())}initListeners(){this.options.autoHide&&this.el.addEventListener("mouseenter",this.onMouseEnter),this.el.addEventListener("mousedown",this.onMouseDown),this.el.addEventListener("mousemove",this.onMouseMove),this.contentEl.addEventListener("scroll",this.onScrollX),this.scrollContentEl.addEventListener("scroll",this.onScrollY)}recalculate(){this.render()}render(){this.contentSizeX=this.contentEl[this.scrollSizeAttr.x],this.contentSizeY=this.contentEl[this.scrollSizeAttr.y]-(this.scrollbarWidth||this.offsetSize),this.trackXSize=this.trackX[this.sizeAttr.x],this.trackYSize=this.trackY[this.sizeAttr.y],this.isEnabled.x=this.trackXSize<this.contentSizeX,this.isEnabled.y=this.trackYSize<this.contentSizeY,this.resizeScrollbar("x"),this.resizeScrollbar("y"),this.positionScrollbar("x"),this.positionScrollbar("y"),this.toggleTrackVisibility("x"),this.toggleTrackVisibility("y")}resizeScrollbar(t="y"){let i,e,s;if(!this.isEnabled[t]&&!this.options.forceVisible)return;"x"===t?(i=this.scrollbarX,e=this.contentSizeX,s=this.trackXSize):(i=this.scrollbarY,e=this.contentSizeY,s=this.trackYSize);const n=s/e;this.handleSize[t]=Math.max(n*s,this.options.scrollbarMinSize),this.options.scrollbarMaxSize&&(this.handleSize[t]=Math.min(this.handleSize[t],this.options.scrollbarMaxSize)),"x"===t?i.style.width=`${this.handleSize[t]}px`:i.style.height=`${this.handleSize[t]}px`}positionScrollbar(t="y"){let i,e,s,n;"x"===t?(i=this.scrollbarX,e=this.contentEl[this.scrollOffsetAttr[t]],s=this.contentSizeX,n=this.trackXSize):(i=this.scrollbarY,e=this.scrollContentEl[this.scrollOffsetAttr[t]],s=this.contentSizeY,n=this.trackYSize);const o=e/(s-n),r=(n-this.handleSize[t])*o;(this.isEnabled[t]||this.options.forceVisible)&&(i.style.transform="x"===t?`translate3d(${r}px, 0, 0)`:`translate3d(0, ${r}px, 0)`)}toggleTrackVisibility(t="y"){const i="y"===t?this.trackY:this.trackX,e="y"===t?this.scrollbarY:this.scrollbarX;this.isEnabled[t]||this.options.forceVisible?i.style.visibility="visible":i.style.visibility="hidden",this.options.forceVisible&&(this.isEnabled[t]?e.style.visibility="visible":e.style.visibility="hidden")}hideNativeScrollbar(){this.scrollbarWidth=function(){if(!document)return 0;const t=document.body,i=document.createElement("div"),e=i.style;e.position="absolute",e.top=e.left="-9999px",e.width=e.height="100px",e.overflow="scroll",t.appendChild(i);const s=i.offsetWidth-i.clientWidth;return t.removeChild(i),s}(),this.scrollContentEl.style[this.isRtl?"paddingLeft":"paddingRight"]=`${this.scrollbarWidth||this.offsetSize}px`,this.scrollContentEl.style.marginBottom=`-${2*this.scrollbarWidth||this.offsetSize}px`,0!==this.scrollbarWidth&&(this.contentEl.style[this.isRtl?"marginLeft":"marginRight"]=`-${this.scrollbarWidth}px`)}onScrollX(){this.scrollXTicking||(window.requestAnimationFrame(this.scrollX),this.scrollXTicking=!0)}onScrollY(){this.scrollYTicking||(window.requestAnimationFrame(this.scrollY),this.scrollYTicking=!0)}scrollX(){this.showScrollbar("x"),this.positionScrollbar("x"),this.scrollXTicking=!1}scrollY(){this.showScrollbar("y"),this.positionScrollbar("y"),this.scrollYTicking=!1}onMouseEnter(){this.showScrollbar("x"),this.showScrollbar("y")}onMouseMove(t){this.contentEl.clientWidth===this.contentElWidth&&this.contentEl.clientHeight===this.contentElHeight||this.recalculate();const i=this.trackY.getBoundingClientRect(),e=this.trackX.getBoundingClientRect();this.mouseX=t.clientX,this.mouseY=t.clientY,this.isWithinBounds(i)&&this.showScrollbar("y"),this.isWithinBounds(e)&&this.showScrollbar("x")}showScrollbar(t="y"){let i;const{show:e}=this.options;this.isVisible[t]||(e&&"none"!==e&&("x"!==t||"both"!==e&&"x"!==e?"y"!==t||"both"!==e&&"y"!==e||(i=this.scrollbarY):i=this.scrollbarX),this.isEnabled[t]&&i&&(i.classList.add(this.options.visibleClass),this.isVisible[t]=!0),this.options.autoHide&&(window.clearInterval(this.flashTimeout),this.flashTimeout=window.setInterval(this.hideScrollbars,this.options.timeout)))}hideScrollbars(){const t=this.trackY.getBoundingClientRect(),i=this.trackX.getBoundingClientRect();this.isWithinBounds(t)||(this.scrollbarY.classList.remove(this.options.visibleClass),this.isVisible.y=!1),this.isWithinBounds(i)||(this.scrollbarX.classList.remove(this.options.visibleClass),this.isVisible.x=!1)}onMouseDown(t){const i=this.scrollbarY.getBoundingClientRect(),e=this.scrollbarX.getBoundingClientRect();this.isWithinBounds(i)&&(t.preventDefault(),this.onDrag(t,"y")),this.isWithinBounds(e)&&(t.preventDefault(),this.onDrag(t,"x"))}onDrag(t,i="y"){t.preventDefault();const e="y"===i?this.scrollbarY:this.scrollbarX,s="y"===i?t.pageY:t.pageX;this.dragOffset[i]=s-e.getBoundingClientRect()[this.offsetAttr[i]],this.currentAxis=i,this.el.addEventListener("mousemove",this.drag),this.el.addEventListener("mouseup",this.onEndDrag)}drag(t){let i,e,s;t.preventDefault(),"y"===this.currentAxis?(i=t.pageY,e=this.trackY,s=this.scrollContentEl):(i=t.pageX,e=this.trackX,s=this.contentEl);const n=(i-e.getBoundingClientRect()[this.offsetAttr[this.currentAxis]]-this.dragOffset[this.currentAxis])/e[this.sizeAttr[this.currentAxis]]*this.contentEl[this.scrollSizeAttr[this.currentAxis]];s[this.scrollOffsetAttr[this.currentAxis]]=n}onEndDrag(){this.el.removeEventListener("mousemove",this.drag),this.el.removeEventListener("mouseup",this.onEndDrag)}isWithinBounds(t){return this.mouseX>=t.left&&this.mouseX<=t.left+t.width&&this.mouseY>=t.top&&this.mouseY<=t.top+t.height}},t.classNames=function(){for(var t=[],i=0;i<arguments.length;i++)t[i]=arguments[i];return d(t)},t.createPortal=function(t){var i=t.portalId,e=t.tagName,s=t.tagAttrs,n=t.app,o=void 0===n?{}:n;return o.options=o.options||{},{open:function(t,n){return X.open({portalId:i,tagName:e,tagAttrs:s,app:m(m({},o),{options:m(m({},o.options),{portal:X,component:t,initData:n})})})},update:function(t,e,s){return X.update({portalId:i,appId:t,appData:e,tagAttrs:s})},close:function(t){return X.close({portalId:i,appId:t})}}},t.debounce=function(t,i){var e,s=this;return void 0===i&&(i=300),function(){for(var n=[],o=0;o<arguments.length;o++)n[o]=arguments[o];clearTimeout(e),e=setTimeout((function(){t.apply(s,n)}),i)}},t.getFromBreakPoints=function(t){if(f)return!1;if(!b(t))return!1;var i=Object.keys(t).map((function(t){return parseFloat(t)})).sort((function(t,i){return t-i}));return t[i.find((function(t){return t>=window.innerWidth}))||i[i.length-1]]},t.getFullElementSize=function(t){if(!t)return v;if(f)return v;var i=window.getComputedStyle(t),e=m({},v);return Object.entries(g).forEach((function(t){var s=t[0],n=t[1];e[s]=n.map((function(t){return parseFloat(i[t])||0})).reduce((function(t,i){return t+i}))})),e},t.getObjectValue=function t(i,e,s){if(void 0===s&&(s=null),!b(i))return s;if(!Array.isArray(e)&&"string"!=typeof e)return s;var n=[];if(Array.isArray(e))n=e;else for(var o="",r="",h=e.length-1;h>=0;h--)"."!==(r=e.charAt(h))?(o=""+r+o,0===h&&n.push(o)):(n.push(o),o="");var l=n.pop();return"string"!=typeof l?s:!n.length&&i[l]?i[l]:i[l]&&b(i[l])?t(i[l],n,s):s},t.getType=a,t.hashID=w,t.isMap=function(t){return p("Map",t)},t.isMobile=function(t){void 0===t&&(t={});var i=t.isMobile,e=t.mediaQueryString,s=t.onMediaQueryChange;if(void 0!==i)return i;if(f)return!1;if(!e)return x.test(window.navigator.userAgent);var n=window.matchMedia(e);return s&&n.addEventListener("change",(function(t){var i=z(t);s&&s(m(m({},t),{isMobile:i}))})),z(n)},t.isObject=b,t.isSSR=f,t.isSet=function(t){return p("Set",t)},t.isSymbol=function(t){return p("Symbol",t)},t.isType=p,t.mergeObjects=function t(){for(var i=[],e=0;e<arguments.length;e++)i[e]=arguments[e];return i.length?i.reduce((function(i,e){return b(e)&&Object.keys(e).forEach((function(s){var n=i[s],o=e[s];Array.isArray(n)&&Array.isArray(o)?i[s]=n.concat.apply(n,o):b(n)&&b(o)?i[s]=t(n,o):i[s]=o})),i}),{}):{}},t.noop=o,t.portal=X,t.throttle=function(t,i){var e,s=this;return void 0===i&&(i=300),function(){for(var n=[],o=0;o<arguments.length;o++)n[o]=arguments[o];e||(t.apply(s,n),e=!0,setTimeout((function(){e=!1}),i))}},Object.defineProperty(t,"__esModule",{value:!0})}));
//# sourceMappingURL=maia-tools.cjs.js.map
