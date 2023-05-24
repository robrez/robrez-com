import type { RenderData, CollectionItem, CollectionItemData } from '../../types/eleventy.js';
import header from './header.js';
import footer from './footer.js';
import head from './head.js';

const html = String.raw;

type ResumeItemCategory = 'project' | 'position';

// TODO make `CollectionItem` a templated type, `CollectionItem<T>`
type ResumeItemData = {
  title: string;
  category: ResumeItemCategory;
  company: string;
  startDate: Date;
  endDate?: Date;
  itemTags: string[];
} & CollectionItemData;

type ResumeItem = CollectionItem & {
  data: ResumeItemData;
};

const formatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC'
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

function renderPosition(item: CollectionItem): string {
  const data: ResumeItemData = item.data as ResumeItemData;
  return html` <section>
    <div class="card-heading">
      <h3>${data.company}</h3>
      <div class="flex items-center justify-between">
        <h4>${data.title}</h4>
        <small class="color-contrast-700 text-xs">${formatDateRange(data.startDate, data.endDate)}</small>
      </div>
    </div>
    <div class="card-body">${item.content}</div>
  </section>`;
}

function renderProject(item: CollectionItem): string {
  const data: ResumeItemData = item.data as ResumeItemData;
  return html` <section>
    <div class="flex items-center justify-between card-heading">
      <h4>${data.title}</h4>
      <small class="color-contrast-700 text-xs">${formatDateRange(data.startDate, data.endDate)}</small>
    </div>
    <div class="card-body">${item.content}</div>
  </section>`;
}

function renderResumeItems(items: ResumeItem[]): string {
  const dateSort = (a: Date, b: Date): number => {
    return b.getTime() - a.getTime();
  };
  const dateRangeSort = (a: ResumeItem, b: ResumeItem): number => {
    const now = new Date();
    const endDiff = dateSort(a.data.endDate ?? now, b.data.endDate ?? now);
    if (endDiff !== 0) {
      return endDiff;
    }
    return dateSort(a.data.startDate ?? now, b.data.startDate ?? now);
  };
  const positions = items
    .filter(item => {
      return item.data.category === 'position';
    })
    .sort(dateRangeSort);
  const projects = items
    .filter(item => {
      return item.data.category === 'project';
    })
    .sort(dateRangeSort);

  const positionsContent = positions.map(item => html`${renderPosition(item)}`).join('\n');
  const projectsContent = projects.map(item => html`${renderProject(item)}`).join('\n');
  return html` <!-- -->
    <div class="card mt-xl">
      <div>${positionsContent}</div>

      <div class="card-heading">
        <h4>Projects</h4>
      </div>
      <div class="card-body">${projectsContent}</div>
    </div>`;
}

function page(data: RenderData): string {
  const resumeItems: ResumeItem[] = data.collections.resume as ResumeItem[];

  const { title, page, content } = data;
  const tpl = html` <!DOCTYPE html>

    <html lang="en">
      <!-- head -->
      ${head(data)}

      <body>
        <rr-app-layout>
          ${header(data)}

          <!-- main slot -->
          <div class="card">
            <div class="card-heading divider"><h2>Resume</h2></div>
          </div>

          <!-- resume -->
          ${renderResumeItems(resumeItems)}

          <!-- footer slot -->
          ${footer(data)}
        </rr-app-layout>
      </body>
    </html>`;
  return tpl;
}

export default page;
module.exports = page;
