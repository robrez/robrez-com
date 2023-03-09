const colors = require('tailwindcss/colors');
// const defaultTheme = require('tailwindcss/defaultTheme');
const Color = require('color');

function computeContrast(colorStr, white = colors.white, black = colors.black) {
  const color = new Color(colorStr);
  return color.isDark() ? white : black;
}

function computeInvertedContrast(colorStr, white = colors.white, black = colors.black) {
  const color = new Color(colorStr);
  return color.isLight() ? white : black;
}

function computePalette(palette, base = '500') {
  return {
    ...palette,
    contrast: computeContrast(palette[base]),
    contrastx: computeInvertedContrast(palette[base])
  };
}

const coreColorPrimitives = {
  inherit: colors.inherit,
  current: colors.current,
  transparent: colors.transparent,
  black: colors.black,
  white: colors.white
};

const colorPalettes = {
  slate: computePalette(colors.slate),
  neutral: computePalette(colors.neutral),
  red: computePalette(colors.red),
  orange: computePalette(colors.orange),
  yellow: computePalette(colors.yellow),
  green: computePalette(colors.green),
  teal: computePalette(colors.teal),
  sky: computePalette(colors.sky),
  blue: computePalette(colors.blue),
  indigo: computePalette(colors.indigo),
  violet: computePalette(colors.violet),
  pink: computePalette(colors.pink)
};

const emotiveColors = {
  primary: colorPalettes.blue,
  success: colorPalettes.green,
  danger: colorPalettes.red,
  warning: colorPalettes.yellow,
  info: colorPalettes.teal
};

const allColors = {
  ...coreColorPrimitives,
  ...colorPalettes,
  ...emotiveColors
};

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

const spacing = {
  px: '1px',
  0: '0',
  '3xs': '0.125rem',
  '2xs': '0.25rem',
  xs: '0.5rem',
  s: '0.75rem',
  m: '1rem',
  l: '1.25rem',
  xl: '1.5rem',
  '2xl': '2rem',
  '3xl': '2.5rem',
  '4xl': '3rem'
};

const spacingTheme = extractSpacingTheme(spacing);

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

const fontSize = {
  '3xs': ['0.5rem', { lineHeight: '1' }],
  '2xs': ['0.625rem', { lineHeight: '1' }],
  xs: ['0.75rem', { lineHeight: '1' }],
  s: ['0.875rem', { lineHeight: '1.25' }],
  m: ['1rem', { lineHeight: '1.5' }],
  l: ['1.125rem', { lineHeight: '1.25' }],
  xl: ['1.25rem', { lineHeight: '1.25' }],
  '2xl': ['1.5rem', { lineHeight: '1' }],
  '3xl': ['2rem', { lineHeight: '1' }],
  '4xl': ['2.25rem', { lineHeight: '1' }]
};
const fontSizeTheme = extractFontTheme(fontSize);

const typographyPropsPlugin = ({ addBase }) => {
  addBase({
    ':root': fontSizeTheme.props
  });
};

/** @type {import('tailwindcss').Config} */
const baseConfig = {
  theme: {
    colors: allColors,
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
    },
    {
      // p{t|r|b|l}-
      pattern: /^(p|p[trbl])-/
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
