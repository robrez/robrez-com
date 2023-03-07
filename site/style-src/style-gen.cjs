//const path = require('path');
const fs = require('fs');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const prettier = require('prettier');
const tailwindConfig = require('./tw.cjs');

const prettierConfigFile = prettier.resolveConfigFile.sync('./');
const prettierConfig = prettier.resolveConfig.sync(prettierConfigFile);

const prettify = (content, config = {}) => {
  const cfg = {
    parser: 'babel',
    ...prettierConfig,
    ...config
  };
  return prettier.format(content, cfg);
};

fs.readFile('./style-src/input.css', async (err, css) => {
  const processor = await postcss([tailwindcss(tailwindConfig)]);
  const result = await processor.process(css, {});
  console.log(prettify(result.css, { parser: 'css' }));
});
//postcss([autoprefixer, postcssNested])
//.process(css, { from: 'src/app.css', to: 'dest/app.css' })
//.then(result => {
//fs.writeFile('dest/app.css', result.css, () => true);
//if (result.map) {
//fs.writeFile('dest/app.css.map', result.map.toString(), () => true);
//}
//});
//});
