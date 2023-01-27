import { Readable } from 'stream';
import type { RenderData } from '../../types/eleventy.js';
import header from './header.js';
import footer from './footer.js';
import head from './head.js';

// https://github.com/microsoft/TypeScript/issues/43329#issuecomment-922544562
const ssrModule = eval('import("@lit-labs/ssr/lib/render-with-global-dom-shim.js")') as Promise<
  typeof import('@lit-labs/ssr/lib/render-with-global-dom-shim.js')
>;
const htmlModule = eval('import("lit-html")') as Promise<typeof import('lit-html')>;

async function streamToString(stream: Readable): Promise<string> {
  const chunks: any[] = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk: any) => chunks.push(Buffer.from(chunk)));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    stream.on('error', err => reject(err));
  });
}

//const litLabsSsr = import('@lit-labs/ssr');

async function litThing(): Promise<string> {
  const litSsr = (await ssrModule).render;
  const html = (await htmlModule).html;
  const value = 'hello';
  const ssrResult = litSsr(html`<div ?foo="${true}">ok<input .value="${value}" /></div>`);
  const bodyReadable = Readable.from(ssrResult);
  const bodyString = await streamToString(bodyReadable);
  return Promise.resolve(bodyString);
}

async function page(data: RenderData): Promise<string> {
  const { title, page, content } = data;
  const litResult = await litThing();
  const html = String.raw;
  return html` <!DOCTYPE html>

    <html lang="en">
      <!-- head -->
      ${head(data)}

      <body>
        <robrez-app>
          ${header(data)}

          <!-- main slot -->

          <div class="card">${litResult}</div>
          <div class="card">
            <div class="card-heading divider"><h3>Lorem Ipsum</h3></div>
            <div class="card-body">${content}</div>
          </div>

          <!-- footer slot -->
          ${footer(data)}
        </robrez-app>
      </body>
    </html>`;
}

export default page;
module.exports = page;
