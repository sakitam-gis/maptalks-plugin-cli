'use strict';

const exec = require('child_process').execSync;
const log = require('./logger');

module.exports = function () {
  let name, email;
  try {
    name = exec('git config --get user.name');
    email = exec('git config --get user.email');
  } catch (e) {
    log.error(`got github config error: ${e.message}`);
  }
  name = name && JSON.stringify(name.toString().trim()).slice(1, -1)
  email = email && (' <' + email.toString().trim() + '>')
  return (name || '') + (email || '')
};
