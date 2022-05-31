import type { RenderData } from '../../types/eleventy.js';
import pageRender from './page.11ty.js';

const _renderExample = (data: RenderData): string => {
  const html = String.raw;
  const { content } = data;
  return html`
    <div class="card">
      <div class="card-heading"><h3>${data.name}</h3></div>
    </div>

    <div class="card">
      <div class="card-body">${content}</div>
    </div>
  `;
};

/**
 * This template extends the page template and adds an examples list.
 */
const renderExample = (data: RenderData): string => {
  return pageRender({
    ...data,
    content: _renderExample(data)
  });
};

export default renderExample;

module.exports = renderExample;
