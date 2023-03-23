import { CSSResult, css, html, svg, LitElement, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { rebrand } from '@robrez-com/style/rebrand.js';
import { styles } from './styles.js';

const lightIcon = svg`<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M480 936q-150 0-255-105T120 576q0-150 105-255t255-105q8 0 17 .5t23 1.5q-36 32-56 79t-20 99q0 90 63 153t153 63q52 0 99-18.5t79-51.5q1 12 1.5 19.5t.5 14.5q0 150-105 255T480 936Zm0-60q109 0 190-67.5T771 650q-25 11-53.667 16.5Q688.667 672 660 672q-114.689 0-195.345-80.655Q384 510.689 384 396q0-24 5-51.5t18-62.5q-98 27-162.5 109.5T180 576q0 125 87.5 212.5T480 876Zm-4-297Z"/></svg>`;
const darkIcon = svg`<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M479.765 716Q538 716 579 675.235q41-40.764 41-99Q620 518 579.235 477q-40.764-41-99-41Q422 436 381 476.765q-41 40.764-41 99Q340 634 380.765 675q40.764 41 99 41Zm.235 60q-83 0-141.5-58.5T280 576q0-83 58.5-141.5T480 376q83 0 141.5 58.5T680 576q0 83-58.5 141.5T480 776ZM70 606q-12.75 0-21.375-8.675Q40 588.649 40 575.825 40 563 48.625 554.5T70 546h100q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T170 606H70Zm720 0q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T790 546h100q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T890 606H790ZM479.825 296Q467 296 458.5 287.375T450 266V166q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510 166v100q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625Zm0 720q-12.825 0-21.325-8.62-8.5-8.63-8.5-21.38V886q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510 886v100q0 12.75-8.675 21.38-8.676 8.62-21.5 8.62ZM240 378l-57-56q-9-9-8.629-21.603.37-12.604 8.526-21.5 8.896-8.897 21.5-8.897Q217 270 226 279l56 57q8 9 8 21t-8 20.5q-8 8.5-20.5 8.5t-21.5-8Zm494 495-56-57q-8-9-8-21.375T678.5 774q8.5-9 20.5-9t21 9l57 56q9 9 8.629 21.603-.37 12.604-8.526 21.5-8.896 8.897-21.5 8.897Q743 882 734 873Zm-56-495q-9-9-9-21t9-21l56-57q9-9 21.603-8.629 12.604.37 21.5 8.526 8.897 8.896 8.897 21.5Q786 313 777 322l-57 56q-8 8-20.364 8-12.363 0-21.636-8ZM182.897 873.103q-8.897-8.896-8.897-21.5Q174 839 183 830l57-56q8.8-9 20.9-9 12.1 0 20.709 9Q291 783 291 795t-9 21l-56 57q-9 9-21.603 8.629-12.604-.37-21.5-8.526ZM480 576Z"/></svg>`;

export class AppLayout extends LitElement {
  @property({ type: String, reflect: true }) brandColor: string | undefined = undefined;
  @property({ type: String, reflect: true }) theme: string | undefined = undefined;
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

      [part='header'] {
        display: flex;
      }

      [part='header-content'] {
        flex: 1;
      }

      [part='theme-toggle'] {
        margin-left: 1rem;
        border: none;
        outline: none;
        background-color: transparent;
        height: 1.5rem;
        width: 1.5rem;
        padding: 0.125rem;
        color: var(--rr-header-text-color);
        border-radius: 2px;
        opacity: 0.8;
        transition: 0.125s transform ease, 0.125s opacity;
        position: relative;
      }

      [part='theme-toggle']:after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background-color: var(--rr-header-text-color);
        opacity: 0;
        border-radius: 2px;
        transition: 0.125s transform ease, 0.125s opacity;
        transform: scale(0);
        transform-origin: center center;
      }

      [part='theme-toggle']:focus,
      [part='theme-toggle']:hover,
      [part='theme-toggle']:active {
        opacity: 1;
      }

      [part='theme-toggle']:hover,
      [part='theme-toggle']:active {
        transform: scale(1.125);
      }

      [part='theme-toggle']:active {
        transform: scale(1.25);
      }

      [part='theme-toggle']:active:after {
        opacity: 0.5;
        transform: scale(1);
      }

      [part='theme-toggle']:focus-visible {
        box-shadow: 0 0 3px var(--rr-color-primary);
      }

      [part='theme-toggle'] svg {
        height: 100%;
        width: 100%;
        fill: currentColor;
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

  get isDarkTheme(): boolean {
    const theme = this.theme ?? '';
    return !!theme.split(' ').find(name => name === 'dark');
  }

  private renderThemeToggle(): TemplateResult {
    const icon = this.isDarkTheme ? darkIcon : lightIcon;
    const title = `Switch to ${this.isDarkTheme ? 'light' : 'dark'} mode`;
    return html`<button @click="${this.onClickThemeToggle}" class="icon-button" part="theme-toggle" title="${title}">
      ${icon}
    </button>`;
  }

  protected override render(): TemplateResult {
    return html`
      ${this.renderBrandStyle()}
      <header part="header">
        <div part="header-content">
          <slot name="header"></slot>
        </div>

        ${this.renderThemeToggle()}
      </header>

      <main>
        <div class="main-content"><slot></slot></div>
      </main>

      <footer>
        <slot name="footer"></slot>
      </footer>
    `;
  }

  private onClickThemeToggle(): void {
    const theme = this.theme ?? '';
    const newThemes = theme.split(' ').filter(name => !!name && name !== 'dark');
    if (this.isDarkTheme) {
      this.theme = !newThemes.length ? undefined : newThemes.join(' ');
    } else {
      this.theme = [...newThemes, 'dark'].join(' ');
    }
  }
}
