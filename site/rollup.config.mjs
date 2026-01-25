import copy from 'rollup-plugin-copy';
import minifyHTML from '@lit-labs/rollup-plugin-minify-html-literals';
import resolve from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';

/**
 * @typedef {import("rollup").RollupOptions} RollupOptions
 * @typedef {import("rollup").Plugin} Plugin
 * @typedef {import("rollup-plugin-copy").Target} Target
 */

// note that copying assets can also be handled in `.eleventy.cjs`
// this is a viable alternative

/**
 * @type {Target[]}
 */
const copyTargets = [
  {
    src: `./src/images`,
    dest: `dist-dev/`
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
 * @type {RollupOptions[]}
 */
const config = [
  {
    input: 'src/index.js',
    output: {
      file: 'dist-dev/_dummy.js',
      format: 'esm'
    },
    plugins: [
      copyPlugin //
    ]
  },
  {
    input: 'components/index.js',
    output: {
      file: 'dist-dev/components.bundled.js',
      format: 'esm'
    },
    plugins: [
      resolve(),
      minifyHTML(),
      esbuild({
        minify: true,
        legalComments: 'eof',
        target: ['chrome64', 'firefox67', 'safari11.1']
      })
    ]
  }
];

export default config;
