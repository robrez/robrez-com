import type { RenderData } from '../../types/eleventy.js';
import header from './header.js';
import footer from './footer.js';
import head from './head.js';

const html = String.raw;

// <script type="module" src="${relative(page.url, '/components.mjs')}"></script>
const page = (data: RenderData): string => {
  const { title, page, content } = data;
  return html` <!DOCTYPE html>

    <html lang="en">
      <!-- head -->
      ${head(data)}

      <body>
        <robrez-app>
          ${header(data)}

          <!-- main slot -->

          <div class="card">
            <div class="card-heading divider"><h3>Lorem Ipsum</h3></div>
            <div class="card-body">${content}</div>
          </div>

          <!-- footer slot -->
          ${footer(data)}
        </robrez-app>
      </body>
    </html>`;
};

export default page;
module.exports = page;
