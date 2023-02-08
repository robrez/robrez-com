import type { RenderData, CollectionItem } from '../../types/eleventy.js';
import { firstWithTag } from '../util/collections.js';
import header from './header.js';
import footer from './footer.js';
import head from './head.js';

function page(data: RenderData): string {
  const homeItems: CollectionItem[] = data.collections.home;
  const intro: CollectionItem | undefined = firstWithTag('_intro', homeItems);

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
            <div class="card-heading divider"><h3>${intro?.data.title}</h3></div>
            <div class="card-body">${intro?.content}</div>
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
