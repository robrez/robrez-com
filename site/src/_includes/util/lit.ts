import { Readable } from 'stream';
const htmlModule = import('lit-html');
const renderModule = import('@lit-labs/ssr/lib/render-with-global-dom-shim.js');

// https://github.com/microsoft/TypeScript/issues/43329#issuecomment-922544562
//const ssrModule = eval('import("@lit-labs/ssr/lib/render-with-global-dom-shim.js")') as Promise<
//typeof import('@lit-labs/ssr/lib/render-with-global-dom-shim.js')
//>;
//const htmlModule = eval('import("lit-html")') as Promise<typeof import('lit-html')>;

async function streamToString(stream: Readable): Promise<string> {
  const chunks: any[] = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk: any) => chunks.push(Buffer.from(chunk)));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    stream.on('error', err => reject(err));
  });
}

export async function renderToString(value: unknown, options?: any): Promise<string> {
  const ssrResult = (await htmlModule).render(value, options);
  const bodyReadable = Readable.from(ssrResult as any);
  const bodyString = await streamToString(bodyReadable);
  return Promise.resolve(bodyString);
}

export { htmlModule, renderModule };
