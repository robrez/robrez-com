import fs from 'fs/promises';
import process from 'node:process';
import prettier from 'prettier';
import postcss from 'postcss';
import tailwind from '@tailwindcss/postcss';
import oklabFunction from '@csstools/postcss-oklab-function';
import { transform, composeVisitors } from 'lightningcss';

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
 * @param {string} packageId :
 * @param {string} moduleId :
 * @returns string
 */
async function asLitCssModule(packageId, moduleId) {
  const tpl = `
    import { appendModule } from '../css-module-util.js';
    import styles from './${moduleId}.js';

    const moduleId = '${packageId}/${moduleId}';
    appendModule(moduleId, styles);

    export default styles;
  `;
  return await prettify(tpl, {});
}

/**
 * Creates a lit css template wrapping the given css content string
 *
 * @param {string} content : css string;
 * @returns string
 */
async function asLitCss(content) {
  const tpl = `
    import { css } from 'lit-element';

    const styles = css\`
      ${content}
    \`

    export default styles;
    ;
  `;
  return await prettify(tpl, {});
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

/**
 * @typedef {import("lightningcss").Visitor} Visitor
 * @typedef {(input: string) => Promise<string>} AsyncStringTransformer
 */

/**
 * @type {Visitor}
 */
const layerFlattenVisitor = {
  Rule(rule) {
    if (rule.type === 'layer-block') {
      if (rule?.value?.name?.indexOf('theme') >= 0) {
        return rule.value.rules?.filter(r => r.type === 'style');
      }
      return [];
    }
    return [];
  }
};

/**
 * @type {Visitor}
 */
const propsOnlyVisitor = {
  Declaration(decl) {
    if (decl.property !== 'custom') {
      return [];
    }
    if (decl.value.name?.startsWith('--tw')) {
      return [];
    }
    return {
      ...decl,
      value: {
        ...decl.value,
        // name: decl.value.name.replace('--', '--rr-')
        name: decl.value.name.replace('--', '--')
      }
    };
  }
};

const scaleMap = {
  50: '950',
  100: '900',
  200: '800',
  300: '700',
  400: '600',
  500: '500',
  600: '400',
  700: '300',
  800: '200',
  900: '100',
  950: '50'
};

const colorNames = new Set();

function reverseColorScale(name) {
  const m = name.match(/^-.*-color-([a-z-]+)-(\d{2,3})$/);
  if (!m) return name;

  // this is a somewhat hacky side-effect to avoid parsing twice
  const colorName = m[1];
  colorNames.add(colorName);

  const oldScale = m[2];
  const newScale = scaleMap[oldScale];
  if (!newScale) return name;
  return name.replace(/-(\d{2,3})$/, '-' + newScale);
}

/**
 * @type {Visitor}
 */
const colorScaleReverseVisitor = {
  Declaration(decl) {
    return {
      ...decl,
      value: {
        ...decl.value,
        name: reverseColorScale(decl.value.name)
      }
    };
  }
};

async function colorDarkSelectorTransformer(content) {
  return content?.replace(':root, :host {', "[theme~='dark'], :host([theme~='dark']) {");
}

function selectorArray(selector) {
  if (Array.isArray(selector)) {
    return selector;
  }
  return [selector];
}

function isClass(selector) {
  return selector?.type === 'class';
}

function noTransformFilter(selector) {
  return selectorArray(selector).filter(selector => {
    const isClassSelector = isClass(selector);
    if (!isClassSelector) {
      return selector;
    }
    // removes unwanted transform rule
    return !`${selector.name}`.match(/^transform$/);
  });
}

async function twConcat(files) {
  const css = String.raw;
  let imports = files
    .map(
      file => css`
        @import '../.src/${file}.css';
      `
    )
    .join('\n');
  // @import '../.src/_props.css';
  const combinedCss = css`
    ${imports}
  `;
  const tmp = `./tmp/all.css`;
  await fs.mkdir('./tmp', { recursive: true });
  await fs.mkdir('./tmp/dummy', { recursive: true });
  await fs.writeFile(tmp, combinedCss, 'utf8');
  const content = await fs.readFile(tmp, 'utf8');
  const processor = postcss([
    tailwind({
      base: './tmp/dummy'
    }),
    oklabFunction({ preserve: false })
  ]);
  const result = await processor.process(content, {
    from: tmp
  });
  try {
    await fs.rmdir('./tmp/dummy');
    await fs.rm(tmp);
    await fs.rmdir('./tmp');
  } catch (e) {
    // couldn't rmdir, it's fine
  }
  return result;
}

/**
 *
 * @param {string[]} files
 * @param {string} propsName
 * @param {Visitor} visitor
 * @param {AsyncStringTransformer | undefined} customizer
 */
async function buildProps(files, propsName, visitor, customizer = undefined) {
  const result = await twConcat(files);
  const propsOnly = transform({
    code: Buffer.from(result.css),
    minify: false,
    analyzeDependencies: false,
    visitor: visitor
  });

  let propsCss = propsOnly?.code.toString();

  if (customizer) {
    propsCss = await customizer(propsCss);
  }

  const prettyPropsCss = await asCss(propsCss);

  await fs.mkdir('./src/props/', { recursive: true });
  await fs.writeFile(`./src/props/${propsName}.css`, prettyPropsCss, 'utf-8');

  const litCss = await asLitCss(propsCss);
  await fs.writeFile(`./src/props/${propsName}.ts`, litCss, 'utf-8');
  const litCssModule = await asLitCssModule('props', propsName);
  await fs.writeFile(`./src/props/${propsName}-module.ts`, litCssModule, 'utf-8');
  console.log('done', propsName);
}

async function build(inputPath, outputPath) {
  const css = await fs.readFile(inputPath, 'utf8');
  await fs.mkdir('./tmp/dummy', { recursive: true });
  const result = await postcss([
    tailwind({
      base: './tmp/dummy'
    })
  ]).process(css, {
    from: inputPath,
    to: outputPath
  });
  try {
    await fs.rmdir('./tmp/dummy');
  } catch (e) {
    // could not remove
  }

  const utilsResult = transform({
    filename: inputPath,
    code: Buffer.from(result.css),
    minify: false,
    analyzeDependencies: false,
    visitor: {
      Rule(rule) {
        if (rule.type === 'layer-block') {
          if (rule?.value?.name?.indexOf('utilities') >= 0) {
            return rule.value.rules;
          }
          return [];
        }
        return [];
      },
      Selector(selector) {
        return noTransformFilter(selector);
      },
      Declaration(decl) {
        if (decl.value?.name?.startsWith('--tw')) {
          // removes unwanted `--tw` rules and props
          return [];
        }
      }
    }
  });

  const utils = utilsResult?.code.toString();

  await fs.mkdir('./src/utils', { recursive: true });
  await fs.writeFile(outputPath, utils, 'utf8');
  console.log('build complete: ', inputPath, outputPath);
}

async function buildAll() {
  const propsVisitor = composeVisitors([propsOnlyVisitor, layerFlattenVisitor]);
  await buildProps(['color', 'bg-color', 'color-static'], 'color', propsVisitor);
  await buildProps(
    ['color', 'bg-color', 'color-dark-static'],
    'color-dark',
    composeVisitors([propsVisitor, colorScaleReverseVisitor]),
    colorDarkSelectorTransformer
  );
  await buildProps(['spacing'], 'spacing', propsVisitor);
  await buildProps(['typography'], 'typography', propsVisitor);
  const files = ['color', 'bg-color', 'spacing', 'typography'];
  for (const file of files) {
    const inputPath = `./.src/${file}.css`;
    const outputPath = `./src/utils/${file}.css`;
    await build(inputPath, outputPath);
  }
}

buildAll().catch(err => {
  console.error(err);
  process.exit(1);
});
