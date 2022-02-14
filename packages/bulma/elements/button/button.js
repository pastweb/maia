import { setOptions, css } from '@maia/styleit';

export default ({ theme: { bulma: b }, keyframes }) => setOptions({
  frameworkName: 'bulma__1_0_0',
  useFrameworkClassId: true,
}, css`
.button {
  /*[[+control]]*/
  -moz-appearance: none;
  -webkit-appearance: none;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: none;
  display: inline-flex;
  font-size: ${b.sizeNormal};
  height: 2.5em;
  justify-content: flex-start;
  line-height: 1.5;
  padding-bottom: calc(0.5em - 1px);
  padding-left: calc(0.75em - 1px);
  padding-right: calc(0.75em - 1px);
  padding-top: calc(0.5em - 1px);
  position: relative;
  vertical-align: top;
  /*[[+control]]*/
}
.button:focus, .is-focused.button, .button:active, .is-active.button {
  outline: none;
}
[disabled].button, fieldset[disabled] .button {
  cursor: not-allowed;
}

.button {
  /*[[+unselectable]]*/
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  /*[[+unselectable]]*/
}

.button.is-loading::after {
  /*[[+loader]]*/
  animation: ${keyframes['spinAround']} 500ms infinite linear;
  border: 2px solid #dbdbdb;
  border-radius: ${b.radiusRounded};
  border-right-color: transparent;
  border-top-color: transparent;
  content: "";
  display: block;
  height: 1em;
  position: relative;
  width: 1em;
  /*[[+loader]]*/
}

.button {
  /*[[@extend %control]]*/
  /*[[@extend %control]]*/
  /*[[@extend %unselectable]]*/
  /*[[@extend %unselectable]]*/
  background-color: white;
  border-color: #dbdbdb;
  border-width: 1px;
  color: #363636;
  cursor: pointer;
}
.button strong {
  color: inherit;
}
.button .icon, .button .icon.is-small, .button .icon.is-medium, .button .icon.is-large {
  height: 1.5em;
  width: 1.5em;
}
.button .icon:first-child:not(:last-child) {
  /*[[+ltr-property("margin", calc(-0.5em - 1px), false)]]*/
  margin-left: calc(-0.5em - 1px);
  /*[[+ltr-property("margin", calc(-0.5em - 1px), false)]]*/
  /*[[+ltr-property("margin", $button-padding-horizontal * 0.25)]]*/
  margin-right: 0.25em;
  /*[[+ltr-property("margin", $button-padding-horizontal * 0.25)]]*/
}
.button .icon:last-child:not(:first-child) {
  /*[[+ltr-property("margin", $button-padding-horizontal * 0.25, false)]]*/
  margin-left: 0.25em;
  /*[[+ltr-property("margin", $button-padding-horizontal * 0.25, false)]]*/
  /*[[+ltr-property("margin", calc(-0.5em - 1px))]]*/
  margin-right: calc(-0.5em - 1px);
  /*[[+ltr-property("margin", calc(-0.5em - 1px))]]*/
}
.button .icon:first-child:last-child {
  margin-left: calc(-0.5em - 1px);
  margin-right: calc(-0.5em - 1px);
}
.button:hover, .button.is-hovered {
  border-color: #b5b5b5;
  color: #363636;
}
.button:focus, .button.is-focused {
  border-color: #485fc7;
  color: #363636;
}
.button:focus:not(:active), .button.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(72, 95, 199, 0.25);
}
.button:active, .button.is-active {
  border-color: #4a4a4a;
  color: #363636;
}
.button.is-text {
  background-color: transparent;
  border-color: transparent;
  color: #4a4a4a;
  text-decoration: underline;
}
.button.is-text:hover, .button.is-text.is-hovered, .button.is-text:focus, .button.is-text.is-focused {
  background-color: whitesmoke;
  color: #363636;
}
.button.is-text:active, .button.is-text.is-active {
  background-color: #e8e8e8;
  color: #363636;
}
.button.is-text[disabled], fieldset[disabled] .button.is-text {
  background-color: transparent;
  border-color: transparent;
  box-shadow: none;
}
.button.is-ghost {
  background: none;
  border-color: transparent;
  color: #485fc7;
  text-decoration: none;
}
.button.is-ghost:hover, .button.is-ghost.is-hovered {
  color: #485fc7;
  text-decoration: underline;
}
.button.is-white {
  background-color: white;
  border-color: transparent;
  color: #0a0a0a;
}
.button.is-white:hover, .button.is-white.is-hovered {
  background-color: #f9f9f9;
  border-color: transparent;
  color: #0a0a0a;
}
.button.is-white:focus, .button.is-white.is-focused {
  border-color: transparent;
  color: #0a0a0a;
}
.button.is-white:focus:not(:active), .button.is-white.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(255, 255, 255, 0.25);
}
.button.is-white:active, .button.is-white.is-active {
  background-color: #f2f2f2;
  border-color: transparent;
  color: #0a0a0a;
}
.button.is-white[disabled], fieldset[disabled] .button.is-white {
  background-color: white;
  border-color: transparent;
  box-shadow: none;
}
.button.is-white.is-inverted {
  background-color: #0a0a0a;
  color: white;
}
.button.is-white.is-inverted:hover, .button.is-white.is-inverted.is-hovered {
  background-color: black;
}
.button.is-white.is-inverted[disabled], fieldset[disabled] .button.is-white.is-inverted {
  background-color: #0a0a0a;
  border-color: transparent;
  box-shadow: none;
  color: white;
}
.button.is-white.is-loading::after {
  border-color: transparent transparent #0a0a0a #0a0a0a !important;
}
.button.is-white.is-outlined {
  background-color: transparent;
  border-color: white;
  color: white;
}
.button.is-white.is-outlined:hover, .button.is-white.is-outlined.is-hovered, .button.is-white.is-outlined:focus, .button.is-white.is-outlined.is-focused {
  background-color: white;
  border-color: white;
  color: #0a0a0a;
}
.button.is-white.is-outlined.is-loading::after {
  border-color: transparent transparent white white !important;
}
.button.is-white.is-outlined.is-loading:hover::after, .button.is-white.is-outlined.is-loading.is-hovered::after, .button.is-white.is-outlined.is-loading:focus::after, .button.is-white.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #0a0a0a #0a0a0a !important;
}
.button.is-white.is-outlined[disabled], fieldset[disabled] .button.is-white.is-outlined {
  background-color: transparent;
  border-color: white;
  box-shadow: none;
  color: white;
}
.button.is-white.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #0a0a0a;
  color: #0a0a0a;
}
.button.is-white.is-inverted.is-outlined:hover, .button.is-white.is-inverted.is-outlined.is-hovered, .button.is-white.is-inverted.is-outlined:focus, .button.is-white.is-inverted.is-outlined.is-focused {
  background-color: #0a0a0a;
  color: white;
}
.button.is-white.is-inverted.is-outlined.is-loading:hover::after, .button.is-white.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-white.is-inverted.is-outlined.is-loading:focus::after, .button.is-white.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent white white !important;
}
.button.is-white.is-inverted.is-outlined[disabled], fieldset[disabled] .button.is-white.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #0a0a0a;
  box-shadow: none;
  color: #0a0a0a;
}
.button.is-black {
  background-color: #0a0a0a;
  border-color: transparent;
  color: white;
}
.button.is-black:hover, .button.is-black.is-hovered {
  background-color: #040404;
  border-color: transparent;
  color: white;
}
.button.is-black:focus, .button.is-black.is-focused {
  border-color: transparent;
  color: white;
}
.button.is-black:focus:not(:active), .button.is-black.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(10, 10, 10, 0.25);
}
.button.is-black:active, .button.is-black.is-active {
  background-color: black;
  border-color: transparent;
  color: white;
}
.button.is-black[disabled], fieldset[disabled] .button.is-black {
  background-color: #0a0a0a;
  border-color: transparent;
  box-shadow: none;
}
.button.is-black.is-inverted {
  background-color: white;
  color: #0a0a0a;
}
.button.is-black.is-inverted:hover, .button.is-black.is-inverted.is-hovered {
  background-color: #f2f2f2;
}
.button.is-black.is-inverted[disabled], fieldset[disabled] .button.is-black.is-inverted {
  background-color: white;
  border-color: transparent;
  box-shadow: none;
  color: #0a0a0a;
}
.button.is-black.is-loading::after {
  border-color: transparent transparent white white !important;
}
.button.is-black.is-outlined {
  background-color: transparent;
  border-color: #0a0a0a;
  color: #0a0a0a;
}
.button.is-black.is-outlined:hover, .button.is-black.is-outlined.is-hovered, .button.is-black.is-outlined:focus, .button.is-black.is-outlined.is-focused {
  background-color: #0a0a0a;
  border-color: #0a0a0a;
  color: white;
}
.button.is-black.is-outlined.is-loading::after {
  border-color: transparent transparent #0a0a0a #0a0a0a !important;
}
.button.is-black.is-outlined.is-loading:hover::after, .button.is-black.is-outlined.is-loading.is-hovered::after, .button.is-black.is-outlined.is-loading:focus::after, .button.is-black.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent white white !important;
}
.button.is-black.is-outlined[disabled], fieldset[disabled] .button.is-black.is-outlined {
  background-color: transparent;
  border-color: #0a0a0a;
  box-shadow: none;
  color: #0a0a0a;
}
.button.is-black.is-inverted.is-outlined {
  background-color: transparent;
  border-color: white;
  color: white;
}
.button.is-black.is-inverted.is-outlined:hover, .button.is-black.is-inverted.is-outlined.is-hovered, .button.is-black.is-inverted.is-outlined:focus, .button.is-black.is-inverted.is-outlined.is-focused {
  background-color: white;
  color: #0a0a0a;
}
.button.is-black.is-inverted.is-outlined.is-loading:hover::after, .button.is-black.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-black.is-inverted.is-outlined.is-loading:focus::after, .button.is-black.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #0a0a0a #0a0a0a !important;
}
.button.is-black.is-inverted.is-outlined[disabled], fieldset[disabled] .button.is-black.is-inverted.is-outlined {
  background-color: transparent;
  border-color: white;
  box-shadow: none;
  color: white;
}
.button.is-light {
  background-color: whitesmoke;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}
.button.is-light:hover, .button.is-light.is-hovered {
  background-color: #eeeeee;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}
.button.is-light:focus, .button.is-light.is-focused {
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}
.button.is-light:focus:not(:active), .button.is-light.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(245, 245, 245, 0.25);
}
.button.is-light:active, .button.is-light.is-active {
  background-color: #e8e8e8;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}
.button.is-light[disabled], fieldset[disabled] .button.is-light {
  background-color: whitesmoke;
  border-color: transparent;
  box-shadow: none;
}
.button.is-light.is-inverted {
  background-color: rgba(0, 0, 0, 0.7);
  color: whitesmoke;
}
.button.is-light.is-inverted:hover, .button.is-light.is-inverted.is-hovered {
  background-color: rgba(0, 0, 0, 0.7);
}
.button.is-light.is-inverted[disabled], fieldset[disabled] .button.is-light.is-inverted {
  background-color: rgba(0, 0, 0, 0.7);
  border-color: transparent;
  box-shadow: none;
  color: whitesmoke;
}
.button.is-light.is-loading::after {
  border-color: transparent transparent rgba(0, 0, 0, 0.7) rgba(0, 0, 0, 0.7) !important;
}
.button.is-light.is-outlined {
  background-color: transparent;
  border-color: whitesmoke;
  color: whitesmoke;
}
.button.is-light.is-outlined:hover, .button.is-light.is-outlined.is-hovered, .button.is-light.is-outlined:focus, .button.is-light.is-outlined.is-focused {
  background-color: whitesmoke;
  border-color: whitesmoke;
  color: rgba(0, 0, 0, 0.7);
}
.button.is-light.is-outlined.is-loading::after {
  border-color: transparent transparent whitesmoke whitesmoke !important;
}
.button.is-light.is-outlined.is-loading:hover::after, .button.is-light.is-outlined.is-loading.is-hovered::after, .button.is-light.is-outlined.is-loading:focus::after, .button.is-light.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent rgba(0, 0, 0, 0.7) rgba(0, 0, 0, 0.7) !important;
}
.button.is-light.is-outlined[disabled], fieldset[disabled] .button.is-light.is-outlined {
  background-color: transparent;
  border-color: whitesmoke;
  box-shadow: none;
  color: whitesmoke;
}
.button.is-light.is-inverted.is-outlined {
  background-color: transparent;
  border-color: rgba(0, 0, 0, 0.7);
  color: rgba(0, 0, 0, 0.7);
}
.button.is-light.is-inverted.is-outlined:hover, .button.is-light.is-inverted.is-outlined.is-hovered, .button.is-light.is-inverted.is-outlined:focus, .button.is-light.is-inverted.is-outlined.is-focused {
  background-color: rgba(0, 0, 0, 0.7);
  color: whitesmoke;
}
.button.is-light.is-inverted.is-outlined.is-loading:hover::after, .button.is-light.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-light.is-inverted.is-outlined.is-loading:focus::after, .button.is-light.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent whitesmoke whitesmoke !important;
}
.button.is-light.is-inverted.is-outlined[disabled], fieldset[disabled] .button.is-light.is-inverted.is-outlined {
  background-color: transparent;
  border-color: rgba(0, 0, 0, 0.7);
  box-shadow: none;
  color: rgba(0, 0, 0, 0.7);
}
.button.is-dark {
  background-color: #363636;
  border-color: transparent;
  color: #fff;
}
.button.is-dark:hover, .button.is-dark.is-hovered {
  background-color: #2f2f2f;
  border-color: transparent;
  color: #fff;
}
.button.is-dark:focus, .button.is-dark.is-focused {
  border-color: transparent;
  color: #fff;
}
.button.is-dark:focus:not(:active), .button.is-dark.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(54, 54, 54, 0.25);
}
.button.is-dark:active, .button.is-dark.is-active {
  background-color: #292929;
  border-color: transparent;
  color: #fff;
}
.button.is-dark[disabled], fieldset[disabled] .button.is-dark {
  background-color: #363636;
  border-color: transparent;
  box-shadow: none;
}
.button.is-dark.is-inverted {
  background-color: #fff;
  color: #363636;
}
.button.is-dark.is-inverted:hover, .button.is-dark.is-inverted.is-hovered {
  background-color: #f2f2f2;
}
.button.is-dark.is-inverted[disabled], fieldset[disabled] .button.is-dark.is-inverted {
  background-color: #fff;
  border-color: transparent;
  box-shadow: none;
  color: #363636;
}
.button.is-dark.is-loading::after {
  border-color: transparent transparent #fff #fff !important;
}
.button.is-dark.is-outlined {
  background-color: transparent;
  border-color: #363636;
  color: #363636;
}
.button.is-dark.is-outlined:hover, .button.is-dark.is-outlined.is-hovered, .button.is-dark.is-outlined:focus, .button.is-dark.is-outlined.is-focused {
  background-color: #363636;
  border-color: #363636;
  color: #fff;
}
.button.is-dark.is-outlined.is-loading::after {
  border-color: transparent transparent #363636 #363636 !important;
}
.button.is-dark.is-outlined.is-loading:hover::after, .button.is-dark.is-outlined.is-loading.is-hovered::after, .button.is-dark.is-outlined.is-loading:focus::after, .button.is-dark.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #fff #fff !important;
}
.button.is-dark.is-outlined[disabled], fieldset[disabled] .button.is-dark.is-outlined {
  background-color: transparent;
  border-color: #363636;
  box-shadow: none;
  color: #363636;
}
.button.is-dark.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  color: #fff;
}
.button.is-dark.is-inverted.is-outlined:hover, .button.is-dark.is-inverted.is-outlined.is-hovered, .button.is-dark.is-inverted.is-outlined:focus, .button.is-dark.is-inverted.is-outlined.is-focused {
  background-color: #fff;
  color: #363636;
}
.button.is-dark.is-inverted.is-outlined.is-loading:hover::after, .button.is-dark.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-dark.is-inverted.is-outlined.is-loading:focus::after, .button.is-dark.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #363636 #363636 !important;
}
.button.is-dark.is-inverted.is-outlined[disabled], fieldset[disabled] .button.is-dark.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  box-shadow: none;
  color: #fff;
}
.button.is-primary {
  background-color: #00d1b2;
  border-color: transparent;
  color: #fff;
}
.button.is-primary:hover, .button.is-primary.is-hovered {
  background-color: #00c4a7;
  border-color: transparent;
  color: #fff;
}
.button.is-primary:focus, .button.is-primary.is-focused {
  border-color: transparent;
  color: #fff;
}
.button.is-primary:focus:not(:active), .button.is-primary.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(0, 209, 178, 0.25);
}
.button.is-primary:active, .button.is-primary.is-active {
  background-color: #00b89c;
  border-color: transparent;
  color: #fff;
}
.button.is-primary[disabled], fieldset[disabled] .button.is-primary {
  background-color: #00d1b2;
  border-color: transparent;
  box-shadow: none;
}
.button.is-primary.is-inverted {
  background-color: #fff;
  color: #00d1b2;
}
.button.is-primary.is-inverted:hover, .button.is-primary.is-inverted.is-hovered {
  background-color: #f2f2f2;
}
.button.is-primary.is-inverted[disabled], fieldset[disabled] .button.is-primary.is-inverted {
  background-color: #fff;
  border-color: transparent;
  box-shadow: none;
  color: #00d1b2;
}
.button.is-primary.is-loading::after {
  border-color: transparent transparent #fff #fff !important;
}
.button.is-primary.is-outlined {
  background-color: transparent;
  border-color: #00d1b2;
  color: #00d1b2;
}
.button.is-primary.is-outlined:hover, .button.is-primary.is-outlined.is-hovered, .button.is-primary.is-outlined:focus, .button.is-primary.is-outlined.is-focused {
  background-color: #00d1b2;
  border-color: #00d1b2;
  color: #fff;
}
.button.is-primary.is-outlined.is-loading::after {
  border-color: transparent transparent #00d1b2 #00d1b2 !important;
}
.button.is-primary.is-outlined.is-loading:hover::after, .button.is-primary.is-outlined.is-loading.is-hovered::after, .button.is-primary.is-outlined.is-loading:focus::after, .button.is-primary.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #fff #fff !important;
}
.button.is-primary.is-outlined[disabled], fieldset[disabled] .button.is-primary.is-outlined {
  background-color: transparent;
  border-color: #00d1b2;
  box-shadow: none;
  color: #00d1b2;
}
.button.is-primary.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  color: #fff;
}
.button.is-primary.is-inverted.is-outlined:hover, .button.is-primary.is-inverted.is-outlined.is-hovered, .button.is-primary.is-inverted.is-outlined:focus, .button.is-primary.is-inverted.is-outlined.is-focused {
  background-color: #fff;
  color: #00d1b2;
}
.button.is-primary.is-inverted.is-outlined.is-loading:hover::after, .button.is-primary.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-primary.is-inverted.is-outlined.is-loading:focus::after, .button.is-primary.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #00d1b2 #00d1b2 !important;
}
.button.is-primary.is-inverted.is-outlined[disabled], fieldset[disabled] .button.is-primary.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  box-shadow: none;
  color: #fff;
}
.button.is-primary.is-light {
  background-color: #ebfffc;
  color: #00947e;
}
.button.is-primary.is-light:hover, .button.is-primary.is-light.is-hovered {
  background-color: #defffa;
  border-color: transparent;
  color: #00947e;
}
.button.is-primary.is-light:active, .button.is-primary.is-light.is-active {
  background-color: #d1fff8;
  border-color: transparent;
  color: #00947e;
}
.button.is-link {
  background-color: #485fc7;
  border-color: transparent;
  color: #fff;
}
.button.is-link:hover, .button.is-link.is-hovered {
  background-color: #3e56c4;
  border-color: transparent;
  color: #fff;
}
.button.is-link:focus, .button.is-link.is-focused {
  border-color: transparent;
  color: #fff;
}
.button.is-link:focus:not(:active), .button.is-link.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(72, 95, 199, 0.25);
}
.button.is-link:active, .button.is-link.is-active {
  background-color: #3a51bb;
  border-color: transparent;
  color: #fff;
}
.button.is-link[disabled], fieldset[disabled] .button.is-link {
  background-color: #485fc7;
  border-color: transparent;
  box-shadow: none;
}
.button.is-link.is-inverted {
  background-color: #fff;
  color: #485fc7;
}
.button.is-link.is-inverted:hover, .button.is-link.is-inverted.is-hovered {
  background-color: #f2f2f2;
}
.button.is-link.is-inverted[disabled], fieldset[disabled] .button.is-link.is-inverted {
  background-color: #fff;
  border-color: transparent;
  box-shadow: none;
  color: #485fc7;
}
.button.is-link.is-loading::after {
  border-color: transparent transparent #fff #fff !important;
}
.button.is-link.is-outlined {
  background-color: transparent;
  border-color: #485fc7;
  color: #485fc7;
}
.button.is-link.is-outlined:hover, .button.is-link.is-outlined.is-hovered, .button.is-link.is-outlined:focus, .button.is-link.is-outlined.is-focused {
  background-color: #485fc7;
  border-color: #485fc7;
  color: #fff;
}
.button.is-link.is-outlined.is-loading::after {
  border-color: transparent transparent #485fc7 #485fc7 !important;
}
.button.is-link.is-outlined.is-loading:hover::after, .button.is-link.is-outlined.is-loading.is-hovered::after, .button.is-link.is-outlined.is-loading:focus::after, .button.is-link.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #fff #fff !important;
}
.button.is-link.is-outlined[disabled], fieldset[disabled] .button.is-link.is-outlined {
  background-color: transparent;
  border-color: #485fc7;
  box-shadow: none;
  color: #485fc7;
}
.button.is-link.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  color: #fff;
}
.button.is-link.is-inverted.is-outlined:hover, .button.is-link.is-inverted.is-outlined.is-hovered, .button.is-link.is-inverted.is-outlined:focus, .button.is-link.is-inverted.is-outlined.is-focused {
  background-color: #fff;
  color: #485fc7;
}
.button.is-link.is-inverted.is-outlined.is-loading:hover::after, .button.is-link.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-link.is-inverted.is-outlined.is-loading:focus::after, .button.is-link.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #485fc7 #485fc7 !important;
}
.button.is-link.is-inverted.is-outlined[disabled], fieldset[disabled] .button.is-link.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  box-shadow: none;
  color: #fff;
}
.button.is-link.is-light {
  background-color: #eff1fa;
  color: #3850b7;
}
.button.is-link.is-light:hover, .button.is-link.is-light.is-hovered {
  background-color: #e6e9f7;
  border-color: transparent;
  color: #3850b7;
}
.button.is-link.is-light:active, .button.is-link.is-light.is-active {
  background-color: #dce0f4;
  border-color: transparent;
  color: #3850b7;
}
.button.is-info {
  background-color: #3e8ed0;
  border-color: transparent;
  color: #fff;
}
.button.is-info:hover, .button.is-info.is-hovered {
  background-color: #3488ce;
  border-color: transparent;
  color: #fff;
}
.button.is-info:focus, .button.is-info.is-focused {
  border-color: transparent;
  color: #fff;
}
.button.is-info:focus:not(:active), .button.is-info.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(62, 142, 208, 0.25);
}
.button.is-info:active, .button.is-info.is-active {
  background-color: #3082c5;
  border-color: transparent;
  color: #fff;
}
.button.is-info[disabled], fieldset[disabled] .button.is-info {
  background-color: #3e8ed0;
  border-color: transparent;
  box-shadow: none;
}
.button.is-info.is-inverted {
  background-color: #fff;
  color: #3e8ed0;
}
.button.is-info.is-inverted:hover, .button.is-info.is-inverted.is-hovered {
  background-color: #f2f2f2;
}
.button.is-info.is-inverted[disabled], fieldset[disabled] .button.is-info.is-inverted {
  background-color: #fff;
  border-color: transparent;
  box-shadow: none;
  color: #3e8ed0;
}
.button.is-info.is-loading::after {
  border-color: transparent transparent #fff #fff !important;
}
.button.is-info.is-outlined {
  background-color: transparent;
  border-color: #3e8ed0;
  color: #3e8ed0;
}
.button.is-info.is-outlined:hover, .button.is-info.is-outlined.is-hovered, .button.is-info.is-outlined:focus, .button.is-info.is-outlined.is-focused {
  background-color: #3e8ed0;
  border-color: #3e8ed0;
  color: #fff;
}
.button.is-info.is-outlined.is-loading::after {
  border-color: transparent transparent #3e8ed0 #3e8ed0 !important;
}
.button.is-info.is-outlined.is-loading:hover::after, .button.is-info.is-outlined.is-loading.is-hovered::after, .button.is-info.is-outlined.is-loading:focus::after, .button.is-info.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #fff #fff !important;
}
.button.is-info.is-outlined[disabled], fieldset[disabled] .button.is-info.is-outlined {
  background-color: transparent;
  border-color: #3e8ed0;
  box-shadow: none;
  color: #3e8ed0;
}
.button.is-info.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  color: #fff;
}
.button.is-info.is-inverted.is-outlined:hover, .button.is-info.is-inverted.is-outlined.is-hovered, .button.is-info.is-inverted.is-outlined:focus, .button.is-info.is-inverted.is-outlined.is-focused {
  background-color: #fff;
  color: #3e8ed0;
}
.button.is-info.is-inverted.is-outlined.is-loading:hover::after, .button.is-info.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-info.is-inverted.is-outlined.is-loading:focus::after, .button.is-info.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #3e8ed0 #3e8ed0 !important;
}
.button.is-info.is-inverted.is-outlined[disabled], fieldset[disabled] .button.is-info.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  box-shadow: none;
  color: #fff;
}
.button.is-info.is-light {
  background-color: #eff5fb;
  color: #296fa8;
}
.button.is-info.is-light:hover, .button.is-info.is-light.is-hovered {
  background-color: #e4eff9;
  border-color: transparent;
  color: #296fa8;
}
.button.is-info.is-light:active, .button.is-info.is-light.is-active {
  background-color: #dae9f6;
  border-color: transparent;
  color: #296fa8;
}
.button.is-success {
  background-color: #48c78e;
  border-color: transparent;
  color: #fff;
}
.button.is-success:hover, .button.is-success.is-hovered {
  background-color: #3ec487;
  border-color: transparent;
  color: #fff;
}
.button.is-success:focus, .button.is-success.is-focused {
  border-color: transparent;
  color: #fff;
}
.button.is-success:focus:not(:active), .button.is-success.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(72, 199, 142, 0.25);
}
.button.is-success:active, .button.is-success.is-active {
  background-color: #3abb81;
  border-color: transparent;
  color: #fff;
}
.button.is-success[disabled], fieldset[disabled] .button.is-success {
  background-color: #48c78e;
  border-color: transparent;
  box-shadow: none;
}
.button.is-success.is-inverted {
  background-color: #fff;
  color: #48c78e;
}
.button.is-success.is-inverted:hover, .button.is-success.is-inverted.is-hovered {
  background-color: #f2f2f2;
}
.button.is-success.is-inverted[disabled], fieldset[disabled] .button.is-success.is-inverted {
  background-color: #fff;
  border-color: transparent;
  box-shadow: none;
  color: #48c78e;
}
.button.is-success.is-loading::after {
  border-color: transparent transparent #fff #fff !important;
}
.button.is-success.is-outlined {
  background-color: transparent;
  border-color: #48c78e;
  color: #48c78e;
}
.button.is-success.is-outlined:hover, .button.is-success.is-outlined.is-hovered, .button.is-success.is-outlined:focus, .button.is-success.is-outlined.is-focused {
  background-color: #48c78e;
  border-color: #48c78e;
  color: #fff;
}
.button.is-success.is-outlined.is-loading::after {
  border-color: transparent transparent #48c78e #48c78e !important;
}
.button.is-success.is-outlined.is-loading:hover::after, .button.is-success.is-outlined.is-loading.is-hovered::after, .button.is-success.is-outlined.is-loading:focus::after, .button.is-success.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #fff #fff !important;
}
.button.is-success.is-outlined[disabled], fieldset[disabled] .button.is-success.is-outlined {
  background-color: transparent;
  border-color: #48c78e;
  box-shadow: none;
  color: #48c78e;
}
.button.is-success.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  color: #fff;
}
.button.is-success.is-inverted.is-outlined:hover, .button.is-success.is-inverted.is-outlined.is-hovered, .button.is-success.is-inverted.is-outlined:focus, .button.is-success.is-inverted.is-outlined.is-focused {
  background-color: #fff;
  color: #48c78e;
}
.button.is-success.is-inverted.is-outlined.is-loading:hover::after, .button.is-success.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-success.is-inverted.is-outlined.is-loading:focus::after, .button.is-success.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #48c78e #48c78e !important;
}
.button.is-success.is-inverted.is-outlined[disabled], fieldset[disabled] .button.is-success.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  box-shadow: none;
  color: #fff;
}
.button.is-success.is-light {
  background-color: #effaf5;
  color: #257953;
}
.button.is-success.is-light:hover, .button.is-success.is-light.is-hovered {
  background-color: #e6f7ef;
  border-color: transparent;
  color: #257953;
}
.button.is-success.is-light:active, .button.is-success.is-light.is-active {
  background-color: #dcf4e9;
  border-color: transparent;
  color: #257953;
}
.button.is-warning {
  background-color: #ffe08a;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}
.button.is-warning:hover, .button.is-warning.is-hovered {
  background-color: #ffdc7d;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}
.button.is-warning:focus, .button.is-warning.is-focused {
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}
.button.is-warning:focus:not(:active), .button.is-warning.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(255, 224, 138, 0.25);
}
.button.is-warning:active, .button.is-warning.is-active {
  background-color: #ffd970;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}
.button.is-warning[disabled], fieldset[disabled] .button.is-warning {
  background-color: #ffe08a;
  border-color: transparent;
  box-shadow: none;
}
.button.is-warning.is-inverted {
  background-color: rgba(0, 0, 0, 0.7);
  color: #ffe08a;
}
.button.is-warning.is-inverted:hover, .button.is-warning.is-inverted.is-hovered {
  background-color: rgba(0, 0, 0, 0.7);
}
.button.is-warning.is-inverted[disabled], fieldset[disabled] .button.is-warning.is-inverted {
  background-color: rgba(0, 0, 0, 0.7);
  border-color: transparent;
  box-shadow: none;
  color: #ffe08a;
}
.button.is-warning.is-loading::after {
  border-color: transparent transparent rgba(0, 0, 0, 0.7) rgba(0, 0, 0, 0.7) !important;
}
.button.is-warning.is-outlined {
  background-color: transparent;
  border-color: #ffe08a;
  color: #ffe08a;
}
.button.is-warning.is-outlined:hover, .button.is-warning.is-outlined.is-hovered, .button.is-warning.is-outlined:focus, .button.is-warning.is-outlined.is-focused {
  background-color: #ffe08a;
  border-color: #ffe08a;
  color: rgba(0, 0, 0, 0.7);
}
.button.is-warning.is-outlined.is-loading::after {
  border-color: transparent transparent #ffe08a #ffe08a !important;
}
.button.is-warning.is-outlined.is-loading:hover::after, .button.is-warning.is-outlined.is-loading.is-hovered::after, .button.is-warning.is-outlined.is-loading:focus::after, .button.is-warning.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent rgba(0, 0, 0, 0.7) rgba(0, 0, 0, 0.7) !important;
}
.button.is-warning.is-outlined[disabled], fieldset[disabled] .button.is-warning.is-outlined {
  background-color: transparent;
  border-color: #ffe08a;
  box-shadow: none;
  color: #ffe08a;
}
.button.is-warning.is-inverted.is-outlined {
  background-color: transparent;
  border-color: rgba(0, 0, 0, 0.7);
  color: rgba(0, 0, 0, 0.7);
}
.button.is-warning.is-inverted.is-outlined:hover, .button.is-warning.is-inverted.is-outlined.is-hovered, .button.is-warning.is-inverted.is-outlined:focus, .button.is-warning.is-inverted.is-outlined.is-focused {
  background-color: rgba(0, 0, 0, 0.7);
  color: #ffe08a;
}
.button.is-warning.is-inverted.is-outlined.is-loading:hover::after, .button.is-warning.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-warning.is-inverted.is-outlined.is-loading:focus::after, .button.is-warning.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #ffe08a #ffe08a !important;
}
.button.is-warning.is-inverted.is-outlined[disabled], fieldset[disabled] .button.is-warning.is-inverted.is-outlined {
  background-color: transparent;
  border-color: rgba(0, 0, 0, 0.7);
  box-shadow: none;
  color: rgba(0, 0, 0, 0.7);
}
.button.is-warning.is-light {
  background-color: #fffaeb;
  color: #946c00;
}
.button.is-warning.is-light:hover, .button.is-warning.is-light.is-hovered {
  background-color: #fff6de;
  border-color: transparent;
  color: #946c00;
}
.button.is-warning.is-light:active, .button.is-warning.is-light.is-active {
  background-color: #fff3d1;
  border-color: transparent;
  color: #946c00;
}
.button.is-danger {
  background-color: #f14668;
  border-color: transparent;
  color: #fff;
}
.button.is-danger:hover, .button.is-danger.is-hovered {
  background-color: #f03a5f;
  border-color: transparent;
  color: #fff;
}
.button.is-danger:focus, .button.is-danger.is-focused {
  border-color: transparent;
  color: #fff;
}
.button.is-danger:focus:not(:active), .button.is-danger.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(241, 70, 104, 0.25);
}
.button.is-danger:active, .button.is-danger.is-active {
  background-color: #ef2e55;
  border-color: transparent;
  color: #fff;
}
.button.is-danger[disabled], fieldset[disabled] .button.is-danger {
  background-color: #f14668;
  border-color: transparent;
  box-shadow: none;
}
.button.is-danger.is-inverted {
  background-color: #fff;
  color: #f14668;
}
.button.is-danger.is-inverted:hover, .button.is-danger.is-inverted.is-hovered {
  background-color: #f2f2f2;
}
.button.is-danger.is-inverted[disabled], fieldset[disabled] .button.is-danger.is-inverted {
  background-color: #fff;
  border-color: transparent;
  box-shadow: none;
  color: #f14668;
}
.button.is-danger.is-loading::after {
  border-color: transparent transparent #fff #fff !important;
}
.button.is-danger.is-outlined {
  background-color: transparent;
  border-color: #f14668;
  color: #f14668;
}
.button.is-danger.is-outlined:hover, .button.is-danger.is-outlined.is-hovered, .button.is-danger.is-outlined:focus, .button.is-danger.is-outlined.is-focused {
  background-color: #f14668;
  border-color: #f14668;
  color: #fff;
}
.button.is-danger.is-outlined.is-loading::after {
  border-color: transparent transparent #f14668 #f14668 !important;
}
.button.is-danger.is-outlined.is-loading:hover::after, .button.is-danger.is-outlined.is-loading.is-hovered::after, .button.is-danger.is-outlined.is-loading:focus::after, .button.is-danger.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #fff #fff !important;
}
.button.is-danger.is-outlined[disabled], fieldset[disabled] .button.is-danger.is-outlined {
  background-color: transparent;
  border-color: #f14668;
  box-shadow: none;
  color: #f14668;
}
.button.is-danger.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  color: #fff;
}
.button.is-danger.is-inverted.is-outlined:hover, .button.is-danger.is-inverted.is-outlined.is-hovered, .button.is-danger.is-inverted.is-outlined:focus, .button.is-danger.is-inverted.is-outlined.is-focused {
  background-color: #fff;
  color: #f14668;
}
.button.is-danger.is-inverted.is-outlined.is-loading:hover::after, .button.is-danger.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-danger.is-inverted.is-outlined.is-loading:focus::after, .button.is-danger.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #f14668 #f14668 !important;
}
.button.is-danger.is-inverted.is-outlined[disabled], fieldset[disabled] .button.is-danger.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  box-shadow: none;
  color: #fff;
}
.button.is-danger.is-light {
  background-color: #feecf0;
  color: #cc0f35;
}
.button.is-danger.is-light:hover, .button.is-danger.is-light.is-hovered {
  background-color: #fde0e6;
  border-color: transparent;
  color: #cc0f35;
}
.button.is-danger.is-light:active, .button.is-danger.is-light.is-active {
  background-color: #fcd4dc;
  border-color: transparent;
  color: #cc0f35;
}
.button.is-small {
  /*[[+button-small]]*/
  /*[[+button-small]]*/
}
.button.is-small:not(.is-rounded) {
  border-radius: ${b.radiusSmall};
  font-size: 0.75rem;
}
.button.is-normal {
  /*[[+button-normal]]*/
  font-size: 1rem;
  /*[[+button-normal]]*/
}
.button.is-medium {
  /*[[+button-medium]]*/
  font-size: ${b.sizeMedium};
  /*[[+button-medium]]*/
}
.button.is-large {
  /*[[+button-large]]*/
  font-size: ${b.sizeLarge};
  /*[[+button-large]]*/
}
.button[disabled], fieldset[disabled] .button {
  background-color: white;
  border-color: #dbdbdb;
  box-shadow: none;
  opacity: 0.5;
}
.button.is-fullwidth {
  display: flex;
  width: 100%;
}
.button.is-loading {
  color: transparent !important;
  pointer-events: none;
}
.button.is-loading::after {
  /*[[@extend %loader]]*/
  /*[[@extend %loader]]*/
  /*[[+center(1em)]]*/
  position: absolute;
  left: calc(50% - (1em * 0.5));
  top: calc(50% - (1em * 0.5));
  /*[[+center(1em)]]*/
  position: absolute !important;
}
.button.is-static {
  background-color: whitesmoke;
  border-color: #dbdbdb;
  color: #7a7a7a;
  box-shadow: none;
  pointer-events: none;
}
.button.is-rounded {
  border-radius: 9999px;
  padding-left: calc(1em + 0.25em);
  padding-right: calc(1em + 0.25em);
}

.buttons {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.buttons .button {
  margin-bottom: 0.5rem;
}
.buttons .button:not(:last-child):not(.is-fullwidth) {
  /*[[+ltr-property("margin", 0.5rem)]]*/
  margin-right: 0.5rem;
  /*[[+ltr-property("margin", 0.5rem)]]*/
}
.buttons:last-child {
  margin-bottom: -0.5rem;
}
.buttons:not(:last-child) {
  margin-bottom: 1rem;
}
.buttons.are-small .button:not(.is-normal):not(.is-medium):not(.is-large) {
  /*[[+button-small]]*/
  /*[[+button-small]]*/
}
.buttons.are-small .button:not(.is-normal):not(.is-medium):not(.is-large):not(.is-rounded) {
  border-radius: ${b.radiusSmall};
  font-size: 0.75rem;
}
.buttons.are-medium .button:not(.is-small):not(.is-normal):not(.is-large) {
  /*[[+button-medium]]*/
  font-size: ${b.sizeMedium};
  /*[[+button-medium]]*/
}
.buttons.are-large .button:not(.is-small):not(.is-normal):not(.is-medium) {
  /*[[+button-large]]*/
  font-size: ${b.sizeLarge};
  /*[[+button-large]]*/
}
.buttons.has-addons .button:not(:first-child) {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
.buttons.has-addons .button:not(:last-child) {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  /*[[+ltr-property("margin", -1px)]]*/
  margin-right: -1px;
  /*[[+ltr-property("margin", -1px)]]*/
}
.buttons.has-addons .button:last-child {
  /*[[+ltr-property("margin", 0)]]*/
  margin-right: 0;
  /*[[+ltr-property("margin", 0)]]*/
}
.buttons.has-addons .button:hover, .buttons.has-addons .button.is-hovered {
  z-index: 2;
}
.buttons.has-addons .button:focus, .buttons.has-addons .button.is-focused, .buttons.has-addons .button:active, .buttons.has-addons .button.is-active, .buttons.has-addons .button.is-selected {
  z-index: 3;
}
.buttons.has-addons .button:focus:hover, .buttons.has-addons .button.is-focused:hover, .buttons.has-addons .button:active:hover, .buttons.has-addons .button.is-active:hover, .buttons.has-addons .button.is-selected:hover {
  z-index: 4;
}
.buttons.has-addons .button.is-expanded {
  flex-grow: 1;
  flex-shrink: 1;
}
.buttons.is-centered {
  justify-content: center;
}
.buttons.is-centered:not(.has-addons) .button:not(.is-fullwidth) {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}
.buttons.is-right {
  justify-content: flex-end;
}
.buttons.is-right:not(.has-addons) .button:not(.is-fullwidth) {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}
`);
