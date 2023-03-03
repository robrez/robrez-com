import type { RenderData, CollectionItem, CollectionItemData } from '../../types/eleventy.js';
import header from './header.js';
import footer from './footer.js';
import head from './head.js';

const html = String.raw;

type ResumeItemData = {
  title: string;
  company: string;
  startDate: Date;
  endDate?: Date;
  itemTags: string[];
} & CollectionItemData;

const formatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric'
});

function formatDate(date: Date | undefined, defaultValue = ''): string {
  try {
    return !date ? defaultValue : formatter.format(date);
  } catch (e) {
    return defaultValue;
  }
}

function formatDateRange(startDate: Date, endDate: Date | undefined): string | undefined {
  return `${formatDate(startDate, '?')} - ${formatDate(endDate, 'Current')}`;
}

function renderResumeItem(item: CollectionItem): string {
  const data: ResumeItemData = item.data as ResumeItemData;
  return html` <div class="item">
    <div class="card-heading divider">
      <div class="horizontal center">
        <h3>${data.title}</h3>
        <small>${formatDateRange(data.startDate, data.endDate)}</small>
      </div>
    </div>
    <div class="card-body">${item.content}</div>
  </div>`;
}

function renderResumeItems(items: CollectionItem[]): string {
  const itemContent = items.map(item => html`<li>${renderResumeItem(item)}</li>`).join('\n');
  return html` <div class="card">
    <div class="card-heading divider">
      <div class="horizontal center">
        <h3>Work Experience</h3>
      </div>
    </div>
    <div class="card-body">
      <ul>
        ${itemContent}
      </ul>
    </div>
  </div>`;
}

function page(data: RenderData): string {
  const resumeItems: CollectionItem[] = data.collections.resume;

  const { title, page, content } = data;
  const tpl = html` <!DOCTYPE html>

    <html lang="en">
      <!-- head -->
      ${head(data)}

      <body>
        <robrez-app>
          ${header(data)}

          <!-- main slot -->
          <div class="card">
            <div class="card-heading divider"><h3>Resume</h3></div>
          </div>

          <!-- resume -->
          ${renderResumeItems(resumeItems)}

          <!-- footer slot -->
          ${footer(data)}
        </robrez-app>
      </body>
    </html>`;
  return tpl;
}

export default page;
module.exports = page;
