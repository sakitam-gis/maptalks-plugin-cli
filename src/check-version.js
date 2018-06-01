'use strict';

const semver = require('semver');
const chalk = require('chalk');
const axios = require('axios');
const ora = require('ora');
const pkg = require('../package.json');
const log = require('./logger');
log.tips();
module.exports = function (done) {
  let spinner = ora({
    text: "checking maptalks cli version...",
    color: "blue"
  }).start();
  if (!semver.satisfies(process.version, pkg.engines.node)) {
    spinner.text = chalk.white('maptalks cli:checking maptalks cli version failed, error message as follows:');
    spinner.fail();
    log.tips();
    log.error(`  You must upgrade node to ${pkg.engines.node} to use maptalks cli`);
  }
  axios({
    url: 'https://registry.npmjs.org/maptalks-plugin-cli',
    method: 'get',
    timeout: 10000
  }).then((res) => {
    if (res.status === 200) {
      spinner.text = chalk.green('Checking maptalks-plugin cli version success.');
      spinner.succeed();
      let local = pkg.version;
      let latest = res.data['dist-tags'].latest;
      if (semver.lt(local, latest)) {
        log.tips();
        log.tips(chalk.blue('  A newer version of maptalks-plugin-cli is available.'));
        log.tips();
        log.tips(`  latest:    ${chalk.green(latest)}`);
        log.tips(`  installed:    ${chalk.red(local)}`)
        log.tips(`  update maptalks-plugin-cli latest: npm update -g maptalks-plugin-cli`);
        log.tips();
      }
      done();
    }
  }).catch((err) => {
    if (err) {
      let res = err.response;
      spinner.text = chalk.white('maptalks-plugin cli:checking maptalks-plugin cli version failed, error message as follows:');
      spinner.fail();
      log.tips();
      if (res) {
        log.tips(chalk.red(`     ${res.statusText}: ${res.headers.status}`));
      } else {
        log.tips(chalk.red(`     ${err.message}`));
      }
      log.tips();
      done();
    }
  });
};
