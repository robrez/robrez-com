import { CSSResult, unsafeCSS } from 'lit';
import { levels } from './src/meta/color.js';

function rebrandProperty(colorName: string, colorKey: string): string {
  const colorKeyModifier = colorKey.toLowerCase() === 'default' ? '' : `-${colorKey}`;
  // return `--color-primary-override${colorKeyModifier}: var(--color-${colorName}${colorKeyModifier});`;
  return `--color-primary${colorKeyModifier}: var(--color-${colorName}${colorKeyModifier}) !important;`;
}

export function rebrand(colorName: string): CSSResult {
  const keys = [...levels];

  const css = String.raw;
  const properties = keys.map(key => rebrandProperty(colorName, key)).join('\n');
  const result = css`
    :root,
    :host([theme='dark']),
    :host {
      ${properties}
    }
  `;
  return unsafeCSS(result);
}
