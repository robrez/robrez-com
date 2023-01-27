import type { RenderData } from '../../types/eleventy.js';
import relative from '../util/relative-path.js';
import header from './header.js';
import footer from './footer.js';
import head from './head.js';

const _renderExample = (data: RenderData): string => {
  const html = String.raw;
  const { content } = data;
  return html`
    <div class="card">
      <div class="card-heading"><h3>${data.name}</h3></div>
    </div>

    <div class="card">
      <div class="card-body">${content}</div>
    </div>
  `;
};

/**
 * This template extends the page template and adds an examples list.
 */
const renderExample = (data: RenderData): string => {
  const html = String.raw;
  return html` <!DOCTYPE html>
    <!-- head -->
    ${head(data)}

    <body>
      <robrez-app>
        ${header(data)}

        <!-- main slot -->

        <div class="card">
          <div class="card-heading divider"><h3>Lorem Ipsum</h3></div>
          <div class="card-body">${_renderExample(data)}</div>
        </div>

        <!-- footer slot -->
        ${footer(data)}
      </robrez-app>
    </body>
  </html>`;
};

export default renderExample;

module.exports = renderExample;
