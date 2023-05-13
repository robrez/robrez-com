import { html, render } from 'lit';

export function fontSize(renderRoot: HTMLElement): void {
  const classes: string[] = [
    //
    'text-3xs',
    'text-2xs',
    'text-xs',
    'text-md',
    'text-lg',
    'text-xl',
    'text-2xl',
    'text-3xl',
    'text-4xl'
  ];
  const sample =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
  const items = classes.map(cls => {
    return html`
      <h3 class="text-sm m-0"><em>${cls}</em></h3>
      <p class="${cls} m-0 mt-xs mb-md">${sample}</p>
    `;
  });
  render(html`${items}`, renderRoot);
}
