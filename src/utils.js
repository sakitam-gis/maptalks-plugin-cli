'use strict';

const fs = require('fs');
const path = require('path');
const exec = require('child_process').execSync;
const log = require('./logger');

module.exports = {
  isExist (tplPath) {
    let p = path.normalize(tplPath);
    try {
      fs.accessSync(p, fs.R_OK & fs.W_OK, (err) => {
        if (err) {
          log.tips();
          log.error(`Permission Denied to access ${p}`);
        }
      });
      return true;
    } catch (e) {
      return false;
    }
  },

  isLocalTemplate (tpl) {
    let isLocal = tpl.startsWith('.') || tpl.startsWith('/') || /^\w:/.test(tpl);

    if (isLocal) {
      return isLocal;
    } else {
      return this.isExist(path.normalize(path.join(process.cwd(), tpl)));
    }
  },

  chareBinPath () {
    try {
      let binPath = exec('which maptalks');
      return binPath.toString();
    } catch (e) {
      log.error(`exec which maptalks error: ${e.message}`);
    }
  },

  getAuthInfo (url) {
    let config = {
      url: url,
      method: 'get',
      headers: {
        'User-Agent': 'maptalks-cli'
      },
      timeout: 10000,
      auth: {}
    };
    let binPath = this.chareBinPath();
    let tokenPath = path.normalize(path.join(binPath, '../../', 'lib/node_modules/maptalks/src/token.json'));
    if (this.isExist(tokenPath)) {
      let authInfo = require(tokenPath);
      config.auth = authInfo;
    } else {
      delete config['auth'];
    }
    return config;
  }
};
