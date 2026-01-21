import type { RenderData, CollectionItem, CollectionItemData } from '../../types/eleventy.js';
import header from './header.js';
import footer from './footer.js';
import head from './head.js';

const html = String.raw;

type ResumeItemCategory = 'intro' | 'project' | 'position';

// TODO make `CollectionItem` a templated type, `CollectionItem<T>`
type ResumeItemData = {
  title: string;
  category: ResumeItemCategory;
  company: string;
  startDate: Date;
  endDate?: Date;
  rank?: number;
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

function renderIntro(item: CollectionItem): string {
  const data: ResumeItemData = item.data as ResumeItemData;
  return html` <section>
    <div class="card-heading">
      <h3>About Me</h3>
    </div>
    <div class="card-body">${item.content}</div>
  </section>`;
}

function renderPosition(item: CollectionItem): string {
  const data: ResumeItemData = item.data as ResumeItemData;
  return html` <section>
    <div class="flex items-center justify-between card-heading">
      <h4>${data.title}</h4>
      <small class="color-contrast-700 text-xs">${formatDateRange(data.startDate, data.endDate)}</small>
    </div>
    <div class="card-body">${item.content}</div>
  </section>`;
}

function renderProject(item: CollectionItem): string {
  const data: ResumeItemData = item.data as ResumeItemData;
  return html` <section>
    <div class="flex items-center justify-between card-heading">
      <h4>${data.title}</h4>
    </div>
    <div class="card-body">${item.content}</div>
  </section>`;
}

function renderResumeItems(items: ResumeItem[]): string {
  const rankSort = (a: ResumeItem, b: ResumeItem): number => {
    const aRank = a?.data?.rank ?? 9999;
    const bRank = b?.data?.rank ?? 9999;
    return aRank - bRank;
  };
  const dateSort = (a: Date, b: Date): number => {
    return b.getTime() - a.getTime();
  };
  const dateRangeSort = (a: ResumeItem, b: ResumeItem): number => {
    const now = new Date();
    return dateSort(a.data.startDate ?? now, b.data.startDate ?? now);
  };
  const intro = items.filter(item => item.data.category === 'intro');

  const positions = items
    .filter(item => {
      return item.data.category === 'position';
    })
    .sort(dateRangeSort);
  const projects = items
    .filter(item => {
      return item.data.category === 'project';
    })
    .sort(rankSort);

  const introContent = intro.map(item => html`${renderIntro(item)}`).join('\n');
  const positionsContent = positions.map(item => html`${renderPosition(item)}`).join('\n');
  const projectsContent = projects.map(item => html`${renderProject(item)}`).join('\n');
  return html` <!-- -->
    <div class="card mt-xl">
      ${introContent}

      <div class="card-heading">
        <h3>Projects</h3>
      </div>
      <div class="card-body">${projectsContent}</div>

      <div class="card-heading">
        <h3>Professional Experience</h3>
      </div>
      <div class="card-body">
        <div class="card-heading">
          <h4>TruBridge</h4>
          <div>
            <small class="color-contrast-700 text-xs">${formatDateRange(new Date('2007-01-25'), undefined)}</small>
          </div>
          <div>Principal Engineer (various senior engineering roles)</div>
        </div>
        <div class="card-body">${positionsContent}</div>
      </div>
    </div>`;
}

function pageStyles(): string {
  const css = String.raw;
  return css`
    .header-content .title,
    .header-content .caption {
      opacity: 0;
      pointer-events: none;
      /* Avoid displaying my name twice */
    }

    .image-container {
      box-sizing: border-box;
      border-radius: 9999px;
      border: 3px solid var(--rr-color-primary);
      height: 64px;
      width: 64px;
    }
    .image-container img {
      box-sizing: border-box;
      border-radius: 9999px;
      border: 2px solid transparent;
      height: 100%;
      width: 100%;
    }

    .social svg {
      height: 1rem;
      width: 1rem;
      opacity: 0.8;
    }
  `;
}

type Icons = {
  gh: string;
  linkedin: string;
  mail: string;
};

function iconsLicense(): string {
  const html = String.raw;
  return html`<!-- https://github.com/feathericons/feather/blob/master/LICENSE -->`;
}

function iconset(): Icons {
  const svg = String.raw;
  const gh = svg`<svg class="gh" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>`;
  const linkedin = svg`<svg class="linkedin" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>`;
  const mail = svg`<svg class="mail" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`;
  return {
    gh,
    linkedin,
    mail
  };
}

function page(data: RenderData): string {
  const resumeItems: ResumeItem[] = data.collections.resume as ResumeItem[];

  const icons = iconset();

  const { title, page, content } = data;
  const tpl = html` <!DOCTYPE html>

    <html lang="en">
      <!-- head -->
      ${head(data)}
      <head>
        ${iconsLicense()}
        <style>
          ${pageStyles()}
        </style>
      </head>

      <body>
        <rr-app-layout class="text-md">
          ${header(data)}

          <!-- main slot -->
          <div class="card">
            <div class="card-heading flex flex-wrap">
              <div class="flex flex-1 items-start pr-md">
                <div class="image-container mr-md flex-shrink-0"><img src="/images/rob.jpg" alt="" /></div>
                <div>
                  <h2><div class="color-primary-text">Rob Resendez</div></h2>
                  <div class="text-xs color-contrast-700">Software Engineering Professional</div>
                </div>
              </div>
              <div class="self-end">
                <div class="social flex items-center justify-end">
                  <a class="mr-xs" href="https://github.com/robrez">github</a>
                  ${icons.gh}
                </div>
                <div class="social flex items-center justify-end">
                  <a class="mr-xs" href="https://www.linkedin.com/in/rob-resendez/">linkedin</a>
                  ${icons.linkedin}
                </div>
              </div>
            </div>
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
