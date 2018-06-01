'use strict';
const match = require('minimatch');
const evaluate = require('./eval');

module.exports = function (filters, files, data, done) {
  if (!filters) {
    return done();
  }
  let filePaths = Object.keys(files);
  if (!filePaths.length) {
    return done();
  }
  Object.keys(filters).forEach(function (regexp) {
    filePaths.forEach(function (path) {
      if (match(path, regexp, {dot: true})) {
        let matchedVal = filters[regexp];
        if (!evaluate(matchedVal, data)) {
          delete files[path];
        }
      }
    });
  });
  done();
};
