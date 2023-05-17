const colors = require('tailwindcss/colors');
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default;
const Color = require('color');
const cssPropName = require('./helpers.cjs').cssPropName;

function computeContrast(colorStr, white = colors.white, black = colors.black) {
  const color = new Color(colorStr);
  return color.isDark() ? white : black;
}

function computeInvertedContrast(colorStr, white = colors.white, black = colors.black) {
  const color = new Color(colorStr);
  return color.isLight() ? white : black;
}

function extractColorVars(_colorObj, _colorGroup = '') {
  function _extractColorVars(colorObj, colorGroup = '') {
    return Object.keys(colorObj).reduce((vars, colorKey) => {
      const value = colorObj[colorKey];
      const colorKeyModifier = colorKey.toUpperCase() === 'DEFAULT' ? '' : `-${colorKey}`;
      const propName = cssPropName(`--color${colorGroup}${colorKeyModifier}`);
      let newVars;
      if (typeof value === 'string') {
        newVars = { [propName]: value };
      } else {
        newVars = _extractColorVars(value, `-${colorKey}`);
      }
      return { ...vars, ...newVars };
    }, {});
  }
  const result = _extractColorVars(_colorObj, _colorGroup);
  return result;
}

function aliasPalette(alias, colorName, colors) {
  const aliasPrefix = cssPropName(`--color-${alias}`);
  const palette = colors[colorName];
  const colorProps = extractColorVars({ [colorName]: palette });
  const result = {};
  Object.keys(colorProps).forEach(propName => {
    let key = propName
      .replace(colorName, alias) //
      .replace(aliasPrefix, '')
      .replace(/^[-]+/, '');
    if (!key) {
      key = 'DEFAULT';
    }
    result[key] = `var(${propName})`;
  });
  return { [alias]: result };
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
  DEFAULT: 'rgb(0, 0, 0)',
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
  DEFAULT: 'rgb(255, 255, 255)',
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

const base = {
  bg: 'var(--rr-color-gray-50)',
  text: 'var(--rr-color-neutral-800)',
  'secondary-text': 'var(--rr-color-neutral-500)'
};

const surface = {
  bg: 'var(--rr-color-white)',
  text: 'var(--rr-color-neutral-800)',
  'secondary-text': 'var(--rr-color-neutral-500)'
};

const divider = {
  default: 'var(--rr-color-zinc-300)',
  secondary: 'var(--rr-color-zinc-200)'
};

const coreColorPrimitives = {
  inherit: colors.inherit,
  current: colors.current,
  transparent: colors.transparent,
  black: colors.black,
  white: colors.white,
  shade: shade,
  tint: tint,
  contrast: contrast,
  base,
  surface,
  divider
};
const corePrimitiveNames = Object.keys(coreColorPrimitives);
const corePrimitiveProperties = corePrimitiveNames.reduce((acc, colorName) => {
  const propertyBasedPalette = aliasPalette(colorName, colorName, coreColorPrimitives);
  return {
    ...acc,
    ...propertyBasedPalette
  };
}, {});

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

const colorNames = Object.keys(colorPalettes);
const propertyBasedPalettes = colorNames.reduce((acc, colorName) => {
  const propertyBasedPalette = aliasPalette(colorName, colorName, colorPalettes);
  return {
    ...acc,
    ...propertyBasedPalette
  };
}, {});

const emotiveColors = {
  ...aliasPalette('primary', 'blue', colorPalettes),
  ...aliasPalette('success', 'green', colorPalettes),
  ...aliasPalette('danger', 'red', colorPalettes),
  ...aliasPalette('warning', 'yellow', colorPalettes),
  ...aliasPalette('info', 'teal', colorPalettes)
};
const emotiveNames = Object.keys(emotiveColors);
const emotiveProperties = emotiveNames.reduce((acc, colorName) => {
  const propertyBasedPalette = aliasPalette(colorName, colorName, emotiveColors);
  return {
    ...acc,
    ...propertyBasedPalette
  };
}, {});

const allColors = {
  ...coreColorPrimitives,
  ...colorPalettes,
  ...emotiveColors
};

const dividerDark = {
  default: 'var(--rr-color-zinc-300)',
  secondary: 'var(--rr-color-zinc-200)'
};

const baseDark = {
  bg: 'var(--rr-color-shade-900)',
  text: 'var(--rr-color-neutral-900)',
  'secondary-text': 'var(--rr-color-neutral-700)'
};

const surfaceDark = {
  bg: 'var(--rr-color-gray-200)',
  text: 'var(--rr-color-neutral-900)',
  'secondary-text': 'var(--rr-color-neutral-700)'
};

const coreColorPrimitivesDark = {
  contrast: tint,
  base: baseDark,
  surface: surfaceDark,
  divider: dividerDark
};

const colorPalettesDark = colorNames.reduce((acc, colorName) => {
  const darkPalette = computePaletteDark(colorPalettes[colorName]);
  return {
    ...acc,
    ...{ [colorName]: darkPalette }
  };
}, {});

const emotiveColorsDark = {
  ...aliasPalette('primary', 'blue', colorPalettesDark),
  ...aliasPalette('success', 'green', colorPalettesDark),
  ...aliasPalette('danger', 'red', colorPalettesDark),
  ...aliasPalette('warning', 'yellow', colorPalettesDark),
  ...aliasPalette('info', 'teal', colorPalettesDark)
};

const allColorsDark = {
  ...coreColorPrimitivesDark,
  ...colorPalettesDark,
  ...emotiveColorsDark
};

const colorPropsPlugin = ({ addBase, theme }) => {
  addBase({
    ':root': extractColorVars(theme('colors'))
  });
};

const colorPropsDarkPlugin = ({ addBase }) => {
  addBase({
    '[theme~="dark"], :host([theme~="dark"])': extractColorVars(allColorsDark)
  });
};

const colorUtilPlugin = ({ matchUtilities }) => {
  const values = flattenColorPalette({ ...propertyBasedPalettes, ...emotiveProperties, ...corePrimitiveProperties });
  matchUtilities(
    {
      color: value => {
        return {
          color: value
        };
      }
    },
    {
      values: values
    }
  );
};

const bgColorUtilPlugin = ({ matchUtilities }) => {
  const values = flattenColorPalette({ ...propertyBasedPalettes, ...emotiveProperties, ...corePrimitiveProperties });
  matchUtilities(
    {
      bg: value => {
        return {
          'background-color': value
        };
      }
    },
    {
      values: values
    }
  );
};

module.exports = {
  colorPropsPlugin,
  colorPropsDarkPlugin,
  allColors,
  colorUtilPlugin,
  bgColorUtilPlugin
};
