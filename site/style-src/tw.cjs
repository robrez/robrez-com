const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

//console.log('defaultTheme', defaultTheme.spacing);

const { lightBlue, warmGray, trueGray, coolGray, blueGray, ...keepColors } = colors;

function addMissingSemi(record, noop = true) {
  if (noop) {
    // note that this doesn't appear to be needed when
    // building via node... only via the tailwind cli
    return record;
  }
  const result = { ...record };
  //bug where last semi is missing, cheating by adding semi to last value
  const keys = Object.keys(result);
  const lastKey = keys[keys.length - 1];
  result[lastKey] = result[lastKey] + ';';
  return result;
}

function extractSpacingVars(data) {
  let sizes = {};
  Object.keys(data).forEach(spacing => {
    const propName = `--spacing-${spacing.replaceAll('.', '_')}`;
    const propValue = data[spacing];
    sizes = {
      ...sizes,
      ...{ [propName]: propValue }
    };
  });
  return addMissingSemi({
    ...sizes
  });
}

function extractSpacingTheme(data) {
  let sizes = {};
  Object.keys(data).forEach(spacing => {
    const propName = `--spacing-${spacing.replaceAll('.', '_')}`;
    sizes = {
      ...sizes,
      ...{ [spacing]: `var(${propName})` }
    };
  });
  return addMissingSemi({
    ...sizes
  });
}

const spacingTheme = extractSpacingTheme(defaultTheme.spacing);
const spacingProps = extractSpacingVars(defaultTheme.spacing);

function extractColorVars(_colorObj, _colorGroup = '') {
  function _extractColorVars(colorObj, colorGroup = '') {
    return Object.keys(colorObj).reduce((vars, colorKey) => {
      const value = colorObj[colorKey];

      const newVars =
        typeof value === 'string'
          ? { [`--color${colorGroup}-${colorKey}`]: value }
          : _extractColorVars(value, `-${colorKey}`);

      return { ...vars, ...newVars };
    }, {});
  }

  const result = addMissingSemi(_extractColorVars(_colorObj, _colorGroup));
  return result;
}

function extractFontVars(data) {
  let sizes = {};
  let lineHeights = {};
  Object.keys(data).forEach(font => {
    const fontData = data[font];
    const propName = `--font-size-${font}`;
    const propValue = fontData[0];
    sizes = {
      ...sizes,
      ...{ [propName]: propValue }
    };

    if (fontData.length > 1) {
      const lineHeight = fontData[1]?.lineHeight;
      if (lineHeight) {
        const lineHeightPropName = `--line-height-${font}`;
        lineHeights = {
          ...lineHeights,
          ...{ [lineHeightPropName]: lineHeight }
        };
      }
    }
  });
  return addMissingSemi({
    ...sizes,
    ...lineHeights
  });
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    colors: keepColors,
    spacing: spacingTheme
  },
  corePlugins: {
    preflight: false
  },
  experimental: {
    optimizeUniversalDefaults: true
  },
  safelist: [
    'justify-start',
    {
      pattern: /^justify-/
    },
    {
      // m{t|r|b|l}-
      pattern: /^(m|m[trbl]|-m|-m[trbl])-/
    }
  ],
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        ':root': extractColorVars(theme('colors'))
      });
      addBase({
        ':root': extractFontVars(theme('fontSize'))
      });
      addBase({
        ':root': spacingProps
      });
    }
  ]
};
