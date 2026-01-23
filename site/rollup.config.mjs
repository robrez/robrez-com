import copy from 'rollup-plugin-copy';
import resolve from '@rollup/plugin-node-resolve';

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
    plugins: [resolve()]
  }
];

export default config;
