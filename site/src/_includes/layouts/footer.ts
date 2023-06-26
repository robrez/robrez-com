import type { RenderData } from '../../types/eleventy.js';

const renderFooter = (_data: RenderData): string => {
  const html = String.raw;
  return html`
    <div class="footer-content" slot="footer">
      <div>Made with love &#10084;️</div>
    </div>
  `;
};

export default renderFooter;
