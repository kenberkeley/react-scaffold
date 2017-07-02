var path = require('path');

/**
 * Easy path helper
 * @param  {String} target
 * @return {String} path to target
 */
String.prototype.join = function (target) {
  return path.join(this.toString(), target);
};

var ROOT = path.resolve(__dirname, '../..');

module.exports = {
  SRC: ROOT.join('src'),      // Source code
  DIST: ROOT.join('dist'),    // Output of Webpack build
  STATIC: ROOT.join('static') // Static resources (unnecessary processd by Webpack)
  // Tips: those processd by Webpack are called `assets`
};
