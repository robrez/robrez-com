import type { RollupOptions, Plugin } from 'rollup';
import type { Target } from 'rollup-plugin-copy';
import copy from 'rollup-plugin-copy';
import resolve from '@rollup/plugin-node-resolve';

// note that copying assets can also be handled in `.eleventy.cjs`
// this is a viable alternative
const copyTargets: Target[] = [
  {
    src: `../node_modules/@webcomponents/webcomponentsjs`,
    dest: `dist/modules/@webcomponents`
  },
  {
    src: `../node_modules/lit/polyfill-support.js`,
    dest: `dist/modules/lit/`
  }
];
const copyPlugin: Plugin = copy({
  verbose: true,
  targets: copyTargets,
  flatten: true,
  dereference: true
});

const config: RollupOptions[] = [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/_dummy.js',
      format: 'esm'
    },
    plugins: [
      copyPlugin //
    ]
  },
  {
    input: 'components/index.js',
    output: {
      file: 'dist/components.bundled.js',
      format: 'esm'
    },
    plugins: [resolve()]
  }
];

export default config;
