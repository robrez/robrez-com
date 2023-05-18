import { CSSResult, unsafeCSS } from 'lit';
import { levels } from './src/meta/color.js';

function rebrandProperty(colorName: string, colorKey: string): string {
  const colorKeyModifier = colorKey.toLowerCase() === 'default' ? '' : `-${colorKey}`;
  // return `--rr-color-primary-override${colorKeyModifier}: var(--rr-color-${colorName}${colorKeyModifier});`;
  return `--rr-color-primary${colorKeyModifier}: var(--rr-color-${colorName}${colorKeyModifier}) !important;`;
}

export function rebrand(colorName: string): CSSResult {
  const keys = [...levels];

  const css = String.raw;
  const properties = keys.map(key => rebrandProperty(colorName, key)).join('\n');
  const result = css`
    :root,
    .rr-theme-dark,
    :host([theme='dark']),
    :host {
      ${properties}
    }
  `;
  return unsafeCSS(result);
}
