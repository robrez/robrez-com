import type { RenderData, CollectionItem, Page } from '../../types/eleventy.js';
import relative from '../util/relative-path.js';
import header from './header.js';
import footer from './footer.js';
import head from './head.js';

const html = String.raw;

function dtox(value: string) {
  return value?.replace('<', '&lt');
}

function formatDate(date: Date): string {
  if (!date) {
    return '?';
  }
  return new Intl.DateTimeFormat('en-US').format(date);
}

const renderItem = (post: CollectionItem, page: Page): string => {
  const href = relative(page.url, post.url);
  //console.log('urls', 'page', page.url, 'post', post.url, 'href', href);
  //console.log('post data', post.data);
  const result = html`
    <li>
      <div>
        <div><a href="${href}">${dtox(post.data.description)}</a></div>
        <div>${formatDate(post.date as Date)}</div>
      </div>
    </li>
  `;
  return result;
};

const _renderExample = (data: RenderData): string => {
  const { page, collections, content } = data;
  const blogPosts: CollectionItem[] = [...collections.blog].reverse();
  const blogItems: string[] = blogPosts.map((post: CollectionItem) => {
    return renderItem(post, page);
  });
  return html`
    <div class="card card-body mt-xl">
      <nav class="collection">
        <ul>
          ${blogItems.join('')}
        </ul>
      </nav>
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
        <rr-app-layout randomize-brand-color>
          ${header(data)}

          <!-- main slot -->
          <div class="card">
            <div class="card-heading"><h3>${data.title}</h3></div>
          </div>

          <!-- listing  -->
          ${_renderExample(data)}

          <!-- footer slot -->
          ${footer(data)}
        </rr-app-layout>
      </body>
    </html>`;
};

export default renderExample;

module.exports = renderExample;
