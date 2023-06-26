import type { RenderData, CollectionItem } from '../../types/eleventy.js';
import header from './header.js';
import footer from './footer.js';
import head from './head.js';

function page(data: RenderData): string {
  const awesome: CollectionItem = data.collections.awesome[0];

  const { title, page, content } = data;
  const html = String.raw;
  const tpl = html` <!DOCTYPE html>

    <html lang="en">
      <!-- head -->
      ${head(data)}

      <body>
        <rr-app-layout randomize-brand-color>
          ${header(data)}

          <!-- main slot -->
          <div class="card">
            <div class="card-heading">
              <h3>Awesome 🎉🔥</h3>
            </div>
          </div>

          <div class="card mt-xl">
            <div class="card-body">${awesome?.content}</div>
          </div>

          <!-- footer slot -->
          ${footer(data)}
        </rr-app-layout>
      </body>
    </html>`;
  return tpl;
}

export default page;
module.exports = page;
