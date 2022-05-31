// previously had this all in a declared module, typescript compiled it fine
// but vs code kept on being unable to find the declarations, which was getting annoying

/**
 * https://www.11ty.dev/docs/data-eleventy-supplied/#page-variable
 */
export type Page = {
  // URL can be used in <a href> to link to other templates
  // Note: This value will be `false` if `permalink` is set to `false`.
  url: string;

  // For permalinks: inputPath filename minus template file extension
  fileSlug: string;

  // For permalinks: inputPath minus template file extension
  filePathStem: string;

  // JS Date Object for current page (used to sort collections)
  date: Date;

  // The path to the original source file for the template
  // Note: this will include your input directory path!
  inputPath: string;

  // Depends on your output directory (the default is _site)
  // You probably won’t use this: `url` is better.
  // Note: This value will be `false` if `permalink` is set to `false`.
  outputPath: string;

  // Added in 1.0
  // Useful with `page.filePathStem` when using custom file extensions.
  outputFileExtension: string;

  // Available in 2.0 with the i18n plugin
  // The default is the value of `defaultLanguage` passed to the i18n plugin
  lang?: string;
};

export type Collections = {
  all: CollectionItem[];
  [key: string]: CollectionItem[];
};

export type CollectionItemData = {
  title: string;
  tags: string[];
  description: string;
  name: string;
  [key: string]: unknown;
};

/**
 * https://www.11ty.dev/docs/collections/#collection-item-data-structure
 */
export type CollectionItem = {
  // everything in Eleventy’s supplied page variable for this template (including inputPath, url, date, and others)
  page: Page;

  url: string;

  // all data for this piece of content (includes any data inherited from layouts)
  // note the spec above says this exists but doesn't seem to (yet at least)
  // the properties _also_ seem to be spread directly into the Item data
  data: CollectionItemData;

  // the rendered content of this template. This does not include layout wrappers
  content: string;

  layoutContent: string;
} & CollectionItemData;

// Read more about their `process.env` counterparts below
export type EleventyEnv = {
  // Absolute path to the directory in which
  // you’ve run the Eleventy command.
  root: string;

  // Absolute path to the current config file
  config: string;

  // The method, either `cli` or `script`
  source: string;

  isServerless: boolean;
};

export type EleventyServerless = {
  // An object containing the values from any Dynamic URL
  //   slugs from Serverless paths
  // e.g. A slug for /path/:id/ and a URL for /path/1/
  //   would give { id: 1 }
  path: { [key: string]: unknown };

  // The `event.queryStringParameters` received from the
  // serverless function. Note these are not available in
  // Netlify On-demand Builders
  // e.g. ?id=1 would be { id: 1 }
  query: { [key: string]: unknown };
};

/**
 * https://www.11ty.dev/docs/data-eleventy-supplied/#eleventy-variable
 */
export type Eleventy = {
  version: string;

  // For use with `<meta name="generator">`
  generator: string;

  env: EleventyEnv;

  serverless: EleventyServerless;
};

/**
 * package.json spec
 */
export type EleventyPkg = {
  name: string;
  description: string;
  author: string;
  version: string;
  type: string;
  module: string;
  main: string;
  scripts: { [key: string]: string };
  dependencies: { [key: string]: string };
  devDependencies: { [key: string]: string };
  [key: string]: unknown;
};

export type RenderData = {
  collections: Collections;
  eleventy: Eleventy;
  pkg: EleventyPkg;
} & CollectionItem;
