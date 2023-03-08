const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');
const { lightBlue, warmGray, trueGray, coolGray, blueGray, ...keepColors } = colors;

/**
 *
 * @param {string} propName
 * @returns
 */
function cssPropName(propName) {
  const prefix = 'rr-';
  const cleanPropName = propName.replaceAll(/^--/g, '').replaceAll('.', '_');
  return `--${prefix}${cleanPropName}`;
}

/**
 *
 * @param {import('tailwindcss/defaultTheme').spacing} data
 * @returns
 */
function extractSpacingTheme(data) {
  let theme = {};
  let props = {};
  Object.keys(data).forEach(spacing => {
    const propName = cssPropName(`--spacing-${spacing}`);
    const propValue = data[spacing];
    theme = {
      ...theme,
      ...{ [spacing]: `var(${propName})` }
    };
    props = {
      ...props,
      ...{ [propName]: propValue }
    };
  });
  return {
    props,
    theme
  };
}
const spacingTheme = extractSpacingTheme(defaultTheme.spacing);

const spacingPropsPlugin = ({ addBase }) => {
  addBase({
    ':root': spacingTheme.props
  });
};

function extractColorVars(_colorObj, _colorGroup = '') {
  function _extractColorVars(colorObj, colorGroup = '') {
    return Object.keys(colorObj).reduce((vars, colorKey) => {
      const value = colorObj[colorKey];
      const propName = cssPropName(`--color${colorGroup}-${colorKey}`);
      const newVars = typeof value === 'string' ? { [propName]: value } : _extractColorVars(value, `-${colorKey}`);
      return { ...vars, ...newVars };
    }, {});
  }
  const result = _extractColorVars(_colorObj, _colorGroup);
  return result;
}

const colorPropsPlugin = ({ addBase, theme }) => {
  addBase({
    ':root': extractColorVars(theme('colors'))
  });
};

/**
 *
 * @param {import('tailwindcss/defaultTheme').fontSize} data
 * @returns
 */
function extractFontTheme(data) {
  let sizeProps = {};
  let lineHeightProps = {};
  let fontSizeThemes = {};
  Object.keys(data).forEach(font => {
    const fontData = data[font];
    const propName = cssPropName(`--font-size-${font}`);
    const propValue = fontData[0];
    let themeVals = [`var(${propName})`];
    sizeProps = {
      ...sizeProps,
      ...{ [propName]: propValue }
    };
    if (fontData.length > 1) {
      const lineHeight = fontData[1]?.lineHeight;
      if (lineHeight) {
        const lineHeightPropName = cssPropName(`--line-height-${font}`);
        themeVals = [...themeVals, { lineHeight: `var(${lineHeightPropName})` }];
        lineHeightProps = {
          ...lineHeightProps,
          ...{ [lineHeightPropName]: lineHeight }
        };
      }
    }
    fontSizeThemes = {
      ...fontSizeThemes,
      ...{ [font]: themeVals }
    };
  });
  return {
    props: {
      ...sizeProps,
      ...lineHeightProps
    },
    theme: fontSizeThemes
  };
}
const fontSizeTheme = extractFontTheme(defaultTheme.fontSize);

const typographyPropsPlugin = ({ addBase }) => {
  addBase({
    ':root': fontSizeTheme.props
  });
};

/** @type {import('tailwindcss').Config} */
const baseConfig = {
  theme: {
    colors: keepColors,
    spacing: spacingTheme.theme,
    fontSize: fontSizeTheme.theme
  },
  corePlugins: {
    preflight: false
  },
  experimental: {
    optimizeUniversalDefaults: true
  }
};

/** @type {import('tailwindcss').Config} */
const colorPropsConfig = {
  ...baseConfig,
  plugins: [colorPropsPlugin]
};

/** @type {import('tailwindcss').Config} */
const typographyPropsConfig = {
  ...baseConfig,
  plugins: [typographyPropsPlugin]
};

/** @type {import('tailwindcss').Config} */
const spacingPropsConfig = {
  ...baseConfig,
  plugins: [spacingPropsPlugin]
};

/** @type {import('tailwindcss').Config} */
const typographyUtilsConfig = {
  ...baseConfig,
  safelist: [
    {
      pattern: /^text-(xs|sm|base|lg|xl|[0-9]*xl)/
    }
  ]
};

/** @type {import('tailwindcss').Config} */
const flexUtilsConfig = {
  ...baseConfig,
  safelist: [
    {
      pattern: /^justify-/
    }
  ]
};

/** @type {import('tailwindcss').Config} */
const spacingUtilsConfig = {
  ...baseConfig,
  safelist: [
    {
      // m{t|r|b|l}-
      pattern: /^(m|m[trbl]|-m|-m[trbl])-/
    }
  ]
};

module.exports = {
  colorPropsConfig,
  typographyPropsConfig,
  spacingPropsConfig,
  typographyUtilsConfig,
  flexUtilsConfig,
  spacingUtilsConfig
};
