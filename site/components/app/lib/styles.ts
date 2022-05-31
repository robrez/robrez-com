import { css } from 'lit-element';

const styles = css`
  :root,
  :host {
    display: block;
    --robrez-shade: rgba(0, 0, 0);
    --robrez-shade-90: rgba(0, 0, 0, 0.9);
    --robrez-shade-80: rgba(0, 0, 0, 0.8);
    --robrez-shade-70: rgba(0, 0, 0, 0.7);
    --robrez-shade-60: rgba(0, 0, 0, 0.6);
    --robrez-shade-50: rgba(0, 0, 0, 0.5);
    --robrez-shade-40: rgba(0, 0, 0, 0.4);
    --robrez-shade-30: rgba(0, 0, 0, 0.3);
    --robrez-shade-20: rgba(0, 0, 0, 0.2);
    --robrez-shade-10: rgba(0, 0, 0, 0.1);
    --robrez-shade-5: rgba(0, 0, 0, 0.05);

    --robrez-md-bluegrey-10: #eceff1;
    --robrez-md-bluegrey-20: #cfd8dc;
    --robrez-md-bluegrey-30: #b0bec5;
    --robrez-md-bluegrey-40: #90a4ae;
    --robrez-md-bluegrey-50: #78909c;
    --robrez-md-bluegrey-60: #607d8b;
    --robrez-md-bluegrey-70: #546e7a;
    --robrez-md-bluegrey-80: #455a64;
    --robrez-md-bluegrey-90: #37474f;
    --robrez-md-bluegrey: #263238;

    --robrez-dx-bluegrey-5: #f0f4f8;
    --robrez-dx-bluegrey-10: #d9e2ec;
    --robrez-dx-bluegrey-20: #bcccdc;
    --robrez-dx-bluegrey-30: #9fb3c8;
    --robrez-dx-bluegrey-40: #829ab1;
    --robrez-dx-bluegrey-50: #627d98;
    --robrez-dx-bluegrey-60: #486581;
    --robrez-dx-bluegrey-70: #334e68;
    --robrez-dx-bluegrey-80: #243b53;
    --robrez-dx-bluegrey-90: #102a43;

    --robrez-tint: rgba(255, 255, 255);
    --robrez-tint-90: rgba(255, 255, 255, 0.9);
    --robrez-tint-80: rgba(255, 255, 255, 0.8);
    --robrez-tint-70: rgba(255, 255, 255, 0.7);
    --robrez-tint-60: rgba(255, 255, 255, 0.6);
    --robrez-tint-50: rgba(255, 255, 255, 0.5);
    --robrez-tint-40: rgba(255, 255, 255, 0.4);
    --robrez-tint-30: rgba(255, 255, 255, 0.3);
    --robrez-tint-20: rgba(255, 255, 255, 0.2);
    --robrez-tint-10: rgba(255, 255, 255, 0.1);
    --robrez-tint-5: rgba(255, 255, 255, 0.05);

    --robrez-base-divider-color: dodgerblue;
    --robrez-large-divider-width: 6px;
    --robrez-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

    --robrez-base-bg-color: var(--robrez-dx-bluegrey-5);
    --robrez-base-text-color: var(--robrez-shade-80);
    --robrez-header-bg-color: var(--robrez-shade-80);
    --robrez-header-text-color: var(--robrez-tint-90);
    --robrez-header-text-secondary-color: var(--robrez-tint-80);
    --robrez-header-text-tertiary-color: var(--robrez-tint-60);
    --robrez-content-bg-color: var(--robrez-tint);
    --robrez-content-text-color: var(--robrez-shade-80);
    --robrez-divider-color: var(--robrez-shade-20);
    --robrez-divider-secondary-color: var(--robrez-shade-10);

    font-family: var(--robrez-font-family);
    background-color: var(--robrez-base-bg-color);
    color: var(--robrez-base-text-color);
  }

  :host([dark]) {
    --robrez-base-bg-color: var(--robrez-shade-90);
    --robrez-base-text-color: var(--robrez-tint-90);
    --robrez-base-divider-color: var(--robrez-dx-bluegrey-50);
    --robrez-header-bg-color: var(--robrez-shade);
    --robrez-header-text-color: var(--robrez-tint-90);
    --robrez-header-text-secondary-color: var(--robrez-tint-80);
    --robrez-header-text-tertiary-color: var(--robrez-tint-60);
    --robrez-content-bg-color: var(--robrez-dx-bluegrey-80);
    --robrez-content-text-color: var(--robrez-tint-80);
    --robrez-divider-color: var(--robrez-tint-10);
    --robrez-divider-secondary-color: var(--robrez-tint-5);
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
    background: var(--robrez-header-bg-color);
    color: var(--robrez-header-text-color);
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
    color: var(--robrez-header-text-tertiary-color);
  }

  main {
    min-height: 80vh;
    padding: 1rem;
    background: linear-gradient(
      180deg,
      var(--robrez-header-bg-color),
      var(--robrez-header-bg-color) 56px,
      var(--robrez-base-divider-color) 56px,
      var(--robrez-base-divider-color) calc(56px + var(--robrez-large-divider-width)),
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
    border: 1px solid var(--robrez-divider-color);
    background-color: var(--robrez-content-bg-color);
    color: var(--robrez-content-text-color);
  }

  .card-heading,
  .card-body {
    padding: 1rem;
  }

  .card-heading.divider {
    border-bottom: 1px solid var(--robrez-divider-secondary-color);
  }

  footer {
    padding: 1rem;
    background: var(--robrez-header-bg-color);
    color: var(--robrez-header-text-color);
    border-top: var(--robrez-large-divider-width) solid var(--robrez-base-divider-color);
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
