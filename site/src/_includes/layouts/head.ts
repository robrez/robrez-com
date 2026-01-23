/**
 * Common `head` stuff each page may compose
 */
import type { RenderData } from '../../types/eleventy.js';
import relative from '../util/relative-path.js';

const html = String.raw;

// <script type="module" src="${relative(page.url, '/components.mjs')}"></script>
const page = (data: RenderData): string => {
  const { title, page } = data;
  // was using `all.css` flavors but rollup isn't extracting and bundling `@import` from css
  // TODO switch methodologies
  const modules = [
    'props/color',
    'props/color-dark',
    'props/spacing',
    'props/typography',
    'utils/bg-color',
    'utils/color',
    'utils/flex',
    'utils/spacing',
    'utils/typography'
  ]
    .map(mod => {
      const path = relative(page.url, `/style/src/${mod}.css`);
      return html` <link module-id="rr/${mod}" href="${path}" rel="stylesheet" /> `;
    })
    .join('\n');
  return html`
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
      <link rel="stylesheet" href="${relative(page.url, '/docs.css')}" />
      ${modules}
      <link href="${relative(page.url, '/prism-okaidia.css')}" rel="stylesheet" />
      <script src="${relative(page.url, '/components.bundled.js')}"></script>
    </head>
  `;
};

export default page;
