'use strict';
const exec = require('child_process').execSync;
const { fatal } = require('../helper/logger');

module.exports = function () {
  let name, email;
  try {
    name = exec('git config --get user.name');
    email = exec('git config --get user.email');
  } catch (e) {
    fatal(`got github config error: ${e.message}`);
  }
  name = name && JSON.stringify(name.toString().trim()).slice(1, -1);
  email = email && (' <' + email.toString().trim() + '>');
  return (name || '') + (email || '');
};
