import { css } from 'lit-element';
import '@robrez-com/style/props-all-module.js';

const styles = css`
  :root,
  :host {
    display: block;

    --rr-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

    --rr-header-bg-color: var(--rr-color-shade-800);
    --rr-header-primary-text-color: var(--rr-color-primary-300);
    --rr-header-text-color: var(--rr-color-tint-900);
    --rr-header-text-secondary-color: var(--rr-color-tint-800);
    --rr-header-text-tertiary-color: var(--rr-color-tint-600);
    --rr-base-divider-color: var(--rr-color-primary);
    --rr-large-divider-width: 6px;

    background-color: var(--rr-color-base-bg);
    color: var(--rr-color-base-text);
    font-family: var(--rr-font-family);
  }

  :host([theme~='dark']) {
    --rr-header-bg-color: var(--rr-color-shade);
    --rr-header-primary-text-color: var(--rr-color-primary-700);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--rr-color-surface-secondary-text);
    margin: 0;
  }

  .card a {
    color: var(--rr-color-primary-text);
    text-decoration: none;
  }

  .card a:hover {
    text-decoration: underline;
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
    flex-wrap: wrap;
  }

  .title {
    font-weight: normal;
    letter-spacing: -0.1rem;
    margin: 0;
    text-shadow: 0 2px 2px rgb(0 0 0 / 40%), 0 1px 5px rgb(0 0 0 / 12%), 0 3px 1px rgb(0 0 0 / 20%);
    color: var(--rr-color-tint-950);
  }

  small,
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

  ::slotted(.card),
  .card {
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    border-radius: var(--rr-surface-border-radius, 4px);
    border-top: 3px solid var(--rr-color-primary);
    background-color: var(--rr-color-surface-bg);
    color: var(--rr-color-surface-text);
  }

  .card-heading,
  .card-body {
    padding: 1rem;
  }

  .card-heading.divider {
    border-bottom: 1px solid var(--rr-color-divider-secondary);
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
    margin-top: 0.5rem;
    margin-right: 1.5rem;
  }
  nav[horizontal] li {
    display: inline-block;
    margin-right: 1rem;
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
