/**
 * Evaluate an expression in meta.json in the context of
 * prompt answers data.
 */
const { fatal } = require('./logger');
module.exports = function evaluate (exp, data) {
  // eslint-disable-next-line
  const fn = new Function('data', 'with (data) { return ' + exp + '}');
  try {
    return fn(data);
  } catch (e) {
    fatal(`Error when evaluating filter condition: ${exp}`);
  }
};
