// gen.js
import fs from "fs/promises";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";
import oklabFunction from "@csstools/postcss-oklab-function";
import { transform, composeVisitors } from "lightningcss";

/**
 * @typedef {import("lightningcss").Visitor} Visitor
 * @typedef {(input: string) => Promise<string>} AsyncStringTransformer
 */

/**
 * @type {Visitor}
 */
const layerFlattenVisitor = {
  Rule(rule) {
    if (rule.type === "layer-block") {
      if (rule?.value?.name?.indexOf("theme") >= 0) {
        return rule.value.rules;
      }
      return [];
    }
    return [];
  },
};

/**
 * @type {Visitor}
 */
const propsOnlyVisitor = {
  Declaration(decl) {
    if (decl.property !== "custom") {
      return [];
    }
    if (decl.value.name?.startsWith("--tw")) {
      return [];
    }
    return {
      ...decl,
      value: {
        ...decl.value,
        name: decl.value.name.replace("--", "--rr-"),
      },
    };
  },
};

const scaleMap = {
  50: "950",
  100: "900",
  200: "800",
  300: "700",
  400: "600",
  500: "500",
  600: "400",
  700: "300",
  800: "200",
  900: "100",
  950: "50",
};

const colorNames = new Set();

function reverseColorScale(name) {
  // matches --rr-color-red-500
  const m = name.match(/--.*-color-([a-z-]+)-(\d{2,3})$/);
  if (!m) return name;

  // this is a somewhat hacky side-effect to avoid parsing twice
  const colorName = m[1];
  colorNames.add(colorName);

  const oldScale = m[2];
  const newScale = scaleMap[oldScale];
  if (!newScale) return name;
  return name.replace(/-(\d{2,3})$/, "-" + newScale);
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
        name: reverseColorScale(decl.value.name),
      },
    };
  },
};

async function colorDarkSelectorTransformer(content) {
  return content?.replace(
    ":root, :host {",
    "[theme~='dark'], :host([theme~='dark']) {",
  );
}

// const files = ["system", "spacing", "typography"];

function selectorArray(selector) {
  if (Array.isArray(selector)) {
    return selector;
  }
  return [selector];
}

function isClass(selector) {
  return selector?.type === "class";
}

function noTransformFilter(selector) {
  return selectorArray(selector).filter((selector) => {
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
      (file) => css`
        @import "../src/${file}.css";
      `,
    )
    .join("\n");
  const combinedCss = css`
    @import "../src/_props.css";

    ${imports}
  `;
  const tmp = `./tmp/all.css`;
  await fs.mkdir("./tmp", { recursive: true });
  await fs.writeFile(tmp, combinedCss, "utf8");
  const content = await fs.readFile(tmp, "utf8");
  const result = await postcss([
    tailwind(),
    oklabFunction({ preserve: false }),
  ]).process(content, {
    from: tmp,
  });
  await fs.rm(tmp);
  try {
    await fs.rmdir("./tmp");
  } catch (e) {}
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
    visitor: visitor,
  });

  let propsCss = propsOnly?.code.toString();

  if (customizer) {
    propsCss = await customizer(propsCss);
  }

  await fs.mkdir("./dist/props/", { recursive: true });
  await fs.writeFile(`./dist/props/${propsName}.css`, propsCss, "utf-8");
  console.log("done");
}

async function build(inputPath, outputPath) {
  const css = await fs.readFile(inputPath, "utf8");
  const result = await postcss([tailwind()]).process(css, {
    from: inputPath,
    to: outputPath,
  });

  const utilsResult = transform({
    filename: inputPath,
    code: Buffer.from(result.css),
    minify: false,
    analyzeDependencies: false,
    visitor: {
      Rule(rule) {
        if (rule.type === "layer-block") {
          if (rule?.value?.name?.indexOf("utilities") >= 0) {
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
        if (decl.value?.name?.startsWith("--tw")) {
          // removes unwanted `--tw` rules and props
          return [];
        }
      },
    },
  });

  const utils = utilsResult?.code.toString();

  await fs.mkdir("./dist/utils", { recursive: true });
  await fs.writeFile(outputPath, utils, "utf8");
  console.log("build complete: ", inputPath, outputPath);
}

async function buildAll() {
  const propsVisitor = composeVisitors([propsOnlyVisitor, layerFlattenVisitor]);
  await buildProps(["spacing"], "spacing", propsVisitor);
  await buildProps(["typography"], "typography", propsVisitor);
  await buildProps(
    ["color", "bg-color", "color-static"],
    "color",
    propsVisitor,
  );
  await buildProps(
    ["color", "bg-color", "color-dark-static"],
    "color-dark",
    composeVisitors([propsVisitor, colorScaleReverseVisitor]),
    colorDarkSelectorTransformer,
  );
  const files = ["color", "bg-color", "spacing", "typography"];
  for (const file of files) {
    const inputPath = `./src/${file}.css`;
    const outputPath = `./dist/utils/${file}.css`;
    await build(inputPath, outputPath);
  }
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
