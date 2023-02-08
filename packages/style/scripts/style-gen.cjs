const fs = require('fs');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const prettier = require('prettier');
const tailwindConfig = require('./tw.cjs');

const prettierConfigFile = prettier.resolveConfigFile.sync('./');
const prettierConfig = prettier.resolveConfig.sync(prettierConfigFile);

/**
 * Formats given content string according to prettier configuation
 * @param {string} content : ;
 * @param {import('prettier').Config} config
 * @returns
 */
const prettify = (content, config = {}) => {
  const cfg = {
    parser: 'babel',
    ...prettierConfig,
    ...config
  };
  return prettier.format(content, cfg);
};

/**
 * Creates a lit css template wrapping the given css content string
 *
 * @param {string} packageId :
 * @param {string} moduleId :
 * @returns string
 */
const asLitCssModule = (packageId, moduleId) => {
  const tpl = `
    import { appendModule } from '../css-module-util.js';
    import styles from './${moduleId}.js';

    const moduleId = '${packageId}/${moduleId}';
    appendModule(moduleId, styles);

    export default styles;
  `;
  return prettify(tpl, {});
};

/**
 * Creates a lit css template wrapping the given css content string
 *
 * @param {string} content : css string;
 * @returns string
 */
const asLitCss = content => {
  const tpl = `
    import { css } from 'lit-element';

    const styles = css\`
      ${content}
    \`

    export default styles;
    ;
  `;
  return prettify(tpl, {});
};

/**
 * Creates a lit css template wrapping the given css content string
 *
 * @param {string} content : css string;
 * @returns string
 */
const asCss = content => {
  return prettify(content, { parser: 'css' });
};

const genericInputCss = `./scripts/input.css`;
const baseOutDir = `./src`;

const props = [
  {
    package: 'props',
    name: 'color',
    input: genericInputCss,
    tailwindConfig: tailwindConfig.colorPropsConfig
  },
  {
    package: 'props',
    name: 'color-dark',
    input: genericInputCss,
    tailwindConfig: tailwindConfig.colorPropsDarkConfig
  },
  {
    package: 'props',
    name: 'typography',
    input: genericInputCss,
    tailwindConfig: tailwindConfig.typographyPropsConfig
  },
  {
    package: 'props',
    name: 'spacing',
    input: genericInputCss,
    tailwindConfig: tailwindConfig.spacingPropsConfig
  },
  {
    package: 'utils',
    name: 'color',
    input: genericInputCss,
    tailwindConfig: tailwindConfig.colorUtilPlugin
  },
  {
    package: 'utils',
    name: 'bg-color',
    input: genericInputCss,
    tailwindConfig: tailwindConfig.bgColorUtilPlugin
  },
  {
    package: 'utils',
    name: 'typography',
    input: genericInputCss,
    tailwindConfig: tailwindConfig.typographyUtilsConfig
  },
  {
    package: 'utils',
    name: 'spacing',
    input: genericInputCss,
    tailwindConfig: tailwindConfig.spacingUtilsConfig
  },
  {
    package: 'utils',
    name: 'flex',
    input: genericInputCss,
    tailwindConfig: tailwindConfig.flexUtilsConfig
  }
].map(original => {
  const result = {
    outDir: `${baseOutDir}/${original.package}`,
    ...original
  };
  return result;
});

async function processProp(prop) {
  const css = fs.readFileSync(prop.input);
  const processor = await postcss([tailwindcss(prop.tailwindConfig)]);
  const result = await processor.process(css, {});

  const tsStyles = asLitCss(result.css);
  fs.mkdirSync(prop.outDir, { recursive: true });
  fs.writeFileSync(`${prop.outDir}/${prop.name}.ts`, tsStyles, { encoding: 'utf-8' });

  const tsModuleStyles = asLitCssModule(prop.package, prop.name);
  fs.mkdirSync(prop.outDir, { recursive: true });
  fs.writeFileSync(`${prop.outDir}/${prop.name}-module.ts`, tsModuleStyles, { encoding: 'utf-8' });

  const cssStyles = asCss(result.css);
  fs.mkdirSync(prop.outDir, { recursive: true });
  fs.writeFileSync(`${prop.outDir}/${prop.name}.css`, cssStyles, { encoding: 'utf-8' });
}

props.forEach(prop => {
  processProp(prop);
});
