/**
 * Helpers for dynamic importing of things from lit ecosystem (ESM)
 * and exporting promises which 11ty ecosystem (CJS) can use
 */
import { Readable } from 'stream';

const unsafeHTMLModule = import('lit/directives/unsafe-html.js');
const htmlModule = import('lit-html');
const ssrRenderModule = import('@lit-labs/ssr/lib/render-with-global-dom-shim.js');

/**
 * After expirimenting with this, it _does_ work. However, I'm going to keep using
 * String.raw for html templates. Some of the ergnomics stemming from this attempt
 * are _not_ great
 *
 * https://discord.com/channels/1012791295170859069/107020815981530727
 */

type RenderInfo = any; // can't quit figure out how import types from esm

/*
 * was doing this previously
 *
 * const htmlModule = eval('import("lit-html")') as Promise<typeof import('lit-html')>;
 *
 * instead have set moduleResolution to "node16" and used w/ the dynamic imports above
 * https://github.com/microsoft/TypeScript/issues/43329#issuecomment-922544562
 */

async function streamToString(stream: Readable): Promise<string> {
  const chunks: any[] = [];
  return new Promise((resolve, reject) => {
    stream.on('data', chunk => chunks.push(Buffer.from(chunk)));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    stream.on('error', err => reject(err));
  });
}

async function renderToString(value: unknown, options?: Partial<RenderInfo>): Promise<string> {
  const ssrResult = (await ssrRenderModule).render(value, options);
  const bodyReadable = Readable.from(ssrResult as any);
  const bodyString = await streamToString(bodyReadable);
  return Promise.resolve(bodyString);
}

async function html() {
  const html = (await htmlModule).html;
  return html;
}

async function unsafeHTML() {
  const unsafeHTML = (await unsafeHTMLModule).unsafeHTML;
  return unsafeHTML;
}

export { htmlModule, ssrRenderModule, html, unsafeHTML, renderToString };
