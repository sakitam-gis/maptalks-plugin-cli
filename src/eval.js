/**
 * Evaluate an expression in meta.json in the context of
 * prompt answers data.
 */

const log = require('./logger');
module.exports = function evaluate (exp, data) {
  let fn = new Function('data', 'with (data) { return ' + exp + '}');
  try {
    return fn(data);
  } catch (e) {
    log.error(`Error when evaluating filter condition: ${exp}`);
  }
};
