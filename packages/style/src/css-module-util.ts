import { render, css, CSSResult, CSSResultArray } from 'lit';
const moduleId = `module-id`;
const idPrefix = `rr/`;
const allId = 'all';

function computeId(id: string): string {
  return `${idPrefix}${id}`;
}

function computeAllId(id: string): string {
  const parts = id.split('/');
  return [...parts.splice(0, parts.length - 1), allId].join('/');
}

export function styleModuleExists(id: string): boolean {
  const styleTag = document.querySelector(`style[${moduleId}="${id}"]`);
  if (styleTag) {
    return true;
  }
  const linkTag = document.querySelector(`link[${moduleId}="${id}"]`);
  if (linkTag) {
    return true;
  }
  return false;
}

export function appendModule(name: string, style: CSSResult | CSSResultArray): void {
  const id = computeId(name);
  const allId = computeAllId(id);
  if (styleModuleExists(id) || styleModuleExists(allId)) {
    return;
  }
  const styleEl = document.createElement('style');
  styleEl.setAttribute(moduleId, id);
  render(
    css`
      ${style}
    `,
    styleEl
  );
  const target = document.head ?? document.body;
  target.appendChild(styleEl);
}
