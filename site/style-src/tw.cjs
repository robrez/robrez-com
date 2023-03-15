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
  let result = {
    ...palette
  };
  if (!result.DEFAULT) {
    result.DEFAULT = palette[base];
  }
  result = {
    ...result,
    contrast: computeContrast(palette.DEFAULT),
    contrastx: computeInvertedContrast(palette.DEFAULT)
  };
  if (!result['950']) {
    const c = new Color(result['900']);
    result['950'] = c.darken(0.2).hex();
  }
  return result;
}

function computePaletteDark(_palette, base = '500') {
  const palette = computePalette(_palette, base);
  const numericKeys = Object.keys(palette)
    .filter(k => {
      try {
        const kInt = parseInt(k, 10);
        return Number.isInteger(kInt);
      } catch (e) {
        return false;
      }
    })
    .map(k => parseInt(k))
    .sort((a, b) => a - b);
  let result = { ...palette };
  const reverseNumericKeys = [...numericKeys].reverse();
  numericKeys.forEach((key, index) => {
    const reverseKey = reverseNumericKeys[index];
    result[`${key}`] = palette[`${reverseKey}`];
  });

  return result;
}

const shade = {
  DEFAULT: 'rgba(0, 0, 0)',
  900: 'rgba(0, 0, 0, 0.9)',
  800: 'rgba(0, 0, 0, 0.8)',
  700: 'rgba(0, 0, 0, 0.7)',
  600: 'rgba(0, 0, 0, 0.6)',
  500: 'rgba(0, 0, 0, 0.5)',
  400: 'rgba(0, 0, 0, 0.4)',
  300: 'rgba(0, 0, 0, 0.3)',
  200: 'rgba(0, 0, 0, 0.2)',
  100: 'rgba(0, 0, 0, 0.1)',
  50: 'rgba(0, 0, 0, 0.05)'
};

const tint = {
  DEFAULT: 'rgba(255, 255, 255)',
  900: 'rgba(255, 255, 255, 0.9)',
  800: 'rgba(255, 255, 255, 0.8)',
  700: 'rgba(255, 255, 255, 0.7)',
  600: 'rgba(255, 255, 255, 0.6)',
  500: 'rgba(255, 255, 255, 0.5)',
  400: 'rgba(255, 255, 255, 0.4)',
  300: 'rgba(255, 255, 255, 0.3)',
  200: 'rgba(255, 255, 255, 0.2)',
  100: 'rgba(255, 255, 255, 0.1)',
  50: 'rgba(255, 255, 255, 0.05)'
};

const contrast = {
  ...shade
};

const coreColorPrimitives = {
  inherit: colors.inherit,
  current: colors.current,
  transparent: colors.transparent,
  black: colors.black,
  white: colors.white,
  shade: shade,
  tint: tint,
  contrast: contrast
};

const colorPalettes = {
  slate: computePalette(colors.slate),
  gray: computePalette(colors.gray),
  zinc: computePalette(colors.zinc),
  neutral: computePalette(colors.neutral),
  stone: computePalette(colors.stone),
  red: computePalette(colors.red),
  orange: computePalette(colors.orange),
  amber: computePalette(colors.amber),
  yellow: computePalette(colors.yellow),
  lime: computePalette(colors.lime),
  green: computePalette(colors.green),
  emerald: computePalette(colors.emerald),
  teal: computePalette(colors.teal),
  cyan: computePalette(colors.cyan),
  sky: computePalette(colors.sky),
  blue: computePalette(colors.blue),
  indigo: computePalette(colors.indigo),
  violet: computePalette(colors.violet),
  purple: computePalette(colors.purple),
  fuscia: computePalette(colors.fuchsia),
  pink: computePalette(colors.pink),
  rose: computePalette(colors.rose)
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

const coreColorPrimitivesDark = {
  contrast: tint
};

const colorPalettesDark = {
  slate: computePaletteDark(colors.slate),
  gray: computePaletteDark(colors.gray),
  zinc: computePaletteDark(colors.zinc),
  stone: computePaletteDark(colors.stone),
  neutral: computePaletteDark(colors.neutral),
  red: computePaletteDark(colors.red),
  orange: computePaletteDark(colors.orange),
  yellow: computePaletteDark(colors.yellow),
  green: computePaletteDark(colors.green),
  teal: computePaletteDark(colors.teal),
  sky: computePaletteDark(colors.sky),
  blue: computePaletteDark(colors.blue),
  indigo: computePaletteDark(colors.indigo),
  violet: computePaletteDark(colors.violet),
  pink: computePaletteDark(colors.pink)
};

const emotiveColorsDark = {
  primary: colorPalettesDark.blue,
  success: colorPalettesDark.green,
  danger: colorPalettesDark.red,
  warning: colorPalettesDark.yellow,
  info: colorPalettesDark.teal
};

const allColorsDark = {
  ...coreColorPrimitivesDark,
  ...colorPalettesDark,
  ...emotiveColorsDark
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
    const propName = cssPropName(`--space-${spacing}`);
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
      const colorKeyModifier = colorKey.toLowerCase() === 'default' ? '' : `-${colorKey}`;
      const propName = cssPropName(`--color${colorGroup}${colorKeyModifier}`);
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

const colorPropsDarkPlugin = ({ addBase }) => {
  addBase({
    '.rr-theme-dark, :host([theme~="dark"])': extractColorVars(allColorsDark)
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
const colorPropsDarkConfig = {
  ...baseConfig,
  plugins: [colorPropsDarkPlugin]
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
  colorPropsDarkConfig,
  typographyPropsConfig,
  spacingPropsConfig,
  typographyUtilsConfig,
  flexUtilsConfig,
  spacingUtilsConfig
};
