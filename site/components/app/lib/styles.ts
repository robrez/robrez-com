import { css } from 'lit-element';
import colorProps from '../../style/props/color.js';
import spacingProps from '../../style/props/spacing.js';
import typographyProps from '../../style/props/typography.js';
import flexUtils from '../../style/utils/flex.js';
import spacingUtils from '../../style/utils/spacing.js';
import typographyUtils from '../../style/utils/typography.js';

const styles = css`
  :root,
  :host {
    display: block;
    --rr-shade: rgba(0, 0, 0);
    --rr-shade-900: rgba(0, 0, 0, 0.9);
    --rr-shade-800: rgba(0, 0, 0, 0.8);
    --rr-shade-700: rgba(0, 0, 0, 0.7);
    --rr-shade-600: rgba(0, 0, 0, 0.6);
    --rr-shade-500: rgba(0, 0, 0, 0.5);
    --rr-shade-400: rgba(0, 0, 0, 0.4);
    --rr-shade-300: rgba(0, 0, 0, 0.3);
    --rr-shade-200: rgba(0, 0, 0, 0.2);
    --rr-shade-100: rgba(0, 0, 0, 0.1);
    --rr-shade-50: rgba(0, 0, 0, 0.05);

    --rr-tint: rgba(255, 255, 255);
    --rr-tint-900: rgba(255, 255, 255, 0.9);
    --rr-tint-800: rgba(255, 255, 255, 0.8);
    --rr-tint-700: rgba(255, 255, 255, 0.7);
    --rr-tint-600: rgba(255, 255, 255, 0.6);
    --rr-tint-500: rgba(255, 255, 255, 0.5);
    --rr-tint-400: rgba(255, 255, 255, 0.4);
    --rr-tint-300: rgba(255, 255, 255, 0.3);
    --rr-tint-200: rgba(255, 255, 255, 0.2);
    --rr-tint-100: rgba(255, 255, 255, 0.1);
    --rr-tint-50: rgba(255, 255, 255, 0.05);

    --rr-base-divider-color: dodgerblue;
    --rr-large-divider-width: 6px;
    --rr-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

    --rr-base-bg-color: var(--rr-color-slate-50);
    --rr-base-text-color: var(--rr-shade-800);
    --rr-header-bg-color: var(--rr-shade-800);
    --rr-header-text-color: var(--rr-tint-900);
    --rr-header-text-secondary-color: var(--rr-tint-800);
    --rr-header-text-tertiary-color: var(--rr-tint-600);
    --rr-content-bg-color: var(--rr-tint);
    --rr-content-text-color: var(--rr-shade-800);
    --rr-divider-color: var(--rr-shade-200);
    --rr-divider-secondary-color: var(--rr-shade-100);

    --rr-space-xl: 2rem;
    --rr-space-lg: 1.5rem;
    --rr-space-md: 1rem;
    --rr-space-sm: 0.75rem;
    --rr-space-xs: 0.5rem;

    font-family: var(--rr-font-family);
    background-color: var(--rr-base-bg-color);
    color: var(--rr-base-text-color);
  }

  ${colorProps} ${spacingProps} ${typographyProps}

  ${flexUtils} ${spacingUtils} ${typographyUtils}

  :host([dark]) {
    --rr-base-bg-color: var(--rr-shade-900);
    --rr-base-text-color: var(--rr-tint-900);
    --rr-base-divider-color: var(--rr-color-slate-500);
    --rr-header-bg-color: var(--rr-shade);
    --rr-header-text-color: var(--rr-tint-900);
    --rr-header-text-secondary-color: var(--rr-tint-800);
    --rr-header-text-tertiary-color: var(--rr-tint-600);
    --rr-content-bg-color: var(--rr-color-slate-800);
    --rr-content-text-color: var(--rr-tint-800);
    --rr-divider-color: var(--rr-tint-100);
    --rr-divider-secondary-color: var(--rr-tint-50);
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: 0;
  }

  header {
    padding: 1rem;
    background: var(--rr-header-bg-color);
    color: var(--rr-header-text-color);
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 1024px;
  }

  .title {
    font-weight: normal;
    letter-spacing: -0.1rem;
    margin: 0;
    text-shadow: 0 2px 2px rgb(0 0 0 / 40%), 0 1px 5px rgb(0 0 0 / 12%), 0 3px 1px rgb(0 0 0 / 20%);
  }

  .caption {
    font-size: 13px;
    color: var(--rr-header-text-tertiary-color);
  }

  main {
    min-height: 80vh;
    padding: 1rem;
    background: linear-gradient(
      180deg,
      var(--rr-header-bg-color),
      var(--rr-header-bg-color) 56px,
      var(--rr-base-divider-color) 56px,
      var(--rr-base-divider-color) calc(56px + var(--rr-large-divider-width)),
      transparent 1px
    );
  }

  .main-content {
    margin: 0 auto;
    max-width: 1024px;
  }

  .card-container {
    break-inside: avoid;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  .card {
    border-radius: 2px;
    border: 1px solid var(--rr-divider-color);
    background-color: var(--rr-content-bg-color);
    color: var(--rr-content-text-color);
  }

  .card-heading,
  .card-body {
    padding: 1rem;
  }

  .card-heading.divider {
    border-bottom: 1px solid var(--rr-divider-secondary-color);
  }

  footer {
    padding: 1rem;
    background: var(--rr-header-bg-color);
    color: var(--rr-header-text-color);
    border-top: var(--rr-large-divider-width) solid var(--rr-base-divider-color);
    min-height: 200px;
  }

  .footer-content {
    margin: 0 auto;
    max-width: 1024px;
  }

  nav {
    display: block;
  }
  nav[horizontal] {
    display: inline-block;
  }
  nav[horizontal] li {
    display: inline-block;
    margin-left: 1rem;
  }
  nav ul {
    margin: 0;
    padding: 0;
  }
  nav li {
    opacity: 0.8;
  }
  nav li:hover {
    opacity: 1;
  }
  nav a {
    font-weight: bold;
    color: inherit;
    text-decoration: none;
  }
  nav a[data-selected='true'] {
    text-decoration: underline;
  }
`;

export { styles };
