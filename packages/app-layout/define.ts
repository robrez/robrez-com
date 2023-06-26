import { AppLayout } from './src/AppLayout.js';

if (!customElements.get(AppLayout.is)) {
  customElements.define(AppLayout.is, AppLayout);
}
