import type { RenderData, CollectionItem } from '../../types/eleventy.js';
import relative from '../util/relative-path.js';
import { firstWithTag } from '../util/collections.js';

const html = String.raw;
type NavMeta = {
  url: string;
  href: string;
  selected: boolean;
};

function computeUrl(data: RenderData, tag: string): NavMeta {
  // Items tagged as "sitenav"
  const siteNavItems: CollectionItem[] = data.collections.sitenav;

  // The current page
  const currentUrl: string = data.page.url;

  // Find the first siteNav tagged item that also has the given tag
  const url = firstWithTag(tag, siteNavItems)?.url || '/error/';

  // An href url relative to current pages url
  const href = relative(currentUrl, url);

  const selected = currentUrl === url || (currentUrl.indexOf(url) === 0 && url.length > 1);
  return {
    href: href,
    url: url,
    selected: selected
  };
}

const renderNav = (data: RenderData): string => {
  const home = computeUrl(data, '_home');
  // const posts = computeUrl(data, '_posts');
  // const awesome = computeUrl(data, '_awesome');
  const resume = computeUrl(data, '_resume');
  /*
   * note on `data-selected=`, REALLY missing lit-style bindings w/ this pure string
   * based strategy. need ot look at lit-labs ssr to see if it can help. I really
   * just want to bind `?selected=${foo}
   *
   * note that this is obviously not dry, some sorted-based-collection approach would work fine
   * here but i want to be able to control the dom a bit more directly...  may create a map
   * of renderers for all of these top level items. I dont really want to add a render fn
   * to the front-matter
   */
  return html` <nav horizontal>
    <ul>
      <li><a href="${home.href}" data-selected="${home.selected}">Home</a></li>
      <li><a href="${resume.href}" data-selected="${resume.selected}">Resume</a></li>
    </ul>
  </nav>`;
};

const renderHeader = (data: RenderData): string => {
  return html`
    <div class="header-content" slot="header">
      <div>
        <h1 class="title">Rob Resendez</h1>
        <div class="caption">Software development and other musings</div>
      </div>
      ${renderNav(data)}
    </div>
  `;
};

export default renderHeader;
