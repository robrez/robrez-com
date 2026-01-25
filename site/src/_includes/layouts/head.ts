/**
 * Common `head` stuff each page may compose
 */
import type { RenderData } from '../../types/eleventy.js';
import relative from '../util/relative-path.js';

const html = String.raw;

// <script type="module" src="${relative(page.url, '/components.mjs')}"></script>
const page = (data: RenderData): string => {
  const { title, page } = data;
  return html`
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
      <link rel="stylesheet" href="${relative(page.url, '/docs.css')}" />
      <link href="${relative(page.url, '/style/props-all.css')}" rel="stylesheet" />
      <link href="${relative(page.url, '/style/utils-all.css')}" rel="stylesheet" />
      <script src="${relative(page.url, '/components.bundled.js')}"></script>
    </head>
  `;
};

export default page;
