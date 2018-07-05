const chalk = require('chalk');
const format = require('util').format;

exports.log = function (...message) {
  const msg = format.apply(format, message);
  console.log(chalk.gray(msg));
};

exports.fatal = function (...message) {
  if (message[0] instanceof Error) message[0] = message[0].message.trim();
  const msg = format.apply(format, message);
  console.error(msg);
  process.exit(1)
};

/**
 * Log a success `message` to the console and exit.
 * @param {String} message
 */
exports.success = function (...message) {
  const msg = format.apply(format, message);
  console.log(chalk.green(msg));
};
