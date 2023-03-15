import { CSSResult, unsafeCSS } from 'lit';

function rebrandProperty(colorName: string, colorKey: string): string {
  const colorKeyModifier = colorKey.toLowerCase() === 'default' ? '' : `-${colorKey}`;
  return `--rr-color-primary${colorKeyModifier}: var(--rr-color-${colorName}${colorKeyModifier});`;
}

export function rebrand(colorName: string): CSSResult {
  const keys = [
    '50',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
    '950',
    'DEFAULT',
    'contrast',
    'contrastx'
  ];

  const css = String.raw;
  const properties = keys.map(key => rebrandProperty(colorName, key)).join('\n');
  const result = css`
    :host {
      ${properties}
    }
  `;
  return unsafeCSS(result);
}
