import type { RenderData } from '../../types/eleventy.js';
import header from './header.js';
import footer from './footer.js';
import head from './head.js';

/**
 * This template extends the page template and adds an examples list.
 */
const render = (data: RenderData): string => {
  const html = String.raw;
  return html` <!DOCTYPE html>

    <html lang="en">
      <!-- head -->
      ${head(data)}

      <body>
        <rr-app-layout randomize-brand-color>
          ${header(data)}

          <!-- main slot -->

          <div class="card">
            <div class="card-heading"><h3>${data.title}</h3></div>
          </div>

          <div class="card mt-xl">
            <div class="card-body">${data.content}</div>
          </div>

          <!-- footer slot -->
          ${footer(data)}
        </rr-app-layout>
      </body>
    </html>`;
};

export default render;

module.exports = render;
