import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

export class XHello extends LitElement {
  @property({ type: String }) greeting = 'hello world';

  static styles = css`
    :host {
      display: block;
      padding: 1rem;
    }
  `;

  render() {
    const val = 'hello';
    const content = 'yo';
    const foo = html`<div ?foo="${true}" value="${val}">${content}</div>`;
    const result = html`
      <h1>Test</h1>
      <main>
        <div>${this.greeting}</div>
        ${foo}
      </main>
    `;
    return result;
  }
}
