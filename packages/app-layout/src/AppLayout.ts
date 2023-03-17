import { CSSResult, css, html, LitElement, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { rebrand } from '@robrez-com/style/rebrand.js';
import { styles } from './styles.js';

export class AppLayout extends LitElement {
  @property({ type: String, reflect: true }) brandColor: string | undefined = undefined;
  @property() name = 'rob';

  static get is() {
    return 'rr-app-layout';
  }

  static get styles(): CSSResult[] {
    const s1 = css`
      :host {
        display: block;
        min-height: 80vh;
      }
    `;
    return [s1, styles];
  }

  private renderBrandStyle(): TemplateResult {
    if (!this.brandColor) {
      return html``; //nothing
    }
    const brandColorCss = rebrand(this.brandColor);
    return html`<style>
      ${brandColorCss}
    </style>`;
  }

  protected override render(): TemplateResult {
    return html`
      ${this.renderBrandStyle()}
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
