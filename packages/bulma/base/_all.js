import { css } from '@maia/styleit';

export default ({ theme: { bulma: b }}) => css`
/* Bulma Base */
html {
  background-color: ${b.bodyBackgroundColor};
  font-size: 16px;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  min-width: ${b.bodyMinWidth};
  overflow-x: hidden;
  overflow-y: scroll;
  text-rendering: optimizeLegibility;
  text-size-adjust: 100%;
}

article,
aside,
figure,
footer,
header,
hgroup,
section {
  display: block;
}

body,
button,
input,
optgroup,
select,
textarea {
  font-family: ${b.bodyFamily};
}

code,
pre {
  -moz-osx-font-smoothing: auto;
  -webkit-font-smoothing: auto;
  font-family: ${b.codeFamily};
}

body {
  color: #4a4a4a;
  font-size: ${b.preCodeFontSize};
  font-weight: ${b.bodyWeight};
  line-height: 1.5;
}

a {
  color: #485fc7;
  cursor: pointer;
  text-decoration: none;
}
a strong {
  color: currentColor;
}
a:hover {
  color: ${b.linkHover};
}

code {
  background-color: ${b.hrBackgroundColor};
  color: #da1039;
  font-size: ${b.codeSize};
  font-weight: normal;
  padding: 0.25em 0.5em 0.25em;
}

hr {
  background-color: ${b.preBackground};
  border: none;
  display: block;
  height: 2px;
  margin: ${b.hrMargin};
}

img {
  height: auto;
  max-width: 100%;
}

input[type=checkbox],
input[type=radio] {
  vertical-align: baseline;
}

small {
  font-size: ${b.smallFontSize};
}

span {
  font-style: inherit;
  font-weight: inherit;
}

strong {
  color: ${b.strongColor};
  font-weight: 700;
}

fieldset {
  border: none;
}

pre {
  -webkit-overflow-scrolling: touch;
  background-color: whitesmoke;
  color: #4a4a4a;
  font-size: 0.875em;
  overflow-x: auto;
  padding: ${b.prePadding};
  white-space: pre;
  word-wrap: normal;
}
pre code {
  background-color: transparent;
  color: currentColor;
  font-size: 1em;
  padding: 0;
}

table td,
table th {
  vertical-align: top;
}
table td:not([align]),
table th:not([align]) {
  text-align: inherit;
}
table th {
  color: ${b.textStrong};
}

@keyframes spinAround {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
`;
