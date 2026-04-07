import fs from 'fs/promises';
import process from 'node:process';
import prettier from 'prettier';
import { PurgeCSS } from 'purgecss';

/**
 * Formats given content string according to prettier configuation
 * @param {string} content : ;
 * @param {import('prettier').Config} config
 * @returns
 */
async function prettify(content, config = {}) {
  const prettierConfig = await prettier.resolveConfig('./');
  const cfg = {
    parser: 'babel',
    ...prettierConfig,
    ...config
  };
  return prettier.format(content, cfg);
}

/**
 * Creates a lit css template wrapping the given css content string
 *
 * @param {string} content : css string;
 * @returns string
 */
async function asCss(content) {
  return await prettify(content, { parser: 'css' });
}

async function buildAll() {
  const purgeCSSResults = await new PurgeCSS().purge({
    content: ['./src/**', '../node_modules/@robrez-com/app-layout/src/styles.ts'],
    css: [
      '../node_modules/@robrez-com/style/src/props/color.css',
      '../node_modules/@robrez-com/style/src/props/color-dark.css',
      '../node_modules/@robrez-com/style/src/props/spacing.css',
      '../node_modules/@robrez-com/style/src/props/typography.css',
      '../node_modules/@robrez-com/style/src/utils/*.css'
    ],
    // allow for tw "variant:rule" syntax
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    safelist: {
      standard: [
        //
        /:host/
      ]
    }
  });
  const blah = purgeCSSResults.map(item => item.css).join('\n\n');
  const prettyUtilsCss = await asCss(blah);
  await fs.mkdir('./dist-css', { recursive: true });
  await fs.writeFile(`./dist-css/purgecss.css`, prettyUtilsCss, 'utf-8');
  console.log('purgecss complete');
}

buildAll().catch(err => {
  console.error(err);
  process.exit(1);
});
