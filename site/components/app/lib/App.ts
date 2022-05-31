import { CSSResult, css, html, LitElement, TemplateResult } from 'lit';
import { styles } from './styles.js';

export class App extends LitElement {
  static get styles(): CSSResult[] {
    const s1 = css`
      :host {
        display: block;
        min-height: 80vh;
      }
    `;
    return [s1, styles];
  }
  protected override render(): TemplateResult {
    return html`
      <header>
        <slot name="header"></slot>
      </header>

      <main>
        <div class="main-content"><slot></slot></div>
      </main>

      <footer>
        <slot name="footer"></slot>
      </footer>
    `;
  }
}
