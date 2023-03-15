const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

/**
 *  @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 */
module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPassthroughCopy('src/docs.css');
  eleventyConfig.addPassthroughCopy('src/.nojekyll');

  /**
   * Considered copying w/ rollup
   */
  eleventyConfig.addPassthroughCopy({
    '../node_modules/prismjs/themes/prism-okaidia.css': 'prism-okaidia.css',
    './components/style/props/*.css': 'style/props/',
    './components/style/props-all.css': 'style/props-all.css',
    './components/style/utils/*.css': 'style/utils/',
    './components/style/utils-all.css': 'style/utils-all.css'
  });

  eleventyConfig.addCollection('blog', collectionsApi => {
    return [...collectionsApi.getFilteredByGlob('./src/blog/*.md')];
  });

  eleventyConfig.addCollection('home', collectionsApi => {
    return [...collectionsApi.getFilteredByGlob('./src/home/*.md')];
  });

  eleventyConfig.addCollection('sitenav', collectionsApi => {
    return collectionsApi.getFilteredByTags('_sitenav');
  });

  eleventyConfig.addCollection('resume', collectionsApi => {
    return [...collectionsApi.getFilteredByGlob('./src/resume/*.md')];
  });

  return {
    dir: {
      input: 'src',
      output: 'dist'
    },
    templateExtensionAliases: {
      '11ty.cjs': '11ty.js',
      '11tydata.cjs': '11tydata.js'
    }
  };
};
