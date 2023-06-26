const colorModule = require('./color.cjs');
const cssPropName = require('./helpers.cjs').cssPropName;

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
  sm: '0.75rem',
  md: '1rem',
  lg: '1.25rem',
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
  sm: ['0.875rem', { lineHeight: '1.25' }],
  md: ['1rem', { lineHeight: '1.5' }],
  lg: ['1.125rem', { lineHeight: '1.25' }],
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
    colors: colorModule.allColors,
    textColor: colorModule.allColors,
    spacing: spacingTheme.theme,
    fontSize: fontSizeTheme.theme
  },
  corePlugins: {
    preflight: false,
    textColor: false,
    backgroundAttachment: false,
    backgroundClip: false,
    backgroundPosition: false,
    backgroundImage: false,
    backgroundOrigin: false,
    backgroundRepeat: false,
    backgroundSize: false,
    backgroundColor: false,
    backgroundOpacity: false,
    backgroundBlendMode: false
  },
  experimental: {
    optimizeUniversalDefaults: true
  }
};

/** @type {import('tailwindcss').Config} */
const colorPropsConfig = {
  ...baseConfig,
  plugins: [colorModule.colorPropsPlugin]
};

/** @type {import('tailwindcss').Config} */
const colorPropsDarkConfig = {
  ...baseConfig,
  plugins: [colorModule.colorPropsDarkPlugin]
};

/** @type {import('tailwindcss').Config} */
const colorUtilPlugin = {
  ...baseConfig,
  plugins: [colorModule.colorUtilPlugin],
  safelist: [
    {
      pattern: /^color-/
    }
  ]
};
/** @type {import('tailwindcss').Config} */
const bgColorUtilPlugin = {
  ...baseConfig,
  plugins: [colorModule.bgColorUtilPlugin],
  safelist: [
    {
      pattern: /^bg-/
    }
  ]
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
      pattern: /^text-(xs|sm|md|lg|xl|[0-9]*xl|[0-9]*xs)/
    }
  ]
};

/** @type {import('tailwindcss').Config} */
const flexUtilsConfig = {
  ...baseConfig,
  corePlugins: {
    ...baseConfig.corePlugins,
    content: false
  },
  safelist: [
    {
      pattern: /^content-/
    },
    {
      pattern: /^flex$/
    },
    {
      pattern: /^inline-flex$/
    },
    {
      pattern: /^flex-/
    },
    {
      pattern: /^items-/
    },
    {
      pattern: /^justify-/
    },
    {
      pattern: /^self-/
    }
  ]
};

/** @type {import('tailwindcss').Config} */
const spacingUtilsConfig = {
  ...baseConfig,
  safelist: [
    {
      // m{t|r|b|l|x|y}-
      pattern: /^(m|m[trblxy]|-m|-m[trblxy])-/
    },
    {
      // p{t|r|b|l|x|y}-
      pattern: /^(p|p[trblxy])-/
    }
  ]
};

module.exports = {
  colorPropsConfig,
  colorPropsDarkConfig,
  colorUtilPlugin,
  bgColorUtilPlugin,
  typographyPropsConfig,
  spacingPropsConfig,
  typographyUtilsConfig,
  flexUtilsConfig,
  spacingUtilsConfig
};
