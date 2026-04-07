import { css } from 'lit-element';

const styles = css`
  :host {
    display: block;

    --font-family:
      -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol';

    --color-base-bg: var(--color-gray-50);
    --color-base-text: var(--color-neutral-800);
    --color-base-secondary-text: var(--color-neutral-500);
    --color-surface-bg: var(--color-white);
    --color-surface-text: var(--color-neutral-800);
    --color-surface-secondary-text: var(--color-neutral-500);
    --color-divider: var(--color-zinc-300);
    --color-divider-secondary: var(--color-zinc-200);
    --header-bg-color: var(--color-black-800);
    --header-primary-text-color: var(--color-primary-300);
    --header-text-color: var(--color-white-900);
    --header-text-secondary-color: var(--color-white-800);
    --header-text-tertiary-color: var(--color-white-600);
    --base-divider-color: var(--color-primary-500);
    --large-divider-width: 6px;

    background-color: var(--color-base-bg);
    color: var(--color-base-text);
    font-family: var(--font-family);
  }

  :host([theme~='dark']) {
    --color-base-bg: var(--color-black-900);
    --color-base-text: var(--color-neutral-900);
    --color-base-secondary-text: var(--color-neutral-700);
    --color-surface-bg: var(--color-gray-200);
    --color-surface-text: var(--color-neutral-900);
    --color-surface-secondary-text: var(--color-neutral-700);
    --color-divider: var(--color-zinc-300);
    --color-divider-secondary: var(--color-zinc-200);
    --header-bg-color: var(--color-black);
    --header-primary-text-color: var(--color-primary-700);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--color-surface-secondary-text);
    margin: 0;
  }

  .card a {
    color: var(--color-primary);
    text-decoration: none;
  }

  .card a:hover {
    text-decoration: underline;
  }

  header {
    padding: 1rem;
    background: var(--header-bg-color);
    color: var(--header-text-color);
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
    text-shadow:
      0 2px 2px rgb(0 0 0 / 40%),
      0 1px 5px rgb(0 0 0 / 12%),
      0 3px 1px rgb(0 0 0 / 20%);
    color: var(--color-white-950);
  }

  small,
  .caption {
    font-size: 13px;
    color: var(--header-text-tertiary-color);
  }

  main {
    min-height: 80vh;
    padding: 1rem;
    background: linear-gradient(
      180deg,
      var(--header-bg-color),
      var(--header-bg-color) 56px,
      var(--base-divider-color) 56px,
      var(--base-divider-color) calc(56px + var(--large-divider-width)),
      transparent 1px
    );
  }

  .main-content {
    margin: 0 auto;
    max-width: 1024px;
  }

  ::slotted(.card),
  .card {
    box-shadow:
      0 1px 3px 0 rgb(0 0 0 / 0.1),
      0 1px 2px -1px rgb(0 0 0 / 0.1);
    border-radius: var(--surface-border-radius, 4px);
    border-top: 3px solid var(--color-primary-500);
    background-color: var(--color-surface-bg);
    color: var(--color-surface-text);
  }

  .card-heading.divider {
    border-bottom: 1px solid var(--color-divider-secondary);
  }

  footer {
    padding: 1rem;
    background: var(--header-bg-color);
    color: var(--header-text-color);
    border-top: var(--large-divider-width) solid var(--base-divider-color);
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

  @media print {
    :host {
      --color-base-bg: #fff;
    }
    [part~='header'],
    [part~='footer'] {
      display: none;
    }

    ::slotted(.card),
    .card {
      -webkit-box-decoration-break: clone;
      box-decoration-break: clone;
      box-shadow: unset;
      border-radius: 0;
    }
  }
`;

export { styles };
