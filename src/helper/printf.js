#!/usr/bin/env node

const _package = require('../../package.json');
const figlet = require('figlet');
const { fatal, success, log } = require('./logger');

function print () {
  figlet(_package.name, (err, data) => {
    if (err) fatal(err);
    success(data);
    log(`                  version:${_package.version} `);
  });
}

print();
