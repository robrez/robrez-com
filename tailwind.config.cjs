const colors = require('tailwindcss/colors');

const { lightBlue, warmGray, trueGray, coolGray, blueGray, ...keepColors } = colors;

module.exports = {
  theme: {
    colors: keepColors
  },
  corePlugins: {
    preflight: false
  },
  experimental: {
    optimizeUniversalDefaults: true
  },
  plugins: [
    function ({ addBase, theme }) {
      function addMissingSemi(record) {
        const result = { ...record };
        //bug where last semi is missing, cheating by adding semi to last value
        const keys = Object.keys(result);
        const lastKey = keys[keys.length - 1];
        result[lastKey] = result[lastKey] + ';';
        return result;
      }

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

      addBase({
        ':root': extractColorVars(theme('colors'))
      });
      addBase({
        ':root': extractFontVars(theme('fontSize'))
      });
    }
  ]
};
