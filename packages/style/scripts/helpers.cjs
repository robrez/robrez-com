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

module.exports = {
  cssPropName
};
