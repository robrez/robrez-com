import type { RenderData } from '../../types/eleventy.js';

const renderFooter = (_data: RenderData): string => {
  const html = String.raw;
  return html`
    <div class="footer-content" slot="footer">
      <div></div>
    </div>
  `;
};

export default renderFooter;
