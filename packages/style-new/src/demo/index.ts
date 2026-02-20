import { html, render, TemplateResult } from 'lit';
import { styleMap, StyleInfo } from 'lit/directives/style-map.js';
import { levels, colorNames, emotiveNames } from '../meta/color.js';

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

function renderColor(name: string): TemplateResult {
  const cleanLevels = [...levels];
  const panes = cleanLevels.map(level => {
    const cls = `text-${name}-${level}`.replace('-text', '');
    return html`<div class="${cls} p-8">${level}</div>`;
  });
  const containerStyle: StyleInfo = {
    display: 'flex',
    'flex-wrap': 'wrap',
    'align-items': 'center'
  };
  return html`<div>
    <h3>${name}</h3>
    <div class="bg-neutral-100" style=${styleMap(containerStyle)}>${panes}</div>
    <div class="bg-neutral-100" theme="dark" style=${styleMap(containerStyle)}>${panes}</div>
  </div>`;
}

export function color(renderRoot: HTMLElement): void {
  const colors = colorNames.map(colorName => renderColor(colorName));
  const demo = html`${colors}`;
  render(demo, renderRoot);
}

function renderBgColor(name: string): TemplateResult {
  const cleanLevels = [...levels, 'text'];
  const midIndex = Math.floor(cleanLevels.length / 2) - 1;
  const panes = cleanLevels.map((level, index) => {
    const cls = `bg-${name}-${level}`;
    const fgCls = index === midIndex ? `text-${name}-contrast` : index > midIndex ? `text-white` : `text-black`;
    return html`<div class="${cls} ${fgCls} p-8">${level}</div>`;
  });
  const containerStyle: StyleInfo = {
    display: 'flex',
    'flex-wrap': 'wrap',
    'align-items': 'center'
  };
  return html`<div>
    <h3>${name}</h3>
    <div style=${styleMap(containerStyle)}>${panes}</div>
  </div>`;
}

export function bgColor(renderRoot: HTMLElement): void {
  const colors = colorNames.map(colorName => renderBgColor(colorName));
  const demo = html`${colors}`;
  render(demo, renderRoot);
}
