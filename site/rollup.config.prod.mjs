import copy from 'rollup-plugin-copy';
import { rollupPluginHTML as html } from '@web/rollup-plugin-html';
import { polyfillsLoader } from '@web/rollup-plugin-polyfills-loader';
import path from 'path';

/**
 * @typedef {import("rollup").RollupOptions} RollupOptions
 * @typedef {import("rollup").Plugin} Plugin
 * @typedef {import("rollup-plugin-copy").Target} Target
 */

/**
 * @type {Target[]}
 */
const copyTargets = [
  {
    src: `./dist-dev/style/src`,
    dest: `dist/style`
  }
];

/**
 * @type {Plugin}
 */
const copyPlugin = copy({
  verbose: true,
  targets: copyTargets,
  flatten: true,
  dereference: true
});

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
    copyPlugin,
    html({
      rootDir: path.join(process.cwd(), 'dist-dev'),
      flattenOutput: false,
      minify: true
    }),
    polyfillsLoader({
      polyfills: {
        webcomponents: true
      }
    })
  ]
};

export default config;
