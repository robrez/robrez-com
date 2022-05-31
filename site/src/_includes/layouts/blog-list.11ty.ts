import type { RenderData, CollectionItem, Page } from '../../types/eleventy.js';
import relative from '../util/relative-path.js';
import header from './header.js';
import footer from './footer.js';
import head from './head.js';

const html = String.raw;

const renderItem = (post: CollectionItem, page: Page): string => {
  const href = relative(page.url, post.url);
  //console.log('urls', 'page', page.url, 'post', post.url, 'href', href);
  //console.log('post data', post.data);
  const result = html`
    <li class=${post.url === page.url ? 'selected' : ''}>
      <a href="${href}">${post.data.description?.replace('<', '&lt;')}</a>
    </li>
  `;
  return result;
};

const _renderExample = (data: RenderData): string => {
  const { page, collections, content } = data;
  const blogPosts: CollectionItem[] = [...collections.blog];
  const blogItems: string[] = blogPosts.map((post: CollectionItem) => {
    return renderItem(post, page);
  });
  return html`
    <div class="card">
      <div class="card-heading divider"><h3>Blogs</h3></div>
      <div class="card-body">Ramblings</div>
    </div>

    <div class="card card-body">
      <nav class="collection">
        <ul>
          ${blogItems.join('')}
        </ul>
      </nav>

      <div>${content}</div>
    </div>
  `;
};

/**
 * This template extends the page template and adds an examples list.
 */
const renderExample = (data: RenderData): string => {
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
