const chalk = require('chalk');

module.exports = {
  error (msg) {
    console.log(chalk.red(msg));
    process.exit(1);
  },
  success (msg) {
    console.log(chalk.green(msg));
  },
  tips (msg = '') {
    console.log(msg);
  }
};
