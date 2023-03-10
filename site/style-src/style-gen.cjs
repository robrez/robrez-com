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

const genericInputCss = `./style-src/input.css`;
const baseOutDir = `./components/style`;

const props = [
  {
    outDir: `${baseOutDir}/props`,
    name: 'color',
    input: genericInputCss,
    tailwindConfig: tailwindConfig.colorPropsConfig
  },
  {
    outDir: `${baseOutDir}/props`,
    name: 'color-dark',
    input: genericInputCss,
    tailwindConfig: tailwindConfig.colorPropsDarkConfig
  },
  {
    outDir: `${baseOutDir}/props`,
    name: 'typography',
    input: genericInputCss,
    tailwindConfig: tailwindConfig.typographyPropsConfig
  },
  {
    outDir: `${baseOutDir}/props`,
    name: 'spacing',
    input: genericInputCss,
    tailwindConfig: tailwindConfig.spacingPropsConfig
  },
  {
    outDir: `${baseOutDir}/utils`,
    name: 'typography',
    input: genericInputCss,
    tailwindConfig: tailwindConfig.typographyUtilsConfig
  },
  {
    outDir: `${baseOutDir}/utils`,
    name: 'spacing',
    input: genericInputCss,
    tailwindConfig: tailwindConfig.spacingUtilsConfig
  },
  {
    outDir: `${baseOutDir}/utils`,
    name: 'flex',
    input: genericInputCss,
    tailwindConfig: tailwindConfig.flexUtilsConfig
  }
];

async function processProp(prop) {
  const css = fs.readFileSync(prop.input);
  const processor = await postcss([tailwindcss(prop.tailwindConfig)]);
  const result = await processor.process(css, {});
  const tsStyles = asLitCss(result.css, { parser: 'css' });
  fs.mkdirSync(prop.outDir, { recursive: true });
  fs.writeFileSync(`${prop.outDir}/${prop.name}.ts`, tsStyles, { encoding: 'utf-8' });
}

props.forEach(prop => {
  processProp(prop);
});
