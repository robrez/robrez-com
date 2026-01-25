import path from 'path';
import { rollupPluginHTML as html } from '@web/rollup-plugin-html';
import { polyfillsLoader } from '@web/rollup-plugin-polyfills-loader';
import { bundleAsync } from 'lightningcss';
import esbuild from 'rollup-plugin-esbuild';

/**
 * @typedef {import("rollup").RollupOptions} RollupOptions
 * @typedef {import("rollup").Plugin} Plugin
 * @typedef {import("rollup-plugin-copy").Target} Target
 * @typedef {import("lightningcss").TransformAttributeOptions} TransformAttributeOptions
 */

/**
 * @type {TransformAttributeOptions}
 */
const lightningOptions = {
  minify: true
  // todo consider using targets property
};

/**
 *
 * @param {TransformAttributeOptions} opts
 * @param {Uint8Array} content
 * @param {string} fileName
 * @returns {Uint8Array}
 */
async function lightningcssBundleCss(opts = {}) {
  if (!opts.filename?.endsWith('.css')) {
    return opts?.code;
  }

  const result = await bundleAsync({
    ...opts
  });

  return result.code ?? opts?.code;
}

/**
 * @type {RollupOptions}
 */
const config = {
  input: '**/*.html',
  output: {
    entryFileNames: '[name].[hash].hash.js',
    chunkFileNames: '[name].[hash].hash.js',
    assetFileNames: '[name].[hash].hash[extname]',
    dir: 'dist'
  },
  plugins: [
    html({
      rootDir: path.join(process.cwd(), 'dist-dev'),
      injectServiceWorker: false,
      flattenOutput: false,
      minify: true,
      extractAssets: true,
      transformAsset: async (content, filename) => {
        if (filename.endsWith('.css')) {
          return await lightningcssBundleCss({
            ...lightningOptions,
            filename: filename,
            code: content
          });
        }
        return content;
      }
    }),
    esbuild({
      minify: true,
      target: ['chrome64', 'firefox67', 'safari11.1']
    }),
    polyfillsLoader({
      polyfills: {
        webcomponents: true
      }
    })
  ]
};

export default config;
