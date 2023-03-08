import { App } from './lib/App.js';

if (!customElements.get(App.is)) {
  customElements.define(App.is, App);
}
