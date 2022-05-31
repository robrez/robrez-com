import { App } from './lib/App.js';

if (!customElements.get('robrez-app')) {
  customElements.define('robrez-app', App);
}
