import { LitElement, html, css } from 'lit';

export class XHello extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 1rem;
    }
  `;

  render() {
    return html`
      <h1>Test</h1>
      <main>
        <div>Hello world</div>
      </main>
    `;
  }
}
