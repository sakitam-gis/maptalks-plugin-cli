'use strict';

const fs = require('fs');
const path = require('path');
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
  }
};
