import type { RenderData } from '../../types/eleventy.js';
import header from './header.js';
import footer from './footer.js';
import head from './head.js';

async function page(data: RenderData): Promise<string> {
  const { title, page, content } = data;
  const html = String.raw;
  const tpl = html` <!DOCTYPE html>

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
  return Promise.resolve(tpl);
}

export default page;
module.exports = page;
