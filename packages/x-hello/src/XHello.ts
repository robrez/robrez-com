import { LitElement, html, css } from 'lit';

export class XHello extends LitElement {
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
        <div>Hello world</div>
        ${foo}
      </main>
    `;
    return result;
  }
}
